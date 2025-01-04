import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import { Upload } from 'lucide-react';

interface PreviewProps {
  component: FormComponent;
  onEvent: (type: 'change' | 'focus' | 'blur' | 'click', value?: any) => void;
}

const FileUploadPreview: React.FC<{
  accept?: string;
  preview?: React.ReactNode;
  aspectRatio?: string;
  component: FormComponent;
  onEvent: PreviewProps['onEvent'];
}> = ({ accept, preview, aspectRatio = 'aspect-video', component, onEvent }) => {
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

export const ImagePreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
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

export const WebPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <div className="space-y-2">
      <input
        type="url"
        value={values[component.id] || ''}
        onChange={(e) => {
          updateValue(component.id, e.target.value);
          onEvent('change', e.target.value);
        }}
        placeholder="https://"
        disabled={!component.config.enabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {values[component.id] && (
        <div className="w-full aspect-video bg-gray-100 rounded-md border border-gray-300">
          <iframe
            src={values[component.id]}
            className="w-full h-full rounded-md"
            title="Web preview"
          />
        </div>
      )}
    </div>
  );
};

export const PDFPreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
    {...props}
    accept=".pdf"
    aspectRatio="aspect-[3/4]"
  />
);

export const URLPreview: React.FC<PreviewProps> = ({ component, onEvent }) => {
  const { values, updateValue } = useFormStore();
  
  return (
    <input
      type="url"
      value={values[component.id] || ''}
      onChange={(e) => {
        updateValue(component.id, e.target.value);
        onEvent('change', e.target.value);
      }}
      placeholder="https://"
      disabled={!component.config.enabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export const VideoPreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
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

export const AudioPreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
    {...props}
    accept="audio/*"
    aspectRatio="h-12"
    preview={
      <audio
        src={props.component.values?.[props.component.id]}
        controls
        className="w-full"
      />
    }
  />
);

export const AvatarPreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
    {...props}
    accept="image/*"
    aspectRatio="w-24 h-24 rounded-full"
    preview={
      <img
        src={props.component.values?.[props.component.id]}
        alt="Avatar"
        className="w-full h-full rounded-full object-cover"
      />
    }
  />
);

export const CSVPreview: React.FC<PreviewProps> = (props) => (
  <FileUploadPreview
    {...props}
    accept=".csv"
    aspectRatio="min-h-[100px]"
    preview={
      <div className="w-full p-2">
        <div className="text-xs font-mono">id,name,email</div>
        <div className="text-xs font-mono">1,John,john@example.com</div>
        <div className="text-xs text-gray-400">...</div>
      </div>
    }
  />
);