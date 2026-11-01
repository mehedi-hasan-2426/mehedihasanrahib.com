import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { GitHubSummary } from "../server/api.ts";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function GitHubTile() {
  const [data, setData] = useState<GitHubSummary | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github.json", { signal: controller.signal })
      .then((r) => (r.ok ? (r.json() as Promise<GitHubSummary>) : null))
      .then(setData)
      .catch(() => setData(null));
    return () => controller.abort();
  }, []);

  if (!data?.publicRepos) {
    return <p>Code, tests and notes for every project are public on GitHub.</p>;
  }
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <p className="font-display text-teal text-4xl leading-none font-bold" data-testid="repo-count">
        {data.publicRepos}
      </p>
      <p className="mt-1">public repositories</p>
      {data.latestRepo && data.latestPush ? (
        <p className="text-muted mt-2 text-sm">
          Last push: {data.latestRepo}, {dateFormat.format(new Date(data.latestPush))}
        </p>
      ) : null}
    </motion.div>
  );
}
