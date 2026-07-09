"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function SearchPlayers() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setPlayers([]);
      return;
    }

    const timer = setTimeout(() => {
      api
        .get(`/search_players?q=${encodeURIComponent(query)}`)
        .then((res) => setPlayers(res.data));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search player..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-lg outline-none focus:border-white"
      />

      {players.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">

          {players.map((player) => (
            <button
              key={player}
              onClick={() =>
                router.push(`/player/${encodeURIComponent(player)}`)
              }
              className="block w-full border-b border-zinc-800 px-4 py-3 text-left hover:bg-zinc-800"
            >
              {player}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}