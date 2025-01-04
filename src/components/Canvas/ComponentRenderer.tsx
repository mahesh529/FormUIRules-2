import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFormStore } from '../../store/formStore';
import { FormComponent } from '../../types/form';
import { GripHorizontal, Trash2 } from 'lucide-react';
import { PreviewComponent } from './PreviewComponent';
import { getComponentIcon } from '../../utils/componentIcons';

interface ComponentRendererProps {
  component: FormComponent;
  error?: string;
  preview?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component,
  error,
  preview
}) => {
  const { selectedComponent, setSelectedComponent, removeComponent } = useFormStore();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: component.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (preview) return;
    e.stopPropagation();
    setSelectedComponent(component);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedComponent?.id === component.id) {
      setSelectedComponent(null);
    }
    removeComponent(component.id);
  };

  const isSelected = selectedComponent?.id === component.id;
  const Icon = getComponentIcon(component.type);

  if (preview) {
    return (
      <div className="mb-4">
        <PreviewComponent component={component} error={error} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-2 ${!component.config.visible ? 'opacity-50' : ''}`}
    >
      <div
        className={`p-4 bg-white rounded-lg shadow-sm border cursor-pointer transition-colors ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
        } ${error ? 'border-red-300 bg-red-50' : ''}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div 
            className="flex items-center gap-2 flex-1" 
            {...attributes} 
            {...listeners}
            onClick={handleClick}
          >
            <GripHorizontal className="w-4 h-4 text-gray-400" />
            <Icon className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">{component.config.label}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div onClick={handleClick}>
          <PreviewComponent component={component} error={error} />
        </div>
      </div>
    </div>
  );
};