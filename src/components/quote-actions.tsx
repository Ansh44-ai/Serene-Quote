"use client";

import { Heart, Share2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import type { Quote } from "@/lib/quotes";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";

type QuoteActionsProps = {
  quote: Quote;
};

export function QuoteActions({ quote }: QuoteActionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  // Use the quote's original ID for checking favorite status.
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
    if (isUserLoading) return; // Prevent action while auth state is loading

    if (!user) {
      // Guest user, use local storage.
      toggleFavorite(quote);
      toast({
        title: favorite ? "Removed from favorites" : "Saved to favorites!",
        description: "Your favorites are saved on this device.",
      });
    } else {
      // Logged-in user, use Firestore.
      toggleFavorite(quote);
      toast({
        title: favorite ? "Removed from favorites" : "Saved to your account!",
      });
    }
  };

  if (isUserLoading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />;
  }

  // If user is not logged in, show a prompt to log in for certain actions
  const LoginPrompt = () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
        <LogIn className="mr-2 h-4 w-4" />
        Log in to save
      </Button>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
       <Button
        variant="ghost"
        size="icon"
        aria-label="Save to favorites"
        onClick={handleFavorite}
        disabled={isUserLoading}
      >
        <Heart
          className={cn(
            "transition-all",
            favorite ? "fill-accent text-accent" : "text-muted-foreground"
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
