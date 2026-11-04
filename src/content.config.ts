/**
 * Content model. All site copy lives in src/content/** as Markdown or YAML.
 * To change copy: edit the file, commit, push — Vercel rebuilds the site.
 * The schemas below catch typos (missing fields, wrong types) at build time.
 */
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const seo = z.object({
  title: z.string().max(60, 'SEO title should be under 60 characters'),
  description: z.string().max(160, 'Meta description should be under ~155 characters'),
  keyword: z.string(),
  secondary: z.array(z.string()).default([]),
});

const titledText = z.object({ title: z.string(), text: z.string() });

const solutions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    group: z.enum(['enablement', 'workforce', 'embedded']),
    icon: z.string(),
    summary: z.string(), // the "What We Build" card copy
    seo,
    hero: z.object({ headline: z.string(), description: z.string() }),
    bodyHeading: z.string().default('The problem this solves'),
    deliverablesHeading: z.string().default('What Novaamind builds'),
    deliverables: z.array(titledText),
    process: z.array(titledText),
    processHeading: z.string().default('How we deliver it'),
    whyItWorks: z.array(titledText).optional(),
    outcomes: z.array(titledText),
    audience: z.object({ intro: z.string(), profiles: z.array(titledText) }),
    inPractice: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/industries' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    seo,
    hero: z.object({ headline: z.string(), description: z.string() }),
    challenges: z.array(titledText),
    builds: z.array(titledText),
    services: z.array(z.object({ slug: z.string(), line: z.string() })),
  }),
});

const resourceCategories = defineCollection({
  loader: file('./src/content/resource-categories.yaml'),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string(),
    emptyNote: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    order: z.number(),
    description: z.string(),
    reader: z.string(),
    sections: z.array(z.string()).default([]),
    format: z.enum(['Gated PDF', 'Free article']),
    status: z.enum(['in-preparation', 'published']).default('in-preparation'),
    // When published as a gated PDF, drop the file in /public/downloads and set this.
    file: z.string().optional(),
    seoDescription: z.string().max(160).optional(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Raghav Venkat'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const engagements = defineCollection({
  loader: file('./src/content/engagements.yaml'),
  schema: z.object({
    order: z.number(),
    show: z.boolean().default(true),
    client: z.string(),
    logo: z.string(),
    sector: z.string(),
    industry: z.string().optional(),
    status: z.string(),
    work: z.array(z.string()),
    solutions: z.array(z.string()).default([]),
    summary: z.string(),
    confidential: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: file('./src/content/faqs.yaml'),
  schema: z.object({ question: z.string(), answer: z.string(), order: z.number() }),
});

export const collections = { solutions, industries, resourceCategories, resources, insights, faqs, engagements };
