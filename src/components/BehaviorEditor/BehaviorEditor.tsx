import React, { useState } from 'react';
import { ComponentEvent } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import { AIBehaviorInput } from './AIBehaviorInput';
import { BehaviorList } from './BehaviorList';
import { EditBehaviorModal } from './EditBehaviorModal';

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

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col">
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