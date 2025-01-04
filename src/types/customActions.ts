import { FormComponent } from './form';
import { FormStore } from './store';

export interface CustomActionContext {
  sourceValue: any;
  sourceComponent: FormComponent;
  targetComponents: FormComponent[];
  store: FormStore;
}

export interface CustomAction {
  name: string;
  label: string;
  description: string;
  handler: (context: CustomActionContext) => void;
}

export type CustomActionRegistry = Record<string, CustomAction>;