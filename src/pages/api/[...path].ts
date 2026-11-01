import type { APIRoute } from "astro";
import { api } from "../../server/api.ts";

export const prerender = true;

export function getStaticPaths() {
  return [{ params: { path: "github.json" } }];
}

export const GET: APIRoute = ({ request }) => api.fetch(request);
