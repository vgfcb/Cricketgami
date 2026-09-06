"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import SearchBox from "../components/ui/searchbox";
import FeaturedBatgami from "../components/ui/featuredbatgami";

export default function HomeClient({
  featured,
  stats,
}: {
  featured: any;
  stats: any;
}) {
  const seasons = stats.seasons;
  const latestIndex = seasons.length - 1;
  const [index, setIndex] = useState(latestIndex);
  const season = useMemo(() => seasons[index], [index, seasons]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f0c] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-6">

        {/* HERO */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-400">
            IPL · {season.year}
          </span>

          <h1 className="mt-3 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-medium uppercase tracking-[-0.04em] text-transparent md:text-5xl">
            Batgami
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-zinc-400 md:text-sm">
            Batgami tracks every batting stat line (runs, balls) in IPL history.
            When a batter scores a line that's never been scored before —
            <span className="text-white font-medium"> that's a Batgami.</span>
          </p>
        </div>

        {/* STATS + YEAR SELECTOR */}
        <div className="mt-5">
          <div className="rounded-xl border border-zinc-800 bg-[#121813] p-4">
            <div className="mb-3 flex items-center justify-center gap-4">
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-[#0a0f0c] transition hover:border-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-20"
              >
                <ChevronLeft size={14} />
              </button>

              <h2 className="w-16 text-center text-xl font-black tabular-nums">
                {season.year}
              </h2>

              <button
                disabled={index === latestIndex}
                onClick={() => setIndex(index + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-[#0a0f0c] transition hover:border-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-20"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard value={season.batgamis} label="BatGamis" accent="gold" />
              <StatCard value={season.innings} label="Innings" accent="green" />
              <StatCard value={`${season.rate}%`} label="Rate" accent="gold" />
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
            Find a line
          </p>
          <SearchBox />
        </div>

        {/* EXPLORE */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
            Explore
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/players">
              <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-[#121813] p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-[0_0_25px_-10px_rgba(16,185,129,0.4)]">
                <Users className="relative mb-2 h-6 w-6 text-emerald-400" />
                <h2 className="relative text-lg font-bold">Players</h2>
                <p className="relative mt-0.5 text-xs text-zinc-400">
                  Browse every IPL batter
                </p>
              </div>
            </Link>

            <Link href="/heatmap">
              <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-[#121813] p-4 transition hover:-translate-y-0.5 hover:border-yellow-500/60 hover:shadow-[0_0_25px_-10px_rgba(234,179,8,0.4)]">
                <ChartNoAxesCombined className="relative mb-2 h-6 w-6 text-yellow-400" />
                <h2 className="relative text-lg font-bold">Heatmap</h2>
                <p className="relative mt-0.5 text-xs text-zinc-400">
                  Visualize every BatGami
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* FEATURED — scaled down and height-capped */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">
            Featured
          </p>
          <div className="max-h-40 overflow-hidden rounded-xl border border-zinc-800 bg-[#121813]">
            <div className="origin-top scale-[0.8] p-2 [&_*]:!text-xs [&_svg]:!h-4 [&_svg]:!w-4 [&_img]:!h-10 [&_img]:!w-10">
              <FeaturedBatgami initialData={featured} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function StatCard({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent: "gold" | "green";
}) {
  const color = accent === "gold" ? "text-yellow-400" : "text-emerald-400";

  return (
    <div className="rounded-lg bg-[#0a0f0c] py-3 text-center">
      <p className={`text-2xl font-black tabular-nums ${color}`}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}