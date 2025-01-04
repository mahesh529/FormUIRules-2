import React from 'react';
import { PreviewProps } from '../types';
import { BaseFileUpload } from '../base/BaseFileUpload';

export const ImagePreview: React.FC<PreviewProps> = (props) => (
  <BaseFileUpload
    {...props}
    accept="image/*"
    preview={
      <img
        src={props.component.values?.[props.component.id]}
        alt="Preview"
        className="max-h-full rounded-md"
      />
    }
  />
);