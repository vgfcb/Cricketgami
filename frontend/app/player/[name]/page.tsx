import { api } from "@/lib/api";
import PlayerClient from "./playerclient";

type Params = Promise<{
  name: string;
}>;

export default async function PlayerPage({
  params,
}: {
  params: Params;
}) {
  const { name } = await params;

  const { data } = await api.get(
    `/player/${decodeURIComponent(name)}`
  );

  return <PlayerClient data={data} />;
}