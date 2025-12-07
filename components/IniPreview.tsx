import React, { useState } from 'react';
import { ParsedIni } from '../utils/iniParser';

interface IniPreviewProps {
  iniContent: string;
  activeFile: 'GameUserSettings.ini' | 'Engine.ini';
  setActiveFile: (file: 'GameUserSettings.ini' | 'Engine.ini') => void;
  langStrings: any;
  importedGus: ParsedIni | null;
  importedEngine: ParsedIni | null;
  onClearImport: (file: 'GameUserSettings.ini' | 'Engine.ini') => void;
}

const IniPreview: React.FC<IniPreviewProps> = ({ 
    iniContent, 
    activeFile, 
    setActiveFile,
    langStrings, 
    importedGus, 
    importedEngine, 
    onClearImport 
}) => {
  const [copied, setCopied] = useState(false);

  const currentImported = activeFile === 'GameUserSettings.ini' ? importedGus : importedEngine;

  const handleCopy = () => {
    navigator.clipboard.writeText(iniContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([iniContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-hotta-surface/50 backdrop-blur-md border border-hotta-border rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
      
      {/* File Tabs */}
      <div className="flex border-b border-hotta-border bg-hotta-surface-alt/50">
        <button 
            onClick={() => setActiveFile('GameUserSettings.ini')}
            className={`flex-1 py-2 text-xs font-bold font-mono transition-colors ${activeFile === 'GameUserSettings.ini' ? 'bg-hotta-surface text-hotta-accent border-b-2 border-hotta-accent' : 'text-hotta-text-muted hover:text-hotta-text-main'}`}
        >
            GameUserSettings.ini
            {importedGus && <span className="ml-2 text-[9px] bg-green-500 text-white px-1 rounded">MERGED</span>}
        </button>
        <button 
            onClick={() => setActiveFile('Engine.ini')}
            className={`flex-1 py-2 text-xs font-bold font-mono transition-colors ${activeFile === 'Engine.ini' ? 'bg-hotta-surface text-hotta-accent border-b-2 border-hotta-accent' : 'text-hotta-text-muted hover:text-hotta-text-main'}`}
        >
            Engine.ini
            {importedEngine && <span className="ml-2 text-[9px] bg-green-500 text-white px-1 rounded">MERGED</span>}
        </button>
      </div>

      <div className="p-4 border-b border-hotta-border flex justify-between items-center bg-hotta-surface">
        <div className="flex flex-col">
            <h3 className="font-display text-sm font-bold text-hotta-text-main flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${activeFile === 'GameUserSettings.ini' ? 'bg-hotta-highlight' : 'bg-hotta-accent'}`}></span>
                {activeFile}
            </h3>
            {currentImported && (
                <button onClick={() => onClearImport(activeFile)} className="text-[10px] text-hotta-danger underline hover:text-red-400 text-left mt-1">
                    {langStrings.clearImport}
                </button>
            )}
        </div>
        
        <div className="flex gap-2">
             <button 
            onClick={handleDownload}
            className="px-3 py-1 text-xs font-mono bg-hotta-base hover:bg-hotta-surface-alt border border-hotta-border text-hotta-text-main rounded transition-colors"
          >
            {langStrings.downloadIni}
          </button>
          <button 
            onClick={handleCopy}
            className={`px-3 py-1 text-xs font-mono border rounded transition-all duration-300 ${copied ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-hotta-accent/10 border-hotta-accent/50 text-hotta-accent hover:bg-hotta-accent/20'}`}
          >
            {copied ? langStrings.copied : langStrings.copyClipboard}
          </button>
        </div>
      </div>
      
      <div className="relative flex-1 bg-hotta-base p-4 overflow-hidden group">
        <textarea 
          readOnly
          value={iniContent}
          className="w-full h-full bg-transparent text-xs font-mono text-hotta-text-muted focus:outline-none resize-none scrollbar-thin scrollbar-thumb-hotta-border"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default IniPreview;