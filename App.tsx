import React, { useState, useEffect } from 'react';
import { ThumbnailStyle, GeneratedImage, OverlayText, OverlayImage } from './types';
import { DEFAULT_PROMPT, DEFAULT_STYLE } from './constants';
import { generateThumbnailImage, enhancePrompt, removeBackground } from './services/geminiService';
import { Controls } from './components/Controls';
import { ThumbnailCanvas } from './components/ThumbnailCanvas';
import { Button } from './components/Button';
import { SeoSections } from './components/SeoSections';
import { Footer } from './components/Footer';
import { LegalPages } from './components/LegalPages';
import { PricingModal } from './components/PricingModal';

type ViewState = 'home' | 'privacy' | 'terms' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Payment/Pro State
  const [isPro, setIsPro] = useState<boolean>(false);
  const [showPricing, setShowPricing] = useState(false);
  const [userIp, setUserIp] = useState<string>('');

  useEffect(() => {
    // Check IP and Pro Status on Mount
    const initUser = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const ip = data.ip;
        setUserIp(ip);

        // Check license bound to IP
        const ipLicense = localStorage.getItem(`thumbgen_pro_${ip}`);
        // Check legacy/fallback license
        const localLicense = localStorage.getItem('thumbgen_pro');

        if (ipLicense === 'true' || localLicense === 'true') {
          setIsPro(true);
        }
      } catch (error) {
        console.warn("Could not fetch IP, falling back to local storage", error);
        if (localStorage.getItem('thumbgen_pro') === 'true') {
          setIsPro(true);
        }
      }
    };
    initUser();
  }, []);

  // State for Generation
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [style, setStyle] = useState<ThumbnailStyle>(DEFAULT_STYLE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isProcessingBg, setIsProcessingBg] = useState(false);
  
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  // State for AI Text
  const [includeTextInAI, setIncludeTextInAI] = useState(false);
  const [aiText, setAiText] = useState("");
  const [useReferenceImage, setUseReferenceImage] = useState(false);

  // State for Overlays
  const [overlays, setOverlays] = useState<OverlayText[]>([]);
  const [images, setImages] = useState<OverlayImage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'text' | 'image' | null>(null);
  
  // History
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleUpgrade = () => {
    // 1. Persist Pro status with IP binding
    if (userIp) {
        localStorage.setItem(`thumbgen_pro_${userIp}`, 'true');
    }
    // Fallback simple storage
    localStorage.setItem('thumbgen_pro', 'true');
    
    setIsPro(true);
    
    // 2. Close modal
    setShowPricing(false);

    // 3. Ensure user is on the generator view to immediately use the tool
    setCurrentView('home');
  };

  const handleGenerate = async () => {
    // Gate the generate function
    if (!isPro) {
      setShowPricing(true);
      return;
    }

    setIsGenerating(true);
    try {
      const base64Image = await generateThumbnailImage({
        prompt,
        style,
        includeTextInAI,
        aiText,
        referenceImage: (useReferenceImage && currentImage) ? currentImage : undefined
      });
      
      setCurrentImage(base64Image);
      
      // Save to history
      const newEntry: GeneratedImage = {
        id: Date.now().toString(),
        url: base64Image,
        prompt,
        style,
        timestamp: Date.now()
      };
      setHistory(prev => [newEntry, ...prev]);
    } catch (error) {
      alert("Failed to generate image. Please try again or check API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    const enhanced = await enhancePrompt(prompt);
    setPrompt(enhanced);
    setIsEnhancing(false);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, isBackground: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      
      if (isBackground) {
        setCurrentImage(src);
        setUseReferenceImage(true); // Auto-enable reference image mode
      } else {
        // Add as overlay image
        const newImg: OverlayImage = {
          id: Date.now().toString(),
          src,
          x: 100,
          y: 100,
          width: 200,
          height: 200, // Ideally we get aspect ratio from image load
          rotation: 0,
          opacity: 1
        };
        const imgObj = new Image();
        imgObj.src = src;
        imgObj.onload = () => {
           const ratio = imgObj.height / imgObj.width;
           newImg.height = 200 * ratio;
           setImages(prev => [...prev, newImg]);
           setSelectedId(newImg.id);
           setSelectedType('image');
        };
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveBackground = async (id: string) => {
    const img = images.find(i => i.id === id);
    if (!img) return;

    setIsProcessingBg(true);
    try {
      const newSrc = await removeBackground(img.src);
      setImages(prev => prev.map(i => i.id === id ? { ...i, src: newSrc } : i));
    } catch (error) {
      alert("Failed to remove background. Try again.");
    } finally {
      setIsProcessingBg(false);
    }
  };

  const handleAddOverlay = (text: string) => {
    const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    const newOverlay: OverlayText = {
      id: Date.now().toString(),
      content: text,
      x: 50,
      y: 50,
      fontSize: 64,
      autoFit: false,
      color: '#ffffff',
      backgroundColor: '#cc0000',
      rotation: -5,
      fontFamily: isArabic ? '"Cairo", sans-serif' : '"Oswald", sans-serif',
      fontWeight: '700',
      strokeColor: '#000000',
      strokeWidth: 0,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    };
    setOverlays([...overlays, newOverlay]);
    setSelectedId(newOverlay.id);
    setSelectedType('text');
  };

  // State Updates
  const updateOverlay = (id: string, updates: Partial<OverlayText>) => {
    setOverlays(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };
  const updateImage = (id: string, updates: Partial<OverlayImage>) => {
    setImages(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };
  const removeOverlay = (id: string) => {
    setOverlays(prev => prev.filter(o => o.id !== id));
    if (selectedId === id) { setSelectedId(null); setSelectedType(null); }
  };
  const removeImage = (id: string) => {
    setImages(prev => prev.filter(o => o.id !== id));
    if (selectedId === id) { setSelectedId(null); setSelectedType(null); }
  };

  const restoreFromHistory = (img: GeneratedImage) => {
    setCurrentImage(img.url);
    setPrompt(img.prompt);
    setStyle(img.style);
    setOverlays([]); 
    setImages([]);
    setSelectedId(null);
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.download = `thumbgen-${Date.now()}.png`;
    link.href = currentImage; 
    link.click();
  };

  const selectedOverlay = selectedType === 'text' ? overlays.find(o => o.id === selectedId) : undefined;
  const selectedImage = selectedType === 'image' ? images.find(i => i.id === selectedId) : undefined;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col font-sans selection:bg-red-500 selection:text-white relative">
      
      {showPricing && (
        <PricingModal onClose={() => setShowPricing(false)} onUpgrade={handleUpgrade} userIp={userIp} />
      )}

      {/* Navbar */}
      <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between bg-[#141414] sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-red-900/50">
            T
          </div>
          <h1 className="font-display text-xl tracking-wide font-bold">THUMBGEN <span className="text-red-500">AI</span></h1>
          {isPro && <span className="text-[10px] bg-white text-black font-bold px-1.5 rounded ml-1">PRO</span>}
        </div>
        <div className="flex items-center gap-4">
          {currentView !== 'home' ? (
            <Button variant="ghost" onClick={() => setCurrentView('home')} className="text-xs">
              ← Back to Generator
            </Button>
          ) : (
            <>
              <a href="#guide" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider hidden md:block transition-colors">How it Works</a>
              {!isPro ? (
                  <Button variant="primary" onClick={() => setShowPricing(true)} className="text-xs py-1.5 px-3 bg-gradient-to-r from-red-600 to-orange-600 border-0 shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse-fast">
                    PAY FEES ($9) & UNLOCK
                  </Button>
              ) : (
                <div className="text-xs text-green-500 font-mono hidden lg:block border-l border-white/10 pl-4 ml-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    LICENSED: {userIp || 'ACTIVE'}
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col md:flex-row">
        
        {currentView === 'home' ? (
          <>
            {/* Left Controls - Sticky on Desktop */}
            <aside className="w-full md:w-[400px] lg:w-[450px] p-4 flex-shrink-0 bg-[#0f0f0f] border-r border-white/5 z-40 md:sticky md:top-16 md:h-[calc(100vh-64px)] overflow-hidden flex flex-col">
              <Controls 
                prompt={prompt}
                setPrompt={setPrompt}
                style={style}
                setStyle={setStyle}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                onAddOverlay={handleAddOverlay}
                onEnhancePrompt={handleEnhancePrompt}
                isEnhancing={isEnhancing}
                includeTextInAI={includeTextInAI}
                setIncludeTextInAI={setIncludeTextInAI}
                aiText={aiText}
                setAiText={setAiText}
                // Selection
                selectedOverlay={selectedOverlay}
                selectedImage={selectedImage}
                onUpdateOverlay={updateOverlay}
                onUpdateImage={updateImage}
                onDeleteOverlay={removeOverlay}
                onDeleteImage={removeImage}
                onDeselect={() => { setSelectedId(null); setSelectedType(null); }}
                // Images
                onUploadImage={handleUploadImage}
                onRemoveBackground={handleRemoveBackground}
                isProcessingBg={isProcessingBg}
                // Image to Image
                useReferenceImage={useReferenceImage}
                setUseReferenceImage={setUseReferenceImage}
                hasBackgroundImage={!!currentImage}
                // Monetization
                isPro={isPro}
              />
            </aside>

            {/* Right Content Area - Scrollable */}
            <section className="flex-1 flex flex-col bg-[#121212] relative min-h-[calc(100vh-64px)]">
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', 
                  backgroundSize: '24px 24px' 
                }} 
              ></div>

              {/* App Canvas Area */}
              <div className="p-6 flex flex-col items-center w-full z-10">
                
                {/* Top Ad Banner Placeholder - Hide if Pro */}
                {!isPro && (
                  <div className="w-full max-w-5xl mb-6 hidden md:block">
                    <div className="w-full h-[90px] bg-[#1a1a1a] border border-white/5 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer" onClick={() => setShowPricing(true)}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                        <span className="text-red-500 font-bold tracking-widest text-lg animate-pulse">REMOVE ADS & UNLOCK PRO ($9)</span>
                    </div>
                  </div>
                )}

                <div className="w-full max-w-5xl flex flex-col gap-6">
                  
                  {/* Canvas Header */}
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white">Preview</h3>
                      <p className="text-gray-400 text-sm">Aspect Ratio: 16:9 • 1280x720</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={handleDownload} disabled={!currentImage} icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      }>
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* The Canvas */}
                  <ThumbnailCanvas 
                    imageSrc={currentImage}
                    overlays={overlays}
                    images={images}
                    selectedId={selectedId}
                    onSelect={(id, type) => { setSelectedId(id); setSelectedType(type); }}
                    onUpdateOverlay={updateOverlay}
                    onUpdateImage={updateImage}
                    isGenerating={isGenerating}
                  />

                  {/* History Strip */}
                  {history.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Generations</h4>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {history.map((item) => (
                          <button 
                            key={item.id} 
                            onClick={() => restoreFromHistory(item)}
                            className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-red-500 transition-all group"
                          >
                            <img src={item.url} alt="History" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-xs text-white font-medium">Load</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Content Sections (Text for Search Engines) */}
              <div id="guide" className="w-full z-10 bg-[#0f0f0f] border-t border-white/5 mt-12 px-6 pt-12 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                <SeoSections isPro={isPro} />
              </div>
            </section>
          </>
        ) : (
          <section className="flex-1 min-h-[calc(100vh-64px)] bg-[#121212] overflow-y-auto">
            <LegalPages view={currentView} />
          </section>
        )}
      </main>

      {/* Legal Footer - Persistent */}
      <div className="w-full z-10 bg-[#0a0a0a]">
        <Footer onNavigate={setCurrentView} />
      </div>
    </div>
  );
};

export default App;