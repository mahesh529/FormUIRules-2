import { FormComponent } from '../../../types/form';

export interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}