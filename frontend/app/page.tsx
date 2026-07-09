import { api } from "@/lib/api";
import SearchBox from "../components/ui/searchbox";
import Link from "next/link";
import FeaturedBatgami from "../components/ui/featuredbatgami";
const { data: featured } = await api.get("/random");
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold tracking-tight">
          BatGami
        </h1>

        <p className="mt-4 mb-10 text-zinc-400 text-lg">
          Search every unique IPL batting innings.
        </p>

        <SearchBox />

        <div className="mt-16 grid w-full max-w-md grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            
            
<Link href="/players">
  <div className="cursor-pointer hover:text-white transition">
    Players
  </div>
</Link>
          </div>

       <Link href="/heatmap">
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
    <h2 className="text-lg font-semibold">
      Heatmap
    </h2>
  </div>
</Link>
<FeaturedBatgami initialData={featured} />

        </div>
      </div>
    </main>
  );
}