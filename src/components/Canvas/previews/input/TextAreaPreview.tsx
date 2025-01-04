import React from 'react';
import { PreviewProps } from '../types';
import { BaseInput } from '../base/BaseInput';

export const TextAreaPreview: React.FC<PreviewProps> = (props) => (
  <BaseInput {...props} rows={4} />
);