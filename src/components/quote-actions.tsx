"use client";

import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import type { Quote } from "@/lib/quotes";
import { cn } from "@/lib/utils";

type QuoteActionsProps = {
  quote: Quote;
};

export function QuoteActions({ quote }: QuoteActionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const favorite = isFavorite(quote.id);

  const handleShare = async () => {
    const shareData = {
      title: "SereneQuote",
      text: `"${quote.text}" — ${quote.author}`,
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Copied to clipboard!",
          description: "You can now share the quote.",
        });
      } catch (copyErr) {
        toast({
          variant: "destructive",
          title: "Sharing failed",
          description: "Could not share or copy the quote.",
        });
      }
    }
  };

  const handleFavorite = () => {
    if (quote.isGenerated && !favorite) {
       // For generated quotes, we might need a different favorite handling if they don't have a persistent ID
    }
    toggleFavorite(quote);
    toast({
      title: favorite ? "Removed from favorites" : "Saved to favorites!",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Save to favorites"
        onClick={handleFavorite}
      >
        <Heart
          className={cn(
            "transition-all",
            favorite ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Share quote"
        onClick={handleShare}
      >
        <Share2 className="text-muted-foreground" />
      </Button>
    </div>
  );
}
