import { quoteOfTheDay } from '@/ai/flows/quote-flow';
import { QuoteOfTheDay } from '@/components/quote-of-the-day';
import { v4 as uuidv4 } from 'uuid';

export default async function Home() {
  const generatedQuote = await quoteOfTheDay('inspiration');

  const dailyQuote = {
    id: uuidv4(), // Unique ID for each render
    text: generatedQuote.quote,
    author: generatedQuote.author,
    isGenerated: true,
  };

  return (
    <main className="flex flex-1 flex-col">
       <div className="container relative flex flex-1 flex-col items-center justify-center py-12 text-center md:py-24">
        <div className="absolute inset-0 -z-10 size-full bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <QuoteOfTheDay quote={dailyQuote} />
      </div>
    </main>
  );
}
