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
    problem: z.string().optional(),
    solution: z.string().optional(),
    impact: z.string().optional(),
    architecture: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageWidth: z.number().optional(),
    imageHeight: z.number().optional(),
  }),
});

export const collections = { projects };
