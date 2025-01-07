import { FormComponent } from '../../types/form';

export const generateBehaviorSuggestions = (
  components: FormComponent[]
): string[] => {
  const suggestions: string[] = [];

  components.forEach(component => {
    const label = component?.config.label || '';

    // Basic interaction for each component
    components.forEach(targetComponent => {
      if (targetComponent.id !== component.id) {
        const targetLabel = targetComponent.config.label;
        suggestions.push(`When ${label} changes, update ${targetLabel}`);
      }
    });

    // Type-specific suggestion for each component
    switch (component.type) {
      case 'checkbox':
        components.forEach(targetComponent => {
          if (targetComponent.id !== component.id) {
            const targetLabel = targetComponent.config.label;
            suggestions.push(`When ${label} is checked, show ${targetLabel}`);
          }
        });
        break;

      case 'radio':
        components.forEach(targetComponent => {
          if (targetComponent.id !== component.id) {
            const targetLabel = targetComponent.config.label;
            suggestions.push(`When ${label} equals "Yes", show ${targetLabel}`);
          }
        });
        break;

      case 'number':
        components.forEach(targetComponent => {
          if (targetComponent.id !== component.id) {
            const targetLabel = targetComponent.config.label;
            suggestions.push(`When ${label} is greater than 100, show ${targetLabel}`);
          }
        });
        break;
    }
  });

  return suggestions;
};