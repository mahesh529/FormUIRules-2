import { FormComponent, FormLayout, ValidationError } from './form';

export interface FormStore {
  layout: FormLayout;
  selectedComponent: FormComponent | null;
  values: Record<string, any>;
  errors: ValidationError[];
  addComponent: (component: FormComponent) => void;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
  removeComponent: (id: string) => void;
  setSelectedComponent: (component: FormComponent | null) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  updateValue: (id: string, value: any) => void;
  validateForm: () => boolean;
  setErrors: (errors: ValidationError[]) => void;
  clearErrors: () => void;
  resetForm: () => void;
}