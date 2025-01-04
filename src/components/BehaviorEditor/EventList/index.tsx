import React from 'react';
import { FormComponent } from '../../../types/form';
import { EventItem } from './EventItem';
import { Plus } from 'lucide-react';
import { useFormStore } from '../../../store/formStore';
import { createDefaultEvent } from '../../../utils/eventUtils';

interface EventListProps {
  component: FormComponent;
}

export const EventList: React.FC<EventListProps> = ({ component }) => {
  const { updateComponent } = useFormStore();
  const events = component.events || [];

  const handleAddEvent = () => {
    updateComponent(component.id, {
      events: [...events, createDefaultEvent()],
    });
  };

  const handleUpdateEvent = (index: number, updates: any) => {
    const newEvents = events.map((event, i) =>
      i === index ? { ...event, ...updates } : event
    );
    updateComponent(component.id, { events: newEvents });
  };

  const handleRemoveEvent = (index: number) => {
    updateComponent(component.id, {
      events: events.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Configure how this component interacts with others
        </p>
        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No events configured</p>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <EventItem
              key={index}
              event={event}
              onChange={(updates) => handleUpdateEvent(index, updates)}
              onRemove={() => handleRemoveEvent(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};