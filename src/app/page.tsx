import { quoteOfTheDay } from '@/ai/flows/quote-flow';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';

export default async function Home() {
  const generatedQuote = await quoteOfTheDay('inspiration');

  const dailyQuote = {
    id: new Date().setHours(0, 0, 0, 0), // Unique ID for the day
    text: generatedQuote.quote,
    author: generatedQuote.author,
    isGenerated: true,
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="container flex flex-1 items-center justify-center py-12 md:py-24">
        <QuoteOfTheDay quote={dailyQuote} />
      </div>
    </main>
  );
}
