'use client';

import {useState, useEffect} from 'react';
import {generateQuote} from '@/ai/flows/quote-flow';
import type { QuoteResponse } from '@/ai/schemas/quote-schema';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {QuoteCard} from '@/components/quote-card';
import {Sparkles} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

const COOLDOWN_SECONDS = 10;

export default function GeneratePage() {
  const [topic, setTopic] = useState('inspiration');
  const [generatedQuote, setGeneratedQuote] = useState<QuoteResponse & { id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);


  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedQuote(null);
    try {
      const quote = await generateQuote(topic);
      setGeneratedQuote({ ...quote, id: uuidv4() });
      setCooldown(COOLDOWN_SECONDS); // Start cooldown
    } catch (error: any) {
      console.error('Failed to generate quote:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Could not generate a quote. Please try again later.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || cooldown > 0;

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
              disabled={isButtonDisabled}
            />
            <Button onClick={handleGenerate} disabled={isButtonDisabled} className="w-[140px]">
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? 'Generating...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Generate'}
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
                  id: generatedQuote.id,
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
