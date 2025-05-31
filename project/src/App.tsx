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
  const [selectedBgType, setSelectedBgType] = useState('solid-black');

  // Load quote history from localStorage on initial render
  useEffect(() => {
    setQuoteHistory(getQuoteHistory());
  }, []);

  const handleGenerateQuote = (text: string, bgType: string) => {
    setIsGenerating(true);
    // If user selects 'random', pick a random background (not solid-black)
    let finalBgType = bgType;
    if (bgType === 'random') {
      const bgImages = [
        'mountain', 'landscape', 'lake', 'city', 'computer', 'neon', 'desert'
      ];
      finalBgType = bgImages[Math.floor(Math.random() * bgImages.length)];
    }
    setSelectedBgType(finalBgType);
    setTimeout(() => {
      const newQuote = generateQuote(text, selectedMode);
      setCurrentQuote({ ...newQuote, bgType: finalBgType });
      // Save to history with the selected background type
      saveQuoteToHistory({ ...newQuote, bgType: finalBgType });
      setQuoteHistory(getQuoteHistory());
      setIsGenerating(false);
    }, 800);
  };

  const handleSelectMode = (mode: QuoteMode) => {
    setSelectedMode(mode);
    
    // If there's already a quote, regenerate it with the new mode
    if (currentQuote) {
      handleGenerateQuote(currentQuote.originalText, selectedBgType);
    }
  };

  const handleClearHistory = () => {
    clearQuoteHistory();
    setQuoteHistory([]);
  };

  const handleSelectHistoryQuote = (quote: IQuote & { bgType?: string }) => {
    setCurrentQuote(quote);
    setSelectedMode(quote.mode);
    if (quote.bgType) setSelectedBgType(quote.bgType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Quote size={32} className="text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Quotify</h1>
          </div>
          <p className="text-gray-600">
            Turn anything you say into a beautifully dramatic, motivational poster
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <ModeSelector 
            selectedMode={selectedMode} 
            onSelectMode={handleSelectMode} 
          />
          <QuoteInput 
            onSubmit={handleGenerateQuote}
            isGenerating={isGenerating} 
          />
          <div className="mt-8">
            <QuoteDisplay quote={currentQuote} bgType={selectedBgType} />
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
