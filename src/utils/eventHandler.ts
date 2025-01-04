import { ComponentEvent, FormComponent } from '../types/form';
import { FormStore } from '../types/store';
import { evaluateConditionGroups } from './conditionEvaluator';

export const handleComponentEvent = (
  event: ComponentEvent,
  sourceComponent: FormComponent,
  value: any,
  store: FormStore
) => {
  const { targetIds, action, conditionGroups, customCode } = event;

  // Evaluate conditions
  const context = { 
    value,
    component: sourceComponent,
    values: store.values
  };

  if (!evaluateConditionGroups(conditionGroups, context)) {
    return;
  }

  // Get target components
  const targetComponents = targetIds
    .map(id => store.layout.components.find(c => c.id === id))
    .filter((c): c is FormComponent => !!c);

  // Handle custom JavaScript
  if (action === 'customJs' && customCode) {
    try {
      // Create a safe function from the code
      const fn = new Function('context', `
        with (context) {
          ${customCode}
        }
      `);
      
      // Execute with the provided context
      fn({
        value,
        component: sourceComponent,
        targetComponents,
        values: store.values,
        updateValue: store.updateValue
      });
      return;
    } catch (error) {
      console.error('Error executing custom JS:', error);
      return;
    }
  }

  // Handle other actions
  targetIds.forEach(targetId => {
    switch (action) {
      case 'show':
        store.updateComponent(targetId, { config: {
          visible: true,
          label: '',
          enabled: false,
          required: false
        } });
        break;
      case 'hide':
        store.updateComponent(targetId, { config: {
          visible: false,
          label: '',
          enabled: false,
          required: false
        } });
        break;
      case 'enable':
        store.updateComponent(targetId, { config: {
          enabled: true,
          label: '',
          visible: false,
          required: false
        } });
        break;
      case 'disable':
        store.updateComponent(targetId, { config: {
          enabled: false,
          label: '',
          visible: false,
          required: false
        } });
        break;
      case 'setValue':
        store.updateValue(targetId, value);
        break;
    }
  });
};