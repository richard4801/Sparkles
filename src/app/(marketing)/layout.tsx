import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { auth } from "@/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user
    ? { name: session.user.name ?? "", avatarSeed: session.user.avatarSeed }
    : undefined;

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}
