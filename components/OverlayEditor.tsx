import React from 'react';
import { OverlayText } from '../types';
import { FONT_OPTIONS } from '../constants';
import { Button } from './Button';

interface OverlayEditorProps {
  overlay: OverlayText;
  onUpdate: (updates: Partial<OverlayText>) => void;
  onDelete: () => void;
  onClose: () => void;
}

export const OverlayEditor: React.FC<OverlayEditorProps> = ({
  overlay,
  onUpdate,
  onDelete,
  onClose
}) => {
  return (
    <div className="space-y-4 p-4 bg-[#252525] rounded-lg border border-white/10 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Edit Text</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white focus:outline-none focus:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* Content */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Content</label>
        <textarea
          value={overlay.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:bg-[#111] outline-none resize-none h-16 transition-colors"
          dir="auto"
        />
      </div>

      {/* Font & Size */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Font</label>
          <select
            value={overlay.fontFamily}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {FONT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
           <div className="flex justify-between mb-1">
             <label className="text-xs text-gray-400">Size</label>
             <div className="flex items-center gap-1">
               <input 
                type="checkbox" 
                checked={overlay.autoFit || false}
                onChange={(e) => onUpdate({ autoFit: e.target.checked })}
                className="w-3 h-3 rounded bg-[#1a1a1a] border-gray-600 text-blue-600 focus:ring-0"
               />
               <span className="text-[10px] text-gray-400">Auto-fit</span>
             </div>
           </div>
           <input
            type="range"
            min="12"
            max="200"
            value={overlay.fontSize}
            disabled={overlay.autoFit}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            className={`w-full h-1 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${overlay.autoFit ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-600 accent-blue-500'}`}
          />
        </div>
      </div>

      {/* Rotation & Weight */}
       <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Rotation ({Math.round(overlay.rotation)}°)</label>
          <input
            type="range"
            min="-180"
            max="180"
            value={overlay.rotation}
            onChange={(e) => onUpdate({ rotation: Number(e.target.value) })}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Weight</label>
           <select
            value={overlay.fontWeight}
            onChange={(e) => onUpdate({ fontWeight: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded p-1.5 text-xs text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="400">Normal</option>
            <option value="700">Bold</option>
            <option value="900">Black</option>
          </select>
        </div>
      </div>

      <div className="border-t border-white/10"></div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Text Color</label>
          <div className="flex items-center gap-2">
             <input
              type="color"
              value={overlay.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-6 h-6 rounded overflow-hidden border-0 cursor-pointer p-0 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 uppercase">{overlay.color}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Background</label>
          <div className="flex items-center gap-2">
             <input
              type="color"
              value={overlay.backgroundColor === 'transparent' ? '#000000' : overlay.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-6 h-6 rounded overflow-hidden border-0 cursor-pointer p-0 focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => onUpdate({ backgroundColor: 'transparent' })}
              className="text-[10px] bg-white/10 hover:bg-white/20 px-1.5 py-0.5 rounded text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              None
            </button>
          </div>
        </div>
      </div>

      {/* Stroke */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block flex justify-between">
          <span>Outline</span>
          <span className="text-white font-mono">{overlay.strokeWidth}px</span>
        </label>
        <div className="flex items-center gap-2">
           <input
            type="color"
            value={overlay.strokeColor}
            onChange={(e) => onUpdate({ strokeColor: e.target.value })}
            className="w-6 h-6 rounded overflow-hidden border-0 cursor-pointer p-0 shrink-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="range"
            min="0"
            max="20"
            value={overlay.strokeWidth}
            onChange={(e) => onUpdate({ strokeWidth: Number(e.target.value) })}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

       {/* Shadow */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block flex justify-between">
          <span>Shadow Blur</span>
          <span className="text-white font-mono">{overlay.shadowBlur}px</span>
        </label>
        <div className="flex items-center gap-2 mb-2">
           <input
            type="color"
            value={overlay.shadowColor}
            onChange={(e) => onUpdate({ shadowColor: e.target.value })}
            className="w-6 h-6 rounded overflow-hidden border-0 cursor-pointer p-0 shrink-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="range"
            min="0"
            max="50"
            value={overlay.shadowBlur}
            onChange={(e) => onUpdate({ shadowBlur: Number(e.target.value) })}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
             <div>
                <label className="text-[10px] text-gray-500">Offset X</label>
                <input
                  type="number"
                  value={overlay.shadowOffsetX}
                  onChange={(e) => onUpdate({ shadowOffsetX: Number(e.target.value) })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
             </div>
             <div>
                <label className="text-[10px] text-gray-500">Offset Y</label>
                 <input
                  type="number"
                  value={overlay.shadowOffsetY}
                  onChange={(e) => onUpdate({ shadowOffsetY: Number(e.target.value) })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-xs text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
             </div>
        </div>
      </div>

      <div className="pt-2">
        <Button variant="danger" onClick={onDelete} className="w-full text-sm py-1">
          Remove Text
        </Button>
      </div>
    </div>
  );
};