import React from 'react';
import { useFormStore } from '../../../store/formStore';
import { BehaviorItem } from './BehaviorItem';

interface BehaviorListProps {
  onEdit: (componentId: string, behaviorIndex: number) => void;
}

export const BehaviorList: React.FC<BehaviorListProps> = ({ onEdit }) => {
  const { layout, updateComponent } = useFormStore();

  const handleRemoveBehavior = (componentId: string, index: number) => {
    const component = layout.components.find(c => c.id === componentId);
    if (!component) return;

    const events = component.events || [];
    updateComponent(componentId, {
      events: events.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      {layout.components.map(component => {
        const events = component.events || [];
        if (events.length === 0) return null;

        return (
          <div key={component.id} className="space-y-3">
            <div className="font-medium text-gray-700">{component.config.label}</div>
            {events.map((event, index) => (
              <BehaviorItem
                key={index}
                component={component}
                event={event}
                index={index}
                components={layout.components}
                onEdit={() => onEdit(component.id, index)}
                onRemove={() => handleRemoveBehavior(component.id, index)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};