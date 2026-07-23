"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import { Post } from "@/lib/posts";

interface NavProps {
  posts?: Post[];
}

export default function Nav({ posts = [] }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-base/70 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex justify-between items-center">
        {/* Left side */}
        <Link
          href="/"
          className="font-serif font-bold text-3xl tracking-tight text-primary transition-colors duration-300 hover:text-accent flex items-baseline gap-1"
        >
          N.
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
        </Link>

        {/* Right side - Search */}
        <div className="flex items-center gap-4">
          <Search posts={posts} />
        </div>
      </div>
    </nav>
  );
}
