import React, { useRef, useEffect, useState, useMemo } from 'react';
import { OverlayText, OverlayImage } from '../types';

interface ThumbnailCanvasProps {
  imageSrc: string | null;
  overlays: OverlayText[];
  images: OverlayImage[];
  selectedId: string | null;
  onSelect: (id: string | null, type: 'text' | 'image' | null) => void;
  onUpdateOverlay: (id: string, updates: Partial<OverlayText>) => void;
  onUpdateImage: (id: string, updates: Partial<OverlayImage>) => void;
  isGenerating: boolean;
}

const SelectionHandles = () => (
  <>
    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white shadow-sm z-30"></div>
    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white shadow-sm z-30"></div>
    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white shadow-sm z-30"></div>
    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white shadow-sm z-30"></div>
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full border border-blue-500 z-30"></div>
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-px bg-blue-500/50 z-20"></div>
  </>
);

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({ 
  imageSrc, 
  overlays,
  images,
  selectedId,
  onSelect,
  onUpdateOverlay,
  onUpdateImage,
  isGenerating
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragType, setDragType] = useState<'text' | 'image' | null>(null);

  // Monitor canvas size for auto-fitting calculations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
         setContainerSize({
           width: entry.contentRect.width,
           height: entry.contentRect.height
         });
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string, type: 'text' | 'image') => {
    e.stopPropagation();
    onSelect(id, type);
    setIsDragging(true);
    setDragType(type);
    
    let item: { x: number; y: number } | undefined;
    if (type === 'text') {
       item = overlays.find(o => o.id === id);
    } else {
       item = images.find(o => o.id === id);
    }

    if (item) {
      setDragOffset({
        x: e.clientX - item.x,
        y: e.clientY - item.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedId && dragType && containerRef.current) {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      if (dragType === 'text') {
        const overlay = overlays.find(o => o.id === selectedId);
        onUpdateOverlay(selectedId, { x, y });
      } else {
        onUpdateImage(selectedId, { x, y });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const handleBgClick = () => {
    onSelect(null, null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging]);

  // Helper to calculate styles for rendering text
  const getTextStyle = (overlay: OverlayText) => {
    let fontSize = overlay.fontSize;
    let x = overlay.x;

    if (overlay.autoFit && containerSize.width > 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const measureSize = 100;
        ctx.font = `${overlay.fontWeight} ${measureSize}px ${overlay.fontFamily.replace(/"/g, '')}`;
        const metrics = ctx.measureText(overlay.content);
        const textWidth = metrics.width;
        
        if (textWidth > 0) {
          const targetWidth = containerSize.width * 0.9;
          fontSize = (targetWidth / textWidth) * measureSize;
          x = (containerSize.width - targetWidth) / 2; 
        }
      }
    }

    return {
      fontSize: `${fontSize}px`,
      left: x,
      top: overlay.y,
      transform: `rotate(${overlay.rotation}deg)`,
      whiteSpace: overlay.autoFit ? 'nowrap' : 'pre-wrap'
    } as React.CSSProperties;
  };

  return (
    <div 
      className="relative w-full aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/5 group select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleBgClick}
    >
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt="Thumbnail Background" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
           {isGenerating ? (
             <div className="flex flex-col items-center z-20">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-white font-bold tracking-wider animate-pulse">CREATING MAGIC...</p>
             </div>
           ) : (
             <>
               <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p className="text-sm font-medium opacity-50">Generate or Upload Background</p>
             </>
           )}
        </div>
      )}
      
      {/* Image Overlays */}
      {images.map((img) => (
        <div
          key={img.id}
          style={{
            position: 'absolute',
            left: img.x,
            top: img.y,
            width: img.width,
            height: img.height,
            transform: `rotate(${img.rotation}deg)`,
            opacity: img.opacity,
            cursor: isDragging && selectedId === img.id ? 'grabbing' : 'grab',
            zIndex: selectedId === img.id ? 20 : 5,
          }}
          onMouseDown={(e) => handleMouseDown(e, img.id, 'image')}
        >
          <div className={`relative w-full h-full transition-all duration-200 ${selectedId === img.id ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}`}>
            {selectedId === img.id && <SelectionHandles />}
            <img 
              src={img.src} 
              alt="overlay" 
              className="w-full h-full object-contain pointer-events-none select-none" 
            />
          </div>
        </div>
      ))}

      {/* Text Overlays */}
      {overlays.map((overlay) => {
        const style = getTextStyle(overlay);
        return (
          <div
            key={overlay.id}
            style={{
              position: 'absolute',
              left: style.left,
              top: style.top,
              transform: style.transform,
              cursor: isDragging && selectedId === overlay.id ? 'grabbing' : 'grab',
              zIndex: selectedId === overlay.id ? 21 : 10,
              maxWidth: overlay.autoFit ? '100%' : 'none'
            }}
            onMouseDown={(e) => handleMouseDown(e, overlay.id, 'text')}
          >
            <div 
              className={`
                relative group/text
                ${selectedId === overlay.id ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-500/5' : 'hover:ring-1 hover:ring-white/30'}
                rounded-lg transition-all duration-200
              `}
            >
               {selectedId === overlay.id && <SelectionHandles />}
               <h2
                style={{
                  fontSize: style.fontSize,
                  whiteSpace: style.whiteSpace as any,
                  color: overlay.color,
                  backgroundColor: overlay.backgroundColor,
                  padding: '0.1em 0.3em',
                  fontFamily: overlay.fontFamily,
                  fontWeight: overlay.fontWeight,
                  lineHeight: 1.2,
                  WebkitTextStroke: overlay.strokeWidth > 0 ? `${overlay.strokeWidth}px ${overlay.strokeColor}` : 'none',
                  textShadow: `${overlay.shadowOffsetX}px ${overlay.shadowOffsetY}px ${overlay.shadowBlur}px ${overlay.shadowColor}`,
                }}
                className="select-none rounded-sm"
                dir="auto"
               >
                 {overlay.content}
               </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};