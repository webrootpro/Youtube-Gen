import React from 'react';

const AdPlaceholder: React.FC<{ label?: string; className?: string }> = ({ label = "Advertisement", className = "" }) => (
  <div className={`bg-[#1a1a1a] border border-white/5 rounded-lg flex flex-col items-center justify-center text-gray-600 overflow-hidden relative group ${className}`}>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
    <span className="text-xs font-mono uppercase tracking-widest border border-gray-700 px-2 py-1 rounded mb-2">Ad Space</span>
    <p className="text-[10px] text-gray-600">Google AdSense / Sponsor</p>
  </div>
);

interface SeoSectionsProps {
  isPro?: boolean;
}

export const SeoSections: React.FC<SeoSectionsProps> = ({ isPro = false }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-24 pb-20 animate-fade-in px-4 md:px-0">
      
      {/* Trust Signals / Social Proof */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 mb-24 grayscale hover:grayscale-0 transition-all duration-500">
         <div className="text-xl font-bold font-display flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full"></div>CREATOR<span className="font-light">STUDIO</span></div>
         <div className="text-xl font-bold font-display flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full"></div>TUBE<span className="font-light">RANK</span></div>
         <div className="text-xl font-bold font-display flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full"></div>VIRAL<span className="font-light">LABS</span></div>
         <div className="text-xl font-bold font-display flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full"></div>STREAM<span className="font-light">NOW</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-16">

          {/* How It Works Section */}
          <section id="how-it-works" className="scroll-mt-24">
            <h2 className="text-3xl font-display font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
              How it Works
            </h2>
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-red-600/50 to-transparent"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex gap-6 md:gap-8 items-start group">
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-[#141414] border border-red-500/20 items-center justify-center relative z-10 group-hover:border-red-500 transition-colors shadow-lg shadow-black/50">
                    <span className="text-2xl font-bold text-red-500">01</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="md:hidden text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">STEP 1</span>
                       <h3 className="text-xl font-bold text-white">Describe Your Video Idea</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Simply type a description of your video (e.g., "A shocked gamer finding a secret chest"). Our <strong>Prompt Enhancer</strong> will automatically rewrite it to include lighting, camera angles, and emotional triggers that maximize clicks.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-6 md:gap-8 items-start group">
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-[#141414] border border-white/10 items-center justify-center relative z-10 group-hover:border-blue-500 transition-colors shadow-lg shadow-black/50">
                    <span className="text-2xl font-bold text-blue-500">02</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="md:hidden text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded">STEP 2</span>
                       <h3 className="text-xl font-bold text-white">Select a Viral Style</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Choose from proven presets like <strong>"Clickbait/Shocked"</strong> for high-energy vlogs, <strong>"Gaming/High Contrast"</strong> for Let's Plays, or <strong>"Minimalist"</strong> for tech reviews. These styles fine-tune the AI's color grading and composition.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-6 md:gap-8 items-start group">
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-[#141414] border border-white/10 items-center justify-center relative z-10 group-hover:border-green-500 transition-colors shadow-lg shadow-black/50">
                    <span className="text-2xl font-bold text-green-500">03</span>
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                       <span className="md:hidden text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded">STEP 3</span>
                       <h3 className="text-xl font-bold text-white">Customize & Overlay</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Add punchy text overlays (e.g., "OMG!", "SECRET?"). You can also upload your own images—like your face or a logo—and use the <strong>Magic Remove BG</strong> tool to blend them perfectly into the scene.
                    </p>
                  </div>
                </div>

                 {/* Step 4 */}
                <div className="relative flex gap-6 md:gap-8 items-start group">
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-[#141414] border border-white/10 items-center justify-center relative z-10 group-hover:border-purple-500 transition-colors shadow-lg shadow-black/50">
                    <span className="text-2xl font-bold text-purple-500">04</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="md:hidden text-xs font-bold bg-purple-500 text-white px-2 py-0.5 rounded">STEP 4</span>
                       <h3 className="text-xl font-bold text-white">Download in 4K</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Hit download to get a high-resolution, copyright-free PNG ready for upload. Pro users get unlimited generations and faster processing speeds.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
          
          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-display font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
              Why Top YouTubers Use ThumbGen AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-red-400 mb-2">🚀 Boost CTR by 300%</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The YouTube algorithm favors videos with high Click-Through Rates. Our "Clickbait" and "High Contrast" styles are engineered based on analysis of top-performing videos.
                </p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-blue-400 mb-2">🌍 Arabic & Global Support</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Unlike most AI tools, we fully support RTL languages. Create professional thumbnails for Arabic, Urdu, or Persian audiences without broken text rendering.
                </p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-purple-400 mb-2">⚡ 5-Second Creation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Stop spending hours in Photoshop. Type a prompt, click generate, and get a 4K resolution image ready for upload in seconds.
                </p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-green-400 mb-2">💰 100% Free & Royalty Free</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Every image generated is unique to you. Use them for commercial projects, monetized channels, and client work without copyright strikes.
                </p>
              </div>
            </div>
          </section>

          {/* In-Content Ad Placeholder - Hidden for Pro Users */}
          {!isPro && <AdPlaceholder className="w-full h-32 md:h-40" label="Leaderboard Ad" />}

          {/* Long Form Article */}
          <article className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-display font-bold text-white mb-6">The Science of a Viral Thumbnail</h2>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Creating a thumbnail isn't just about making something look "cool." It's about psychology. When a viewer scrolls through YouTube, you have less than <strong className="text-white">0.4 seconds</strong> to grab their attention. ThumbGen AI automates this psychological optimization.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">1. The "Bocked" Emotion Strategy</h3>
            <p className="text-gray-400 mb-6">
              You've seen the "MrBeast face." Why is it everywhere? Because high-arousal emotions (surprise, fear, extreme joy) trigger an instinctual pause response. Use our <strong>"Clickbait/Shocked"</strong> style to instantly apply this effect to your generated characters.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">2. Color Theory & Contrast</h3>
            <p className="text-gray-400 mb-6">
              YouTube's background is white (or dark gray). To pop, you need maximum contrast. Bright yellows, neon greens, and saturated reds work best. ThumbGen automatically color-grades your prompt to ensure the subject separates from the background.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">3. The Rule of Text</h3>
            <p className="text-gray-400 mb-6">
              Never repeat your video title in the thumbnail. Use complementary text. If your title is "I Survived 24 Hours in the Desert," your thumbnail text should be "TOO HOT!" or "I ALMOST DIED." Keep it under 4 words. Use our <strong>Manual Overlay</strong> tool to place this text strategically.
            </p>
          </article>

          {/* FAQ Section */}
          <section className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <details className="group bg-[#141414] rounded-lg border border-white/5 open:border-white/10 transition-all">
                <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-200 list-none">
                  <span>How do I get an API Key?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-400 mt-0 px-4 pb-4 leading-relaxed text-sm">
                  ThumbGen AI uses Google's Gemini API. You can get a free API key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>. The free tier provides plenty of quota for personal use.
                </div>
              </details>
              
              <details className="group bg-[#141414] rounded-lg border border-white/5 open:border-white/10 transition-all">
                <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-200 list-none">
                  <span>Is this tool better than Canva?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-400 mt-0 px-4 pb-4 leading-relaxed text-sm">
                  Canva is great for templates, but ThumbGen AI generates <em>original</em> imagery from scratch. If you need a specific scene (e.g., "A robot eating a taco on Mars"), Canva can't give you that photo. We can.
                </div>
              </details>

               <details className="group bg-[#141414] rounded-lg border border-white/5 open:border-white/10 transition-all">
                <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-200 list-none">
                  <span>What are the image dimensions?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-400 mt-0 px-4 pb-4 leading-relaxed text-sm">
                  We generate images in a 16:9 aspect ratio, optimized for YouTube's recommended 1280x720 (HD) resolution.
                </div>
              </details>
            </div>
          </section>

        </div>

        {/* Sidebar (AdSense Skyscraper Area) - Hidden for Pro Users */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Sidebar Ad 1 */}
           <div className="sticky top-24">
             {!isPro && (
               <div className="bg-[#141414] border border-white/5 rounded-xl p-4 mb-8">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Sponsored</h3>
                 <AdPlaceholder className="w-full h-[600px]" label="Vertical Skyscraper Ad" />
               </div>
             )}

             <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-xl p-6">
               <h3 className="font-bold text-white mb-2">Pro Tip 💡</h3>
               <p className="text-sm text-gray-300">
                 Adding a red arrow or circle increases CTR by an average of 14%. Use our overlay tool to import arrow assets!
               </p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};