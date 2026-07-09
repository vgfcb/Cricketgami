"use client";

import { useRouter } from "next/navigation";

function getColor(count: number) {
  if (count === 0) return "#18181b";
  if (count === 1) return "#7f1d1d";
  if (count <= 5) return "#dc2626";
  if (count <= 20) return "#f59e0b";
  if (count <= 100) return "#84cc16";
  return "#22c55e";
}

export default function HeatmapClient({
  data,
}: {
  data: any[];
}) {
  const router = useRouter();

  // Bigger cells = fills more of the screen
  const CELL = 10;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="w-full px-6 py-8">

        <h1 className="text-5xl font-bold">
          BatGami Heatmap
        </h1>

        <p className="mt-2 text-zinc-400">
          Every square represents one runs/balls combination.
        </p>

        <div className="mt-8 overflow-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <svg
            width={101 * CELL}
            height={201 * CELL}
          >
            {data.map((cell) => (
              <g
                key={`${cell.runs}-${cell.balls}`}
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/batgami/${cell.runs}/${cell.balls}`)
                }
              >
                <rect
                  x={cell.balls * CELL}
                  y={(200 - cell.runs) * CELL}
                  width={CELL - 1}
                  height={CELL - 1}
                  fill={getColor(cell.occurrences)}
                  className="transition-opacity hover:opacity-70"
                />

                <title>
                  {cell.runs} ({cell.balls})
                  {"\n"}
                  {cell.occurrences} occurrence
                  {cell.occurrences !== 1 ? "s" : ""}
                </title>
              </g>
            ))}
          </svg>

        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm">

          <Legend color="#7f1d1d" label="1" />
          <Legend color="#dc2626" label="2–5" />
          <Legend color="#f59e0b" label="6–20" />
          <Legend color="#84cc16" label="21–100" />
          <Legend color="#22c55e" label="100+" />

        </div>

      </div>

    </main>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-4 w-4 rounded"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}