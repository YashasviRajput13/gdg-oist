/**
 * Converts Google Drive sharing URLs to direct image URLs.
 * Supports formats:
 *   - https://drive.google.com/file/d/FILE_ID/view?...
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/uc?id=FILE_ID&...
 * Returns the original URL if it's not a Drive link.
 */
export function toDirectImageUrl(url: string): string {
  if (!url) return url;

  // Already a direct lh3 link
  if (url.includes("lh3.googleusercontent.com")) return url;

  // Extract file ID from /file/d/ID/
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }

  // Extract file ID from ?id=ID
  const idMatch = url.match(/drive\.google\.com\/(?:open|uc)\?.*id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  return url;
}
