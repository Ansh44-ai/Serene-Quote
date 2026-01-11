'use client';

import {useState} from 'react';
import { quotes } from '@/lib/quotes';
import type { Quote } from '@/lib/quotes';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {QuoteCard} from '@/components/quote-card';
import {Sparkles} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export default function GeneratePage() {
  const [topic, setTopic] = useState('inspiration');
  const [generatedQuote, setGeneratedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedQuote(null);

    // Simulate a short delay for a better user experience
    setTimeout(() => {
        try {
            // Get a random quote from the local library
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];

            // Use the existing quote data
            setGeneratedQuote({ 
                ...randomQuote, 
                id: uuidv4(), // Assign a new unique ID for React key prop
                isGenerated: true 
            });

        } catch (error: any) {
            console.error('Failed to generate quote:', error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "Could not retrieve a quote. Please try again later.",
            })
        } finally {
            setIsLoading(false);
        }
    }, 500); // 500ms delay
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
              disabled={isLoading}
            />
            <Button onClick={handleGenerate} disabled={isLoading} className="w-[140px]">
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          {isLoading && !generatedQuote && (
            <div className="w-full max-w-md">
                 <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-muted-foreground">Finding inspiration...</p>
                 </div>
            </div>
          )}
          {generatedQuote && (
            <div className="w-full max-w-md">
              <QuoteCard
                quote={generatedQuote}
                quoteId={generatedQuote.id}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
