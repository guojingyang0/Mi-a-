import React from 'react';
import { CVarDefinition } from '../types';

interface SelectControlProps {
  definition: CVarDefinition;
  value: number;
  onChange: (id: string, val: number) => void;
  onExplain: (def: CVarDefinition) => void;
  langStrings: any;
  optionsTranslation: any;
}

const SelectControl: React.FC<SelectControlProps> = ({ definition, value, onChange, onExplain, langStrings, optionsTranslation }) => {
  
  const getTranslatedLabel = (label: string) => {
    // Attempt to match common keywords in the label to translate them
    // Example: "Off (Clean)" -> "关闭 (Clean)" or just lookup mapping
    // Simple approach: Check if label exists in optionsTranslation map
    const key = label.split(' ')[0].toLowerCase();
    if (optionsTranslation[key]) {
        // If the label has extra info like "(Clean)", append it back
        const extra = label.includes('(') ? ` (${label.split('(')[1]}` : '';
        // Special case for 'clean'
        if (label.includes('Clean')) return `${optionsTranslation['off']} (${optionsTranslation['clean']})`;
        return optionsTranslation[key] + extra.replace(')', '');
    }
    return label;
  };

  return (
    <div className="mb-6 p-4 bg-hotta-surface border border-hotta-border rounded-lg hover:border-hotta-accent/50 transition-colors group shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <label className="font-display text-sm font-semibold tracking-wider text-hotta-text-main">
            {definition.name}
          </label>
           <button 
            onClick={() => onExplain(definition)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-hotta-accent hover:text-hotta-highlight"
            title={langStrings.askAi}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {definition.options?.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(definition.id, opt.value)}
            className={`
              px-3 py-1.5 text-xs font-mono uppercase tracking-wide rounded-md border transition-all
              ${value === opt.value 
                ? 'bg-hotta-accent text-white border-hotta-accent shadow-lg shadow-hotta-accent/20' 
                : 'bg-hotta-base border-hotta-border text-hotta-text-muted hover:border-hotta-accent hover:text-hotta-text-main'
              }
            `}
          >
            {getTranslatedLabel(opt.label)}
          </button>
        ))}
      </div>

      <div className="mt-2 text-xs text-hotta-text-muted font-mono">
        {definition.command}
      </div>
      <p className="mt-1 text-xs text-hotta-text-muted/80">
        {definition.description}
      </p>
    </div>
  );
};

export default SelectControl;