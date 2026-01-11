import { AdPlaceholder } from '@/components/ad-placeholder';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';
import { quotes } from '@/lib/quotes';

export default function Home() {
  // To prevent exceeding API rate limits, we'll use a static quote for the "Quote of the Day".
  // This quote is selected from the local library.
  const dailyQuote = quotes[0];

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
