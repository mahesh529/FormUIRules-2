import React from 'react';
import { FormComponent } from '../../types/form';
import { NaturalBehaviorEditor } from './NaturalBehaviorEditor';

interface FlowEditorProps {
  component: FormComponent;
}

export const FlowEditor: React.FC<FlowEditorProps> = ({ component }) => {
  return <NaturalBehaviorEditor component={component} />;
};