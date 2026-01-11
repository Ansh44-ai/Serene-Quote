import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
  throw new Error(
    'GEMINI_API_KEY is not defined or is set to the placeholder value. Please get a valid API key from Google AI Studio and add it to your .env file.'
  );
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
