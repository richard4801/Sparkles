import NextAuth, { type DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { makeAvatarSeed, resolveGender } from "@/lib/avatar";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      avatarSeed: string;
    } & DefaultSession["user"];
  }
  interface User {
    role?: string;
    avatarSeed?: string;
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const email = String(credentials?.email ?? "").toLowerCase().trim();
      const password = String(credentials?.password ?? "");
      if (!email || !password) return null;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      if (!user || !user.passwordHash) return null;

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarSeed: user.avatarSeed,
      };
    },
  }),
];

// Google is only enabled when credentials are configured.
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google);
}

export const googleEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    // Google users have no row yet (JWT strategy, no adapter) — create one on
    // first sign-in, with an auto-generated avatar.
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const email = user.email.toLowerCase();
        const [existing] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);
        if (!existing) {
          await db.insert(users).values({
            name: user.name ?? "Student",
            email,
            emailVerified: new Date(),
            avatarSeed: makeAvatarSeed(user.name),
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // On sign-in, resolve to our canonical DB row (works for both credentials
      // and Google) and backfill a unique avatar for any legacy/default seed.
      if (user?.email) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email.toLowerCase()))
          .limit(1);
        if (dbUser) {
          let avatarSeed = dbUser.avatarSeed;
          // (Re)generate when there's no seed, or when the gender baked into an
          // older seed no longer matches the account's gender — the explicit
          // choice made at signup, or a guess from the name for older/Google
          // accounts — so a mis-gendered avatar self-corrects on next sign-in.
          const stored = /^([fm])-/.exec(avatarSeed ?? "")?.[1];
          const desired = resolveGender(dbUser.gender, dbUser.name);
          if (!avatarSeed || avatarSeed === "new-student" || stored !== desired) {
            avatarSeed = makeAvatarSeed(dbUser.name, dbUser.gender);
            await db.update(users).set({ avatarSeed }).where(eq(users.id, dbUser.id));
          }
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.avatarSeed = avatarSeed;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.avatarSeed = (token.avatarSeed as string) ?? "new-student";
      }
      return session;
    },
  },
});
