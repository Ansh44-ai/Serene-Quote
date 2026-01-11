import { quotes } from '@/lib/quotes';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';

export default function Home() {
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();
  const dailyQuote = quotes[dayOfYear % quotes.length];

  return (
    <main className="flex flex-1 flex-col">
      <div className="container flex flex-1 items-center justify-center py-12 md:py-24">
        <QuoteOfTheDay quote={dailyQuote} />
      </div>
    </main>
  );
}
