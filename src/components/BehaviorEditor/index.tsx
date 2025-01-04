import React, { useState } from 'react';
import { ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { AIBehaviorInput } from './AIBehaviorInput';
import { BehaviorList } from './BehaviorList';
import  {EditBehaviorModal}  from './EditBehaviorModal';
import { Download } from 'lucide-react';

export const BehaviorEditor: React.FC = () => {
  const { layout, updateComponent } = useFormStore();
  const [editingBehavior, setEditingBehavior] = useState<{
    componentId: string;
    behaviorIndex: number;
  } | null>(null);

  const handleAddBehavior = (behavior: ComponentEvent) => {
    const sourceComponent = layout.components.find(
      c => c.id === behavior.sourceComponent
    );
    if (sourceComponent) {
      const events = sourceComponent.events || [];
      updateComponent(sourceComponent.id, {
        events: [...events, behavior]
      });
    }
  };

  const handleUpdateBehavior = (componentId: string, index: number, behavior: ComponentEvent) => {
    const component = layout.components.find(c => c.id === componentId);
    if (!component) return;

    const events = [...(component.events || [])];
    events[index] = behavior;
    updateComponent(componentId, { events });
    setEditingBehavior(null);
  };

  const handleExportJSON = () => {
    // Create a formatted JSON with behaviors
    const behaviors = layout.components.reduce((acc, component) => {
      if (component.events?.length) {
        acc[component.config.label] = component.events;
      }
      return acc;
    }, {} as Record<string, ComponentEvent[]>);

    // Create and download file
    const blob = new Blob([JSON.stringify(behaviors, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-behaviors.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasBehaviors = layout.components.some(c => c.events?.length > 0);

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col">
      {/* Header with Export */}
      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Form Behaviors</h2>
        {hasBehaviors && (
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        )}
      </div>

      {/* AI Behavior Input */}
      <div className="p-6 bg-white border-b border-gray-200">
        <AIBehaviorInput onAddBehavior={handleAddBehavior} />
      </div>

      {/* Behavior List */}
      <BehaviorList 
        onEdit={(componentId, behaviorIndex) => 
          setEditingBehavior({ componentId, behaviorIndex })
        } 
      />

      {/* Edit Modal */}
      {editingBehavior && (
        <EditBehaviorModal
          componentId={editingBehavior.componentId}
          behaviorIndex={editingBehavior.behaviorIndex}
          onSave={handleUpdateBehavior}
          onClose={() => setEditingBehavior(null)}
        />
      )}
    </div>
  );
};