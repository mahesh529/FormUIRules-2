import { ActionState, ActionStateStore } from '../types/actionState';

const createActionStateStore = (): ActionStateStore => {
  const states = new Map<string, ActionState>();

  const getDefaultState = (): ActionState => ({
    loading: false,
    error: null,
    lastRun: null,
  });

  return {
    getState: (actionId: string) => {
      return states.get(actionId) || getDefaultState();
    },
    setState: (actionId: string, updates: Partial<ActionState>) => {
      const currentState = states.get(actionId) || getDefaultState();
      states.set(actionId, { ...currentState, ...updates });
    },
    clearState: (actionId: string) => {
      states.delete(actionId);
    },
  };
};

export const actionStateStore = createActionStateStore();