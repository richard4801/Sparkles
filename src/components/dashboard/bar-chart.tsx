import { cn } from "@/lib/utils";

export interface BarDatum {
  label: string;
  value: number;
}

/** Simple, accessible bar chart (small multiple friendly). Single hue per chart
 *  to encode one measure. Values surface on hover; a visually-hidden table gives
 *  screen readers the full data. Renders without client JS. */
export function BarChart({
  data,
  color = "bg-primary",
  format = (n) => String(n),
  caption,
  className,
}: {
  data: BarDatum[];
  color?: string;
  format?: (n: number) => string;
  caption: string;
  className?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <figure className={cn("m-0", className)}>
      <div
        className="flex h-40 items-stretch gap-2"
        role="img"
        aria-label={caption}
      >
        {data.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label} className="group flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all duration-300 group-hover:opacity-80",
                    d.value === 0 ? "bg-border-strong" : color,
                  )}
                  style={{ height: `${Math.max(pct, 2)}%` }}
                />
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[0.65rem] font-semibold text-white opacity-0 shadow-[var(--shadow-sm)] transition-opacity group-hover:opacity-100">
                  {format(d.value)}
                </span>
              </div>
              <span className="text-xs text-faint-foreground">{d.label}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="sr-only">
        {caption}
        <table>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>{format(d.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
