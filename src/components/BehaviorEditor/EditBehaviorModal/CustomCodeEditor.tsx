import React from 'react';
import Editor from "@monaco-editor/react";

interface CustomCodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-500">
        Available variables:
        <ul className="list-disc list-inside mt-1">
          <li><code className="text-xs bg-gray-100 px-1 rounded">value</code> - Current value of the source component</li>
          <li><code className="text-xs bg-gray-100 px-1 rounded">component</code> - Source component object</li>
          <li><code className="text-xs bg-gray-100 px-1 rounded">targetComponents</code> - Array of target components</li>
          <li><code className="text-xs bg-gray-100 px-1 rounded">values</code> - All form values</li>
          <li><code className="text-xs bg-gray-100 px-1 rounded">updateValue(id, value)</code> - Function to update a component's value</li>
        </ul>
      </div>
      
      <Editor
        height="200px"
        language="javascript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};