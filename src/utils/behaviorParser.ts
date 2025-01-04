import { ComponentEvent, FormComponent } from '../types/form';

interface ParseResult {
  trigger: ComponentEvent['trigger'];
  action: ComponentEvent['action'];
  targetIds: string[];
  value?: any;
}

export const parseBehaviorText = (
  text: string,
  components: FormComponent[]
): ParseResult => {
  const normalized = text.toLowerCase().trim();
  
  // Extract trigger
  let trigger: ComponentEvent['trigger'] = 'change';
  if (normalized.includes('clicked') || normalized.includes('clicks')) trigger = 'click';
  if (normalized.includes('focused') || normalized.includes('focuses')) trigger = 'focus';
  if (normalized.includes('blurred') || normalized.includes('blurs')) trigger = 'blur';

  // Extract action and handle special cases
  let action: ComponentEvent['action'] = 'show';
  if (normalized.includes('hide')) action = 'hide';
  if (normalized.includes('enable')) action = 'enable';
  if (normalized.includes('disable')) action = 'disable';
  if (normalized.includes('update') || normalized.includes('set')) action = 'setValue';

  // Find target components by their labels
  const targetIds = components
    .filter(c => {
      const label = c.config.label.toLowerCase();
      return normalized.includes(label);
    })
    .map(c => c.id);

  // Extract value for setValue action
  let value: any = undefined;
  if (action === 'setValue') {
    const valueMatch = normalized.match(/to\s+["']?([^"']+)["']?/);
    if (valueMatch) {
      value = valueMatch[1];
    }
  }

  return { trigger, action, targetIds, value };
};

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
        `When ${label} is set to "Yes", show Additional Questions`,
        `When ${label} is set to "No", hide Additional Questions`
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