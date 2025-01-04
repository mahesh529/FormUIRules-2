import React from 'react';
import { PreviewProps } from '../types';
import { BaseFileUpload } from '../base/BaseFileUpload';

export const AudioPreview: React.FC<PreviewProps> = (props) => (
  <BaseFileUpload
    {...props}
    accept="audio/*"
    aspectRatio="h-24"
    preview={
      <audio
        src={props.component.values?.[props.component.id]}
        controls
        className="w-full"
      />
    }
  />
);