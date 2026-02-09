/**
 * Visual connector between page sections.
 * Blends the two background colours with a gradient and draws a thin
 * gold "grout line" through the centre — tying the tiling theme together.
 */

interface SectionDividerProps {
  /** The section above is charcoal-dark (5 %) rather than charcoal (10 %) */
  fromDark?: boolean;
  /** The section below is charcoal-dark (5 %) rather than charcoal (10 %) */
  toDark?: boolean;
  /** Centre decoration variant */
  decoration?: "diamond" | "dots" | "none";
}

const LIGHT = "hsl(0 0% 10%)"; // charcoal
const DARK = "hsl(0 0% 5%)"; // charcoal-dark / background

export default function SectionDivider({
  fromDark = false,
  toDark = false,
  decoration = "none",
}: SectionDividerProps) {
  const from = fromDark ? DARK : LIGHT;
  const to = toDark ? DARK : LIGHT;

  return (
    <div
      className="relative h-16 overflow-hidden select-none"
      aria-hidden="true"
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    >
      {/* Gold grout line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-5xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </div>

      {/* Centre decoration */}
      {decoration === "diamond" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Background mask so the grout line doesn't cross the diamond */}
            <div
              className="absolute w-8 h-8 rounded-sm"
              style={{ background: `color-mix(in srgb, ${from} 50%, ${to})` }}
            />
            <div className="relative w-3 h-3 rotate-45 border border-gold/30" />
          </div>
        </div>
      )}

      {decoration === "dots" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center gap-2">
            {/* Background mask */}
            <div
              className="absolute -inset-x-4 -inset-y-2 rounded"
              style={{ background: `color-mix(in srgb, ${from} 50%, ${to})` }}
            />
            <div className="relative w-1 h-1 rounded-full bg-gold/25" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-gold/35" />
            <div className="relative w-1 h-1 rounded-full bg-gold/25" />
          </div>
        </div>
      )}
    </div>
  );
}
