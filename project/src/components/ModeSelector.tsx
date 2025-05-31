import React from 'react';
import { Sparkles, Flame, Heart, Brain } from 'lucide-react';

export type QuoteMode = 'classic' | 'roast' | 'wholesome' | 'deep';

interface ModeSelectorProps {
  selectedMode: QuoteMode;
  onSelectMode: (mode: QuoteMode) => void;
}

interface ModeOption {
  id: QuoteMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onSelectMode }) => {
  const modes: ModeOption[] = [
    { 
      id: 'classic', 
      label: 'Classic', 
      icon: <Sparkles size={18} />, 
      description: 'Elegant wisdom' 
    },
    { 
      id: 'roast', 
      label: 'Roast', 
      icon: <Flame size={18} />, 
      description: 'Savage humor' 
    },
    { 
      id: 'wholesome', 
      label: 'Wholesome', 
      icon: <Heart size={18} />, 
      description: 'Heartwarming' 
    },
    { 
      id: 'deep', 
      label: 'Deep AF', 
      icon: <Brain size={18} />, 
      description: 'Ultra philosophical' 
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Choose a style:</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 border 
              ${selectedMode === mode.id 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
          >
            <div className="flex items-center justify-center mb-1">
              {mode.icon}
              <span className="ml-1 font-medium">{mode.label}</span>
            </div>
            <span className="text-xs text-center">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;