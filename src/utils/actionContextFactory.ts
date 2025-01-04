import { CustomActionContext } from '../types/customActions';
import { FormComponent } from '../types/form';
import { FormStore } from '../types/store';

export const createActionContext = (
  sourceComponent: FormComponent,
  store: FormStore | null = null,
  sourceValue: any = null,
  targetComponents: FormComponent[] = []
): CustomActionContext => ({
  sourceComponent,
  sourceValue,
  targetComponents,
  store: store || {
    layout: { id: 'preview', components: [] },
    values: {},
    selectedComponent: null,
    errors: [],
    addComponent: () => {},
    updateComponent: () => {},
    removeComponent: () => {},
    setSelectedComponent: () => {},
    moveComponent: () => {},
    updateValue: () => {},
    validateForm: () => false,
    setErrors: () => {},
    clearErrors: () => {},
    resetForm: () => {},
  },
});