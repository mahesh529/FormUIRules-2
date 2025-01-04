import { CustomAction, CustomActionRegistry, CustomActionContext } from '../types/customActions';
import { actionStateStore } from './actionStateStore';
import { createActionId, isRateLimited, validateExpression } from './actionUtils';

const registry: CustomActionRegistry = {};

export const registerCustomAction = (action: CustomAction) => {
  const wrappedHandler = async (context: CustomActionContext) => {
    const actionId = createActionId(context, action.name);
    
    // Check rate limiting
    if (isRateLimited(actionId)) {
      actionStateStore.setState(actionId, {
        error: 'Action rate limited. Please wait.',
      });
      return;
    }

    try {
      actionStateStore.setState(actionId, {
        loading: true,
        error: null,
        lastRun: Date.now(),
      });

      await action.handler(context);
      
      actionStateStore.setState(actionId, {
        loading: false,
        error: null,
      });
    } catch (error) {
      actionStateStore.setState(actionId, {
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  };

  registry[action.name] = {
    ...action,
    handler: wrappedHandler,
  };
};

export const getCustomAction = (name: string) => registry[name];
export const getCustomActions = () => Object.values(registry);

// Register default actions
registerCustomAction({
  name: 'evaluateExpression',
  label: 'Evaluate Expression',
  description: 'Evaluate a custom JavaScript expression',
  handler: ({ sourceValue, sourceComponent, targetComponents, store }) => {
    const expression = sourceComponent.properties.customExpression;
    if (!expression) return;
    
    if (!validateExpression(expression)) {
      throw new Error('Invalid expression syntax');
    }

    const context = {
      value: sourceValue,
      source: sourceComponent,
      targets: targetComponents,
      values: store.values,
    };

    const result = Function('context', `with(context){return ${expression}}`)(context);
    
    if (targetComponents.length > 0) {
      store.updateValue(targetComponents[0].id, result);
    }
  },
});

registerCustomAction({
  name: 'fetchData',
  label: 'Fetch External Data',
  description: 'Fetch data from an external API',
  handler: async ({ sourceValue, targetComponents, store, sourceComponent }) => {
    const { endpoint, method = 'GET', headers = {} } = sourceComponent.properties.api || {};
    if (!endpoint) {
      throw new Error('API endpoint not configured');
    }

    const response = await fetch(endpoint.replace('{value}', sourceValue), {
      method,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    targetComponents.forEach((target) => {
      const value = data[target.properties.dataPath];
      if (value !== undefined) {
        store.updateValue(target.id, value);
      }
    });
  },
});