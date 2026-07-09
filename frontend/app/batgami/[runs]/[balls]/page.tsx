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
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {data.exists ? (
          <>
            {/* Header */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <h1 className="text-5xl font-bold">
                {runs} ({balls})
              </h1>

              <p className="mt-4 text-xl">
                Occurred <span className="font-bold">{data.summary.occurrences}</span> times
              </p>

              <div className="mt-8 grid grid-cols-2 gap-8">

                <div>
                  <p className="text-sm text-zinc-400">Created By</p>
                  <p className="text-lg font-semibold">
                    {data.summary.first_batter}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-400">First Occurred</p>
                  <p className="text-lg font-semibold">
                    {data.summary.first_date}
                  </p>
                </div>

              </div>
            </div>

            {/* Occurrences */}
            <div className="mt-10">
              <h2 className="mb-5 text-2xl font-bold">
                All Occurrences
              </h2>

              <div className="space-y-4">

                {data.occurrences.map((occ: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex items-start justify-between">

                      <div>
                        <Link
                             href={`/player/${encodeURIComponent(occ.batter)}`}
                             className="text-xl font-semibold hover:text-blue-400 transition"
                                                                >
                               {occ.batter}
                        </Link>

                        <p className="text-zinc-400">
                          {occ.batting_team} vs {occ.bowling_team}
                        </p>

                        <p className="mt-2 text-sm text-zinc-500">
                          {occ.date}
                        </p>

                        <p className="mt-3">
                          {occ.fours}×4 • {occ.sixes}×6
                        </p>
                      </div>

                      <div className="text-right">

                        <p className="mt-2 text-sm text-zinc-500">
                          {occ.venue}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-green-700 bg-green-950 p-8">
            <h1 className="text-5xl font-bold">
              {runs} ({balls})
            </h1>

            <h2 className="mt-6 text-3xl font-bold">
              ⭐ New BatGami!
            </h2>

            <p className="mt-4 text-lg">
              No IPL batter has ever scored <strong>{runs}</strong> runs from{" "}
              <strong>{balls}</strong> balls.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}