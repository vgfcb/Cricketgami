import { api } from "@/lib/api";
import HeatmapClient from "./heatmapclient";

export default async function HeatmapPage() {
  const { data } = await api.get("/heatmap");

  return <HeatmapClient data={data} />;
}