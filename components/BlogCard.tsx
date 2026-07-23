import Link from "next/link";
import React from "react";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  readTimeMinutes: number;
}

export default function BlogCard({
  title,
  date,
  excerpt,
  slug,
  readTimeMinutes,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block p-6 mb-4 rounded-xl border border-border bg-surface/40 backdrop-blur-md group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent/50 hover:bg-elevated/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="font-mono text-xs text-muted font-normal text-left mb-3">
          {new Date(date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="font-serif font-bold text-[24px] text-primary leading-tight mb-3 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        
        <p className="font-sans text-[15px] text-secondary leading-relaxed line-clamp-3 mb-6 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50">
          <div className="flex items-center text-accent text-[12px] font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
            Read Post <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
          </div>
          <div className="font-mono text-[11px] text-muted uppercase tracking-wider">
            {readTimeMinutes} min read
          </div>
        </div>
      </div>
    </Link>
  );
}
