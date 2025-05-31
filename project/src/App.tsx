import React, { useState, useEffect } from 'react';
import { Quote as IQuote, QuoteMode } from './types';
import { generateQuote } from './utils/quoteGenerator';
import { saveQuoteToHistory, getQuoteHistory, clearQuoteHistory } from './utils/storage';
import QuoteInput from './components/QuoteInput';
import ModeSelector from './components/ModeSelector';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteHistory from './components/QuoteHistory';
import { Quote } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState<QuoteMode>('classic');
  const [currentQuote, setCurrentQuote] = useState<IQuote | null>(null);
  const [quoteHistory, setQuoteHistory] = useState<IQuote[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load quote history from localStorage on initial render
  useEffect(() => {
    setQuoteHistory(getQuoteHistory());
  }, []);

  const handleGenerateQuote = (text: string) => {
    setIsGenerating(true);
    
    // Simulate a slight delay for the "generating" effect
    setTimeout(() => {
      const newQuote = generateQuote(text, selectedMode);
      setCurrentQuote(newQuote);
      
      // Save to history
      saveQuoteToHistory(newQuote);
      setQuoteHistory(getQuoteHistory());
      
      setIsGenerating(false);
    }, 800);
  };

  const handleSelectMode = (mode: QuoteMode) => {
    setSelectedMode(mode);
    
    // If there's already a quote, regenerate it with the new mode
    if (currentQuote) {
      handleGenerateQuote(currentQuote.originalText);
    }
  };

  const handleClearHistory = () => {
    clearQuoteHistory();
    setQuoteHistory([]);
  };

  const handleSelectHistoryQuote = (quote: IQuote) => {
    setCurrentQuote(quote);
    setSelectedMode(quote.mode);
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Quote size={32} className="text-white mr-2 drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">Quotify</h1>
          </div>
          <p className="text-gray-300 text-lg font-serif max-w-xl mx-auto">
            Turn anything you say into a beautifully dramatic, motivational, or savage poster.
          </p>
        </header>

        <main className="bg-[#181818] rounded-2xl shadow-2xl p-8 mb-8 border border-[#232526]">
          <ModeSelector 
            selectedMode={selectedMode} 
            onSelectMode={handleSelectMode} 
          />
          <QuoteInput 
            onSubmit={handleGenerateQuote}
            isGenerating={isGenerating} 
          />
          <div className="mt-8">
            <QuoteDisplay quote={currentQuote} />
          </div>
        </main>

        <QuoteHistory 
          quotes={quoteHistory} 
          onClearHistory={handleClearHistory}
          onSelectQuote={handleSelectHistoryQuote}
        />

        <footer className="text-center text-gray-500 text-sm mt-8">
          © 2025 Quotify. Turn ordinary words into extraordinary wisdom.
        </footer>
      </div>
    </div>
  );
}

export default App;
