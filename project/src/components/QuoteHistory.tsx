import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { Quote } from '../types';
import { getGradientForMode } from '../utils/styleUtils';

interface QuoteHistoryProps {
  quotes: Quote[];
  onClearHistory: () => void;
  onSelectQuote: (quote: Quote) => void;
}

const QuoteHistory: React.FC<QuoteHistoryProps> = ({ 
  quotes, 
  onClearHistory,
  onSelectQuote
}) => {
  if (quotes.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <History size={18} className="mr-2" />
          Quote History
        </h2>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-500 hover:text-red-700 flex items-center"
        >
          <Trash2 size={16} className="mr-1" />
          Clear
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quotes.slice(0, 6).map((quote, index) => (
          <button
            key={index}
            onClick={() => onSelectQuote(quote)}
            className={`${getGradientForMode(quote.mode)} p-3 rounded-lg text-white text-sm font-serif text-center hover:opacity-90 transition-opacity aspect-video flex items-center justify-center`}
          >
            <div>
              <p className="line-clamp-2">{quote.text}</p>
              {quote.emoji && <span className="text-lg">{quote.emoji}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuoteHistory;