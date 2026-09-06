"use client";

import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RunsClient({ data }: any) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f0c] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-8">

        {/* Header */}
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-yellow-400">
          Runs Search
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
          {data.runs} Runs
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          {data.count} unique BatGamis
        </p>

        {/* Cards */}
        <div className="mt-6 space-y-3">
          {data.batgamis.map((gami: any) => (
            <Link
              key={`${gami.runs}-${gami.balls}`}
              href={`/batgami/${gami.runs}/${gami.balls}`}
              className="group block rounded-xl border border-zinc-800 bg-[#121813] p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-[0_0_25px_-12px_rgba(16,185,129,0.4)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {gami.runs} ({gami.balls})
                  </h2>

                  <p className="mt-1 text-xs text-zinc-400">
                    Created by{" "}
                    <span className="font-medium text-white">
                      {gami.first_batter}
                    </span>
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    {formatDate(gami.first_date)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black tabular-nums text-emerald-400">
                    {gami.occurrences}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                    Occurrences
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}