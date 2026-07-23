import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
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

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <main className="min-h-screen pt-20">
      <article className="fade-up">
        {/* POST HEADER section */}
        <header className="max-w-[720px] mx-auto px-4 sm:px-6 pt-16">
          <Link
            href="/"
            className="inline-flex items-center font-mono text-[12px] text-secondary hover:text-accent transition-colors duration-300 mb-12 uppercase tracking-[0.2em] group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300 mr-2">←</span> Back Home
          </Link>

          <div className="font-mono text-[13px] text-muted uppercase tracking-[0.1em]">
            {new Date(post.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          
          <h1 className="font-serif font-bold italic text-[clamp(40px,7vw,80px)] text-primary leading-[1.1] tracking-[-0.02em] mt-5 mb-6">
            {post.title}
          </h1>
          
          <div className="font-mono text-[13px] text-accent uppercase tracking-widest">
            {post.readTimeMinutes} min read
          </div>
          
          <div className="border-t border-border/60 mt-10 mb-12" />
        </header>

        {/* BODY content */}
        <section className="max-w-[680px] mx-auto px-4 sm:px-6 pb-24">
          <MarkdownRenderer content={post.body} />
        </section>

        {/* POST FOOTER nav */}
        <nav className="max-w-[720px] mx-auto px-4 sm:px-6 pb-20">
          <div className="border-t border-border/60 mb-10" />
          
          <div className="flex justify-between items-center">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="font-serif font-semibold text-[18px] text-secondary hover:text-accent transition-colors duration-300 group flex items-center"
              >
                <span className="mr-3 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all">←</span> 
                {previousPost.title}
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="font-serif font-semibold text-[18px] text-secondary hover:text-accent transition-colors duration-300 text-right group flex items-center"
              >
                {nextPost.title}
                <span className="ml-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
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
