import React from 'react';
import { FormComponent } from '../../types/form';
import { EventList } from './EventList';

interface EventEditorProps {
  component: FormComponent;
}

export const EventEditor: React.FC<EventEditorProps> = ({ component }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">{component.label}</h2>
        <p className="text-gray-500">Configure component behavior</p>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-4">Events</h3>
        <EventList component={component} />
      </section>
    </div>
  );
};