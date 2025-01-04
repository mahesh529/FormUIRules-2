import React from 'react';
import { useFormStore } from '../../store/formStore';
import { ArrowRight, Trash2, Edit2 } from 'lucide-react';
import { BehaviorHighlighter } from '../../utils/ai/behaviorHighlighter';

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
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <BehaviorHighlighter
                      text={`When ${component.config.label} ${event.trigger === 'change' ? 'changes' : event.trigger}`}
                      components={layout.components}
                    />
                    {event.conditionGroups?.[0]?.conditions?.[0] && (
                      <div className="text-sm text-gray-500">
                        and value {event.conditionGroups[0].conditions[0].operator}{' '}
                        {event.conditionGroups[0].conditions[0].value || 'is empty'}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <BehaviorHighlighter
                      text={`${event.action === 'show' ? 'Show' :
                             event.action === 'hide' ? 'Hide' :
                             event.action === 'enable' ? 'Enable' :
                             event.action === 'disable' ? 'Disable' :
                             'Update'} ${event.targetIds
                               .map(id => layout.components.find(c => c.id === id)?.config.label)
                               .filter(Boolean)
                               .join(', ')}`}
                      components={layout.components}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(component.id, index)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveBehavior(component.id, index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};