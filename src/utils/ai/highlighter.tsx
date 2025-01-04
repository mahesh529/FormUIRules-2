import React from 'react';
import { FormComponent } from '../../types/form';

interface HighlightProps {
  text: string;
  components: FormComponent[];
}

export const BehaviorHighlighter: React.FC<HighlightProps> = ({ text, components }) => {
  let highlighted = text;

  // Highlight component names in blue
  components.forEach(component => {
    const regex = new RegExp(`(${component.config.label})`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<span class="text-blue-600 font-medium">$1</span>'
    );
  });

  // Highlight actions in purple
  const actionWords = [
    'show', 'hide', 'enable', 'disable', 'update',
    'changes', 'clicked', 'focused', 'blurred'
  ];
  actionWords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<span class="text-purple-600 font-medium">$1</span>'
    );
  });

  // Highlight conditions in green
  const conditionWords = [
    'equals', 'contains', 'greater than', 'less than',
    'is empty', 'not empty'
  ];
  conditionWords.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<span class="text-green-600 font-medium">$1</span>'
    );
  });

  return (
    <div 
      className="text-lg"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};