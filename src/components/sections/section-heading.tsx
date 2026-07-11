import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Consistent section header. Eyebrow is optional and rationed across the page
 *  (see the homepage composition) to avoid the templated eyebrow-on-every-section
 *  rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={eyebrow ? 0.05 : 0}>
        <h2
          className={cn(
            "font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
