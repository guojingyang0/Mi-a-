import React from 'react';

interface ResolutionPickerProps {
  widthValue: number;
  heightValue: number;
  onChange: (width: number, height: number) => void;
  label: string;
  langStrings: any;
}

const PRESETS = [
  { label: '1080p (FHD)', w: 1920, h: 1080 },
  { label: '1440p (2K)', w: 2560, h: 1440 },
  { label: '2160p (4K)', w: 3840, h: 2160 },
  { label: 'Ultrawide (21:9)', w: 2560, h: 1080 },
  { label: 'Ultrawide (21:9)', w: 3440, h: 1440 },
  { label: 'Ultrawide+ (21:9)', w: 3840, h: 1600 },
  { label: 'Super Ultrawide (32:9)', w: 5120, h: 1440 },
  { label: '720p (HD)', w: 1280, h: 720 },
];

const ResolutionPicker: React.FC<ResolutionPickerProps> = ({ widthValue, heightValue, onChange, label, langStrings }) => {
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "custom") return;
    const [w, h] = val.split('x').map(Number);
    onChange(w, h);
  };

  const currentKey = `${widthValue}x${heightValue}`;
  const isCustom = !PRESETS.some(p => `${p.w}x${p.h}` === currentKey);

  return (
    <div className="mb-6 p-4 bg-hotta-surface border border-hotta-border rounded-lg hover:border-hotta-accent/50 transition-colors group shadow-sm">
      <div className="flex justify-between items-center mb-3">
         <label className="font-display text-sm font-semibold tracking-wider text-hotta-text-main">
            {label}
          </label>
      </div>

      <div className="space-y-3">
        <div className="relative">
            <select
              value={isCustom ? "custom" : currentKey}
              onChange={handlePresetChange}
              className="w-full appearance-none bg-hotta-base border border-hotta-border rounded px-3 py-2 text-sm font-mono text-hotta-text-main focus:outline-none focus:border-hotta-accent pr-8"
            >
              {PRESETS.map(p => (
                <option key={`${p.w}x${p.h}`} value={`${p.w}x${p.h}`}>
                  {p.w} x {p.h} - {p.label}
                </option>
              ))}
              <option value="custom">{langStrings.custom} ...</option>
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-hotta-text-muted">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative flex-1">
             <input
              type="number"
              value={widthValue}
              onChange={(e) => onChange(parseInt(e.target.value) || 0, heightValue)}
              className="w-full bg-hotta-base border border-hotta-border rounded px-3 py-2 text-sm font-mono text-hotta-text-main focus:outline-none focus:border-hotta-accent pl-12"
             />
             <span className="absolute left-3 top-2 text-xs text-hotta-text-muted font-bold opacity-70">W</span>
           </div>
           
           <span className="text-hotta-text-muted font-mono">x</span>
           
           <div className="relative flex-1">
             <input
              type="number"
              value={heightValue}
              onChange={(e) => onChange(widthValue, parseInt(e.target.value) || 0)}
              className="w-full bg-hotta-base border border-hotta-border rounded px-3 py-2 text-sm font-mono text-hotta-text-main focus:outline-none focus:border-hotta-accent pl-12"
             />
             <span className="absolute left-3 top-2 text-xs text-hotta-text-muted font-bold opacity-70">H</span>
           </div>
        </div>
      </div>
      
       <div className="mt-2 text-xs text-hotta-text-muted font-mono">
        ResolutionSizeX / ResolutionSizeY
      </div>
    </div>
  );
};

export default ResolutionPicker;