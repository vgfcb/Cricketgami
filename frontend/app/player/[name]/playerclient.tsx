"use client";

import { useState } from "react";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stat({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <p className="text-2xl font-bold text-blue-400">
        {value}
      </p>

      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}

export default function PlayerClient({ data }: any) {
  const [tab, setTab] = useState("innings");

  return (
    <main className="min-h-screen bg-[#090b12] text-white">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* HEADER */}

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
            {getInitials(data.player)}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {data.player}
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              {data.summary.batgamis_created} BatGamis Created •{" "}
              {data.summary.innings} IPL Innings
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-[#111827]">

          <div className="grid grid-cols-5 divide-x divide-zinc-800">

            <Stat
              value={data.summary.innings}
              label="INN"
            />

            <Stat
              value={data.summary.highest_score}
              label="HIGH"
            />

            <Stat
              value={data.summary.strike_rate}
              label="SR"
            />

            <Stat
              value={data.summary.fours}
              label="4s"
            />

            <Stat
              value={data.summary.sixes}
              label="6s"
            />

          </div>

        </div>

        {/* TABS */}

        <div className="mt-10 flex items-center justify-between border-b border-zinc-800">

          <div className="flex gap-8">

            <button
              onClick={() => setTab("innings")}
              className={`pb-4 transition ${
                tab === "innings"
                  ? "border-b-2 border-blue-500 font-semibold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              All Innings
            </button>

            <button
              onClick={() => setTab("batgamis")}
              className={`pb-4 transition ${
                tab === "batgamis"
                  ? "border-b-2 border-blue-500 font-semibold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              BatGamis
            </button>

          </div>

          <p className="pb-4 text-sm text-zinc-500">

            {tab === "innings"
              ? `${data.innings.length} Results`
              : `${data.created.length} Results`}

          </p>

        </div>
                {/* ALL INNINGS */}

        {tab === "innings" && (

          <div className="mt-8 space-y-4">

            {data.innings.map((inning: any, index: number) => (

              <Link
                key={index}
                href={`/batgami/${inning.runs}/${inning.balls}`}
                className="block rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition-all hover:-translate-y-1 hover:border-blue-500 hover:bg-[#172033]"
              >

                <div className="flex items-start justify-between gap-6">

                  {/* LEFT */}

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        {inning.runs} ({inning.balls})
                      </h2>

                      {inning.is_batgami && (
                        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                          BatGami
                        </span>
                      )}

                    </div>

                    <p className="mt-2 text-sm text-zinc-500">
                      {formatDate(inning.date)}
                    </p>

                    <p className="mt-3 text-[15px] text-zinc-200">
                      {inning.batting_team} vs {inning.bowling_team}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-400">

                      <span>
                        <span className="font-semibold text-white">
                          {inning.fours}
                        </span>{" "}
                        ×4
                      </span>

                      <span>
                        <span className="font-semibold text-white">
                          {inning.sixes}
                        </span>{" "}
                        ×6
                      </span>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="text-right">

                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Venue
                    </p>

                    <p className="mt-2 max-w-[180px] text-sm text-zinc-300">
                      {inning.venue}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}
                {/* BATGAMIS */}

        {tab === "batgamis" && (

          <div className="mt-8 space-y-4">

            {data.created.map((gami: any, index: number) => (

              <Link
                key={index}
                href={`/batgami/${gami.runs}/${gami.balls}`}
                className="block rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition-all hover:-translate-y-1 hover:border-blue-500 hover:bg-[#172033]"
              >

                <div className="flex items-start justify-between gap-6">

                  {/* LEFT */}

                  <div>

                    <div className="mb-3 inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                      Created BatGami
                    </div>

                    <h2 className="text-2xl font-bold">
                      {gami.runs} ({gami.balls})
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                      First Created
                    </p>

                    <p className="text-sm text-zinc-300">
                      {formatDate(gami.first_date)}
                    </p>

                  </div>

                  {/* RIGHT */}

                  <div className="flex gap-8 text-center">

                    <div>

                      <p className="text-2xl font-bold text-blue-400">
                        {gami.occurrences}
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-widest text-zinc-500">
                        Occurrences
                      </p>

                    </div>

                    <div>

                      <p className="text-2xl font-bold text-blue-400">
                        {gami.unique_pathways}
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-widest text-zinc-500">
                        Pathways
                      </p>

                    </div>

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