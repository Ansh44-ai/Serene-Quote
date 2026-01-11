"use client";

import type { Quote } from "@/lib/quotes";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { QuoteActions } from "./quote-actions";
import { QuoteIcon } from "lucide-react";

type QuoteCardProps = {
  quote: Quote;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6 relative">
        <QuoteIcon className="absolute top-4 right-4 w-10 h-10 text-primary/5" />
        <blockquote className="space-y-4">
          <p className="font-headline text-xl font-medium leading-relaxed">“{quote.text}”</p>
        </blockquote>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground font-medium">— {quote.author}</p>
        <QuoteActions quote={quote} />
      </CardFooter>
    </Card>
  );
}
