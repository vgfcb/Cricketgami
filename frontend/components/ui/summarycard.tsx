type Summary = {
  first_batter: string;
  first_date: string;
  latest_date: string;
  occurrences: number;
  unique_pathways: number;
};

export default function SummaryCard({
  runs,
  balls,
  summary,
}: {
  runs: string;
  balls: string;
  summary: Summary;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h1 className="text-5xl font-bold">
        {runs} ({balls})
      </h1>

      <p className="mt-2 text-zinc-400">
        Occurred {summary.occurrences} times
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-zinc-500">
            Created By
          </p>

          <p className="font-semibold">
            {summary.first_batter}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            First Date
          </p>

          <p className="font-semibold">
            {summary.first_date}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Latest
          </p>

          <p className="font-semibold">
            {summary.latest_date}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Pathways
          </p>

          <p className="font-semibold">
            {summary.unique_pathways}
          </p>
        </div>

      </div>

    </div>
  );
}