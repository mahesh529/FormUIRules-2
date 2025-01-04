import { FormComponent } from '../../types/form';
import { ACTION_PATTERNS, CONDITION_PATTERNS } from './patterns';

export interface Token {
  type: 'component' | 'action' | 'condition' | 'value' | 'sourceComponent';
  value: string;
  original: string;
  index: number;
}

export const tokenize = (text: string, components: FormComponent[]): Token[] => {
  const tokens: Token[] = [];
  let remaining = text.toLowerCase();

  // Find component names
  components.forEach(component => {
    const label = component.config.label.toLowerCase();
    const regex = new RegExp(`\\b${label}\\b`, 'gi');
    remaining = remaining.replace(regex, (match, index) => {
      tokens.push({
        type: 'component',
        value: component.id,
        original: match,
        index:index
      });
      return ' '.repeat(match.length);
    });
  });

  // Sort componentOrder by the index to ensure the first mentioned component is first
  tokens.sort((a, b) => (a.index  - b.index));

  // Find actions
  ACTION_PATTERNS.forEach(({ pattern, value }) => {
    remaining = remaining.replace(pattern, (match ,index)=> {
      tokens.push({
        type: 'action',
        value,
        original: match,
        index:index
      });
      return ' '.repeat(match.length);
    });
  });

  // Find conditions
  CONDITION_PATTERNS.forEach(({ pattern, operator }) => {
    remaining = remaining.replace(pattern,(match ,index)=> {
      tokens.push({
        type: 'condition',
        value: operator,
        original: match,
        index:index
      });
      return ' '.repeat(match.length);
    });
  });


  return tokens;
};