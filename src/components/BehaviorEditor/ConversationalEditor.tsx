import React, { useState } from 'react';
import { FormComponent, ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { MessageSquare, Wand2, ArrowRight, Trash2 } from 'lucide-react';
import { parseBehaviorText } from '../../utils/behaviorParser';
import { HighlightedText } from './HighlightedText';
import { BehaviorSuggestions } from './BehaviorSuggestions';

export const ConversationalEditor: React.FC = () => {
  const [input, setInput] = useState('');
  const { layout, updateComponent } = useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Find the source component from the input text
    const sourceComponent = layout.components.find(component => 
      input.toLowerCase().includes(component.config.label.toLowerCase())
    );

    if (!sourceComponent) return;

    const { trigger, action, targetIds, value } = parseBehaviorText(input, layout.components);
    
    const behavior: ComponentEvent = {
      trigger,
      action,
      targetIds,
      conditionGroups: value ? [{
        operator: 'and',
        conditions: [{
          field: 'value',
          operator: 'equals',
          value
        }]
      }] : []
    };

    const events = sourceComponent.events || [];
    updateComponent(sourceComponent.id, {
      events: [...events, behavior]
    });
    setInput('');
  };

  const handleRemoveBehavior = (componentId: string, index: number) => {
    const component = layout.components.find(c => c.id === componentId);
    if (!component) return;

    const events = component.events || [];
    updateComponent(componentId, {
      events: events.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col">
      {/* Behavior List */}
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
                      <HighlightedText
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
                      <HighlightedText
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
                    <button
                      onClick={() => handleRemoveBehavior(component.id, index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the behavior in natural language... (e.g., When Email changes, show Password field)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </form>

          <BehaviorSuggestions onSelect={setInput} />
        </div>
      </div>
    </div>
  );
};