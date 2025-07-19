import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SymbolsPage = () => {
  const [activeFilter, setActiveFilter] = useState('toate');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate()

  const symbols = [
    // Culori Primare
    { name: 'Roșu', symbol: '🔴', category: 'primare', meaning: 'Pasiune, energie, putere, dragoste', cultural: 'China: noroc, India: puritate, Occident: pericol', hex: '#DC2626' },
    { name: 'Albastru', symbol: '🔵', category: 'primare', meaning: 'Calm, încredere, stabilitate, infinit', cultural: 'Universal: pace, Asia: moarte, Occident: bărbătesc', hex: '#2563EB' },
    { name: 'Galben', symbol: '🟡', category: 'primare', meaning: 'Fericire, optimism, energie, creativitate', cultural: 'China: imperial, Egipt: eternitate, Occident: atenție', hex: '#EAB308' },

    // Culori Secundare
    { name: 'Verde', symbol: '🟢', category: 'secundare', meaning: 'Natură, creștere, echilibru, sănătate', cultural: 'Islam: paradis, Irlanda: identitate, Universal: ecologie', hex: '#16A34A' },
    { name: 'Portocaliu', symbol: '🟠', category: 'secundare', meaning: 'Entuziasm, căldură, creativitate, energie', cultural: 'Hinduism: sacru, Olanda: național, Buddhism: renunțare', hex: '#EA580C' },
    { name: 'Violet', symbol: '🟣', category: 'secundare', meaning: 'Regalitate, spiritualitate, mister, lux', cultural: 'Roma: putere, Creștinism: penitență, Modern: creativitate', hex: '#9333EA' },

    // Neutrii
    { name: 'Alb', symbol: '⚪', category: 'neutrii', meaning: 'Puritate, pace, simplitate, început nou', cultural: 'Occident: căsătorie, Asia: doliu, Universal: pace', hex: '#FFFFFF' },
    { name: 'Negru', symbol: '⚫', category: 'neutrii', meaning: 'Eleganță, putere, mister, autoritate', cultural: 'Occident: formal, Africa: maturitate, Universal: lux', hex: '#000000' },
    { name: 'Gri', symbol: '🔘', category: 'neutrii', meaning: 'Neutralitate, echilibru, maturitate, stabilitate', cultural: 'Business: profesionalism, Modern: minimalism, Universal: compromis', hex: '#6B7280' },

    // Culori Calde
    { name: 'Roșu Închis', symbol: '🔺', category: 'calde', meaning: 'Putere intensă, pasiune profundă, autoritate', cultural: 'Militar: rang, Religie: sacrificiu, Politică: revoluție', hex: '#991B1B' },
    { name: 'Roz', symbol: '🌸', category: 'calde', meaning: 'Feminitate, dragoste dulce, tandrețe, compasiune', cultural: 'Occident: feminin, Japonia: primăvara, Modern: diversitate', hex: '#EC4899' },
    { name: 'Maro', symbol: '🟤', category: 'calde', meaning: 'Pământ, stabilitate, confort, naturalețe', cultural: 'Universal: natură, Artă: realism, Fashion: clasic', hex: '#A16207' },

    // Culori Reci
    { name: 'Turcoaz', symbol: '🔷', category: 'reci', meaning: 'Claritate, comunicare, calm, protecție', cultural: 'Tibet: sacru, Amerindieni: protecție, Modern: tehnologie', hex: '#0891B2' },
    { name: 'Indigo', symbol: '🔹', category: 'reci', meaning: 'Intuiție, înțelepciune, spiritualitate profundă', cultural: 'India: tradițional, Artă: noblețe, Spiritual: chakra', hex: '#4338CA' },
    { name: 'Cyan', symbol: '💎', category: 'reci', meaning: 'Prospețime, claritate, tehnologie, modernitate', cultural: 'Digital: inovație, Medical: sterilitate, Design: minimal', hex: '#0891B2' },

    // Metalice
    { name: 'Auriu', symbol: '🟨', category: 'metalice', meaning: 'Bogăție, divinitate, succes, prestigiu', cultural: 'Universal: valoare, Religie: sacru, Business: premium', hex: '#F59E0B' },
    { name: 'Argintiu', symbol: '⚪', category: 'metalice', meaning: 'Modernitate, tehnologie, eleganță, luna', cultural: 'Tech: futurism, Fashion: sofisticat, Spiritual: feminin', hex: '#9CA3AF' },

    // Pasteluri
    { name: 'Roz Deschis', symbol: '🌺', category: 'pasteluri', meaning: 'Inocență, dulceață, calm, feminitate delicată', cultural: 'Copilărie: jucării, Design: minimalist, Fashion: romantic', hex: '#FBB6CE' },
    { name: 'Albastru Deschis', symbol: '🔸', category: 'pasteluri', meaning: 'Serenitate, încredere blândă, pace interioară', cultural: 'Bebeluși: băieți, Medical: calm, Design: clean', hex: '#93C5FD' },
    { name: 'Verde Deschis', symbol: '🍃', category: 'pasteluri', meaning: 'Creștere nouă, speranță, prospețime, început', cultural: 'Primăvara: renaștere, Eco: sustenabil, Wellness: sănătate', hex: '#86EFAC' },

    // Simboluri Culturale
    { name: 'Șofran', symbol: '🟧', category: 'culturale', meaning: 'Spiritualitate, renunțare, sacralitate', cultural: 'Hinduism: călugări, Buddhism: robă, India: sacru', hex: '#F97316' },
    { name: 'Jade', symbol: '💚', category: 'culturale', meaning: 'Noroc, protecție, înțelepciune, echilibru', cultural: 'China: prosperitate, Asia: protecție, Feng Shui: armonie', hex: '#059669' },
    { name: 'Murex', symbol: '🟪', category: 'culturale', meaning: 'Regalitate antică, raritate, putere supremă', cultural: 'Roma: împărați, Bizanț: nobili, Istorie: putere', hex: '#7C3AED' }
  ];

  const categories = [
    { id: 'toate', name: 'Toate Culorile', icon: '🌈', count: symbols.length },
    { id: 'primare', name: 'Primare', icon: '🔴', count: symbols.filter(s => s.category === 'primare').length },
    { id: 'secundare', name: 'Secundare', icon: '🟠', count: symbols.filter(s => s.category === 'secundare').length },
    { id: 'neutrii', name: 'Neutrii', icon: '⚫', count: symbols.filter(s => s.category === 'neutrii').length },
    { id: 'calde', name: 'Calde', icon: '🔥', count: symbols.filter(s => s.category === 'calde').length },
    { id: 'reci', name: 'Reci', icon: '❄️', count: symbols.filter(s => s.category === 'reci').length },
    { id: 'metalice', name: 'Metalice', icon: '✨', count: symbols.filter(s => s.category === 'metalice').length },
    { id: 'pasteluri', name: 'Pasteluri', icon: '🌸', count: symbols.filter(s => s.category === 'pasteluri').length },
    { id: 'culturale', name: 'Culturale', icon: '🏛️', count: symbols.filter(s => s.category === 'culturale').length }
  ];

  const filteredSymbols = symbols.filter(symbol => {
    const matchesFilter = activeFilter === 'toate' || symbol.category === activeFilter;
    const matchesSearch = symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.cultural.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
    
      <div className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/teorie')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-lg"
            >
               Înapoi la Teorie
            </button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                🔮 Simbolistica Culorilor
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Explorează semnificațiile și contextul cultural al fiecărei culori
              </p>
            </div>
            
            <div className="w-32"></div>
          </div>

      
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Caută culori, semnificații sau culturi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-400 text-lg"
                />
              </div>
              
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-pink-400">{symbols.length}</div>
                  <div className="text-white/80 text-lg">Simboluri Totale</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{categories.length - 1}</div>
                  <div className="text-white/80 text-lg">Categorii</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-400">{filteredSymbols.length}</div>
                  <div className="text-white/80 text-lg">Rezultate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
     
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Categorii de Culori</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold text-lg">{category.name}</span>
                <span className="text-sm opacity-80">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeFilter === 'toate' ? 'Toate Simbolurile' : categories.find(c => c.id === activeFilter)?.name} 
              <span className="text-white/60 ml-2">({filteredSymbols.length})</span>
            </h2>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors text-lg"
              >
                Șterge căutarea ✕
              </button>
            )}
          </div>

          {filteredSymbols.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">Nu am găsit rezultate</h3>
              <p className="text-white/60 text-lg">Încearcă să modifici termenul de căutare sau filtrele</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSymbols.map((symbol, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-3 border-white/20"
                      style={{ backgroundColor: symbol.hex }}
                    >
                      {symbol.symbol}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{symbol.name}</h3>
                      <div className="text-white/60 text-lg font-mono">{symbol.hex}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white/90 mb-2">🎭 Semnificații:</h4>
                      <p className="text-white/80 text-lg leading-relaxed">{symbol.meaning}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white/90 mb-2">🌍 Context Cultural:</h4>
                      <p className="text-white/70 text-lg leading-relaxed">{symbol.cultural}</p>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        symbol.category === 'primare' ? 'bg-red-500/20 text-red-300' :
                        symbol.category === 'secundare' ? 'bg-orange-500/20 text-orange-300' :
                        symbol.category === 'neutrii' ? 'bg-gray-500/20 text-gray-300' :
                        symbol.category === 'calde' ? 'bg-yellow-500/20 text-yellow-300' :
                        symbol.category === 'reci' ? 'bg-blue-500/20 text-blue-300' :
                        symbol.category === 'metalice' ? 'bg-yellow-600/20 text-yellow-200' :
                        symbol.category === 'pasteluri' ? 'bg-pink-500/20 text-pink-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {categories.find(c => c.id === symbol.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

     
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">🔮 Înțelegerea Profundă a Simbolismului Cromatic</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">🌍 Cum se Formează Simbolurile Cromatice</h3>
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Simbolismul culorilor nu apare din întâmplare - el se dezvoltă pe parcursul secolelor prin interacțiunea 
                complexă dintre mediul natural, experiențele culturale și credințele spirituale ale fiecărui popor. 
                Roșul devine simbolul puterii nu doar pentru că este culoarea sângelui și a focului, ci și pentru că 
                pigmenții roșii erau rari și scumpi în antichitate, făcându-i accesibili doar celor cu statut înalt.
              </p>
              <p className="text-white/90 text-xl leading-relaxed">
                Fiecare culoare din biblioteca noastră poartă în sine straturile acestor experiențe colective. 
                Albastrul devine culoarea divinității pentru că cerul și oceanul - manifestări ale infinitului - 
                sunt albastre. Verdele se asociază cu viața pentru că este culoarea vegetației care asigură supraviețuirea. 
                Aceste conexiuni nu sunt arbitrare, ci reflectă legături profunde între percepția umană și lumea înconjurătoare.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">⚡ Puterea Psihologică a Asocierilor</h3>
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Când vedem o culoare, creierul nostru nu procesează doar informația vizuală - el activează instantaneu 
                rețele întregi de asocieri, amintiri și emoții. Această reacție se întâmplă în mai puțin de 100 de 
                milisecunde, mult înainte ca mintea conștientă să analizeze situația. Din acest motiv, culorile au o 
                putere atât de mare în influențarea stărilor noastre emoționale și a deciziilor pe care le luăm.
              </p>
              <p className="text-white/90 text-xl leading-relaxed">
                Galbenul nu ne face să simțim fericire pentru că "așa ne-am învățat" - ci pentru că creierul nostru 
                asociază galbenul cu lumina soarelui, care declanșează producția de serotonină, hormonul fericirii. 
                Albastrul ne calmează pentru că este asociat cu cerul senin și apa limpede, elemente care în evoluția 
                noastră au semnificat siguranță și abundență. Aceste răspunsuri sunt programate la nivel neuronal și 
                transcend granițele culturale.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">🔄 Evoluția și Adaptarea Simbolurilor</h3>
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Simbolismul culorilor nu este static - el evoluează constant odată cu schimbările sociale, tehnologice 
                și culturale. Negrul, care în Egipt simboliza fertilitatea (din cauza solului negru al Nilului), 
                devine în Europa medievală culoarea doliului, iar în epoca modernă se transformă în simbolul eleganței 
                și puterii. Această transformare reflectă schimbările în modul de viață, valorile sociale și tehnologiile 
                disponibile pentru producerea pigmenților.
              </p>
              <p className="text-white/90 text-xl leading-relaxed">
                În era digitală, asistăm la o nouă revoluție simbolică. Verdele #00FF00 devine simbolul tehnologiei 
                (Matrix, interfețe digitale), iar gradienturile holografice reprezintă inovația și viitorul. 
                Generațiile native digitale dezvoltă asocieri complet noi, în care culorile RGB au semnificații 
                diferite de cele tradiționale. Această evoluție continuă demonstrează natura vie și adaptabilă a 
                simbolismului cromatic.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">🌐 Globalizarea vs. Tradițiile Locale</h3>
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Globalizarea creează o tensiune fascinantă în simbolismul culorilor. Pe de o parte, brandurile 
                multinaționale promovează asocieri standardizate - albastrul pentru tehnologie, verdele pentru eco, 
                roșul pentru urgență. Pe de altă parte, tradițiile locale rezistă și își păstrează semnificațiile 
                ancestrale. În India, roșul rămâne culoarea sacră a nunții, indiferent de tendințele globale care 
                îl asociază cu pericolul.
              </p>
              <p className="text-white/90 text-xl leading-relaxed">
                Această dualitate creează oportunități și provocări unice pentru designerii și marketerii moderni. 
                Succesul în comunicarea interculturală necesită o înțelegere profundă a ambelor niveluri - simbolismul 
                global standardizat și nuanțele locale specifice. Coca-Cola folosește roșu universal, dar adaptează 
                tonurile și contextul pentru fiecare piață. McDonald's renunță la roșu în zonele unde această culoare 
                are conotații negative și adoptă verdele în țările musulmane.
              </p>


            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link
                            to="/teorie/perceptia"
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg text-center"
                          >
                            Următorul: 👁️ Percepția Vizuală
                          </Link>
                          <Link
                            to="/quiz"
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg text-center"
                          >
                               🎯 Testează: Quiz 
                          </Link>
                         
                        </div>
                      
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolsPage;