import { api } from "@/lib/api";
import Link from "next/link";

type Params = Promise<{
  runs: string;
  balls: string;
}>;

export default async function BatgamiPage({ params }: { params: Params }) {
  const { runs, balls } = await params;
  const { data } = await api.get(`/batgami/${runs}/${balls}`);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0f0c] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[90px]" />

      <div className="relative mx-auto max-w-3xl px-5 py-8">

        {data.exists ? (
          <>
            {/* HEADER */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#121813]">
              <div className="p-6">
                <div className="text-5xl font-extrabold tracking-tight text-emerald-400">
                  {runs}
                  <span className="ml-1 text-3xl font-bold text-zinc-500">
                    ({balls})
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-400 md:text-base">
                  Occurred{" "}
                  <span className="font-semibold text-white">
                    {data.summary.occurrences}
                  </span>{" "}
                  times in IPL history
                </p>
              </div>

              <div className="grid grid-cols-2 border-t border-zinc-800">
                <div className="border-r border-zinc-800 p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Created By
                  </p>
                  <Link
                    href={`/player/${encodeURIComponent(data.summary.first_batter)}`}
                    className="mt-2 block text-lg font-bold hover:text-emerald-400"
                  >
                    {data.summary.first_batter}
                  </Link>
                </div>

                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    First Occurred
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {data.summary.first_date}
                  </p>
                </div>
              </div>
            </div>

            {/* OCCURRENCES */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                  All Occurrences
                </h2>
                <p className="text-xs text-zinc-500">
                  {data.summary.occurrences} times
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#121813]">
                {data.occurrences.map((occ: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between p-4 ${
                      index !== data.occurrences.length - 1
                        ? "border-b border-zinc-800"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-700 bg-emerald-950/40 text-sm font-bold text-emerald-400">
                        {occ.batter
                          .split(" ")
                          .map((x: string) => x[0])
                          .join("")}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/player/${encodeURIComponent(occ.batter)}`}
                            className="text-sm font-semibold hover:text-emerald-400"
                          >
                            {occ.batter}
                          </Link>

                          {index === 0 && (
                            <span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-yellow-400">
                              ★ ORIGINAL
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-zinc-400">
                          {occ.batting_team} vs {occ.bowling_team}
                        </p>

                        <p className="mt-1 text-[11px] text-zinc-500">
                          {occ.fours}×4 • {occ.sixes}×6 • {occ.venue}
                        </p>
                      </div>
                    </div>

                    <div className="whitespace-nowrap text-right text-xs text-zinc-400">
                      {occ.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-emerald-700/50 bg-emerald-950/30 p-6">
            <h1 className="text-5xl font-extrabold">
              {runs}
              <span className="text-zinc-400">({balls})</span>
            </h1>

            <h2 className="mt-4 text-2xl font-bold text-emerald-400">
              ⭐ New BatGami!
            </h2>

            <p className="mt-3 text-sm text-zinc-300 md:text-base">
              No IPL batter has ever scored <strong>{runs}</strong> runs from{" "}
              <strong>{balls}</strong> balls.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}