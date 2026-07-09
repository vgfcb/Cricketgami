"use client";

import { useState } from "react";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PlayerClient({ data }: any) {
  const [tab, setTab] = useState("innings");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-5 py-10">

        <h1 className="text-5xl font-bold tracking-tight">
          {data.player}
        </h1>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-4xl font-bold">
              {data.summary.innings}
            </p>

            <p className="mt-2 text-zinc-400">
              IPL Innings
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-4xl font-bold">
              {data.summary.batgamis_created}
            </p>

            <p className="mt-2 text-zinc-400">
              BatGamis Created
            </p>
          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex gap-8 border-b border-zinc-800">

          <button
            onClick={() => setTab("innings")}
            className={`pb-3 ${
              tab === "innings"
                ? "border-b-2 border-white font-semibold"
                : "text-zinc-500"
            }`}
          >
            Recent Innings
          </button>

          <button
            onClick={() => setTab("batgamis")}
            className={`pb-3 ${
              tab === "batgamis"
                ? "border-b-2 border-white font-semibold"
                : "text-zinc-500"
            }`}
          >
            BatGamis
          </button>

        </div>

        {/* Recent Innings */}

        {tab === "innings" && (

          <div className="mt-8 space-y-5">

            {data.innings.map((inning: any, index: number) => (

              <div
                key={index}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >

                {inning.is_batgami && (
                  <div className="mb-4 inline-flex rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    ⭐ BATGAMI
                  </div>
                )}

                <Link
                  href={`/batgami/${inning.runs}/${inning.balls}`}
                  className="text-3xl font-bold hover:text-blue-400"
                >
                  {inning.runs} ({inning.balls})
                </Link>

                <p className="mt-3 text-sm text-zinc-500">
                  {formatDate(inning.date)}
                </p>

                <p className="mt-2">
                  {inning.batting_team} vs {inning.bowling_team}
                </p>

                <p className="mt-3 text-zinc-400">
                  {inning.fours}×4 • {inning.sixes}×6
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                  {inning.venue}
                </p>

              </div>

            ))}

          </div>

        )}

        {/* BatGamis */}

        {tab === "batgamis" && (

          <div className="mt-8 space-y-5">

            {data.created.map((gami: any, index: number) => (

              <Link
                key={index}
                href={`/batgami/${gami.runs}/${gami.balls}`}
                className="block rounded-2xl border border-yellow-600 bg-zinc-900 p-6 hover:border-yellow-400"
              >

                <div className="mb-3 inline-flex rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                  ⭐ CREATED BATGAMI
                </div>

                <h2 className="text-3xl font-bold">
                  {gami.runs} ({gami.balls})
                </h2>

                <p className="mt-3 text-zinc-400">
                  First Created
                </p>

                <p className="text-lg">
                  {formatDate(gami.first_date)}
                </p>

                <div className="mt-5 flex gap-8">

                  <div>
                    <p className="text-2xl font-bold">
                      {gami.occurrences}
                    </p>

                    <p className="text-zinc-500">
                      Occurrences
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {gami.unique_pathways}
                    </p>

                    <p className="text-zinc-500">
                      Pathways
                    </p>
                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}