"use client";

interface AmbientGlowProps {
  className?: string;
}

export default function AmbientGlow({ className = "" }: AmbientGlowProps) {
  return (
    <div
      className={`absolute w-[600px] h-[600px] top-[-100px] left-1/2 -translate-x-1/2 rounded-full blur-[80px] pointer-events-none z-0 ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(200,146,42,0.15) 0%, rgba(200,146,42,0.05) 40%, transparent 70%)",
        animation: "drift 20s ease-in-out infinite alternate",
      }}
      aria-hidden="true"
    />
  );
}
