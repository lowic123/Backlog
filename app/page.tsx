import { client } from "@/tina/__generated__/client";
import HomeClient from "./home-client";

export default async function HomePage(){
  const res = await client.queries.homePage({
    relativePath: "home-page.json"
  });
  return (
  <HomeClient
    data={res.data}
    variables={res.variables}
    query={res.query} 
  />);
}