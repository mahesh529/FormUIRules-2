import React from 'react';
import { PreviewProps } from '../types';
import { BaseFileUpload } from '../base/BaseFileUpload';

export const VideoPreview: React.FC<PreviewProps> = (props) => (
  <BaseFileUpload
    {...props}
    accept="video/*"
    preview={
      <video
        src={props.component.values?.[props.component.id]}
        controls
        className="max-h-full rounded-md"
      />
    }
  />
);