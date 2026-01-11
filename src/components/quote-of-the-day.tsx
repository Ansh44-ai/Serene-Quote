import type { Quote } from '@/lib/quotes';
import { QuoteActions } from './quote-actions';
import { QuoteIcon } from 'lucide-react';

type QuoteOfTheDayProps = {
  quote: Quote;
};

export function QuoteOfTheDay({ quote }: QuoteOfTheDayProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-3xl">
      <div className="relative animate-fade-in-up">
        <QuoteIcon className="absolute -top-4 -left-8 w-12 h-12 text-primary/10" />
        <blockquote className="space-y-6">
          <p className="font-headline text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl leading-tight">
            {quote.text}
          </p>
          <footer className="text-lg text-muted-foreground md:text-xl animate-fade-in-up animation-delay-200">
            — {quote.author}
          </footer>
        </blockquote>
        <QuoteIcon className="absolute -bottom-4 -right-8 w-12 h-12 text-primary/10" />
      </div>
      <div className="animate-fade-in-up animation-delay-400">
        <QuoteActions quote={quote} />
      </div>
    </div>
  );
}
