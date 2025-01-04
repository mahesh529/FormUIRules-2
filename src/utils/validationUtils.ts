import { ValidationRule } from '../types/form';

export const createDefaultValidation = (): ValidationRule => ({
  type: 'required',
  message: 'This field is required',
});

export const VALIDATION_TYPES = [
  { value: 'required', label: 'Required' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' },
  { value: 'pattern', label: 'Pattern' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
] as const;