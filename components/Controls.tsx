import React, { useState, useRef } from 'react';
import { ThumbnailStyle, OverlayText, OverlayImage } from '../types';
import { Button } from './Button';
import { OverlayEditor } from './OverlayEditor';
import { ImageLayerEditor } from './ImageLayerEditor';

interface ControlsProps {
  prompt: string;
  setPrompt: (s: string) => void;
  style: ThumbnailStyle;
  setStyle: (s: ThumbnailStyle) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onAddOverlay: (text: string) => void;
  onEnhancePrompt: () => void;
  isEnhancing: boolean;
  includeTextInAI: boolean;
  setIncludeTextInAI: (b: boolean) => void;
  aiText: string;
  setAiText: (s: string) => void;
  // Selection props
  selectedOverlay: OverlayText | undefined;
  selectedImage: OverlayImage | undefined;
  onUpdateOverlay: (id: string, updates: Partial<OverlayText>) => void;
  onUpdateImage: (id: string, updates: Partial<OverlayImage>) => void;
  onDeleteOverlay: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeselect: () => void;
  // Upload props
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>, isBackground: boolean) => void;
  // BG Removal
  onRemoveBackground: (id: string) => void;
  isProcessingBg: boolean;
  // Image to Image
  useReferenceImage: boolean;
  setUseReferenceImage: (b: boolean) => void;
  hasBackgroundImage: boolean;
  // Monetization
  isPro: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  isGenerating,
  onGenerate,
  onAddOverlay,
  onEnhancePrompt,
  isEnhancing,
  includeTextInAI,
  setIncludeTextInAI,
  aiText,
  setAiText,
  selectedOverlay,
  selectedImage,
  onUpdateOverlay,
  onUpdateImage,
  onDeleteOverlay,
  onDeleteImage,
  onDeselect,
  onUploadImage,
  onRemoveBackground,
  isProcessingBg,
  useReferenceImage,
  setUseReferenceImage,
  hasBackgroundImage,
  isPro
}) => {
  const [newOverlayText, setNewOverlayText] = useState("NEW VIDEO");
  const bgInputRef = useRef<HTMLInputElement>(null);
  const layerInputRef = useRef<HTMLInputElement>(null);

  const renderEditor = () => {
    if (selectedOverlay) {
      return (
        <OverlayEditor
          overlay={selectedOverlay}
          onUpdate={(updates) => onUpdateOverlay(selectedOverlay.id, updates)}
          onDelete={() => {
            onDeleteOverlay(selectedOverlay.id);
            onDeselect();
          }}
          onClose={onDeselect}
        />
      );
    }
    if (selectedImage) {
      return (
        <ImageLayerEditor
          image={selectedImage}
          onUpdate={(updates) => onUpdateImage(selectedImage.id, updates)}
          onDelete={() => {
            onDeleteImage(selectedImage.id);
            onDeselect();
          }}
          onClose={onDeselect}
          onRemoveBackground={() => onRemoveBackground(selectedImage.id)}
          isProcessing={isProcessingBg}
        />
      );
    }
    return null;
  };

  if (selectedOverlay || selectedImage) {
    return (
      <div className="space-y-6 p-6 bg-[#1a1a1a] rounded-xl border border-white/5 h-full overflow-y-auto custom-scrollbar">
        {renderEditor()}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-[#1a1a1a] rounded-xl border border-white/5 h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <span className="text-red-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </span>
          ThumbGen
          {isPro && <span className="text-[10px] bg-white text-black font-bold px-1.5 rounded ml-2">PRO</span>}
        </h2>
        <p className="text-xs text-gray-400">Design your viral thumbnail</p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-2 gap-2">
        <input 
          type="file" 
          ref={bgInputRef} 
          hidden 
          accept="image/*" 
          onChange={(e) => onUploadImage(e, true)}
        />
        <Button 
          variant="secondary" 
          className="text-xs py-3" 
          onClick={() => bgInputRef.current?.click()}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
        >
          Upload BG
        </Button>

        <input 
          type="file" 
          ref={layerInputRef} 
          hidden 
          accept="image/*" 
          onChange={(e) => onUploadImage(e, false)}
        />
        <Button 
          variant="secondary" 
          className="text-xs py-3" 
          onClick={() => layerInputRef.current?.click()}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>}
        >
          Add Image
        </Button>
      </div>

      <div className="border-t border-white/10"></div>

      {/* Prompt Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Generate Background</label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:ring-2 focus:ring-red-600 focus:bg-[#252525] focus:border-transparent outline-none transition-all resize-none h-24"
            placeholder="Describe your thumbnail background..."
            dir="auto"
          />
          <button
            onClick={onEnhancePrompt}
            disabled={isEnhancing || !prompt}
            className="absolute bottom-2 right-2 text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-2 py-1 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
          >
            {isEnhancing ? (
              <span className="animate-spin">✨</span>
            ) : (
              <span>Enhance</span>
            )}
          </button>
        </div>
        
        {hasBackgroundImage && (
          <div className="flex items-center gap-2 p-2 bg-[#252525] rounded-lg border border-white/5">
             <input
              type="checkbox"
              id="useRef"
              checked={useReferenceImage}
              onChange={(e) => setUseReferenceImage(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-[#1a1a1a]"
             />
             <label htmlFor="useRef" className="text-xs text-gray-300 select-none cursor-pointer">
               Use current image as style reference
             </label>
          </div>
        )}
      </div>

      {/* AI Embedded Headline Section */}
      <div className="space-y-2">
         <div 
           className={`p-1 rounded-lg transition-all duration-300 ${includeTextInAI ? 'bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30' : 'hover:bg-white/5'}`}
         >
           <label className="flex items-center gap-3 p-2 cursor-pointer select-none">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={includeTextInAI}
                  onChange={(e) => setIncludeTextInAI(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </div>
              <span className="text-sm font-medium text-gray-300 flex-1">Embed Headline in Image</span>
              {includeTextInAI && <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">AI</span>}
           </label>
           
           {includeTextInAI && (
             <div className="px-2 pb-3 animate-in slide-in-from-top-2 duration-200">
               <div className="relative group">
                 <input 
                    type="text" 
                    value={aiText}
                    onChange={(e) => setAiText(e.target.value)}
                    placeholder="ENTER TEXT HERE"
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-red-500 text-2xl font-display font-bold text-white placeholder-white/10 outline-none py-2 transition-all uppercase tracking-wide"
                    dir="auto"
                 />
                 <div className="absolute right-0 bottom-3 text-white/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                 </div>
               </div>
               <p className="text-[10px] text-gray-400 mt-2 flex items-start gap-1">
                 <svg className="w-3 h-3 mt-0.5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Gemini will attempt to render this text naturally within the generated scene (e.g., on a sign, screen, or floating).
               </p>
             </div>
           )}
         </div>
      </div>

      {/* Style Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Visual Style</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(ThumbnailStyle).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                style === s 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-[#252525] text-gray-400 hover:bg-[#303030] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={onGenerate} 
        isLoading={isGenerating} 
        className={`w-full py-4 text-lg font-bold uppercase tracking-wide relative overflow-hidden group ${!isPro ? 'bg-gray-800 hover:bg-gray-700' : ''}`}
        disabled={!prompt && !hasBackgroundImage}
        icon={!isPro ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> : undefined}
      >
        <span className="relative z-10 flex flex-col items-center">
          {isGenerating 
             ? 'Dreaming...' 
             : (!isPro 
                 ? <><span className="text-yellow-400">PAY FEES ($9.00)</span><span className="text-[10px] text-gray-400 mt-1 font-normal lowercase">to unlock & generate</span></>
                 : (useReferenceImage && hasBackgroundImage ? 'Transform Image' : 'Generate Background')
               )
          }
        </span>
        {!isPro && <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-600/10 to-transparent"></div>}
      </Button>

      <div className="border-t border-white/10 my-4"></div>

      {/* Manual Overlay Controls */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">Manual Text Overlay</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newOverlayText}
            onChange={(e) => setNewOverlayText(e.target.value)}
            className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:bg-[#252525] outline-none transition-colors"
            placeholder="Text..."
            dir="auto"
          />
          <Button 
            variant="secondary" 
            onClick={() => onAddOverlay(newOverlayText)}
            disabled={!newOverlayText}
            className="whitespace-nowrap"
          >
            + Add
          </Button>
        </div>
      </div>
    </div>
  );
};