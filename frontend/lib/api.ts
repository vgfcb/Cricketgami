import axios from "axios";

export const api = axios.create({
  baseURL: "https://cricketgami-production.up.railway.app",
});
export async function getPlayer(name: string) {
  const { data } = await api.get(`/player/${encodeURIComponent(name)}`);
  return data;
}