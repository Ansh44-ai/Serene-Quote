import { quotes } from '@/lib/quotes';
import { QuoteCard } from '@/components/quote-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Library | SereneQuote',
  description: 'Browse our collection of inspirational quotes.',
};

export default function LibraryPage() {
  return (
    <main className="flex-1">
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Quote Library
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our collection of past quotes for a dose of inspiration.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </section>
    </main>
  );
}
