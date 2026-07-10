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
    <main className="min-h-screen bg-[#090b12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* HERO */}

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-[0.45em] text-blue-400">
            IPL Analytics
          </p>

          <h1 className="mt-3 text-6xl font-black font-sans uppercase tracking-[-0.08em] md:text-7xl">
            BATGAMI
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Every unique runs + balls combination in IPL history.
          </p>

        </div>

        {/* SEARCH */}

        <div className="mt-8">
          <SearchBox />
        </div>

        {/* YEAR SELECTOR */}

        <div className="mt-10">

          <div className="mb-5 flex items-center justify-center gap-5">

            <button
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-[#111827] transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            <h2 className="w-20 text-center text-3xl font-black">
              {season.year}
            </h2>

            <button
              disabled={index === latestIndex}
              onClick={() => setIndex(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-[#111827] transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-2xl border border-zinc-800 bg-[#111827] py-5 text-center">

              <p className="text-4xl font-black text-blue-400">
                {season.batgamis}
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                BatGamis
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111827] py-5 text-center">

              <p className="text-4xl font-black text-blue-400">
                {season.innings}
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Innings
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111827] py-5 text-center">

              <p className="text-4xl font-black text-blue-400">
                {season.rate}%
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Rate
              </p>

            </div>

          </div>

        </div>

        {/* EXPLORE */}

        <div className="mt-10">

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
            Explore
          </p>

          <div className="grid gap-4 md:grid-cols-2">

            <Link href="/players">

              <div className="group rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition hover:border-blue-500 hover:bg-[#172033]">

                <Users className="mb-4 h-7 w-7 text-blue-400" />

                <h2 className="text-xl font-bold">
                  Players
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Browse every IPL batter
                </p>

              </div>

            </Link>

            <Link href="/heatmap">

              <div className="group rounded-2xl border border-zinc-800 bg-[#111827] p-5 transition hover:border-blue-500 hover:bg-[#172033]">

                <ChartNoAxesCombined className="mb-4 h-7 w-7 text-blue-400" />

                <h2 className="text-xl font-bold">
                  Heatmap
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Visualize every BatGami
                </p>

              </div>

            </Link>

          </div>

        </div>

        {/* FEATURED */}

        <div className="mt-10">
          <FeaturedBatgami initialData={featured} />
        </div>

      </div>
    </main>
  );
}