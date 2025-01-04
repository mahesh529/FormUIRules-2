import React from 'react';
import { useFormStore } from '../../store/formStore';
import { Wand2 } from 'lucide-react';
import { HighlightedText } from './HighlightedText';

interface BehaviorSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export const BehaviorSuggestions: React.FC<BehaviorSuggestionsProps> = ({ onSelect }) => {
  const { layout } = useFormStore();

  const suggestions = layout.components.flatMap(component => [
    `When ${component.config.label} changes, show Additional Details`,
    `When ${component.config.label} is empty, disable Submit Button`,
    `When ${component.config.label} changes, update Related Field`
  ]);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Wand2 className="w-4 h-4" />
        <span>Try these examples:</span>
      </div>
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full text-left hover:bg-blue-50 p-2 rounded-md transition-colors"
          >
            <HighlightedText text={suggestion} components={layout.components} />
          </button>
        ))}
      </div>
    </div>
  );
};