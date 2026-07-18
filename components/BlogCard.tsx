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
      className="block py-[28px] border-t border-border bg-transparent group transition-all duration-200 ease-in-out border-l-2 border-transparent pl-0 hover:border-accent hover:pl-4"
    >
      <div className="font-sans text-[13px] text-muted font-normal text-left">
        {date}
      </div>
      
      <h3 className="font-serif font-semibold text-[22px] text-primary leading-[1.2] mt-[8px] mb-[10px] group-hover:text-accent transition-colors duration-200">
        {title}
      </h3>
      
      <p className="font-sans text-[15px] text-secondary leading-[1.65] line-clamp-2 mb-4">
        {excerpt}
      </p>
      
      <div className="flex justify-between items-center">
        <div /> {/* Left empty space for balance */}
        <div className="font-sans text-[12px] text-accent uppercase tracking-[0.05em]">
          {readTimeMinutes} min read
        </div>
      </div>
    </Link>
  );
}
