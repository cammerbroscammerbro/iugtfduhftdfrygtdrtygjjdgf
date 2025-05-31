import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface QuoteInputProps {
  onSubmit: (text: string) => void;
  isGenerating: boolean;
}

const QuoteInput: React.FC<QuoteInputProps> = ({ onSubmit, isGenerating }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isGenerating) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto mt-6"
    >
      <div className="relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type anything here..."
          className="w-full px-4 py-3 pr-12 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isGenerating}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full 
          ${!inputText.trim() || isGenerating ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-50'} 
          transition-colors duration-200`}
          aria-label="Generate quote"
        >
          <Send size={20} />
        </button>
      </div>
      <p className="text-center text-gray-500 text-sm mt-2">
        {isGenerating ? 'Crafting your wisdom...' : 'Enter text to transform into a quote'}
      </p>
    </form>
  );
};

export default QuoteInput;