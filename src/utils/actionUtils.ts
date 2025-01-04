import { CustomActionContext } from '../types/customActions';
import { actionStateStore } from './actionStateStore';

const RATE_LIMIT_MS = 1000; // 1 second between calls

export const isRateLimited = (actionId: string): boolean => {
  const state = actionStateStore.getState(actionId);
  if (!state.lastRun) return false;
  
  return Date.now() - state.lastRun < RATE_LIMIT_MS;
};

export const validateExpression = (expression: string): boolean => {
  try {
    // Test compile the expression
    Function('context', `with(context){return ${expression}}`);
    return true;
  } catch {
    return false;
  }
};

export const createActionId = (context: CustomActionContext, actionName: string): string => {
  return `${context.sourceComponent.id}-${actionName}`;
};