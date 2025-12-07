import React, { useState, useEffect, useMemo } from 'react';
import { CVAR_DEFINITIONS, CATEGORIES, PRESETS } from './constants';
import { ConfigState, ConfigCategory, CVarDefinition, Preset } from './types';
import SliderControl from './components/SliderControl';
import SelectControl from './components/SelectControl';
import NumberControl from './components/NumberControl';
import ResolutionPicker from './components/ResolutionPicker';
import IniPreview from './components/IniPreview';
import MacroGenerator from './components/MacroGenerator';
import { generateConfigFromPrompt } from './services/geminiService';
import { TRANSLATIONS, Language } from './translations';
import { ParsedIni, parseIni, mergeIni } from './utils/iniParser';
import { detectSystemSpecs } from './utils/hardwareDetect';

// Icons
const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-hotta-accent"><polyline points="20 6 9 17 4 12"/></svg>
);
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hotta-highlight"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const ChipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
);
const LoaderIcon = () => (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
const MagicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
);

const App: React.FC = () => {
  // Default Config
  const [config, setConfig] = useState<ConfigState>(() => {
    const defaults: ConfigState = {};
    CVAR_DEFINITIONS.forEach(def => {
      defaults[def.id] = def.defaultValue;
    });
    return defaults;
  });

  // UI State
  const [activeCategory, setActiveCategory] = useState<ConfigCategory>('rendering');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [appliedCount, setAppliedCount] = useState<number>(0);
  
  // Hardware Detection State
  const [hardwareDetected, setHardwareDetected] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  
  // File Preview State
  const [activeFile, setActiveFile] = useState<'GameUserSettings.ini' | 'Engine.ini'>('GameUserSettings.ini');
  
  // Localization & Theme
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark for gaming vibe

  // Explanation Modal State
  const [explanationId, setExplanationId] = useState<string | null>(null);

  // Import State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState<'GameUserSettings.ini' | 'Engine.ini'>('GameUserSettings.ini');
  const [importText, setImportText] = useState('');
  const [pathCopied, setPathCopied] = useState(false);
  
  // Split state for different files
  const [importedGus, setImportedGus] = useState<ParsedIni | null>(null);
  const [importedEngine, setImportedEngine] = useState<ParsedIni | null>(null);

  const INSTALL_PATH = "%LOCALAPPDATA%\\Hotta\\Saved\\Config\\WindowsNoEditor\\";

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const t = TRANSLATIONS[lang];
  const currentImported = activeFile === 'GameUserSettings.ini' ? importedGus : importedEngine;

  // -- GENERATE INI CONTENT --
  const iniContent = useMemo(() => {
    const fileDefs = CVAR_DEFINITIONS.filter(def => def.fileName === activeFile);
    const updates = fileDefs.map(def => {
        const val = config[def.id] !== undefined ? config[def.id] : def.defaultValue;
        let outputVal: string | number = val;

        if (def.valueType === 'boolean') {
           outputVal = val === 1 ? 'True' : 'False';
        }
        if (typeof outputVal === 'number' && !Number.isInteger(outputVal)) {
            outputVal = outputVal.toFixed(6);
        }
        
        let cleanSection = def.section || 'SystemSettings';
        if (cleanSection.startsWith('[') && cleanSection.endsWith(']')) {
             cleanSection = cleanSection.slice(1, -1);
        }
        
        return {
            section: cleanSection,
            key: def.command,
            value: String(outputVal)
        };
    });

    if (currentImported) {
        return mergeIni(currentImported, updates);
    }

    const grouped: { [section: string]: any[] } = {};
    updates.forEach(upd => {
      if (!grouped[upd.section]) {
        grouped[upd.section] = [];
      }
      grouped[upd.section].push(upd);
    });

    let text = ``;
    Object.keys(grouped).forEach(section => {
        let sectionHeader = section;
        if (!sectionHeader.startsWith('[') && !sectionHeader.startsWith('/')) {
             sectionHeader = `[${sectionHeader}]`;
        } else if (sectionHeader.startsWith('/')) {
             sectionHeader = `[${sectionHeader}]`;
        }

        text += `${sectionHeader}\n`;
        grouped[section].forEach(item => {
          text += `${item.key}=${item.value}\n`;
        });
        text += `\n`;
    });

    text += `; Generated by 幻塔小助手 (ToF Assistant)\n`;
    return text;
  }, [config, activeFile, currentImported]);

  const handleValueChange = (id: string, value: number) => {
    setConfig(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleApplyPreset = (preset: Preset) => {
    setConfig(prev => ({
      ...prev,
      ...preset.values
    }));
  };

  const handleDetectHardware = async () => {
    setIsDetecting(true);
    try {
        const specs = await detectSystemSpecs();
        setAiPrompt(prev => {
            const prefix = prev ? prev + ". " : "";
            return prefix + specs;
        });
        setHardwareDetected(true);
        setTimeout(() => setHardwareDetected(false), 2000);
    } catch (e) {
        console.error("Hardware detection failed", e);
    } finally {
        setIsDetecting(false);
    }
  };

  const handleAiOptimize = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiLoading(true);
    setAiMessage(null);
    setAppliedCount(0);

    try {
      const result = await generateConfigFromPrompt(aiPrompt, config, lang);
      const newSettings = result.settings || {};
      const keysToUpdate = Object.keys(newSettings);

      if (keysToUpdate.length > 0) {
        setConfig(prev => ({
          ...prev,
          ...newSettings
        }));
        setAppliedCount(keysToUpdate.length);
      }
      setAiMessage(result.explanation);
    } catch (error) {
      setAiMessage(t.ui.aiError);
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const handleExplain = (def: CVarDefinition) => {
      setExplanationId(def.id);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const parsed = parseIni(importText);
    
    if (importType === 'GameUserSettings.ini') {
        setImportedGus(parsed);
    } else {
        setImportedEngine(parsed);
    }
    
    const newConfig = { ...config };
    parsed.forEach(section => {
        section.lines.forEach(line => {
            if (line.key && line.value) {
                const def = CVAR_DEFINITIONS.find(d => 
                    d.fileName === importType &&
                    d.command.toLowerCase() === line.key?.toLowerCase() &&
                    d.section?.replace('[','').replace(']','') === section.name
                );
                
                if (def) {
                    let val = parseFloat(line.value);
                    if (def.valueType === 'boolean') {
                        val = (line.value.toLowerCase() === 'true' || line.value === '1') ? 1 : 0;
                    }
                    if (!isNaN(val)) {
                        newConfig[def.id] = val;
                    }
                }
            }
        });
    });
    setConfig(newConfig);
    
    setShowImportModal(false);
    setImportText('');
  };

  const handleCopyPath = () => {
      navigator.clipboard.writeText(INSTALL_PATH);
      setPathCopied(true);
      setTimeout(() => setPathCopied(false), 3000);
  };

  const currentCategoryDefs = CVAR_DEFINITIONS.filter(def => def.category === activeCategory);

  return (
    <div className="h-screen flex flex-col text-hotta-text-main selection:bg-hotta-accent selection:text-white relative overflow-hidden bg-hotta-base">
      
      {/* MODALS */}
      {explanationId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="bg-hotta-surface border border-hotta-border rounded-xl p-6 max-w-md w-full shadow-2xl relative border-t-4 border-t-hotta-accent">
                <button 
                    onClick={() => setExplanationId(null)}
                    className="absolute top-3 right-3 text-hotta-text-muted hover:text-hotta-text-main"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <h3 className="text-hotta-accent font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <RobotIcon />
                    {t.cvars[explanationId as keyof typeof t.cvars]?.name || explanationId}
                </h3>
                <div className="text-hotta-text-main text-sm leading-relaxed font-mono">
                    {t.cvars[explanationId as keyof typeof t.cvars]?.explanation || "No explanation available."}
                </div>
            </div>
        </div>
      )}

      {showImportModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-hotta-surface border border-hotta-border rounded-xl p-6 max-w-2xl w-full shadow-2xl relative flex flex-col h-[85vh] border-t-4 border-t-hotta-highlight">
                 <button 
                    onClick={() => setShowImportModal(false)}
                    className="absolute top-3 right-3 text-hotta-text-muted hover:text-hotta-text-main"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                
                <h3 className="text-hotta-highlight font-display font-bold text-xl mb-4 flex items-center gap-2">
                    <UploadIcon />
                    {t.ui.import}
                </h3>
                
                {/* STEP 1 */}
                <div className="bg-hotta-highlight/5 border border-hotta-highlight/20 rounded-lg p-4 mb-4">
                     <h4 className="text-sm font-bold text-hotta-text-main mb-2 flex items-center gap-2">
                        <span className="bg-hotta-highlight text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono">1</span>
                        {t.ui.stepOpenFolder}
                     </h4>
                     <div className="flex gap-2 items-center">
                         <button 
                            onClick={handleCopyPath}
                            className="flex-shrink-0 px-4 py-2 text-sm font-bold bg-hotta-highlight text-white rounded shadow hover:bg-yellow-500 transition-colors flex items-center gap-2"
                        >
                            <FolderIcon />
                            {t.ui.openFolder}
                        </button>
                         <div className="text-[11px] text-hotta-text-muted leading-tight flex-1">
                            {pathCopied ? (
                                <span className="text-green-500 font-bold animate-pulse">{t.ui.pathCopied}</span>
                            ) : (
                                <span>{t.ui.openFolderHelp} <code className="bg-black/10 dark:bg-black/30 px-1 rounded select-all font-mono text-[10px]">{INSTALL_PATH}</code></span>
                            )}
                        </div>
                     </div>
                </div>

                {/* STEP 2 */}
                <div className="flex-1 flex flex-col min-h-0">
                    <h4 className="text-sm font-bold text-hotta-text-main mb-2 flex items-center gap-2">
                        <span className="bg-hotta-text-muted text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono">2</span>
                        {t.ui.stepPasteContent}
                    </h4>
                    
                    <div className="flex gap-1 mb-0 border-b border-hotta-border">
                        <button 
                            onClick={() => setImportType('GameUserSettings.ini')}
                            className={`px-4 py-2 text-xs font-bold font-mono rounded-t-lg transition-colors border-t border-l border-r ${importType === 'GameUserSettings.ini' ? 'bg-hotta-base border-hotta-border border-b-transparent text-hotta-highlight' : 'bg-hotta-surface border-transparent text-hotta-text-muted hover:text-hotta-text-main'}`}
                        >
                            GameUserSettings.ini
                        </button>
                        <button 
                            onClick={() => setImportType('Engine.ini')}
                            className={`px-4 py-2 text-xs font-bold font-mono rounded-t-lg transition-colors border-t border-l border-r ${importType === 'Engine.ini' ? 'bg-hotta-base border-hotta-border border-b-transparent text-hotta-highlight' : 'bg-hotta-surface border-transparent text-hotta-text-muted hover:text-hotta-text-main'}`}
                        >
                            Engine.ini
                        </button>
                    </div>

                    <div className="flex-1 bg-hotta-base border border-hotta-border rounded-b-lg rounded-tr-lg p-3 relative">
                        <textarea 
                            className="w-full h-full bg-transparent font-mono text-xs text-hotta-text-main focus:outline-none resize-none placeholder-hotta-text-muted/40"
                            placeholder={importType === 'GameUserSettings.ini' ? t.ui.importDescGus : t.ui.importDescEngine}
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                        />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 mt-4">
                    <button 
                        onClick={() => setShowImportModal(false)}
                        className="px-4 py-2 text-sm text-hotta-text-muted hover:text-hotta-text-main"
                    >
                        {t.ui.cancel}
                    </button>
                    <button 
                        onClick={handleImport}
                        disabled={!importText.trim()}
                        className="px-6 py-2 bg-hotta-highlight text-white font-bold rounded hover:bg-yellow-500 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.ui.importBtn}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* HEADER */}
      <header className="h-16 flex-shrink-0 border-b border-hotta-border bg-hotta-surface/80 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {/* LOGO: ToF "H" or similar shape */}
          <div className="w-9 h-9 bg-gradient-to-br from-hotta-accent to-hotta-highlight/80 rounded-lg flex items-center justify-center text-white shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            {lang === 'zh' ? (
                <span className="font-sans font-bold text-xl leading-none mt-0.5">幻</span>
            ) : (
                <span className="font-display font-bold text-lg leading-none">ToF</span>
            )}
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-xl leading-none tracking-wide text-hotta-text-main flex items-center gap-2">
                {t.appTitle}
                <span className="text-[10px] bg-hotta-accent/10 text-hotta-accent px-1.5 rounded border border-hotta-accent/20">v2.1</span>
            </h1>
            <p className="text-[10px] text-hotta-text-muted font-mono tracking-widest uppercase opacity-80">{t.appSubtitle}</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
             <button 
                onClick={() => setShowImportModal(true)}
                className="hidden md:flex items-center gap-2 text-xs font-bold font-display tracking-wider px-3 py-1.5 bg-hotta-surface text-hotta-text-main border border-hotta-border rounded hover:border-hotta-highlight hover:text-hotta-highlight transition-all"
            >
                <UploadIcon />
                {t.ui.import}
            </button>

            <div className="h-6 w-px bg-hotta-border mx-1"></div>

            <button 
                onClick={() => setLang(prev => prev === 'zh' ? 'en' : 'zh')}
                className="text-xs font-bold font-mono px-2 py-1 bg-hotta-surface-alt rounded hover:bg-hotta-border transition-colors text-hotta-text-main w-10 text-center"
            >
                {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button 
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-hotta-surface-alt hover:bg-hotta-border text-hotta-text-muted hover:text-hotta-highlight transition-all"
                title="Toggle Theme"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <nav className="w-64 flex-shrink-0 bg-hotta-surface/50 border-r border-hotta-border flex flex-col p-4 gap-2 overflow-y-auto hidden md:flex">
          <div className="text-[10px] font-mono font-bold text-hotta-text-muted mb-2 uppercase tracking-widest pl-2 opacity-70">{t.ui.categories}</div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 text-left group
                ${activeCategory === cat.id 
                  ? 'bg-gradient-to-r from-hotta-accent/10 to-transparent text-hotta-accent font-bold border-l-4 border-hotta-accent' 
                  : 'text-hotta-text-muted hover:text-hotta-text-main hover:bg-hotta-surface-alt border-l-4 border-transparent'}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeCategory === cat.id ? 'bg-hotta-accent shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-hotta-border group-hover:bg-hotta-text-muted'}`}></span>
              <span className="font-display tracking-wide">{t.categories[cat.id]}</span>
            </button>
          ))}
          
          <div className="mt-auto relative overflow-hidden group rounded-xl border border-hotta-border">
            <div className="absolute inset-0 bg-hotta-accent/5"></div>
            <div className="p-4 relative z-10">
                <div className="flex items-center gap-2 mb-2 text-hotta-accent">
                    <RobotIcon />
                    <h4 className="text-xs font-display font-bold">Mi-a HELPER</h4>
                </div>
                <p className="text-[10px] text-hotta-text-muted leading-relaxed">
                {t.ui.aiDesc}
                </p>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* EDITOR COLUMN */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scroll-smooth">
            
            {/* DISCLAIMER BANNER - Only show for Config pages, Automation has its own warning */}
            {activeCategory !== 'automation' && (
              <div className="mb-6 px-4 py-3 bg-hotta-highlight/5 border-l-4 border-hotta-highlight rounded-r-lg flex gap-3 items-start">
                 <div className="flex-shrink-0 mt-0.5 text-hotta-highlight">
                   <AlertIcon />
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-hotta-text-main mb-1 uppercase tracking-wider opacity-80">{t.ui.disclaimerTitle}</h4>
                    <p className="text-[11px] text-hotta-text-muted leading-relaxed">
                      {t.ui.disclaimerText}
                    </p>
                 </div>
              </div>
            )}

            {/* AI INPUT - Hidden for Automation */}
            {activeCategory !== 'automation' && (
              <>
                <div className="mb-8 bg-hotta-surface rounded-xl p-1 border border-hotta-border shadow-lg group focus-within:border-hotta-accent/50 transition-colors">
                    <div className="bg-hotta-base/50 p-4 rounded-lg relative overflow-hidden">
                        {/* Decorative lines */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-hotta-accent/10 to-transparent pointer-events-none"></div>
                        
                        <div className="flex items-center gap-2 mb-3 justify-between relative z-10">
                            <div className="flex items-center gap-2 text-hotta-accent">
                               <MagicIcon />
                               <span className="text-xs font-bold font-display uppercase tracking-wider">{t.ui.neuralOpt}</span>
                            </div>
                            <button 
                                onClick={handleDetectHardware}
                                disabled={isDetecting}
                                className={`text-[10px] font-mono flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                                    isDetecting 
                                        ? 'bg-hotta-base text-hotta-text-muted border-hotta-border cursor-wait'
                                        : hardwareDetected 
                                            ? 'bg-green-500/10 text-green-500 border-green-500/30'
                                            : 'bg-hotta-base hover:bg-hotta-accent/10 text-hotta-text-muted hover:text-hotta-accent border-hotta-border hover:border-hotta-accent/30'
                                }`}
                            >
                                {isDetecting ? <LoaderIcon /> : hardwareDetected ? <CheckIcon /> : <ChipIcon />}
                                <span>{isDetecting ? 'SCANNING...' : hardwareDetected ? t.ui.hardwareDetected : t.ui.detectHardware}</span>
                            </button>
                        </div>
                        
                        <div className="flex gap-2 relative z-10">
                            <input 
                                type="text" 
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiOptimize()}
                                placeholder={t.ui.aiPlaceholder}
                                className="flex-1 bg-hotta-surface border border-hotta-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-hotta-accent focus:ring-1 focus:ring-hotta-accent/20 transition-all placeholder-hotta-text-muted/50 text-hotta-text-main font-mono"
                            />
                            <button 
                                onClick={handleAiOptimize}
                                disabled={isAiLoading}
                                className="bg-hotta-accent hover:bg-cyan-400 text-white border border-transparent px-6 py-2 rounded-lg text-sm font-bold tracking-wide transition-all disabled:opacity-50 shadow-lg shadow-hotta-accent/20 flex items-center gap-2"
                            >
                                {isAiLoading && <LoaderIcon />}
                                {isAiLoading ? t.ui.thinking : t.ui.generate}
                            </button>
                        </div>

                        {/* AI Message Area */}
                        {(aiMessage || appliedCount > 0) && (
                            <div className="mt-4 p-3 bg-hotta-surface rounded border border-hotta-border/50 animate-in slide-in-from-top-2">
                               <div className="flex items-center gap-2 font-bold mb-2 text-xs uppercase tracking-wider text-hotta-accent">
                                    <RobotIcon />
                                    <span>Mi-a Report:</span>
                               </div>
                               {appliedCount > 0 && (
                                    <div className="inline-flex items-center gap-2 text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20 mb-2">
                                        <CheckIcon />
                                        {appliedCount} settings optimized
                                    </div>
                               )}
                               <div className="text-sm text-hotta-text-main opacity-90 leading-relaxed font-mono">
                                   {aiMessage}
                               </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* PRESETS GRID */}
                <div className="mb-8">
                    <div className="text-[10px] font-mono text-hotta-text-muted mb-3 uppercase tracking-widest pl-1">{t.ui.presets}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PRESETS.map((preset) => {
                         const labelKey = `preset${preset.name.charAt(0).toUpperCase() + preset.name.slice(1)}`;
                         const label = t.ui[labelKey as keyof typeof t.ui] || preset.name;
                         const [mainLabel, subLabel] = label.split(' / ');
                         
                         return (
                            <button
                              key={preset.name}
                              onClick={() => handleApplyPreset(preset)}
                              className="relative overflow-hidden px-4 py-3 bg-hotta-surface border border-hotta-border rounded-xl text-left group hover:border-hotta-accent transition-all duration-300 shadow-sm hover:shadow-hotta-accent/10"
                            >
                               <div className="absolute inset-0 bg-hotta-accent/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                               <span className="relative z-10 block font-display font-bold text-sm tracking-wide group-hover:text-hotta-accent">{mainLabel}</span>
                               <span className="relative z-10 block text-[10px] text-hotta-text-muted font-mono mt-0.5">{subLabel}</span>
                            </button>
                         )
                      })}
                    </div>
                </div>
              </>
            )}

            {/* CATEGORY TITLE */}
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-hotta-base/95 backdrop-blur z-20 py-2 border-b border-transparent">
                <h2 className="text-2xl font-display font-bold text-hotta-text-main uppercase tracking-widest flex items-center gap-3">
                    <span className="w-1 h-6 bg-hotta-accent rounded-full"></span>
                    {t.categories[activeCategory]}
                </h2>
            </div>

            {/* RENDER CONTENT BASED ON CATEGORY */}
            {activeCategory === 'automation' ? (
              <MacroGenerator langStrings={t.automation} />
            ) : (
              <div className="space-y-3 pb-12">
                {currentCategoryDefs.map(def => {
                  const translatedDef = {
                      ...def,
                      name: t.cvars[def.id as keyof typeof t.cvars]?.name || def.name,
                      description: t.cvars[def.id as keyof typeof t.cvars]?.desc || def.description,
                  };

                  if (def.id === 'resolutionX') {
                      const heightVal = config['resolutionY'] || 1080;
                      return (
                          <ResolutionPicker
                              key="resolution-picker"
                              widthValue={config[def.id] || 1920}
                              heightValue={heightVal}
                              onChange={(w, h) => {
                                  handleValueChange('resolutionX', w);
                                  handleValueChange('resolutionY', h);
                              }}
                              label={t.ui.resolution || "Resolution"}
                              langStrings={t.ui}
                          />
                      );
                  }
                  if (def.id === 'resolutionY') return null;

                  if (def.type === 'slider') {
                      return (
                          <SliderControl 
                              key={def.id}
                              definition={translatedDef}
                              value={config[def.id] !== undefined ? config[def.id] : def.defaultValue}
                              onChange={handleValueChange}
                              onExplain={handleExplain}
                              langStrings={t.ui}
                          />
                      );
                  } else if (def.type === 'number') {
                      return (
                          <NumberControl
                              key={def.id}
                              definition={translatedDef}
                              value={config[def.id] !== undefined ? config[def.id] : def.defaultValue}
                              onChange={handleValueChange}
                              onExplain={handleExplain}
                              langStrings={t.ui}
                              optionsTranslation={t.options}
                          />
                      );
                  } else {
                      return (
                          <SelectControl
                              key={def.id}
                              definition={translatedDef}
                              value={config[def.id] !== undefined ? config[def.id] : def.defaultValue}
                              onChange={handleValueChange}
                              onExplain={handleExplain}
                              langStrings={t.ui}
                              optionsTranslation={t.options}
                          />
                      );
                  }
                })}
              </div>
            )}
          </div>

          {/* PREVIEW COLUMN - Hide for Automation */}
          {activeCategory !== 'automation' && (
            <div className="w-full md:w-[420px] bg-hotta-surface border-l border-hotta-border flex flex-col z-10 shadow-2xl">
               <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
                  <h3 className="text-xs font-mono font-bold text-hotta-text-muted mb-4 uppercase tracking-widest">{t.ui.generatedConfig}</h3>
                  <div className="flex-1 min-h-0">
                      <IniPreview 
                          iniContent={iniContent}
                          activeFile={activeFile}
                          setActiveFile={setActiveFile}
                          importedGus={importedGus}
                          importedEngine={importedEngine}
                          onClearImport={(file) => file === 'GameUserSettings.ini' ? setImportedGus(null) : setImportedEngine(null)} 
                          langStrings={t.ui} 
                      />
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-hotta-surface/90 backdrop-blur border-t border-hotta-border p-2 flex overflow-x-auto z-[60] gap-1 hide-scrollbar">
        {CATEGORIES.map(cat => (
             <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${activeCategory === cat.id ? 'bg-hotta-accent text-white' : 'text-hotta-text-muted bg-hotta-base'}`}
            >
              {t.categories[cat.id]}
            </button>
        ))}
      </div>
    </div>
  );
};

export default App;