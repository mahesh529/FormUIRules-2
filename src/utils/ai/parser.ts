import { FormComponent, ComponentEvent } from '../../types/form';
import { tokenize } from './tokenizer';
import { TRIGGER_PATTERNS, ACTION_PATTERNS, CONDITION_PATTERNS, VALUE_PATTERNS } from './patterns';

interface ParsedBehavior {
  sourceComponent?: string;
  trigger: ComponentEvent['trigger'];
  action: ComponentEvent['action'];
  targetComponents: string[];
  conditions?: {
    field: string;
    operator: string;
    value: any;
  }[];
}

const extractValue = (text: string, startIndex: number): { value: any; type: string } | null => {
  const remainingText = text.slice(startIndex).trim();
  
  for (const { pattern, type } of VALUE_PATTERNS) {
    const match = remainingText.match(pattern);
    if (match) {
      const value = match[1];
      switch (type) {
        case 'number':
          return { value: parseFloat(value), type };
        case 'boolean':
          return { value: value === 'true', type };
        case 'reference':
          return { value: `{${value}}`, type };
        default:
          return { value, type };
      }
    }
  }
  
  return null;
};

export const parseBehaviorPrompt = (
  prompt: string,
  components: FormComponent[]
): ParsedBehavior => {
  const tokens = tokenize(prompt, components);
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract components
  const componentTokens = tokens.filter(t => t.type === 'component');
  const sourceComponent = componentTokens[0]?.value;
  const targetComponents = componentTokens.slice(1).map(t => t.value);

  // Find trigger
  const trigger = TRIGGER_PATTERNS.find(
    ({ pattern }) => pattern.test(lowerPrompt)
  )?.value as 'change' | 'focus' | 'blur' | 'click' || 'change';

  // Find action
  const action = ACTION_PATTERNS.find(
    ({ pattern }) => pattern.test(lowerPrompt)
  )?.value as 'show' | 'hide' | 'enable' | 'disable' | 'setValue' | 'customJs' || 'show';

  // Extract conditions
  const conditions = [];
  for (const { pattern, operator } of CONDITION_PATTERNS) {
    const match = lowerPrompt.match(pattern);
    if (match) {
      const valueInfo = extractValue(prompt, match.index! + match[0].length);
      if (valueInfo) {
        conditions.push({
          field: 'value',
          operator,
          value: valueInfo.value,
          valueType: valueInfo.type
        });
      }
    }
  }

  return {
    sourceComponent,
    trigger,
    action,
    targetComponents,
    conditions: conditions as any[]
  };
};