import { Zap, Settings, X, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const ChatHeader = ({
 apiConnected,
 onToggleApiInput,
 onClose,
 showCloseButton = false
}) => {
 const [showHelp, setShowHelp] = useState(false);

 const HelpModal = () => (
   <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
     <div className="bg-gray-900/90 backdrop-blur-lg border border-cyan-400/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
       <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg p-6 flex items-center justify-between rounded-t-2xl border-b border-cyan-400/30">
         <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
           Ce este Groq și cum funcționează?
         </h2>
         <button 
           onClick={() => setShowHelp(false)}
           className="text-cyan-400 hover:text-pink-400 text-3xl font-bold leading-none transition-colors duration-300 w-8 h-8 flex items-center justify-center"
           title="Închide"
         >
           ×
         </button>
       </div>

       <div className="p-6 space-y-6">
         <div className="bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 p-1 rounded-xl border border-cyan-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
               🚀 Ce este Groq?
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-pink-400 font-bold">Groq:</label> Este o platformă AI ultra-rapidă care oferă acces la modele de limbaj avansate</p>
               <p><label className="text-pink-400 font-bold">Viteză:</label> Procesează răspunsurile de până la 10x mai rapid decât alte platforme</p>
               <p><label className="text-pink-400 font-bold">Modele:</label> Include Llama, Mixtral și alte modele AI de top</p>
               <p><label className="text-pink-400 font-bold">Gratuit:</label> Oferă un nivel gratuit generos pentru utilizatori</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-1 rounded-xl border border-blue-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
               🔑 Cum îți faci cont și obții cheia API
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-cyan-400 font-bold">Pasul 1:</label> Mergi pe <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 underline transition-colors">console.groq.com</a> și creează un cont gratuit</p>
               <p><label className="text-cyan-400 font-bold">Pasul 2:</label> Verifică-ți email-ul pentru activarea contului</p>
               <p><label className="text-cyan-400 font-bold">Pasul 3:</label> În dashboard, accesează secțiunea "API Keys"</p>
               <p><label className="text-cyan-400 font-bold">Pasul 4:</label> Click pe "Create API Key" și salvează cheia generată</p>
               <p><label className="text-cyan-400 font-bold">Pasul 5:</label> Copiază cheia și introdu-o în AI ColView</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 p-1 rounded-xl border border-purple-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
               💬 Avantajele conectării la Groq
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-green-400 font-bold">Răspunsuri inteligente:</label> AI adevărat în loc de răspunsuri statice</p>
               <p><label className="text-green-400 font-bold">Viteză incredibilă:</label> Răspunsuri aproape instantanee</p>
               <p><label className="text-green-400 font-bold">Conversații naturale:</label> Dialog fluid și contextual</p>
               <p><label className="text-green-400 font-bold">Gratuit:</label> Nivel gratuit generos pentru începători</p>
               <p><label className="text-green-400 font-bold">Securitate:</label> Cheia API rămâne doar în browserul tău</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20 p-1 rounded-xl border border-yellow-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
               🔒 Securitate și Confidențialitate
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-orange-400 font-bold">Stocare locală:</label> Cheia API se salvează doar în browserul tău</p>
               <p><label className="text-orange-400 font-bold">Fără servere:</label> Comunicarea este directă între tine și Groq</p>
               <p><label className="text-orange-400 font-bold">Control total:</label> Poți șterge cheia oricând din setări</p>
               <p><label className="text-orange-400 font-bold">Open source:</label> Codul aplicației este transparent</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-cyan-900/20 p-1 rounded-xl border border-pink-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
               🆚 Mod Local vs Groq
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-yellow-400 font-bold">Mod Local:</label> Răspunsuri predefinite, fără cost, funcționalitate limitată</p>
               <p><label className="text-green-400 font-bold">Mod Groq:</label> AI adevărat, conversații inteligente, răspunsuri personalizate</p>
               <p>Recomandăm să încerci mai întâi modul local pentru a înțelege aplicația, apoi să treci la Groq pentru experiența completă</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-indigo-900/20 via-blue-900/20 to-teal-900/20 p-1 rounded-xl border border-indigo-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
               🎯 Link-uri Utile
             </h3>
             <div className="space-y-3 text-gray-300">
               <p><label className="text-blue-400 font-bold">Groq Consolă:</label> <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 underline transition-colors">console.groq.com</a></p>
               <p><label className="text-blue-400 font-bold">Documentație:</label> <a href="https://console.groq.com/docs" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 underline transition-colors">console.groq.com/docs</a></p>
               <p><label className="text-blue-400 font-bold">API Chei:</label> <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 underline transition-colors">console.groq.com/keys</a></p>
               <p><label className="text-blue-400 font-bold">Loc de Joacă:</label> <a href="https://console.groq.com/playground" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 underline transition-colors">console.groq.com/playground</a></p>
               <p><label className="text-blue-400 font-bold">Rate limită gratuită:</label> 30 cereri/minut.</p>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-emerald-900/20 via-green-900/20 to-teal-900/20 p-1 rounded-xl border border-emerald-400/30">
           <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
             <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                Acces Rapid
             </h3>
             <div className="space-y-4 text-gray-300">
               <div className="flex flex-wrap gap-3">
                 <a 
                   href="https://console.groq.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                 >
                   🏠 Groq Consolă
                 </a>
                 <a 
                   href="https://console.groq.com/keys" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
                 >
                   🔑 API Chei
                 </a>
                 <a 
                   href="https://console.groq.com/playground" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                 >
                   🎮 Loc de Joacă
                 </a>
                 <a 
                   href="https://console.groq.com/docs" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
                 >
                   📚 Documentație
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>

       <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-lg p-6 text-center border-t border-cyan-400/30 rounded-b-2xl">
         <button 
           onClick={() => setShowHelp(false)}
           className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
         >
           Am înțeles! 🚀
         </button>
       </div>
     </div>
   </div>
 );

 return (
   <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 lg:p-4">
     <div className="flex items-center justify-between">
       <div className="flex items-center space-x-2 lg:space-x-3">
         <div className="bg-white/20 p-1 lg:p-2 rounded-full">
           <Zap className="h-4 w-4 lg:h-5 lg:w-5" />
         </div>
         <div>
           <h3 className="font-bold text-sm lg:text-lg">AI ColView</h3>
           <p className="text-xs lg:text-sm opacity-90 flex items-center">
             <span className={`w-2 h-2 rounded-full mr-2 ${apiConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
             {apiConnected ? 'Groq conectat' : 'Mod local'}
           </p>
         </div>
       </div>
       <div className="flex space-x-1 lg:space-x-2">
         <button
           onClick={onToggleApiInput}
           className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors"
           title="Setări API"
         >
           <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
         </button>
         <button
           onClick={() => setShowHelp(true)}
           className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors"
           title="Ajutor despre Groq"
         >
           <HelpCircle className="h-3 w-3 lg:h-4 lg:w-4" />
         </button>
         {showCloseButton && (
           <button
             onClick={onClose}
             className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors lg:hidden"
           >
             <X className="h-4 w-4 lg:h-5 lg:w-5" />
           </button>
         )}
       </div>
     </div>
     
     {showHelp && createPortal(<HelpModal />, document.body)}
   </div>
 );
};

export default ChatHeader;