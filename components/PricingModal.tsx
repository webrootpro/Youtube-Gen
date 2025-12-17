import React, { useState } from 'react';

interface PricingModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  userIp?: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose, onUpgrade, userIp }) => {
  const [paymentState, setPaymentState] = useState<'idle' | 'success'>('idle');

  // Render Success Screen
  if (paymentState === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
         <div className="bg-[#141414] border border-green-500/50 rounded-2xl w-full max-w-md p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-green-500/5"></div>
            
            <div className="relative z-10 w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/50">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
            
            <h2 className="relative z-10 text-3xl font-display font-bold text-white mb-2">Payment Successful!</h2>
            <p className="relative z-10 text-gray-400 mb-8 leading-relaxed">
              You are now a <span className="text-white font-bold">Pro Member</span>.<br/> 
              Enjoy unlimited 4K generations and priority access.
              {userIp && <span className="block mt-2 text-xs text-green-500">License bound to IP: {userIp}</span>}
            </p>
            
            <button 
              onClick={onUpgrade} 
              className="relative z-10 w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-green-900/20 transform hover:scale-[1.02]"
            >
               Start Creating Now
            </button>
         </div>
      </div>
    );
  }

  // Render Payment Form
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#141414] border border-red-500/30 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-10 p-2 rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Value Prop */}
        <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-red-900/20 to-black border-r border-white/5 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Create Viral Thumbnails <span className="text-red-500">Instantly</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join 10,000+ creators using ThumbGen AI to triple their Click-Through Rate. Stop wasting hours in Photoshop.
            </p>
            
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-white">Unlimited Generations</h4>
                    <p className="text-xs text-gray-500">No daily limits. Create until it's perfect.</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-white">4K Resolution</h4>
                    <p className="text-xs text-gray-500">Crystal clear downloads for Retina displays.</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-white">No Ads</h4>
                    <p className="text-xs text-gray-500">Focus on creating. No distractions.</p>
                 </div>
               </div>
            </div>
            
            {userIp && (
              <div className="mt-8 p-3 bg-black/40 rounded-lg border border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div className="text-xs text-gray-400">
                  <span className="block font-bold text-gray-300">Device Verified</span>
                  IP: {userIp}
                </div>
              </div>
            )}
        </div>

        {/* Right Side: Payment Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#141414]">
          <div className="text-center mb-8">
             <div className="flex items-center justify-center gap-2 mb-2">
                 <span className="text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337l.756-4.828H5.586c-.596 0-1.11-.322-1.328-.868-.216-.546-.026-1.168.45-1.528l10.84-8.156c.636-.48 1.545-.164 1.704.62l.718 3.518h2.646c.596 0 1.11.322 1.328.868.216.546.026 1.168-.45 1.528l-10.84 8.156c-.636.48-1.546.164-1.704-.62l-.718-3.518H7.076z"/></svg>
                 </span>
                 <span className="text-sm font-bold text-white tracking-widest uppercase">Connect Account</span>
             </div>
            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">One-Time Fee</span>
            <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold text-white">$9.00</span>
                <span className="text-xl text-gray-500 line-through">$29</span>
            </div>
            <p className="text-gray-400 mt-2">Unlock Pro features instantly.</p>
          </div>

          <div className="w-full relative z-0">
             <div className="mb-4 text-center">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Simulated Payment Mode</p>
             </div>
             
             <button 
                onClick={() => setPaymentState('success')}
                className="w-full py-4 bg-[#FFC439] hover:bg-[#F4B400] text-black font-bold text-lg rounded-full flex items-center justify-center gap-2 transition-transform transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
             >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.553 3.105l-6 3C13.883 6.438 13.445 6.666 13 6.666c-.446 0-.883-.228-1.553-.561l-6-3c-1.136-.568-2.51-.171-3.129 1.054-.621 1.226-.239 2.918.892 3.673l7.262 4.908c.321.217.734.217 1.055 0l7.262-4.908c1.131-.755 1.513-2.447.892-3.673-.618-1.225-1.993-1.622-3.129-1.054zM4.002 11.236l6.816 4.609c.356.241.77.363 1.185.363s.828-.122 1.184-.363l6.816-4.609c.673-.455 1.488-.063 1.488.75v5.014c0 1.657-1.343 3-3 3H5.508c-1.657 0-3-1.343-3-3v-5.014c0-.813.815-1.205 1.494-.75z"/></svg>
                <span>Pay $9.00 & Unlock</span>
             </button>
             
             <div className="mt-3 flex justify-center">
               <span className="text-[10px] text-gray-500">Secure simulated transaction</span>
             </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale">
             {/* Simple CC Icons placeholders */}
             <div className="h-6 w-10 bg-white rounded"></div>
             <div className="h-6 w-10 bg-white rounded"></div>
             <div className="h-6 w-10 bg-white rounded"></div>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-4">
            Payments are securely processed.<br/>
            We do not store your financial details.
          </p>
        </div>
      </div>
    </div>
  );
};