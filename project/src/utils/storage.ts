import { Quote } from '../types';

const STORAGE_KEY = 'quotify_history';

export const saveQuoteToHistory = (quote: Quote): void => {
  try {
    const existingQuotes = getQuoteHistory();
    const updatedQuotes = [quote, ...existingQuotes].slice(0, 20); // Keep only the 20 most recent quotes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes));
  } catch (error) {
    console.error('Error saving quote to history:', error);
  }
};

export const getQuoteHistory = (): Quote[] => {
  try {
    const storedQuotes = localStorage.getItem(STORAGE_KEY);
    return storedQuotes ? JSON.parse(storedQuotes) : [];
  } catch (error) {
    console.error('Error retrieving quote history:', error);
    return [];
  }
};

export const clearQuoteHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing quote history:', error);
  }
};