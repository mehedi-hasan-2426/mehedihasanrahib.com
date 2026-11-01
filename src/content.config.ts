import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    status: z.string(),
    stack: z.array(z.string()),
    repo: z.url(),
    live: z.url().optional(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
