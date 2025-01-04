import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useFormStore } from '../../store/formStore';
import { ComponentRenderer } from './ComponentRenderer';

interface CanvasProps {
  preview?: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ preview }) => {
  const { layout, setSelectedComponent, validateForm, errors } = useFormStore();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedComponent(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully');
    }
  };

  useEffect(()=>{
    console.log("layout:",layout)
  },[layout])


  return (
    <div
      ref={setNodeRef}
      onClick={handleCanvasClick}
      className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {layout.components.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-3rem)] border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              {preview ? 'No components to preview' : 'Drag components here'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {
              layout.components.map((component) => (
                <ComponentRenderer 
                  key={component.id} 
                  component={component}
                  error={errors.find(e => e.componentId === component.id)?.message}
                  preview={preview}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};