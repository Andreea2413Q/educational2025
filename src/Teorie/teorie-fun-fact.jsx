import React, { useState, useEffect } from 'react';

const ColorFactsPage = () => {
  // Baza de date cu 30 de fun facts despre culori
  const allFacts = [
    { emoji: "🌈", title: "Ochiul uman", text: "poate percepe aproximativ 10 milioane de culori diferite" },
    { emoji: "🔴", title: "Roșul", text: "poate mări apetitul și crea senzația de urgență" },
    { emoji: "💙", title: "Albastrul", text: "poate reduce tensiunea arterială și calma mintea" },
    { emoji: "💚", title: "Verdele", text: "este cel mai odihnitor pentru ochiul uman" },
    { emoji: "💜", title: "Violetul", text: "stimulează creativitatea și spiritualitatea" },
    { emoji: "🟡", title: "Galbenul", text: "îmbunătățește concentrarea și memoria" },
    { emoji: "🟠", title: "Portocaliul", text: "crește energia și optimismul" },
    { emoji: "🖤", title: "Negrul", text: "absoarbe toate culorile din spectrul vizibil" },
    { emoji: "🤍", title: "Albul", text: "reflectă toate culorile din spectrul vizibil" },
    { emoji: "🟤", title: "Maro", text: "este asociat cu stabilitatea și confortul" },
    { emoji: "🩷", title: "Roz", text: "poate reduce nivelul de agresivitate și anxietate" },
    { emoji: "🐝", title: "Albinele", text: "nu pot vedea culoarea roșie, dar văd ultravioletul" },
    { emoji: "🦎", title: "Camaleonii", text: "schimbă culoarea pentru comunicare, nu camuflaj" },
    { emoji: "🌅", title: "Apusul", text: "pare roșu din cauza dispersiei luminii în atmosferă" },
    { emoji: "💎", title: "Diamantele", text: "colorate sunt mai rare și mai valoroase decât cele incolore" },
    { emoji: "🏳️", title: "Prima steag", text: "curcubeul avea doar 8 culori în versiunea originală" },
    { emoji: "👁️", title: "Daltonismul", text: "afectează 8% din bărbați și doar 0.5% din femei" },
    { emoji: "🎨", title: "Pictura", text: "albastrul a fost cea mai scumpă culoare în Renaștere" },
    { emoji: "🌸", title: "Roz în Japonia", text: "era considerat o culoare masculină până în secolul XX" },
    { emoji: "🚗", title: "Mașinile albe", text: "sunt cele mai sigure, fiind cel mai vizibile noaptea" },
    { emoji: "🏥", title: "Verde medical", text: "ajută chirurgii să vadă mai bine contrastele roșii" },
    { emoji: "🔵", title: "Albastru ceresc", text: "cerул pare albastru din cauza împrăștierii luminii" },
    { emoji: "🍅", title: "Roșu tomate", text: "tomatele sunt roșii pentru a atrage animalele" },
    { emoji: "📱", title: "Ecranele", text: "folosesc doar 3 culori de bază: roșu, verde, albastru" },
    { emoji: "🌙", title: "Luna albastră", text: "nu este de fapt albastră, termenul înseamnă 'rară'" },
    { emoji: "🎭", title: "Psihologia", text: "culorile calde par să se apropie, cele reci să se îndepărteze" },
    { emoji: "🐻", title: "Urșii polari", text: "au pielea neagră sub blana lor albă" },
    { emoji: "🌿", title: "Clorofila", text: "absoarbe roșul și albastrul, reflectă verdele" },
    { emoji: "💡", title: "LED-urile", text: "albastre au fost inventate ultimele, în 1994" },
    { emoji: "🎪", title: "Primul colorant", text: "sintetic a fost mov, descoperit accidental în 1856" }
  ];

  const [currentFacts, setCurrentFacts] = useState([]);
  const [previousFacts, setPreviousFacts] = useState([]);

  // Funcție pentru a selecta 4 fapte aleatoare diferite de cele precedente
  const getRandomFacts = (excludeFacts = []) => {
    const excludeIndices = excludeFacts.map(fact => 
      allFacts.findIndex(f => f.title === fact.title)
    );
    
    const availableFacts = allFacts.filter((_, index) => 
      !excludeIndices.includes(index)
    );

    // Amestecă array-ul disponibil
    const shuffled = [...availableFacts].sort(() => 0.5 - Math.random());
    
    // Returnează primele 4
    return shuffled.slice(0, 4);
  };

  // Inițializează cu 4 fapte aleatoare
  useEffect(() => {
    const initialFacts = getRandomFacts();
    setCurrentFacts(initialFacts);
  }, []);

  // Funcția de restart
  const handleRestart = () => {
    const newFacts = getRandomFacts(currentFacts);
    setPreviousFacts(currentFacts);
    setCurrentFacts(newFacts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Curiozități Fascinante despre Culori
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Descoperă secrete surprinzătoare din lumea culorilor
        </p>
        
        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                     text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-300 
                     hover:scale-105 shadow-lg hover:shadow-xl"
        >
          🎲 Descoperă Alte Curiozități
        </button>
      </div>

      {/* Fun Facts Grid */}
      <div className="px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentFacts.map((fact, index) => (
              <div 
                key={`${fact.title}-${index}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center 
                         transform transition-all duration-500 hover:scale-105 hover:bg-white/15
                         border border-white/20 shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="text-4xl mb-4">{fact.emoji}</div>
                <h4 className="text-white font-semibold mb-3 text-lg">{fact.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counter Info */}
      <div className="text-center pb-8">
        <p className="text-white/60 text-sm">
          {currentFacts.length} din {allFacts.length} curiozități disponibile
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ColorFactsPage;