import {z} from 'genkit';

export const QuoteSchema = z.object({
  quote: z.string().describe('The generated quote.'),
  author: z.string().describe('The author of the generated quote.'),
});
export type QuoteResponse = z.infer<typeof QuoteSchema>;
