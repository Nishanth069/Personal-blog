export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calcReadTime(content: string): number {
  if (!content) return 1;
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / 200);
}
