import { FormComponent } from '../../types/form';

export const generateBehaviorSuggestions = (
  component: FormComponent,
  components: FormComponent[]
): string[] => {
  const suggestions: string[] = [];
  const label = component.config.label;

  // Basic interactions
  suggestions.push(
    `When ${label} changes, show Additional Details`,
    `When ${label} is clicked, hide Instructions`,
    `When ${label} changes, enable Submit Button`
  );

  // Type-specific suggestions
  switch (component.type) {
    case 'checkbox':
      suggestions.push(
        `When ${label} is checked, show Optional Fields`,
        `When ${label} is unchecked, hide Optional Fields`
      );
      break;

    case 'radio':
      suggestions.push(
        `When ${label} equals "Yes", show Additional Questions`,
        `When ${label} equals "No", hide Additional Questions`
      );
      break;

    case 'number':
      suggestions.push(
        `When ${label} is greater than 100, show Warning Message`,
        `When ${label} is less than 0, disable Submit Button`
      );
      break;
  }

  // Find related components by name
  const relatedComponents = components.filter(c => 
    c.id !== component.id && 
    (c.config.label.includes(component.config.label) || 
     component.config.label.includes(c.config.label))
  );

  relatedComponents.forEach(related => {
    suggestions.push(`When ${label} changes, update ${related.config.label}`);
  });

  return suggestions;
};