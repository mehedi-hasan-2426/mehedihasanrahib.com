import { Hono } from "hono";

export interface GitHubSummary {
  publicRepos: number | null;
  latestRepo: string | null;
  latestPush: string | null;
}

const USER = "mehedi-hasan-2426";
const empty: GitHubSummary = { publicRepos: null, latestRepo: null, latestPush: null };

async function githubSummary(): Promise<GitHubSummary> {
  const headers = { accept: "application/vnd.github+json", "user-agent": "mehedihasanrahib.de" };
  try {
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { headers, signal: AbortSignal.timeout(8000) }),
      fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1&type=owner`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
    ]);
    if (!user.ok || !repos.ok) return empty;
    const profile = (await user.json()) as { public_repos?: unknown };
    const [latest] = (await repos.json()) as { name?: unknown; pushed_at?: unknown }[];
    return {
      publicRepos: typeof profile.public_repos === "number" ? profile.public_repos : null,
      latestRepo: typeof latest?.name === "string" ? latest.name : null,
      latestPush: typeof latest?.pushed_at === "string" ? latest.pushed_at : null,
    };
  } catch {
    return empty;
  }
}

export const api = new Hono().basePath("/api");

api.get("/github.json", async (c) => c.json(await githubSummary()));
