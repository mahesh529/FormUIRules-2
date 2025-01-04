import React from 'react';
import { Wand2 } from 'lucide-react';
import { FormComponent } from '../../../types/form';
import { BehaviorHighlighter } from '../../../utils/ai/highlighter';
import { generateBehaviorSuggestions } from '../../../utils/ai/suggestions';

interface SuggestionsProps {
  components: FormComponent[];
  onSelect: (suggestion: string) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ components, onSelect }) => {
  const suggestions = generateBehaviorSuggestions(components[0], components);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Wand2 className="w-4 h-4" />
        <span>Try these examples:</span>
      </div>
      <div className="grid gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="text-left hover:bg-blue-50 p-2 rounded-md transition-colors"
          >
            <BehaviorHighlighter 
              text={suggestion} 
              components={components} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};