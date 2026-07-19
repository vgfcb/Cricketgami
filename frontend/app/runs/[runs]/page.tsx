import { api } from "@/lib/api";
import RunsClient from "./runsclient";

type Params = Promise<{
  runs: string;
}>;

export default async function RunsPage({
  params,
}: {
  params: Params;
}) {
  const { runs } = await params;

  const { data } = await api.get(`/runs/${runs}`);

  return <RunsClient data={data} />;
}