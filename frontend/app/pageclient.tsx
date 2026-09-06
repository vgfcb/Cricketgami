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
    <main className="relative min-h-screen overflow-hidden bg-[#090b12] text-white">
      {/* Ambient glow behind hero — gives the page some depth instead of flat black */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10">

        {/* HERO */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
            IPL · {season.year}
          </span>

          <h1 className="mt-5 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-medium uppercase tracking-[-0.04em] text-transparent md:text-7xl">
            Batgami
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
            Batgami tracks every batting stat line (runs, balls) in IPL history.
            When a batter scores a line that's never been scored before —
            <span className="text-white font-medium"> that's a Batgami.</span>
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-8">
          <SearchBox />
        </div>

        {/* YEAR SELECTOR */}
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-center gap-5">
            <button
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#111827] transition hover:border-amber-500/50 hover:bg-[#172033] disabled:cursor-not-allowed disabled:opacity-20"
            >
              <ChevronLeft size={18} />
            </button>

            <h2 className="w-24 text-center text-3xl font-black tabular-nums">
              {season.year}
            </h2>

            <button
              disabled={index === latestIndex}
              onClick={() => setIndex(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#111827] transition hover:border-amber-500/50 hover:bg-[#172033] disabled:cursor-not-allowed disabled:opacity-20"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard value={season.batgamis} label="BatGamis" accent="amber" />
            <StatCard value={season.innings} label="Innings" accent="blue" />
            <StatCard value={`${season.rate}%`} label="Rate" accent="amber" />
          </div>
        </div>

        {/* EXPLORE */}
        <div className="mt-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
            Explore
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/players">
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 transition group-hover:from-blue-500/10 group-hover:to-transparent" />
                <Users className="relative mb-4 h-7 w-7 text-blue-400" />
                <h2 className="relative text-xl font-bold">Players</h2>
                <p className="relative mt-1 text-sm text-zinc-400">
                  Browse every IPL batter
                </p>
              </div>
            </Link>

            <Link href="/heatmap">
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition hover:-translate-y-0.5 hover:border-amber-500/60 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 transition group-hover:from-amber-500/10 group-hover:to-transparent" />
                <ChartNoAxesCombined className="relative mb-4 h-7 w-7 text-amber-400" />
                <h2 className="relative text-xl font-bold">Heatmap</h2>
                <p className="relative mt-1 text-sm text-zinc-400">
                  Visualize every BatGami
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* FEATURED */}
        <div className="mt-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
            Featured
          </p>
          <FeaturedBatgami initialData={featured} />
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
  accent: "amber" | "blue";
}) {
  const color = accent === "amber" ? "text-amber-400" : "text-blue-400";
  const glow =
    accent === "amber"
      ? "hover:shadow-[0_0_30px_-12px_rgba(245,158,11,0.5)] hover:border-amber-500/40"
      : "hover:shadow-[0_0_30px_-12px_rgba(59,130,246,0.5)] hover:border-blue-500/40";

  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-[#111827] py-5 text-center transition ${glow}`}
    >
      <p className={`text-4xl font-black tabular-nums ${color}`}>{value}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}