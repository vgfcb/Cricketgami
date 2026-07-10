export const dynamic = "force-dynamic";

import { api } from "@/lib/api";
import HomeClient from "./pageclient";

export default async function Home() {
  const [{ data: featured }, { data: stats }] = await Promise.all([
    api.get("/random"),
    api.get("/homepage-stats"),
  ]);

  return (
    <HomeClient
      featured={featured}
      stats={stats}
    />
  );
}