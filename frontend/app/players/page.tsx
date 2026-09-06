"use client";

import SearchPlayers from "@/components/ui/searchplayers";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [start, setStart] = useState(2008);
  const [end, setEnd] = useState(2026);

  useEffect(() => {
    api
      .get(`/leaderboard?start=${start}&end=${end}`)
      .then((res) => setPlayers(res.data));
  }, [start, end]);

  function initials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f0c] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-6">

        {/* HERO */}
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-yellow-400">
          Leaderboard
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
          Players
        </h1>

        <p className="mt-1 text-sm text-zinc-400 md:text-base">
          Ranked by BatGamis created
        </p>

        <div className="mt-5">
          <SearchPlayers />
        </div>

        {/* FILTERS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Season
          </span>

          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="rounded-lg border border-zinc-800 bg-[#121813] px-3 py-2 text-sm outline-none transition hover:border-yellow-500/40 focus:border-yellow-500/50"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <span className="text-xs text-zinc-600">to</span>

          <select
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="rounded-lg border border-zinc-800 bg-[#121813] px-3 py-2 text-sm outline-none transition hover:border-yellow-500/40 focus:border-yellow-500/50"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* LEADERBOARD */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-[#121813]">
          {players.map((player: any, index) => (
            <Link
              key={player.first_batter}
              href={`/player/${encodeURIComponent(player.first_batter)}`}
              className={`flex items-center justify-between px-4 py-3 transition hover:bg-[#1a221b] sm:px-5 sm:py-4 ${
                index !== players.length - 1 ? "border-b border-zinc-800" : ""
              } ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-500/10 to-transparent"
                  : ""
              }`}
            >
              {/* LEFT */}
              <div className="flex min-w-0 items-center gap-3">
                {index === 0 ? (
                  <div className="hidden h-9 w-9 items-center justify-center rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-sm sm:flex">
                    ⭐
                  </div>
                ) : (
                  <div
                    className={`hidden h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold sm:flex
                    ${
                      index === 1
                        ? "border-emerald-700 text-emerald-300"
                        : index === 2
                        ? "border-orange-700 text-orange-300"
                        : "border-zinc-700 text-zinc-500"
                    }`}
                  >
                    #{index + 1}
                  </div>
                )}

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold sm:h-10 sm:w-10
                  ${
                    index === 0
                      ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                      : "border-emerald-700 bg-emerald-950/40 text-emerald-400"
                  }`}
                >
                  {initials(player.first_batter)}
                </div>

                <h2 className="truncate text-sm font-bold leading-tight sm:text-base">
                  {player.first_batter}
                </h2>
              </div>

              {/* RIGHT */}
              <div className="ml-4 shrink-0 text-right">
                <p
                  className={`text-2xl font-black tabular-nums sm:text-3xl ${
                    index === 0
                      ? "text-yellow-400"
                      : index === 1
                      ? "text-emerald-400"
                      : index === 2
                      ? "text-orange-300"
                      : "text-emerald-400"
                  }`}
                >
                  {player.created}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-zinc-500 sm:text-[10px]">
                  BatGamis
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}