import { env } from "@/lib/env";

interface SearchResult {
  resources: { public_id: string; secure_url: string }[];
  next_cursor?: string;
}

interface SearchOptions {
  expression: string;
  sort_by?: { key: string; direction: "asc" | "desc" }[];
  max_results?: number;
  next_cursor?: string;
}

async function search(options: SearchOptions): Promise<SearchResult> {
  const credentials = btoa(`${env.cloudinaryApiKey}:${env.cloudinaryApiSecret}`);
  const url = `https://api.cloudinary.com/v1_1/${env.cloudinaryCloudName}/resources/search`;

  const body: Record<string, unknown> = {
    expression: options.expression,
    max_results: options.max_results ?? 500,
  };

  if (options.sort_by) {
    body.sort_by = options.sort_by.map(({ key, direction }) => ({ [key]: direction }));
  }

  if (options.next_cursor) {
    body.next_cursor = options.next_cursor;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudinary search failed: ${error}`);
  }

  return response.json() as Promise<SearchResult>;
}

const cloudinaryClient = { search };

export default cloudinaryClient;
