import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Footer from "@/components/Footer";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // To find prev/next posts
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  
  // Since posts are sorted descending (newest first):
  // currentIndex + 1 is an older post (Previous)
  // currentIndex - 1 is a newer post (Next)
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <main className="min-h-screen">
      <article>
        {/* POST HEADER section */}
        <header className="max-w-[720px] mx-auto px-4 sm:px-6 pt-[120px]">
          {/* Top Navigation */}
          <Link
            href="/"
            className="inline-block font-sans text-[14px] text-secondary hover:text-accent transition-colors duration-200 mb-[48px]"
          >
            ← All posts
          </Link>

          <div className="font-sans text-[13px] text-muted uppercase tracking-[0.1em]">
            {formatDate(post.date)}
          </div>
          
          <h1 className="font-serif font-bold italic text-[clamp(36px,6vw,72px)] text-primary leading-[1.05] tracking-[-0.025em] mt-4 mb-6">
            {post.title}
          </h1>
          
          <div className="font-sans text-[13px] text-accent">
            {post.readTimeMinutes} min read
          </div>
          
          <div className="border-t border-border mt-[24px] mb-[48px]" />
        </header>

        {/* BODY content */}
        <section className="max-w-[680px] mx-auto px-4 sm:px-6 pb-[120px]">
          <MarkdownRenderer content={post.body} />
        </section>

        {/* POST FOOTER nav */}
        <nav className="max-w-[720px] mx-auto px-4 sm:px-6 pb-[80px]">
          <div className="border-t border-border mb-[40px]" />
          
          <div className="flex justify-between items-center">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="font-serif font-semibold text-[17px] text-secondary hover:text-accent transition-colors duration-200"
              >
                ← {previousPost.title}
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="font-serif font-semibold text-[17px] text-secondary hover:text-accent transition-colors duration-200 text-right"
              >
                {nextPost.title} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>

      <Footer />
    </main>
  );
}
