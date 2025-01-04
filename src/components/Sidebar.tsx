import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType, ComponentCategory } from '../types/form';
import { useFormStore } from '../store/formStore';
import { getComponentIcon } from '../utils/componentIcons';
import { Type, TextSelect, Image } from 'lucide-react';

const componentCategories: Record<
  ComponentCategory,
  { icon: React.ElementType; components: ComponentType[] }
> = {
  input: {
    icon: Type,
    components: ['text', 'textarea', 'markdown', 'number', 'code', 'paragraph'],
  },
  select: {
    icon: TextSelect,
    components: ['media', 'slider', 'checkbox', 'radio', 'voting', 'rating', 'time', 'date'],
  },
  media: {
    icon: Image,
    components: ['image', 'web', 'pdf', 'url', 'video', 'audio', 'avatar', 'csv'],
  },
};

const DraggableComponent = ({ type, category }: { type: string; category: ComponentCategory }) => {
  const { addComponent } = useFormStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${category}-${type}`,
    data: {
      type,
      category,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleDoubleClick = () => {
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type: type as ComponentType,
      category,
      config: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        visible: true,
        enabled: true,
        required: false,
      },
    };
    addComponent(newComponent);
  };

  const Icon = getComponentIcon(type as ComponentType);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onDoubleClick={handleDoubleClick}
      className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm cursor-move hover:bg-gray-50"
      style={style}
    >
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-sm">{type}</span>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <p className="text-sm text-gray-500 mb-4">Drag or double-click to add components</p>
      {Object.entries(componentCategories).map(([category, { icon: Icon, components }]) => (
        <div key={category} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5" />
            <h3 className="font-medium capitalize">{category}</h3>
          </div>
          <div className="space-y-2">
            {components.map((type) => (
              <DraggableComponent
                key={type}
                type={type}
                category={category as ComponentCategory}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};