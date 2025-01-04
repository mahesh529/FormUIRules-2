import React from 'react';
import { ArrowRight, Trash2, Edit2 } from 'lucide-react';
import { ComponentEvent, FormComponent } from '../../../types/form';
import { BehaviorHighlighter } from '../../../utils/ai/highlighter';

interface BehaviorItemProps {
  component: FormComponent;
  event: ComponentEvent;
  index: number;
  components: FormComponent[];
  onEdit: () => void;
  onRemove: () => void;
}

export const BehaviorItem: React.FC<BehaviorItemProps> = ({
  component,
  event,
  components,
  onEdit,
  onRemove
}) => (
  <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <BehaviorHighlighter
          text={`When ${component.config.label} ${event.trigger === 'change' ? 'changes' : event.trigger}`}
          components={components}
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
                   .map(id => components.find(c => c.id === id)?.config.label)
                   .filter(Boolean)
                   .join(', ')}`}
          components={components}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);