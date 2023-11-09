
import { fetchApp } from "../components/server/fetchers/app";

export default async function Page() {
  const test = await fetchApp();
  return <div
    className="text-2xl font-bold"
  >{JSON.stringify(test)}</div>;
}
