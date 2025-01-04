import React from 'react';
import { PreviewProps } from '../types';
import { BaseInput } from '../base/BaseInput';

export const NumberPreview: React.FC<PreviewProps> = (props) => (
  <BaseInput {...props} type="number" />
);