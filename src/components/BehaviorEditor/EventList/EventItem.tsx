// Add to imports
import { CodeEditor } from '../../Canvas/previews/CodeEditor';

// Update the EventItem component
export const EventItem: React.FC<EventItemProps> = ({ 
  event, 
  onChange, 
  onRemove 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-4 flex-1">
          <div className="flex gap-4">
            <EventTrigger
              value={event.trigger}
              onChange={(trigger) => onChange({ trigger })}
            />
            <EventAction
              value={event.action}
              onChange={(action) => onChange({ action })}
            />
          </div>
          
          {event.action === 'customJs' ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Custom JavaScript
              </label>
              <div className="text-xs text-gray-500 mb-2">
                Available variables: value, component, targetComponents, values, updateValue
              </div>
              <CodeEditor
                component={{
                  type: 'code',
                  config: {
                    language: 'javascript',
                    theme: 'vs-dark',
                    fontSize: 14,
                    lineNumbers: true,
                  }
                }}
                value={event.customCode || ''}
                onChange={(code) => onChange({ customCode: code })}
              />
            </div>
          ) : (
            <>
              <EventTargets
                value={event.targetIds}
                onChange={(targetIds) => onChange({ targetIds })}
              />
              <EventConditions
                value={event.conditionGroups || []}
                onChange={(conditionGroups) => onChange({ conditionGroups })}
              />
            </>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};