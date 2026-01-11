"use client";

import type { Quote } from "@/lib/quotes";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { QuoteActions } from "./quote-actions";

type QuoteCardProps = {
  quote: Quote;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <blockquote className="space-y-4">
          <p className="font-headline text-xl font-medium">“{quote.text}”</p>
        </blockquote>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">— {quote.author}</p>
        <QuoteActions quote={quote} />
      </CardFooter>
    </Card>
  );
}
