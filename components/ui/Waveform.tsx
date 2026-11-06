import { cn } from "@/lib/utils";

/*
 * The site's signature motif: a row of level-meter bars.
 * Heights are fixed (not random) so server and client render identically.
 */
const HEIGHTS = [
  18, 30, 22, 44, 36, 58, 40, 70, 52, 34, 62, 80, 56, 38, 66, 90, 72, 48, 60, 84, 64, 42, 74, 96,
  70, 50, 78, 58, 40, 64, 86, 60, 44, 54, 76, 50, 32, 46, 62, 38, 26, 42, 30, 20, 34, 24, 16, 22,
];

interface WaveformProps {
  className?: string;
  barClassName?: string;
  bars?: number;
  animate?: boolean;
}

export function Waveform({ className, barClassName, bars = HEIGHTS.length, animate = false }: WaveformProps) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const cycle = Math.floor(i / HEIGHTS.length);
    const j = i % HEIGHTS.length;
    // mirror every second cycle so repeats don't look copied
    return HEIGHTS[cycle % 2 === 0 ? j : HEIGHTS.length - 1 - j];
  });
  return (
    <div aria-hidden className={cn("flex items-end gap-[2px] sm:gap-[3px]", className)}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "block min-w-[2px] flex-1 origin-bottom rounded-full bg-current",
            animate && "animate-meter",
            barClassName,
          )}
          style={{
            height: `${h}%`,
            animationDelay: animate ? `${300 + i * 22}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
}
