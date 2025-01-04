import { useEffect, useState } from 'react';
import { actionStateStore } from '../utils/actionStateStore';
import { ActionState } from '../types/actionState';

export const useActionState = (actionId: string) => {
  const [state, setState] = useState<ActionState>(
    actionStateStore.getState(actionId)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setState(actionStateStore.getState(actionId));
    }, 100);

    return () => clearInterval(interval);
  }, [actionId]);

  return state;
};