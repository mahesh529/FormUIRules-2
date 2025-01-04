import { CustomAction } from './customActions';

export interface ActionState {
  loading: boolean;
  error: string | null;
  lastRun: number | null;
}

export interface ActionStateStore {
  getState: (actionId: string) => ActionState;
  setState: (actionId: string, state: Partial<ActionState>) => void;
  clearState: (actionId: string) => void;
}