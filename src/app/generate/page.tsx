'use client';

import {useState} from 'react';
import {generateQuote} from '@/ai/flows/quote-flow';
import type { QuoteResponse } from '@/ai/schemas/quote-schema';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {QuoteCard} from '@/components/quote-card';
import {Sparkles} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

export default function GeneratePage() {
  const [topic, setTopic] = useState('inspiration');
  const [generatedQuote, setGeneratedQuote] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedQuote(null);
    try {
      const quote = await generateQuote(topic);
      setGeneratedQuote(quote);
    } catch (error) {
      console.error('Failed to generate quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Generate a Quote
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            What topic would you like a quote for?
          </p>
        </div>
        <div className="mx-auto max-w-md">
          <div className="flex gap-2">
            <Input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. success, happiness, etc."
              className="flex-1"
            />
            <Button onClick={handleGenerate} disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          {isLoading && (
            <div className="w-full max-w-md">
              <Skeleton className="h-48 rounded-lg" />
            </div>
          )}
          {generatedQuote && (
            <div className="w-full max-w-md">
              <QuoteCard
                quote={{
                  id: Date.now(),
                  text: generatedQuote.quote,
                  author: generatedQuote.author,
                  isGenerated: true,
                }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
