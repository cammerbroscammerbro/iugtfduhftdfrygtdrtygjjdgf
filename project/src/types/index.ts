export type QuoteMode = 'classic' | 'roast' | 'wholesome' | 'deep';

export interface Quote {
  text: string;
  mode: QuoteMode;
  emoji: string;
  originalText: string;
}