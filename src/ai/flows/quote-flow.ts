'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { QuoteSchema } from '@/ai/schemas/quote-schema';


const quoteOfTheDayFlow = ai.defineFlow(
  {
    name: 'quoteOfTheDayFlow',
    inputSchema: z.string().describe('The theme of the quote'),
    outputSchema: QuoteSchema,
  },
  async (theme) => {
    const {output} = await ai.generate({
      prompt: `Generate a short, insightful quote about ${theme}.`,
      output: {
        schema: QuoteSchema,
      },
    });
    return output!;
  }
);

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    inputSchema: z.string().describe('The theme of the quote'),
    outputSchema: QuoteSchema,
  },
  async (theme) => {
    const {output} = await ai.generate({
      prompt: `Generate a short, insightful quote about ${theme}.`,
      output: {
        schema: QuoteSchema,
      },
    });
    return output!;
  }
);


export async function quoteOfTheDay(theme: string) {
    return await quoteOfTheDayFlow(theme);
}

export async function generateQuote(theme: string) {
    return await generateQuoteFlow(theme);
}
