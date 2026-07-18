import client from "@/tina/__generated__/client";
import { calcReadTime } from "./format";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTimeMinutes: number;
}

export interface PostDetail extends Post {
  body: any;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsResponse = await client.queries.postConnection({
      sort: "date",
    });

    const posts = postsResponse.data.postConnection.edges?.map((edge) => {
      const node = edge?.node;
      if (!node) return null;

      // Calculate read time based on raw text or stringified rich-text AST
      const rawText = typeof node.body === "string" ? node.body : JSON.stringify(node.body || "");

      return {
        slug: node._sys.filename,
        title: node.title,
        date: node.date,
        excerpt: node.excerpt || "",
        readTimeMinutes: calcReadTime(rawText),
      };
    }).filter(Boolean) as Post[];

    // Sort descending (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const response = await client.queries.post({ relativePath: `${slug}.md` });
    const node = response.data.post;

    if (!node) return null;

    const rawText = typeof node.body === "string" ? node.body : JSON.stringify(node.body || "");

    return {
      slug: node._sys.filename,
      title: node.title,
      date: node.date,
      excerpt: node.excerpt || "",
      readTimeMinutes: calcReadTime(rawText),
      body: node.body,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}
