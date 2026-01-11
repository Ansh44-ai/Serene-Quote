"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { QuoteCard } from "@/components/quote-card";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoritesPage() {
  const { favoriteQuotes, isLoaded } = useFavorites();

  const renderContent = () => {
    if (!isLoaded) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      );
    }

    if (favoriteQuotes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-12 text-center h-[400px]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
             <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 font-headline text-2xl font-semibold">No favorites yet</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Save your favorite quotes to see them here.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteQuotes.slice().reverse().map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    );
  };

  return (
    <main className="flex-1">
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Favorite Quotes
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your personal collection of inspiring words.
          </p>
        </div>
        {renderContent()}
      </section>
    </main>
  );
}
