import React from 'react';
import { FormComponent } from '../../types/form';

interface HighlightedTextProps {
  text: string;
  components: FormComponent[];
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, components }) => {
  const highlightText = (input: string) => {
    // Highlight field names in blue
    let highlighted = components.reduce((acc, comp) => {
      const regex = new RegExp(`(${comp.config.label})`, 'g');
      return acc.replace(regex, '<span class="text-blue-600 font-medium">$1</span>');
    }, input);

    // Highlight actions in purple
    const actionWords = ['changes', 'clicked', 'focused', 'blurred', 'show', 'hide', 'enable', 'disable', 'update', 'set'];
    highlighted = actionWords.reduce((acc, word) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      return acc.replace(regex, '<span class="text-purple-600 font-medium">$1</span>');
    }, highlighted);

    return highlighted;
  };

  return (
    <div 
      className="text-lg"
      dangerouslySetInnerHTML={{ __html: highlightText(text) }}
    />
  );
};