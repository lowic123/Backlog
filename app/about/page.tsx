import { client } from "@/tina/__generated__/client";
import AboutClient from "./about-client";

export default async function AboutPage(){
  const res = await client.queries.aboutPage({
    relativePath: "about-page.mdx"
  });
  return (
  <AboutClient
    data={res.data}
    variables={res.variables}
    query={res.query} 
  />);
}