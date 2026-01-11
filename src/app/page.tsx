import { AdPlaceholder } from '@/components/ad-placeholder';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';
import { quotes } from '@/lib/quotes';

export default function Home() {
  // To prevent exceeding API rate limits, we'll use a static quote for the "Quote of the Day".
  // This quote is selected from the local library.
  const dailyQuote = quotes[0];

  return (
    <main className="flex flex-1 flex-col">
       <div className="container relative grid flex-1 grid-cols-1 md:grid-cols-3 items-center justify-center py-12 text-center md:py-24">
        <div className="absolute inset-0 -z-10 size-full bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="md:col-span-2">
            <QuoteOfTheDay quote={dailyQuote} />
        </div>
        <div className="hidden md:flex justify-center">
            <div className="w-full max-w-[300px]">
                 <AdPlaceholder />
            </div>
        </div>
      </div>
    </main>
  );
}
