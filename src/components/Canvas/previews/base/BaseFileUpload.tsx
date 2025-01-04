import React from 'react';
import { FormComponent } from '../../../../types/form';
import { useFormStore } from '../../../../store/formStore';
import { Upload } from 'lucide-react';

interface BaseFileUploadProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
  accept?: string;
  preview?: React.ReactNode;
  aspectRatio?: string;
}

export const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  component,
  onEvent,
  accept,
  preview,
  aspectRatio = 'aspect-video',
}) => {
  const { values, updateValue } = useFormStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const value = e.target?.result;
        updateValue(component.id, value);
        onEvent('change', value);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className={`w-full ${aspectRatio} bg-gray-100 rounded-md flex items-center justify-center border border-gray-300`}>
        {values[component.id] ? (
          preview
        ) : (
          <div className="text-center text-gray-500">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <span>Upload file</span>
          </div>
        )}
      </div>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={!component.config.enabled}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};