import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calcReadTime } from "./format";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTimeMinutes: number;
}

export interface PostDetail extends Post {
  body: string;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);
      const { title, date, excerpt } = matterResult.data;

      return {
        slug,
        title: title || slug,
        date: date || new Date().toISOString(),
        excerpt: excerpt || "",
        readTimeMinutes: calcReadTime(matterResult.content),
      };
    });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  
  const { title, date, excerpt } = matterResult.data;

  return {
    slug,
    title: title || slug,
    date: date || new Date().toISOString(),
    excerpt: excerpt || "",
    readTimeMinutes: calcReadTime(matterResult.content),
    body: matterResult.content,
  };
}
