import { ComponentType, ComponentConfig } from '../types/form';

export const getDefaultConfig = (type: ComponentType): ComponentConfig => {
  const baseConfig: ComponentConfig = {
    label: type.charAt(0).toUpperCase() + type.slice(1),
    visible: true,
    enabled: true,
    required: false,
    validation: [],
  };

  switch (type) {
    case 'text':
    case 'textarea':
    case 'paragraph':
      return {
        ...baseConfig,
        placeholder: '',
        minLength: undefined,
        maxLength: undefined,
      };

    case 'number':
      return {
        ...baseConfig,
        min: undefined,
        max: undefined,
        step: 1,
      };

    case 'code':
      return {
        ...baseConfig,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        lineNumbers: true,
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
      };

    case 'radio':
    case 'checkbox':
      return {
        ...baseConfig,
        options: ['Option 1', 'Option 2', 'Option 3'],
        defaultValue: type === 'checkbox' ? false : undefined,
      };

    case 'slider':
      return {
        ...baseConfig,
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,
      };

    default:
      return baseConfig;
  }
};