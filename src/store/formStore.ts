import { create } from 'zustand';
import { FormComponent, FormLayout, ValidationError } from '../types/form';
import { getDefaultConfig } from '../utils/componentConfig';

interface FormStore {
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

export const useFormStore = create<FormStore>((set, get) => ({
  layout: {
    id: 'main-layout',
    components: [],
  },
  selectedComponent: null,
  values: {},
  errors: [],

  addComponent: (component) =>
    set((state) => ({
      layout: {
        ...state.layout,
        components: [
          ...state.layout.components,
          {
            ...component,
            config: {
              ...getDefaultConfig(component.type),
              ...component.config,
            },
          },
        ],
      },
    })),

  updateComponent: (id, updates) =>
    set((state) => {
      const updatedComponents = state.layout.components.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              ...updates,
              config: {
                ...comp.config,
                ...(updates.config || {}),
              },
            }
          : comp
      );

      const updatedComponent = updatedComponents.find((comp) => comp.id === id);

      return {
        layout: {
          ...state.layout,
          components: updatedComponents,
        },
        selectedComponent:
          state.selectedComponent?.id === id ? updatedComponent || null : state.selectedComponent,
      };
    }),

  removeComponent: (id) =>
    set((state) => ({
      layout: {
        ...state.layout,
        components: state.layout.components.filter((comp) => comp.id !== id),
      },
      selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent,
      values: {
        ...state.values,
        [id]: undefined,
      },
    })),

  setSelectedComponent: (component) =>
    set(() => ({
      selectedComponent: component,
    })),

  moveComponent: (fromIndex, toIndex) =>
    set((state) => {
      const components = [...state.layout.components];
      const [removed] = components.splice(fromIndex, 1);
      components.splice(toIndex, 0, removed);
      return {
        layout: {
          ...state.layout,
          components,
        },
      };
    }),

  updateValue: (id, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [id]: value,
      },
      errors: state.errors.filter((error) => error.componentId !== id),
    })),

  validateForm: () => {
    const state = get();
    const errors: ValidationError[] = [];

    state.layout.components.forEach((component) => {
      if (!component.config.visible || !component.config.enabled) return;

      const value = state.values[component.id];
      const validationRules = component.config.validation || [];

      validationRules.forEach((rule) => {
        let isValid = true;

        switch (rule.type) {
          case 'required':
            isValid = value !== undefined && value !== '' && value !== null;
            break;
          case 'min':
            if (typeof value === 'number') {
              isValid = value >= (rule.value || 0);
            } else if (typeof value === 'string') {
              isValid = value.length >= (rule.value || 0);
            }
            break;
          case 'max':
            if (typeof value === 'number') {
              isValid = value <= (rule.value || 0);
            } else if (typeof value === 'string') {
              isValid = value.length <= (rule.value || 0);
            }
            break;
          case 'pattern':
            if (typeof value === 'string' && rule.value) {
              isValid = new RegExp(rule.value).test(value);
            }
            break;
          case 'email':
            if (typeof value === 'string') {
              isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
            break;
          case 'url':
            if (typeof value === 'string') {
              try {
                new URL(value);
                isValid = true;
              } catch {
                isValid = false;
              }
            }
            break;
        }

        if (!isValid) {
          errors.push({
            componentId: component.id,
            message: rule.message,
          });
        }
      });
    });

    set({ errors });
    return errors.length === 0;
  },

  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: [] }),
  resetForm: () => set({ values: {}, errors: [] }),
}));