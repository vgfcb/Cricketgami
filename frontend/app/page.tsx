export const dynamic = "force-dynamic";

import Link from "next/link";
import { Users, ChartNoAxesCombined } from "lucide-react";

import { api } from "@/lib/api";
import SearchBox from "../components/ui/searchbox";
import FeaturedBatgami from "../components/ui/featuredbatgami";

export default async function Home() {
  const { data: featured } = await api.get("/random");

  return (
    <main className="min-h-screen bg-[#090b12] text-white">

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* HERO */}

        <div className="text-center">

          <h1 className="text-7xl font-black tracking-tight">
            BatGami
          </h1>

          <p className="mt-5 text-xl text-zinc-400">
            Every unique runs + balls combination in IPL history is a BatGami.
            
            Search every unique IPL batting innings.
          </p>

        </div>

        {/* SEARCH */}

        <div className="mt-12">
          <SearchBox />
        </div>

        {/* EXPLORE */}

        <div className="mt-16">

          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-blue-400">
            EXPLORE
          </p>

          <div className="grid gap-5 md:grid-cols-2">

            <Link href="/players">

              <div className="group rounded-3xl border border-zinc-800 bg-[#111827] p-7 transition hover:border-blue-500 hover:bg-[#172033]">

                <Users className="mb-6 h-8 w-8 text-blue-400" />

                <h2 className="text-2xl font-bold">
                  Players
                </h2>

                <p className="mt-2 text-zinc-400">
                  Browse every IPL batter
                </p>

              </div>

            </Link>

            <Link href="/heatmap">

              <div className="group rounded-3xl border border-zinc-800 bg-[#111827] p-7 transition hover:border-blue-500 hover:bg-[#172033]">

                <ChartNoAxesCombined className="mb-6 h-8 w-8 text-blue-400" />

                <h2 className="text-2xl font-bold">
                  Heatmap
                </h2>

                <p className="mt-2 text-zinc-400">
                  Visualize every BatGami
                </p>

              </div>

            </Link>

          </div>

        </div>

        {/* FEATURED */}

        <div className="mt-16">

          <FeaturedBatgami initialData={featured} />

        </div>

      </div>

    </main>
  );
}