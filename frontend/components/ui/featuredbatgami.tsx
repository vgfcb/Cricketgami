"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FeaturedBatgami({
  initialData,
}: {
  initialData: any;
}) {
  const [batgami, setBatgami] = useState(initialData);
  const [loading, setLoading] = useState(false);

  async function randomize() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await api.get("/random");

      if (response?.data) {
        setBatgami(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch random Batgami:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-6 shadow-xl">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.10),transparent_45%)]" />

      {/* Header */}
      <div className="relative flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
            Featured BatGami
          </span>
        </div>

        <button
          onClick={randomize}
          disabled={loading}
          className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-yellow-500 hover:text-white disabled:opacity-50"
        >
          {loading ? "..." : "↻ Random"}
        </button>

      </div>

      {/* Main */}
      <div className="relative mt-6">

        <Link
          href={`/batgami/${batgami.runs}/${batgami.balls}`}
          className="inline-block transition hover:text-yellow-400"
        >
          <div className="text-5xl font-black leading-none text-white">
            {batgami.runs}
            <span className="text-zinc-500">
              ({batgami.balls})
            </span>
          </div>
        </Link>

        <p className="mt-4 text-sm text-zinc-400">
          Created by{" "}
          <span className="font-semibold text-white">
            {batgami.first_batter}
          </span>
        </p>

        <p className="text-sm text-zinc-500">
          {formatDate(batgami.first_date)}
        </p>

      </div>

      {/* Stats */}
      <div className="relative mt-6 grid grid-cols-2 gap-3">

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-center">

          <div className="text-2xl font-bold text-white">
            {batgami.occurrences}
          </div>

          <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
            Occurrences
          </div>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-center">

          <div className="text-2xl font-bold text-white">
            {batgami.unique_pathways}
          </div>

          <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
            Pathways
          </div>

        </div>

      </div>

    </div>
  );
}