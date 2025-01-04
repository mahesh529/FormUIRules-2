import React from 'react';
import { PreviewProps } from '../types';
import Editor from "@monaco-editor/react";
import { useFormStore } from '../../../../store/formStore';

export const CodePreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  const {
    language = 'javascript',
    theme = 'vs-dark',
    fontSize = 14,
    lineNumbers = true,
  } = component.config;

  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height="200px"
        language={language}
        theme={theme}
        value={values[component.id] || ''}
        onChange={(value) => {
          updateValue(component.id, value);
          onEvent('change', value);
        }}
        options={{
          minimap: { enabled: false },
          fontSize,
          lineNumbers: lineNumbers ? 'on' : 'off',
          readOnly: !component.config.enabled,
        }}
      />
    </div>
  );
};