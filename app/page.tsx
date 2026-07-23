import type { Metadata } from "next";
import AmbientGlow from "@/components/AmbientGlow";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Nishanth — Journal",
  description: "Personal writing by Nishanth.",
};

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-[140px] pb-[80px]">
          <AmbientGlow />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <span className="block font-sans text-[12px] text-accent uppercase tracking-[0.15em] fade-up">
              Personal Journal
            </span>
            <h1 className="font-serif font-bold italic text-[clamp(48px,8vw,96px)] text-primary leading-none tracking-[-0.03em] mt-3 fade-up">
              Thinking out loud.
            </h1>
            <p className="font-sans text-[18px] text-secondary max-w-[480px] mt-5 leading-[1.6] fade-up">
              Words from the work, the process, and everything in between.
            </p>
          </div>
        </section>

        {/* POSTS SECTION */}
        <section className="max-w-[720px] mx-auto px-4 sm:px-6 pb-[120px]">
          <h2 className="font-sans font-medium text-[11px] text-muted uppercase tracking-[0.2em] mb-2">
            ALL POSTS
          </h2>
          <div className="border-b border-accent w-8 mb-10" />

          {posts.length > 0 ? (
            <div className="flex flex-col">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={formatDate(post.date)}
                  excerpt={post.excerpt}
                  readTimeMinutes={post.readTimeMinutes}
                />
              ))}
            </div>
          ) : (
            <p className="text-center font-serif italic text-muted text-[18px] mt-20">
              Nothing here yet.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
