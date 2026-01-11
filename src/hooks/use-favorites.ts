
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Quote } from "@/lib/quotes";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_FAVORITES_KEY = "serene-quote-favorites";

// Define a type for a favorite quote stored in Firestore.
// It includes a required 'id' (string) and the original quote data.
type FavoriteQuote = Quote & {
  id: string; 
  dateFavorited: any;
};

export function useFavorites() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // State for local favorites, used by anonymous users.
  const [localFavorites, setLocalFavorites] = useState<Quote[]>([]);
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);

  // Memoize the query to prevent re-renders. This is critical for performance.
  const favoritesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/favoriteQuotes`);
  }, [firestore, user]);

  // `useCollection` hook to get real-time favorite quotes from Firestore.
  const { data: firestoreFavorites, isLoading: isFirestoreLoading } = useCollection<FavoriteQuote>(favoritesQuery);

  // Load local favorites from localStorage on initial render.
  useEffect(() => {
    if (!user) { // Only load from localStorage if the user is not logged in.
      try {
        const item = window.localStorage.getItem(LOCAL_FAVORITES_KEY);
        if (item) {
          setLocalFavorites(JSON.parse(item));
        }
      } catch (error) {
        console.error("Failed to load local favorites:", error);
      } finally {
        setIsLocalLoaded(true);
      }
    } else {
      // Clear local state if a user is logged in, as we'll use Firestore.
      setLocalFavorites([]);
      setIsLocalLoaded(true); // Mark as loaded even for logged-in users.
    }
  }, [user]);

  // Persist local favorites to localStorage whenever they change.
  useEffect(() => {
    if (!user && isLocalLoaded) {
      try {
        window.localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(localFavorites));
      } catch (error) {
        console.error("Failed to save local favorites:", error);
      }
    }
  }, [localFavorites, user, isLocalLoaded]);

  const favoriteQuotes = user ? (firestoreFavorites || []) : localFavorites;
  const isLoaded = user ? !isFirestoreLoading : isLocalLoaded;
  
  // Checks if a quote is in the favorites list.
  const isFavorite = useCallback(
    (quoteId: string | number) => {
      // The `id` from `lib/quotes` is a number, firestore IDs are strings.
      // Firestore `favoriteQuotes` documents have an internal `quoteId` field.
      if (user) {
        return (firestoreFavorites || []).some(fav => fav.quoteId === quoteId);
      }
      return localFavorites.some((q) => q.id === quoteId);
    },
    [firestoreFavorites, localFavorites, user]
  );
  
  // Toggles a quote's favorite status.
  const toggleFavorite = useCallback(
    (quote: Quote) => {
      if (user && firestore) {
        // Find if the quote is already a favorite in Firestore.
        const existingFavorite = (firestoreFavorites || []).find(fav => fav.quoteId === quote.id);
        
        if (existingFavorite) {
          // If it exists, delete it from Firestore.
          const docRef = doc(firestore, `users/${user.uid}/favoriteQuotes`, existingFavorite.id);
          deleteDocumentNonBlocking(docRef);
        } else {
          // If it doesn't exist, add it to Firestore.
          const favoritesCol = collection(firestore, `users/${user.uid}/favoriteQuotes`);
          const favoriteQuoteData = {
              userId: user.uid, // Add this line
              quoteId: quote.id,
              text: quote.text,
              author: quote.author,
              dateFavorited: serverTimestamp(),
          };
          addDocumentNonBlocking(favoritesCol, favoriteQuoteData);
        }
      } else {
        // Handle local storage for anonymous users.
        setLocalFavorites((prev) => {
          const isCurrentlyFavorite = prev.some((q) => q.id === quote.id);
          if (isCurrentlyFavorite) {
            return prev.filter((q) => q.id !== quote.id);
          } else {
            return [...prev, quote];
          }
        });
      }
    },
    [user, firestore, firestoreFavorites]
  );
  
  return { favoriteQuotes, isFavorite, toggleFavorite, isLoaded };
}
