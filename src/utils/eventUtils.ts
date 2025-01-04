// Update EVENT_ACTIONS
export const EVENT_ACTIONS = [
  { value: 'show', label: 'Show' },
  { value: 'hide', label: 'Hide' },
  { value: 'enable', label: 'Enable' },
  { value: 'disable', label: 'Disable' },
  { value: 'setValue', label: 'Set Value' },
  { value: 'customJs', label: 'Custom JavaScript' },
] as const;

// Add event handler executor
export const executeCustomJs = (
  code: string,
  context: {
    value: any;
    component: FormComponent;
    targetComponents: FormComponent[];
    values: Record<string, any>;
    updateValue: (id: string, value: any) => void;
  }
) => {
  try {
    // Create a safe function from the code
    const fn = new Function('context', `
      with (context) {
        ${code}
      }
    `);
    
    // Execute with the provided context
    fn(context);
  } catch (error) {
    console.error('Error executing custom JS:', error);
  }
};