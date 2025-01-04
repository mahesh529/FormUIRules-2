import React, { useState } from 'react';
import { ComponentEvent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import { parseBehaviorPrompt } from '../../../utils/ai/parser';
import { InputForm } from './InputForm';
import { Suggestions } from './Suggestions';

interface AIBehaviorInputProps {
  onAddBehavior: (behavior: ComponentEvent) => void;
}

export const AIBehaviorInput: React.FC<AIBehaviorInputProps> = ({ onAddBehavior }) => {
  const [input, setInput] = useState('');
  const { layout } = useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parsed = parseBehaviorPrompt(input, layout.components);
    if (!parsed.sourceComponent) return;

    const behavior: ComponentEvent = {
      sourceComponent: parsed.sourceComponent,
      trigger: parsed.trigger,
      action: parsed.action,
      targetIds: parsed.targetComponents,
      conditionGroups: parsed.conditions ? [{
        operator: 'and',
        conditions: parsed.conditions
      }] : []
    };

    onAddBehavior(behavior);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <InputForm
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        components={layout.components}
      />
      <Suggestions 
        components={layout.components}
        onSelect={setInput}
      />
    </div>
  );
};