import React, { useState } from 'react';
import { PreviewProps } from '../types';
import { BaseFileUpload } from '../base/BaseFileUpload';
import { Table } from 'lucide-react';

export const CSVPreview: React.FC<PreviewProps> = (props) => {
  const [preview, setPreview] = useState<string[][]>([]);

  const handleFileChange = (content: string) => {
    const rows = content
      .split('\n')
      .map(row => row.split(','))
      .slice(0, 5); // Show first 5 rows
    setPreview(rows);
  };

  return (
    <BaseFileUpload
      {...props}
      accept=".csv"
      aspectRatio="min-h-[200px]"
      preview={
        preview.length > 0 ? (
          <div className="w-full p-4 overflow-auto">
            <table className="w-full text-sm">
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className={i === 0 ? 'font-medium' : undefined}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-1 border-b border-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <Table className="w-8 h-8 mx-auto mb-2" />
            <span>Upload CSV</span>
          </div>
        )
      }
      onFileContent={handleFileChange}
    />
  );
};