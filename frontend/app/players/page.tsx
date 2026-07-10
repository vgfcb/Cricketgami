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
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Hero */}

        <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
          Leaderboard
        </p>

        <h1 className="mt-2 text-6xl font-black tracking-tight">
          Players
        </h1>

        <p className="mt-3 text-xl text-zinc-400">
          Ranked by BatGamis created
        </p>

        <div className="mt-8">
          <SearchPlayers />
        </div>

        {/* Filters */}

        <div className="mt-8 flex items-center gap-4">

          <span className="text-zinc-400">
            Season
          </span>

          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <select
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

        </div>

        {/* Leaderboard */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

          {players.map((player: any, index) => (

            <Link
              key={player.first_batter}
              href={`/player/${encodeURIComponent(player.first_batter)}`}
              className={`flex items-center justify-between px-6 py-6 transition hover:bg-zinc-800/50 ${
                index !== players.length - 1
                  ? "border-b border-zinc-800"
                  : ""
              } ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-900/20 to-transparent"
                  : ""
              }`}
            >

              {/* LEFT */}

              <div className="flex items-center gap-5">

                {/* Rank */}

                {index === 0 ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-700 bg-yellow-900/20">
                    ⭐
                  </div>
                ) : (
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border font-bold
                    ${
                      index === 1
                        ? "border-blue-700 text-blue-300"
                        : index === 2
                        ? "border-orange-700 text-orange-300"
                        : "border-zinc-700 text-zinc-400"
                    }`}
                  >
                    #{index + 1}
                  </div>
                )}

                {/* Initials */}

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-700 bg-blue-950 font-bold text-blue-400">
                  {initials(player.first_batter)}
                </div>

                {/* Name */}

                <div>

                  <h2 className="text-2xl font-bold">
                    {player.first_batter}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Rank #{index + 1}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="text-right">

                <p
                  className={`text-5xl font-black ${
                    index === 0
                      ? "text-yellow-400"
                      : index === 1
                      ? "text-blue-400"
                      : index === 2
                      ? "text-orange-300"
                      : "text-blue-400"
                  }`}
                >
                  {player.created}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">
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