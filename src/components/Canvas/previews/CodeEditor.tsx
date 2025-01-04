import React from 'react';
import Editor from "@monaco-editor/react";
import { FormComponent } from '../../../types/form';

interface CodeEditorProps {
  component: FormComponent;
  value: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ component, value, onChange }) => {
  const {
    language = 'javascript',
    theme = 'vs-dark',
    fontSize = 14,
    lineNumbers = true,
    wordWrap = 'on',
    formatOnPaste = true,
    formatOnType = true,
  } = component.properties;

  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height="300px"
        language={language}
        theme={theme}
        value={value || ''}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: fontSize,
          lineNumbers: lineNumbers ? 'on' : 'off',
          wordWrap: wordWrap,
          formatOnPaste: formatOnPaste,
          formatOnType: formatOnType,
          readOnly: !component.enabled,
          tabSize: 2,
          automaticLayout: true,
        }}
      />
    </div>
  );
};