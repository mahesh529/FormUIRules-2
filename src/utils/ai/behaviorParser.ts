import { FormComponent, ComponentEvent } from '../../types/form';

interface Token {
  type: 'component' | 'action' | 'condition' | 'value';
  value: string;
  original: string;
}

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

const TRIGGER_PATTERNS = [
  { pattern: /changes|is changed/, value: 'change' },
  { pattern: /clicked|is clicked/, value: 'click' },
  { pattern: /focused|receives focus/, value: 'focus' },
  { pattern: /blurred|loses focus/, value: 'blur' }
];

const ACTION_PATTERNS = [
  { pattern: /show|display|reveal/, value: 'show' },
  { pattern: /hide|conceal/, value: 'hide' },
  { pattern: /enable|activate/, value: 'enable' },
  { pattern: /disable|deactivate/, value: 'disable' },
  { pattern: /set|update|change to/, value: 'setValue' }
];

const CONDITION_PATTERNS = [
  { pattern: /equals|is equal to|is/, operator: 'equals' },
  { pattern: /contains|includes/, operator: 'contains' },
  { pattern: /greater than|more than/, operator: 'greaterThan' },
  { pattern: /less than|fewer than/, operator: 'lessThan' },
  { pattern: /is empty|empty/, operator: 'empty' },
  { pattern: /is not empty|not empty/, operator: 'notEmpty' }
];

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

export const parseBehaviorPrompt = (
  prompt: string,
  components: FormComponent[]
): ParsedBehavior => {
  const tokens = tokenize(prompt, components);
  
  // Extract components
  const componentTokens = tokens.filter(t => t.type === 'component');
  const sourceComponent = componentTokens[0]?.value;
  const targetComponents = componentTokens.slice(1).map(t => t.value);

  // Find trigger
  const trigger = TRIGGER_PATTERNS.find(
    ({ pattern }) => pattern.test(prompt.toLowerCase())
  )?.value || 'change';

  // Find action
  const action = ACTION_PATTERNS.find(
    ({ pattern }) => pattern.test(prompt.toLowerCase())
  )?.value || 'show';

  // Extract conditions
  const conditions = CONDITION_PATTERNS.map(({ pattern, operator }) => {
    const match = prompt.toLowerCase().match(pattern);
    if (!match) return null;

    // Try to find a value after the condition
    const valueMatch = prompt
      .slice(match.index! + match[0].length)
      .match(/["']([^"']+)["']|\b(\d+)\b/);

    return valueMatch ? {
      field: 'value',
      operator,
      value: valueMatch[1] || valueMatch[2]
    } : null;
  }).filter(Boolean);

  return {
    sourceComponent,
    trigger,
    action,
    targetComponents,
    conditions: conditions as any[]
  };
};