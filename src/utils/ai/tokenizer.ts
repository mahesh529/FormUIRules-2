import { FormComponent } from '../../types/form';
import { ACTION_PATTERNS, CONDITION_PATTERNS } from './patterns';

export interface Token {
  type: 'component' | 'action' | 'condition' | 'value';
  value: string;
  original: string;
}

export const tokenize = (text: string, components: FormComponent[]): Token[] => {
  const tokens: Token[] = [];
  let remaining = text.toLowerCase();

  // Find component names
  components.forEach(component => {
    const label = component.config.label.toLowerCase();
    const regex = new RegExp(`\\b${label}\\b`, 'gi');
    remaining = remaining.replace(regex, match => {
      tokens.push({
        type: 'component',
        value: component.id,
        original: match
      });
      return ' '.repeat(match.length);
    });
  });

  // Find actions
  ACTION_PATTERNS.forEach(({ pattern, value }) => {
    remaining = remaining.replace(pattern, match => {
      tokens.push({
        type: 'action',
        value,
        original: match
      });
      return ' '.repeat(match.length);
    });
  });

  // Find conditions
  CONDITION_PATTERNS.forEach(({ pattern, operator }) => {
    remaining = remaining.replace(pattern, match => {
      tokens.push({
        type: 'condition',
        value: operator,
        original: match
      });
      return ' '.repeat(match.length);
    });
  });

  return tokens;
};