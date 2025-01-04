import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertyEditor } from './components/PropertyEditor';
import { BehaviorEditor } from './components/BehaviorEditor';
import { useFormStore } from './store/formStore';
import { Layout, LayoutGrid } from 'lucide-react';

export default function App() {
  const { layout, addComponent, moveComponent, setSelectedComponent } = useFormStore();
  const [activeTab, setActiveTab] = useState<'builder' | 'behavior'>('builder');

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type) {
      setSelectedComponent(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.type && over.id === 'canvas') {
      const { type, category } = active.data.current;
      const newComponent = {
        id: `${type}-${Date.now()}`,
        type,
        category,
        label: type.charAt(0).toUpperCase() + type.slice(1),
        required: false,
        properties: {},
        config: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          visible: true,
          enabled: true,
          required: false,
        }
      };
      addComponent(newComponent);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeIndex = layout.components.findIndex((comp) => comp.id === activeId);
    const overIndex = layout.components.findIndex((comp) => comp.id === overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      moveComponent(activeIndex, overIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('builder')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'builder'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Form Builder
            </button>
            <button
              onClick={() => setActiveTab('behavior')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'behavior'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Layout className="w-4 h-4" />
              Form Behavior
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'builder' ? (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="flex h-[calc(100vh-57px)]">
            <Sidebar />
            <SortableContext
              items={layout.components.map((comp) => comp.id)}
              strategy={verticalListSortingStrategy}
            >
              <Canvas />
            </SortableContext>
            <PropertyEditor />
          </div>
        </DndContext>
      ) : (
        <div className="flex h-[calc(100vh-57px)]">
          <div className="flex-1 border-r border-gray-200">
            <Canvas preview />
          </div>
          <div className="w-[600px]">
            <BehaviorEditor />
          </div>
        </div>
      )}
    </div>
  );
}