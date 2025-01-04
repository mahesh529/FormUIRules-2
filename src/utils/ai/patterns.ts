export const TRIGGER_PATTERNS = [
  { pattern: /changes|is changed/, value: 'change' },
  { pattern: /clicked|is clicked/, value: 'click' },
  { pattern: /focused|receives focus/, value: 'focus' },
  { pattern: /blurred|loses focus/, value: 'blur' }
];

export const ACTION_PATTERNS = [
  { pattern: /show|display|reveal/, value: 'show' },
  { pattern: /hide|conceal/, value: 'hide' },
  { pattern: /enable|activate/, value: 'enable' },
  { pattern: /disable|deactivate/, value: 'disable' },
  { pattern: /set|update|change to/, value: 'setValue' }
];

export const CONDITION_PATTERNS = [
  { pattern: /equals|is equal to|is/, operator: 'equals' },
  { pattern: /contains|has|includes/, operator: 'contains' },
  { pattern: /greater than|more than|above/, operator: 'greaterThan' },
  { pattern: /less than|fewer than|below/, operator: 'lessThan' },
  { pattern: /is empty|empty/, operator: 'empty' },
  { pattern: /is not empty|not empty/, operator: 'notEmpty' },
  { pattern: /starts with|begins with/, operator: 'startsWith' },
  { pattern: /ends with/, operator: 'endsWith' },
  { pattern: /matches|like/, operator: 'matches' }
];

export const VALUE_PATTERNS = [
  // Match quoted strings
  { pattern: /"([^"]+)"/, type: 'string' },
  { pattern: /'([^']+)'/, type: 'string' },
  // Match numbers
  { pattern: /\b(\d+\.?\d*)\b/, type: 'number' },
  // Match boolean values
  { pattern: /\b(true|false)\b/, type: 'boolean' },
  // Match component references
  { pattern: /\{([^}]+)\}/, type: 'reference' }
];