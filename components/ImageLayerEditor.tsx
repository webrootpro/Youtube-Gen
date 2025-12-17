import React from 'react';
import { OverlayImage } from '../types';
import { Button } from './Button';

interface ImageLayerEditorProps {
  image: OverlayImage;
  onUpdate: (updates: Partial<OverlayImage>) => void;
  onDelete: () => void;
  onClose: () => void;
  onRemoveBackground: () => void;
  isProcessing: boolean;
}

export const ImageLayerEditor: React.FC<ImageLayerEditorProps> = ({
  image,
  onUpdate,
  onDelete,
  onClose,
  onRemoveBackground,
  isProcessing
}) => {
  return (
    <div className="space-y-4 p-4 bg-[#252525] rounded-lg border border-white/10 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Edit Image</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="space-y-4">
        <Button 
            onClick={onRemoveBackground} 
            isLoading={isProcessing}
            className="w-full text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none shadow-lg shadow-purple-900/20"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
        >
            Magic Remove BG
        </Button>

        {/* Size */}
        <div>
           <label className="text-xs text-gray-400 mb-1 block">Size</label>
           <input
            type="range"
            min="50"
            max="1280"
            value={image.width}
            onChange={(e) => {
                const w = Number(e.target.value);
                // Maintain aspect ratio
                const ratio = image.height / image.width;
                onUpdate({ width: w, height: w * ratio });
            }}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Rotation */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Rotation ({Math.round(image.rotation)}°)</label>
          <input
            type="range"
            min="-180"
            max="180"
            value={image.rotation}
            onChange={(e) => onUpdate({ rotation: Number(e.target.value) })}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Opacity */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Opacity ({Math.round(image.opacity * 100)}%)</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={image.opacity}
            onChange={(e) => onUpdate({ opacity: Number(e.target.value) })}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="border-t border-white/10 pt-2">
            <Button variant="danger" onClick={onDelete} className="w-full text-sm py-1">
            Delete Image
            </Button>
        </div>
      </div>
    </div>
  );
};