import React from 'react';
import { useActionState } from '../hooks/useActionState';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ActionFeedbackProps {
  actionId: string;
}

export const ActionFeedback: React.FC<ActionFeedbackProps> = ({ actionId }) => {
  const state = useActionState(actionId);

  if (!state.loading && !state.error) return null;

  return (
    <div className="mt-1 text-sm">
      {state.loading && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Running action...</span>
        </div>
      )}
      {state.error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{state.error}</span>
        </div>
      )}
    </div>
  );
};