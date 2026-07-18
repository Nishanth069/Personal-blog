"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[rgba(9,8,12,0.85)] backdrop-blur-[12px] border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex justify-between items-center">
        {/* Left side */}
        <Link
          href="/"
          className="font-serif font-bold text-[28px] text-primary transition-colors duration-200 hover:text-accent"
        >
          N.
        </Link>

        {/* Right side - decorative dot */}
        <div className="w-2 h-2 rounded-full bg-accent opacity-90" aria-hidden="true" />
      </div>
    </nav>
  );
}
