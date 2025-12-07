export interface CVarDefinition {
  id: string;
  name: string;
  command: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: number }[];
  type: 'slider' | 'select' | 'toggle' | 'number';
  category: ConfigCategory;
  defaultValue: number;
  section?: string; // Default: SystemSettings
  valueType?: 'number' | 'boolean'; // Default: number (0/1)
  fileName: 'Engine.ini' | 'GameUserSettings.ini'; // New field
}

export type ConfigCategory = 'rendering' | 'postprocess' | 'shadows' | 'effects' | 'streaming' | 'scalability' | 'automation';

export interface ConfigState {
  [key: string]: number;
}

export interface Preset {
  name: string;
  description: string;
  values: ConfigState;
}

export interface AiResponseSchema {
  explanation?: string;
  recommendedSettings?: ConfigState;
}