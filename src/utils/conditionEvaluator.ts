import { Condition, ConditionGroup } from '../types/form';

const evaluateCondition = (condition: Condition, context: Record<string, any>): boolean => {
  const { field, operator, value } = condition;
  const fieldValue = field === 'value' ? context.value : context[field];

  // Handle component references
  let compareValue = value;
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const refKey = value.slice(1, -1);
    compareValue = context.values[refKey];
  }

  switch (operator) {
    case 'equals':
      return fieldValue === compareValue;
    case 'notEquals':
      return fieldValue !== compareValue;
    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(compareValue).toLowerCase());
    case 'notContains':
      return !String(fieldValue).toLowerCase().includes(String(compareValue).toLowerCase());
    case 'greaterThan':
      return Number(fieldValue) > Number(compareValue);
    case 'lessThan':
      return Number(fieldValue) < Number(compareValue);
    case 'empty':
      return fieldValue === undefined || fieldValue === null || fieldValue === '';
    case 'notEmpty':
      return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
    case 'startsWith':
      return String(fieldValue).toLowerCase().startsWith(String(compareValue).toLowerCase());
    case 'endsWith':
      return String(fieldValue).toLowerCase().endsWith(String(compareValue).toLowerCase());
    case 'matches':
      try {
        const regex = new RegExp(compareValue, 'i');
        return regex.test(String(fieldValue));
      } catch {
        return false;
      }
    default:
      return false;
  }
};

export const evaluateConditionGroups = (
  conditionGroups: ConditionGroup[] | undefined,
  context: Record<string, any>
): boolean => {
  if (!conditionGroups || conditionGroups.length === 0) return true;

  return conditionGroups.every(group => {
    const results = group.conditions.map(condition => 
      evaluateCondition(condition, context)
    );

    return group.operator === 'and' 
      ? results.every(Boolean) 
      : results.some(Boolean);
  });
};