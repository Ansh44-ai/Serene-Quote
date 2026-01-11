"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { QuoteCard } from "@/components/quote-card";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/firebase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function FavoritesPage() {
  const { user, isUserLoading } = useUser();
  const { favoriteQuotes, isLoaded } = useFavorites();

  const renderContent = () => {
    // Show loading skeleton while user or favorites data is loading.
    if (isUserLoading || !isLoaded) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      );
    }
    
    // If user is not logged in and has no local favorites.
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-12 text-center h-[400px]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
                    <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="mt-6 font-headline text-2xl font-semibold">Log in to see your favorites</h2>
                <p className="mt-2 text-center text-muted-foreground">
                    Create an account to save quotes and access them from anywhere.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/login">Log In</Link>
                </Button>
            </div>
        );
    }

    // If user is logged in but has no favorites.
    if (user && favoriteQuotes.length === 0) {
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

    // Display the list of favorite quotes.
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteQuotes.slice(0, 5).reverse().map((fav) => (
            <QuoteCard key={fav.id} quote={fav} quoteId={fav.quoteId} />
        ))}
         <div className="sm:col-span-2 lg:col-span-1">
            <AdPlaceholder />
        </div>
        {favoriteQuotes.slice(5).reverse().map((fav) => (
            <QuoteCard key={fav.id} quote={fav} quoteId={fav.quoteId} />
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
            {user ? "Your personal collection of inspiring words." : "Log in to build your collection."}
          </p>
        </div>
        {renderContent()}
      </section>
    </main>
  );
}
