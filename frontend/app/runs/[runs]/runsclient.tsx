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
    <main className="min-h-screen bg-[#090b12] text-white">

      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Header */}

        <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
          Runs Search
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-tight">
          {data.runs} Runs
        </h1>

        <p className="mt-3 text-zinc-400">
          {data.count} unique BatGamis
        </p>

        {/* Cards */}

        <div className="mt-10 space-y-4">

          {data.batgamis.map((gami: any) => (

            <Link
              key={`${gami.runs}-${gami.balls}`}
              href={`/batgami/${gami.runs}/${gami.balls}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-blue-500 hover:bg-zinc-800/60"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {gami.runs} ({gami.balls})
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Created by{" "}
                    <span className="font-medium text-white">
                      {gami.first_batter}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {formatDate(gami.first_date)}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-black text-blue-400">
                    {gami.occurrences}
                  </p>

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
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