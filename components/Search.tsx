"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search as SearchIcon, X, Command } from "lucide-react";
import { Post } from "@/lib/posts";

interface SearchProps {
  posts: Post[];
}

export default function Search({ posts }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle with Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const filteredPosts = query
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-surface/50 hover:bg-elevated hover:border-border transition-all duration-200 text-secondary hover:text-primary group"
      >
        <SearchIcon className="w-4 h-4 group-hover:text-accent transition-colors" />
        <span className="text-[13px] font-sans">Search</span>
        <div className="hidden sm:flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded border border-border/50 bg-base text-[10px] font-mono text-muted">
          <Command className="w-3 h-3" />K
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-[600px] bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col fade-up">
            <div className="flex items-center px-4 py-3 border-b border-border">
              <SearchIcon className="w-5 h-5 text-muted mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search posts..."
                className="flex-1 bg-transparent border-none outline-none text-primary placeholder-muted font-sans text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-elevated text-muted hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query === "" ? (
                <div className="px-4 py-8 text-center text-sm text-muted font-sans">
                  Type to start searching...
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-xl hover:bg-elevated transition-colors group"
                    >
                      <h4 className="font-serif font-semibold text-primary group-hover:text-accent mb-1">
                        {post.title}
                      </h4>
                      <p className="text-sm text-secondary line-clamp-1 font-sans">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-muted font-sans">
                  No posts found for &quot;{query}&quot;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
