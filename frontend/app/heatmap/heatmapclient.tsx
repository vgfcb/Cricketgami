"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

function getColor(count: number) {
  if (count === 0) return "#27272a"; // visible against bg-zinc-950, reads as "empty" not "missing"
  if (count === 1) return "#7f1d1d";
  if (count <= 5) return "#dc2626";
  if (count <= 20) return "#f59e0b";
  if (count <= 100) return "#84cc16";
  return "#22c55e";
}

const CELL = 10;
const MAX_RUNS = 200;
const MAX_BALLS = 100;

export default function HeatmapClient({ data }: { data: any[] }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [highlight, setHighlight] = useState<{ runs: number; balls: number } | null>(null);

  const cellMap = useMemo(() => {
    const map = new Map<string, any>();
    data.forEach((c) => map.set(`${c.runs}-${c.balls}`, c));
    return map;
  }, [data]);

  const stats = useMemo(() => {
    const total = data.length;
    const totalOccurrences = data.reduce((sum, c) => sum + c.occurrences, 0);
    const rarest = data.filter((c) => c.occurrences === 1).length;
    return { total, totalOccurrences, rarest };
  }, [data]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // expects "runs(balls)" or "runs balls" or "runs,balls"
    const match = search.match(/(\d+)\D+(\d+)/);
    if (!match) return;
    const runs = parseInt(match[1], 10);
    const balls = parseInt(match[2], 10);
    setHighlight({ runs, balls });

    const container = containerRef.current;
    if (container) {
      const x = balls * CELL;
      const y = (MAX_RUNS - runs) * CELL;
      container.scrollTo({
        left: x - container.clientWidth / 2,
        top: y - container.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="w-full px-6 py-8">
        <h1 className="text-5xl font-bold">BatGami Heatmap</h1>
        <p className="mt-2 text-zinc-400">
          Every square represents one runs/balls combination.
        </p>

        {/* Stats bar */}
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-400">
          <span><span className="text-white font-semibold">{stats.total}</span> unique lines</span>
          <span><span className="text-white font-semibold">{stats.totalOccurrences}</span> total innings</span>
          <span><span className="text-white font-semibold">{stats.rarest}</span> lines scored only once</span>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Jump to a line, e.g. 34(19)"
            className="w-64 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            Jump
          </button>
        </form>

        {/* Sticky legend */}
        <div className="sticky top-0 z-10 mt-8 flex flex-wrap gap-6 rounded-xl border border-zinc-800 bg-zinc-950/95 p-4 text-sm backdrop-blur">
          <Legend color="#27272a" label="Never happened" />
          <Legend color="#7f1d1d" label="1" />
          <Legend color="#dc2626" label="2–5" />
          <Legend color="#f59e0b" label="6–20" />
          <Legend color="#84cc16" label="21–100" />
          <Legend color="#22c55e" label="100+" />
        </div>

        {/* Grid with axis labels */}
        <div
          ref={containerRef}
          className="mt-4 overflow-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          style={{ maxHeight: "70vh" }}
        >
          <svg
            width={(MAX_BALLS + 4) * CELL}
            height={(MAX_RUNS + 4) * CELL}
          >
            {/* Y axis labels (runs) */}
            {Array.from({ length: Math.floor(MAX_RUNS / 20) + 1 }).map((_, i) => {
              const runs = i * 20;
              return (
                <text
                  key={`y-${runs}`}
                  x={2}
                  y={(MAX_RUNS - runs) * CELL + 8}
                  fill="#71717a"
                  fontSize={9}
                >
                  {runs}
                </text>
              );
            })}

            {/* X axis labels (balls) */}
            {Array.from({ length: Math.floor(MAX_BALLS / 10) + 1 }).map((_, i) => {
              const balls = i * 10;
              return (
                <text
                  key={`x-${balls}`}
                  x={balls * CELL + 26}
                  y={MAX_RUNS * CELL + 14}
                  fill="#71717a"
                  fontSize={9}
                >
                  {balls}
                </text>
              );
            })}

            {/* Cells */}
            <g transform={`translate(24, 0)`}>
              {data.map((cell) => {
                const isHighlighted =
                  highlight &&
                  highlight.runs === cell.runs &&
                  highlight.balls === cell.balls;
                return (
                  <g
                    key={`${cell.runs}-${cell.balls}`}
                    className="cursor-pointer"
                    onClick={() => router.push(`/batgami/${cell.runs}/${cell.balls}`)}
                  >
                    <rect
                      x={cell.balls * CELL}
                      y={(MAX_RUNS - cell.runs) * CELL}
                      width={CELL - 1}
                      height={CELL - 1}
                      fill={getColor(cell.occurrences)}
                      stroke={isHighlighted ? "#ffffff" : "none"}
                      strokeWidth={isHighlighted ? 2 : 0}
                      className="transition-opacity hover:opacity-70"
                    />
                    <title>
                      {cell.runs} ({cell.balls}){"\n"}
                      {cell.occurrences} occurrence{cell.occurrences !== 1 ? "s" : ""}
                    </title>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </main>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 rounded" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}