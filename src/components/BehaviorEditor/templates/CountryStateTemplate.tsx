import React from 'react';
import { FormComponent } from '../../../types/form';
import { useFormStore } from '../../../store/formStore';
import { MapPin } from 'lucide-react';

interface CountryStateTemplateProps {
  onApply: (behavior: string) => void;
}

export const CountryStateTemplate: React.FC<CountryStateTemplateProps> = ({ onApply }) => {
  const { layout } = useFormStore();
  const countryComponents = layout.components.filter(c => 
    c.config.label.toLowerCase().includes('country')
  );
  const stateComponents = layout.components.filter(c => 
    c.config.label.toLowerCase().includes('state') || 
    c.config.label.toLowerCase().includes('province')
  );

  if (countryComponents.length === 0 || stateComponents.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-blue-900">Country-State Behavior</h3>
      </div>
      <p className="text-sm text-blue-700 mb-4">
        Automatically update state/province options when country changes
      </p>
      {countryComponents.map(country => 
        stateComponents.map(state => (
          <button
            key={`${country.id}-${state.id}`}
            onClick={() => onApply(
              `When ${country.config.label} changes, update ${state.config.label} options`
            )}
            className="w-full text-left text-sm text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors"
          >
            {country.config.label} → {state.config.label}
          </button>
        ))
      )}
    </div>
  );
};