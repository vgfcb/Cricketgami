import { api } from "@/lib/api";
import Link from "next/link";

type Params = Promise<{
  runs: string;
  balls: string;
}>;

export default async function BatgamiPage({
  params,
}: {
  params: Params;
}) {
  const { runs, balls } = await params;

  const { data } = await api.get(`/batgami/${runs}/${balls}`);

  return (
    <main className="min-h-screen bg-[#090c13] text-white">
      <div className="mx-auto max-w-3xl px-5 py-10">

        {data.exists ? (
          <>

            {/* HEADER */}

            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#111827]">

              <div className="p-8">

                <div className="text-6xl font-extrabold tracking-tight text-blue-500">
                  {runs}
                  <span className="ml-1 text-4xl font-bold text-slate-500">
                    ({balls})
                  </span>
                </div>

                <p className="mt-4 text-lg text-slate-400">
                  Occurred{" "}
                  <span className="font-semibold text-white">
                    {data.summary.occurrences}
                  </span>{" "}
                  times in IPL history
                </p>

              </div>

              <div className="grid grid-cols-2 border-t border-zinc-800">

                <div className="border-r border-zinc-800 p-6">

                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Created By
                  </p>

                  <Link
                    href={`/player/${encodeURIComponent(
                      data.summary.first_batter
                    )}`}
                    className="mt-2 block text-xl font-bold hover:text-blue-400"
                  >
                    {data.summary.first_batter}
                  </Link>

                </div>

                <div className="p-6">

                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    First Occurred
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {data.summary.first_date}
                  </p>

                </div>

              </div>

            </div>

            {/* OCCURRENCES */}

            <div className="mt-10">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  All Occurrences
                </h2>

                <p className="text-slate-500">
                  {data.summary.occurrences} times
                </p>

              </div>

              <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#111827]">

                {data.occurrences.map((occ: any, index: number) => (

                  <div
                    key={index}
                    className={`flex items-start justify-between p-6 ${
                      index !== data.occurrences.length - 1
                        ? "border-b border-zinc-800"
                        : ""
                    }`}
                  >

                    <div className="flex gap-4">

                      {/* Avatar */}

                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-700 bg-blue-950 font-bold text-blue-400">

                        {occ.batter
                          .split(" ")
                          .map((x: string) => x[0])
                          .join("")}

                      </div>

                      {/* Info */}

                      <div>

                        <div className="flex items-center gap-3">

                          <Link
                            href={`/player/${encodeURIComponent(occ.batter)}`}
                            className="text-lg font-semibold hover:text-blue-400"
                          >
                            {occ.batter}
                          </Link>

                          {index === 0 && (
                            <span className="rounded-full bg-yellow-900/40 px-3 py-1 text-xs font-semibold text-yellow-400">
                              ★ ORIGINAL
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-slate-400">
                          {occ.batting_team} vs {occ.bowling_team}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {occ.fours}×4 • {occ.sixes}×6 • {occ.venue}
                        </p>

                      </div>

                    </div>

                    <div className="text-right text-slate-400 whitespace-nowrap">

                      {occ.date}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </>
        ) : (

          <div className="rounded-3xl border border-green-700 bg-green-950 p-8">

            <h1 className="text-6xl font-extrabold">
              {runs}
              <span className="text-slate-400">({balls})</span>
            </h1>

            <h2 className="mt-6 text-3xl font-bold text-green-400">
              ⭐ New BatGami!
            </h2>

            <p className="mt-4 text-lg text-slate-300">
              No IPL batter has ever scored{" "}
              <strong>{runs}</strong> runs from{" "}
              <strong>{balls}</strong> balls.
            </p>

          </div>

        )}

      </div>
    </main>
  );
}