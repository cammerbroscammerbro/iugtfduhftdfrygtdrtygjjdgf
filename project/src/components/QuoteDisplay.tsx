import React, { useRef, useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { Quote } from '../types';
import { getGradientForMode } from '../utils/styleUtils';

interface QuoteDisplayProps {
  quote: Quote | null;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  if (!quote) {
    return (
      <div className="w-full max-w-md mx-auto rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center p-16">
        <p className="text-gray-500 text-center">Enter text above to generate your quote</p>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!quoteRef.current) return;
    try {
      alert('In a complete implementation, this would download the quote as an image.');
    } catch (error) {
      console.error('Error downloading quote:', error);
    }
  };

  const handleShare = async () => {
    try {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert('In a complete implementation, this would share the quote on social media.');
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const { mode, text, emoji } = quote;
  const backgroundStyle = getGradientForMode(mode);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div 
        ref={quoteRef}
        className={`relative w-full aspect-square rounded-lg shadow-2xl overflow-hidden ${backgroundStyle} p-12 flex items-center justify-center border-4 border-white/10`}
      >
        {/* Poster background image for classic mode */}
        {mode === 'classic' && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        )}
        {/* Poster background image for deep mode (mountain) */}
        {mode === 'deep' && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay" />
        )}
        {/* Poster background image for wholesome mode (soft paper) */}
        {mode === 'wholesome' && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        )}
        {/* Poster background image for roast mode (subtle texture) */}
        {mode === 'roast' && (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80')] opacity-15 bg-cover bg-center mix-blend-overlay" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="text-center relative z-10">
          <div className="w-16 h-1 bg-white/50 mx-auto mb-8" />
          <p className="text-white text-4xl font-serif leading-tight tracking-wide drop-shadow-lg mb-8 px-4">{text}</p>
          {emoji && <p className="text-7xl mt-6 drop-shadow-lg animate-pulse">{emoji}</p>}
          <div className="w-16 h-1 bg-white/50 mx-auto mt-8" />
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handleDownload}
          className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105"
        >
          <Download size={18} className="mr-2" />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center px-6 py-3 bg-white border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          <Share2 size={18} className="mr-2" />
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;