import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: any; // We'll handle if it's a string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // If the body is coming back as Tina's rich text AST instead of raw string,
  // we fallback to empty or stringify (though ideally we use TinaMarkdown for ASTs)
  // For the purpose of this implementation using react-markdown, we expect a string.
  const source = typeof content === "string" ? content : "";

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="font-serif font-semibold text-primary mt-[48px] mb-[16px] text-4xl"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="font-serif font-semibold text-primary mt-[48px] mb-[16px] text-3xl"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="font-serif font-semibold text-primary mt-[48px] mb-[16px] text-2xl"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            className="font-sans font-normal text-[18px] text-secondary leading-[1.8] mb-[1.5em]"
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-[3px] border-accent pl-[20px] font-serif italic text-[1.2em] text-primary my-[2em]"
            {...props}
          />
        ),
        strong: ({ node, ...props }) => (
          <strong className="text-primary font-semibold" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="font-serif italic text-[1.05em]" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                className="font-mono text-[0.85em] bg-elevated px-[6px] py-[2px] rounded-[3px] text-accent"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="font-mono text-[0.85em] bg-elevated p-4 rounded-md text-secondary block overflow-x-auto"
              {...props}
            >
              {children}
            </code>
          );
        },
        hr: ({ node, ...props }) => (
          <hr className="border-0 border-t border-border my-[3em]" {...props} />
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
