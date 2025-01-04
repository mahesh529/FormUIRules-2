export type ComponentType = 
  | 'text' 
  | 'textarea'
  | 'markdown'
  | 'number'
  | 'code'
  | 'paragraph'
  | 'media'
  | 'slider'
  | 'checkbox'
  | 'radio'
  | 'voting'
  | 'rating'
  | 'time'
  | 'date'
  | 'image'
  | 'web'
  | 'pdf'
  | 'url'
  | 'video'
  | 'audio'
  | 'avatar'
  | 'csv';

export type ComponentCategory = 'input' | 'select' | 'media';

export interface ComponentConfig {
  label: string;
  visible: boolean;
  enabled: boolean;
  required: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  defaultValue?: any;
  validation?: ValidationRule[];
  [key: string]: any;
}

export interface ComponentEvent {
  sourceComponent?: string;
  trigger: 'change' | 'focus' | 'blur' | 'click';
  action: 'show' | 'hide' | 'enable' | 'disable' | 'setValue' | 'customJs';
  targetIds: string[];
  conditionGroups?: ConditionGroup[];
  customCode?: string;
}

export interface ConditionGroup {
  operator: 'and' | 'or';
  conditions: Condition[];
}

export interface Condition {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'empty' | 'notEmpty' | 'startsWith' | 'endsWith' | 'matches';
  value?: any;
}

export interface ValidationError {
  componentId: string;
  message: string;
}

export interface FormComponent {
  id: string;
  type: ComponentType;
  category: ComponentCategory;
  config: ComponentConfig;
  events?: ComponentEvent[];
  validation?: ValidationRule[];
  properties?: Record<string, any>;
  values?: Record<string, any>;
}

export interface FormLayout {
  id: string;
  components: FormComponent[];
}