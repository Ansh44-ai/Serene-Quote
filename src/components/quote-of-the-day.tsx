import type { Quote } from '@/lib/quotes';
import { QuoteActions } from './quote-actions';

type QuoteOfTheDayProps = {
  quote: Quote;
};

export function QuoteOfTheDay({ quote }: QuoteOfTheDayProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-3xl animate-fade-in-up">
      <blockquote className="space-y-4">
        <p className="font-headline text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
          “{quote.text}”
        </p>
        <footer className="text-lg text-muted-foreground md:text-xl">
          — {quote.author}
        </footer>
      </blockquote>
      <QuoteActions quote={quote} />
    </div>
  );
}
