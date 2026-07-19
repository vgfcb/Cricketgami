"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [runs, setRuns] = useState("");
  const [balls, setBalls] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    // Runs is required
    if (!runs) return;

    // Balls left blank -> show all BatGamis with that runs value
    if (!balls) {
      router.push(`/runs/${runs}`);
      return;
    }

    // Runs + Balls -> specific BatGami
    router.push(`/batgami/${runs}/${balls}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          placeholder="Runs"
          value={runs}
          onChange={(e) => setRuns(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <input
          type="number"
          placeholder="Balls (optional)"
          value={balls}
          onChange={(e) => setBalls(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

      </div>

      <button
        onClick={handleSearch}
        className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200"
      >
        Search
      </button>
    </div>
  );
}