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

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-5 py-10">

        <h1 className="text-5xl font-bold">
          Players
        </h1>

        <p className="mt-3 text-zinc-400">
          Ranked by BatGamis Created
        </p>
        <SearchPlayers />

        {/* Filters */}
        <div className="mt-8 flex gap-4">

          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="rounded-xl bg-zinc-900 border border-zinc-800 p-3"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <select
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="rounded-xl bg-zinc-900 border border-zinc-800 p-3"
          >
            {Array.from({ length: 19 }, (_, i) => 2008 + i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

        </div>

        {/* Leaderboard */}

        <div className="mt-8 space-y-4">

          {players.map((player: any, index) => (

            <Link
              key={player.first_batter}
              href={`/player/${encodeURIComponent(player.first_batter)}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-700"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-zinc-500">
                    #{Number(index) + 1}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {player.first_batter}
                  </h2>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-bold">
                    {player.created}
                  </p>

                  <p className="text-zinc-500">
                    BatGamis
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