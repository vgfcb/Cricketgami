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

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="text-xl font-bold text-emerald-400">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}

export default function PlayerClient({ data }: any) {
  const [tab, setTab] = useState("innings");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f0c] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold">
            {getInitials(data.player)}
          </div>

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{data.player}</h1>
            <p className="mt-0.5 text-xs text-zinc-400 md:text-sm">
              {data.summary.batgamis_created} BatGamis Created •{" "}
              {data.summary.innings} IPL Innings
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-[#121813]">
          <div className="grid grid-cols-5 divide-x divide-zinc-800">
            <Stat value={data.summary.innings} label="INN" />
            <Stat value={data.summary.highest_score} label="HIGH" />
            <Stat value={data.summary.strike_rate} label="SR" />
            <Stat value={data.summary.fours} label="4s" />
            <Stat value={data.summary.sixes} label="6s" />
          </div>
        </div>

        {/* TABS */}
        <div className="mt-7 flex items-center justify-between border-b border-zinc-800">
          <div className="flex gap-6">
            <button
              onClick={() => setTab("innings")}
              className={`pb-3 text-sm transition ${
                tab === "innings"
                  ? "border-b-2 border-yellow-500 font-semibold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              All Innings
            </button>

            <button
              onClick={() => setTab("batgamis")}
              className={`pb-3 text-sm transition ${
                tab === "batgamis"
                  ? "border-b-2 border-yellow-500 font-semibold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              BatGamis
            </button>
          </div>

          <p className="pb-3 text-xs text-zinc-500">
            {tab === "innings"
              ? `${data.innings.length} Results`
              : `${data.created.length} Results`}
          </p>
        </div>

        {/* ALL INNINGS */}
        {tab === "innings" && (
          <div className="mt-6 space-y-3">
            {data.innings.map((inning: any, index: number) => (
              <Link
                key={index}
                href={`/batgami/${inning.runs}/${inning.balls}`}
                className="block rounded-xl border border-zinc-800 bg-[#121813] p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-[0_0_25px_-12px_rgba(16,185,129,0.4)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold">
                        {inning.runs} ({inning.balls})
                      </h2>

                      {inning.is_batgami && (
                        <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                          BatGami
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      {formatDate(inning.date)}
                    </p>

                    <p className="mt-2 text-sm text-zinc-200">
                      {inning.batting_team} vs {inning.bowling_team}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
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

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                      Venue
                    </p>
                    <p className="mt-1 max-w-[160px] text-xs text-zinc-300">
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
          <div className="mt-6 space-y-3">
            {data.created.map((gami: any, index: number) => (
              <Link
                key={index}
                href={`/batgami/${gami.runs}/${gami.balls}`}
                className="block rounded-xl border border-zinc-800 bg-[#121813] p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-[0_0_25px_-12px_rgba(16,185,129,0.4)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="mb-2 inline-flex rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                      Created BatGami
                    </div>

                    <h2 className="text-lg font-bold">
                      {gami.runs} ({gami.balls})
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">First Created</p>
                    <p className="text-xs text-zinc-300">
                      {formatDate(gami.first_date)}
                    </p>
                  </div>

                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-xl font-bold text-emerald-400">
                        {gami.occurrences}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                        Occurrences
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-bold text-emerald-400">
                        {gami.unique_pathways}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
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