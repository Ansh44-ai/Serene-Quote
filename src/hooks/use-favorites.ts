"use client";

import { useState, useEffect, useCallback } from "react";
import type { Quote } from "@/lib/quotes";

const FAVORITES_KEY = "serene-quote-favorites";

export function useFavorites() {
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavoriteQuotes(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteQuotes));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favoriteQuotes, isLoaded]);

  const isFavorite = useCallback(
    (quoteId: number) => {
      return favoriteQuotes.some((q) => q.id === quoteId);
    },
    [favoriteQuotes]
  );

  const toggleFavorite = useCallback(
    (quote: Quote) => {
      setFavoriteQuotes((prevFavorites) => {
        const isCurrentlyFavorite = prevFavorites.some((q) => q.id === quote.id);
        if (isCurrentlyFavorite) {
          return prevFavorites.filter((q) => q.id !== quote.id);
        } else {
          const newFavorite = { ...quote };
          if (quote.isGenerated && !prevFavorites.some(q => q.id === quote.id)) {
            // Ensure unique ID for generated quotes if they share a timestamp ID
            newFavorite.id = Date.now() + Math.random();
          }
          return [...prevFavorites, newFavorite];
        }
      });
    },
    []
  );

  return { favoriteQuotes, toggleFavorite, isFavorite, isLoaded };
}
