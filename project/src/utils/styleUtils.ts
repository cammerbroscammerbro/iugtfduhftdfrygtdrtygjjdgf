import { QuoteMode } from '../types';

export const getGradientForMode = (mode: QuoteMode): string => {
  switch (mode) {
    case 'classic':
      // Classic: solid black background
      return 'bg-black';
    case 'roast':
      // Roast: dark brown/coffee solid
      return 'bg-[#3e2723]';
    case 'wholesome':
      // Wholesome: soft cream solid
      return 'bg-[#f5f5dc]';
    case 'deep':
      // Deep: dark blue solid
      return 'bg-[#0a192f]';
    default:
      return 'bg-black';
  }
};

export const getFontForMode = (mode: QuoteMode): string => {
  return 'font-serif tracking-wide';
};