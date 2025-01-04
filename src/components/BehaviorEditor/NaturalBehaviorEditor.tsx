import React from 'react';
import { FormComponent, ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { getComponentIcon } from '../../utils/componentIcons';
import { NaturalLanguageInput } from './NaturalLanguageInput';
import { ArrowRight, Trash2 } from 'lucide-react';

interface NaturalBehaviorEditorProps {
  component: FormComponent;
}

export const NaturalBehaviorEditor: React.FC<NaturalBehaviorEditorProps> = ({ component }) => {
  const { layout, updateComponent } = useFormStore();
  const Icon = getComponentIcon(component.type);

  const handleAddBehavior = (behavior: ComponentEvent) => {
    const events = component.events || [];
    updateComponent(component.id, {
      events: [...events, behavior]
    });
  };

  const handleRemoveBehavior = (index: number) => {
    const events = component.events || [];
    updateComponent(component.id, {
      events: events.filter((_, i) => i !== index)
    });
  };

  const formatBehaviorText = (text: string) => {
    // Highlight field names in blue
    const fieldHighlight = layout.components.reduce((acc, comp) => {
      const regex = new RegExp(`(${comp.config.label})`, 'g');
      return acc.replace(regex, '<span class="text-blue-600 font-medium">$1</span>');
    }, text);

    // Highlight actions in purple
    const actionWords = ['changes', 'clicked', 'focused', 'blurred', 'show', 'hide', 'enable', 'disable', 'update', 'set'];
    const actionHighlight = actionWords.reduce((acc, word) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      return acc.replace(regex, '<span class="text-purple-600 font-medium">$1</span>');
    }, fieldHighlight);

    return actionHighlight;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Component Header */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <Icon className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="font-semibold">{component.config.label}</h2>
          <p className="text-sm text-gray-500">Configure how this component interacts with others</p>
        </div>
      </div>

      {/* Natural Language Input */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <NaturalLanguageInput 
          component={component} 
          onAddBehavior={handleAddBehavior} 
        />
      </div>

      {/* Existing Behaviors */}
      {(component.events || []).map((event, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div 
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: formatBehaviorText(
                    `When ${component.config.label} ${event.trigger === 'change' ? 'changes' : event.trigger}`
                  )
                }}
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
              <div 
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: formatBehaviorText(
                    event.action === 'show' ? 'Show' :
                    event.action === 'hide' ? 'Hide' :
                    event.action === 'enable' ? 'Enable' :
                    event.action === 'disable' ? 'Disable' :
                    'Update'
                  )
                }}
              />
              <div 
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: formatBehaviorText(
                    event.targetIds
                      .map(targetId => layout.components.find(c => c.id === targetId)?.config.label)
                      .filter(Boolean)
                      .join(', ')
                  )
                }}
              />
            </div>
            <button
              onClick={() => handleRemoveBehavior(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};