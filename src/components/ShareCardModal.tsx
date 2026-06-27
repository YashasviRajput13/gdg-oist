import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check, Link, ExternalLink } from "lucide-react";

const SITE_URL = "https://gdg-oist.vercel.app/";

const SHARE_CAPTION = `I'm building with GDG OIST 🚀

Just created my GDG OIST Community Card — a small badge for everyone learning, building, and growing with the community.

Create yours here:
${SITE_URL}

#GDGOIST #GDGOnCampus #BuildWithGDG #OISTBhopal`;

const LINKEDIN_SHARE_URL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;

interface ShareCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The generated PNG blob/file for native sharing */
  cardFile: File | null;
  /** The user's name for the filename */
  cardName: string;
}

type CopiedKey = "caption" | "link" | null;

const ShareCardModal = ({
  open,
  onOpenChange,
  cardFile,
  cardName,
}: ShareCardModalProps) => {
  const [copied, setCopied] = useState<CopiedKey>(null);
  const [linkedInHint, setLinkedInHint] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string, key: CopiedKey) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      }
    },
    []
  );

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;

    const shareData: ShareData = {
      title: "My GDG OIST Community Card",
      text: SHARE_CAPTION,
      url: SITE_URL,
    };

    // Try sharing with the file if supported
    if (cardFile && navigator.canShare) {
      const fileShareData = { ...shareData, files: [cardFile] };
      try {
        if (navigator.canShare(fileShareData)) {
          await navigator.share(fileShareData);
          return;
        }
      } catch {
        // File sharing failed, fall through to text-only
      }
    }

    // Fallback: text + URL only
    try {
      await navigator.share(shareData);
    } catch {
      // User cancelled or share failed — silently ignore
    }
  }, [cardFile]);

  const handleLinkedIn = useCallback(async () => {
    await copyToClipboard(SHARE_CAPTION, "caption");
    setLinkedInHint(true);
    setTimeout(() => setLinkedInHint(false), 5000);
    window.open(LINKEDIN_SHARE_URL, "_blank", "noopener,noreferrer");
  }, [copyToClipboard]);

  const handleX = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CAPTION)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleWhatsApp = useCallback(() => {
    const url = `https://wa.me/?text=${encodeURIComponent(SHARE_CAPTION)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const supportsNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/40 bg-card/95 backdrop-blur-xl rounded-2xl">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <span className="text-2xl">🎉</span> Your card is ready!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            Share your GDG OIST journey and invite others to build with the
            community.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2.5 mt-2">
          {/* Native Share */}
          {supportsNativeShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/40 bg-background/60 hover:bg-accent/10 transition-colors text-left group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(var(--google-blue))] to-[hsl(var(--google-green))] text-white shrink-0">
                <Share2 size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground">
                  Share
                </span>
                <p className="text-xs text-muted-foreground">
                  {cardFile ? "Share card image with caption" : "Share via your device"}
                </p>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              />
            </button>
          )}

          {/* LinkedIn */}
          <button
            onClick={handleLinkedIn}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/40 bg-background/60 hover:bg-accent/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg text-white shrink-0" style={{ background: "#0A66C2" }}>
              {/* LinkedIn SVG icon — inline to avoid adding a dependency */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                Share on LinkedIn
              </span>
              <p className="text-xs text-muted-foreground">
                {linkedInHint
                  ? "Caption copied — upload your downloaded card and paste the caption."
                  : "Caption will be copied to clipboard"}
              </p>
            </div>
            <ExternalLink
              size={14}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            />
          </button>

          {/* X / Twitter */}
          <button
            onClick={handleX}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/40 bg-background/60 hover:bg-accent/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-foreground text-background shrink-0">
              {/* X (Twitter) SVG icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                Share on X
              </span>
              <p className="text-xs text-muted-foreground">
                Post with prefilled caption
              </p>
            </div>
            <ExternalLink
              size={14}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            />
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/40 bg-background/60 hover:bg-accent/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg text-white shrink-0" style={{ background: "#25D366" }}>
              {/* WhatsApp SVG icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                Share on WhatsApp
              </span>
              <p className="text-xs text-muted-foreground">
                Send with prefilled message
              </p>
            </div>
            <ExternalLink
              size={14}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            />
          </button>

          {/* Divider */}
          <div className="border-t border-border/30 my-1" />

          {/* Copy Caption */}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(SHARE_CAPTION, "caption")}
              className="rounded-xl border-border/40 bg-background/60 hover:bg-accent/10 h-auto py-3"
            >
              {copied === "caption" ? (
                <Check size={16} className="text-[hsl(var(--google-green))]" />
              ) : (
                <Copy size={16} />
              )}
              <span className="text-sm font-medium">
                {copied === "caption" ? "Copied!" : "Copy Caption"}
              </span>
            </Button>

            {/* Copy Link */}
            <Button
              variant="outline"
              onClick={() => copyToClipboard(SITE_URL, "link")}
              className="rounded-xl border-border/40 bg-background/60 hover:bg-accent/10 h-auto py-3"
            >
              {copied === "link" ? (
                <Check size={16} className="text-[hsl(var(--google-green))]" />
              ) : (
                <Link size={16} />
              )}
              <span className="text-sm font-medium">
                {copied === "link" ? "Copied!" : "Copy Link"}
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCardModal;
