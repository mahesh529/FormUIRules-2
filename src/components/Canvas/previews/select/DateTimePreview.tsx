import React from 'react';
import { PreviewProps } from '../types';
import { BaseInput } from '../base/BaseInput';

export const DatePreview: React.FC<PreviewProps> = (props) => (
  <BaseInput {...props} type="date" />
);

export const TimePreview: React.FC<PreviewProps> = (props) => (
  <BaseInput {...props} type="time" />
);