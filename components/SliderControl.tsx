import React from 'react';
import { CVarDefinition } from '../types';

interface SliderControlProps {
  definition: CVarDefinition;
  value: number;
  onChange: (id: string, val: number) => void;
  onExplain: (def: CVarDefinition) => void;
  langStrings: any; // Using any for simplicity in component props mapping
}

const SliderControl: React.FC<SliderControlProps> = ({ definition, value, onChange, onExplain, langStrings }) => {
  return (
    <div className="mb-6 p-4 bg-hotta-surface border border-hotta-border rounded-lg hover:border-hotta-accent/50 transition-colors group shadow-sm">
      <div className="flex justify-between items-center mb-2">
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
        <span className="font-mono text-hotta-accent text-sm bg-hotta-surface-alt px-2 py-0.5 rounded font-bold">
          {value}
        </span>
      </div>
      
      <input
        type="range"
        min={definition.min}
        max={definition.max}
        step={definition.step}
        value={value}
        onChange={(e) => onChange(definition.id, parseFloat(e.target.value))}
        className="w-full h-2 bg-hotta-surface-alt rounded-lg appearance-none cursor-pointer accent-hotta-accent hover:accent-hotta-highlight transition-all"
      />
      
      <div className="mt-2 text-xs text-hotta-text-muted font-mono">
        {definition.command}
      </div>
      <p className="mt-1 text-xs text-hotta-text-muted/80">
        {definition.description}
      </p>
    </div>
  );
};

export default SliderControl;