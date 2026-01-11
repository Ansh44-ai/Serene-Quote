'use client';

import { useState, useEffect } from 'react';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';
import { quotes, type Quote } from '@/lib/quotes';

export default function Home() {
  const [dailyQuote, setDailyQuote] = useState<Quote>(quotes[0]);

  useEffect(() => {
    // Function to pick a new random quote
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setDailyQuote(quotes[randomIndex]);
    };

    // Set an interval to update the quote every 60 seconds (60000 milliseconds)
    const intervalId = setInterval(updateQuote, 60000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <main className="flex flex-1 flex-col">
      <div className="container relative flex flex-1 flex-col items-center justify-center gap-12 py-12 text-center md:py-24">
        <div className="absolute inset-0 -z-10 size-full bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="w-full max-w-4xl">
          <QuoteOfTheDay quote={dailyQuote} />
        </div>
        <div className="w-full max-w-lg">
          <AdPlaceholder />
        </div>
      </div>
    </main>
  );
}
