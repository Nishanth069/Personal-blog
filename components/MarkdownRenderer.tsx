import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string; // Changed from any to string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const source = typeof content === "string" ? content : "";

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="font-serif font-bold text-primary mt-14 mb-6 text-4xl leading-tight"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="font-serif font-bold text-primary mt-12 mb-5 text-3xl leading-tight"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="font-serif font-bold text-primary mt-10 mb-4 text-2xl leading-tight"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            className="font-sans font-normal text-[17px] text-secondary leading-relaxed mb-6"
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-accent pl-6 py-1 font-serif italic text-xl text-primary my-8 bg-surface/30 rounded-r-lg"
            {...props}
          />
        ),
        strong: ({ node, ...props }) => (
          <strong className="text-primary font-semibold" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="font-serif italic text-lg" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-outside pl-6 mb-6 space-y-2 font-sans text-[17px] text-secondary" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 font-sans text-[17px] text-secondary" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="pl-1" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-accent hover:text-accent-hover underline decoration-accent/30 underline-offset-4 transition-colors" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
          if (inline) {
            return (
              <code
                className="font-mono text-[0.85em] bg-elevated px-1.5 py-0.5 rounded text-accent border border-border/50"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <div className="my-8 rounded-xl overflow-hidden border border-border/50 shadow-xl">
              <code
                className="font-mono text-sm bg-[#0d0d0d] p-5 text-secondary block overflow-x-auto leading-relaxed"
                {...props}
              >
                {children}
              </code>
            </div>
          );
        },
        hr: ({ node, ...props }) => (
          <hr className="border-0 border-t border-border/60 my-12" {...props} />
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
