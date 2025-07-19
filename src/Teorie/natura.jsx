import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ColorsInNaturePresentation() {
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'seasons', 'ecosystems', 'adaptation', 'inspiration'];
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const seasonalPalettes = [
    {
      season: 'Primăvara',
      icon: '🌸',
      description: 'Renașterea și prospețimea',
      colors: [
        { name: 'Verde tânăr', hex: '#90EE90', description: 'Mugurii și frunzele tinere' },
        { name: 'Roz cireș', hex: '#FFB7C5', description: 'Florile de cireș japonez' },
        { name: 'Galben narcisă', hex: '#FFFF99', description: 'Primele flori de primăvară' },
        { name: 'Violet liliac', hex: '#DDA0DD', description: 'Florile de liliac' }
      ],
      palette: 'bg-gradient-to-r from-green-300 via-pink-200 to-yellow-200',
      mood: 'Optimism, început nou, energie proaspătă'
    },
    {
      season: 'Vara',
      icon: '☀️',
      description: 'Vitalitatea și abundența',
      colors: [
        { name: 'Verde intens', hex: '#228B22', description: 'Frunzișul bogat' },
        { name: 'Albastru cer', hex: '#87CEEB', description: 'Cerul senin de vară' },
        { name: 'Galben solar', hex: '#FFD700', description: 'Razele puternice de soare' },
        { name: 'Roșu mac', hex: '#FF6347', description: 'Florile intense de mac' }
      ],
      palette: 'bg-gradient-to-r from-green-600 via-blue-400 to-yellow-400',
      mood: 'Energie maximă, vitalitate, abundență'
    },
    {
      season: 'Toamna',
      icon: '🍂',
      description: 'Căldura și transformarea',
      colors: [
        { name: 'Portocaliu ardent', hex: '#FF8C00', description: 'Frunzele de arțar' },
        { name: 'Roșu burgundy', hex: '#800020', description: 'Viței de vie mature' },
        { name: 'Galben auriu', hex: '#DAA520', description: 'Frunzele de mesteacăn' },
        { name: 'Maro bronz', hex: '#CD7F32', description: 'Coaja copacilor' }
      ],
      palette: 'bg-gradient-to-r from-orange-500 via-red-600 to-yellow-600',
      mood: 'Nostalgie, căldură, maturitate'
    },
    {
      season: 'Iarna',
      icon: '❄️',
      description: 'Puritatea și liniștea',
      colors: [
        { name: 'Alb pristină', hex: '#FFFAFA', description: 'Zăpada proaspătă' },
        { name: 'Albastru glacial', hex: '#B0E0E6', description: 'Gheața și cerul de iarnă' },
        { name: 'Gri argintiu', hex: '#C0C0C0', description: 'Ramurile înghețate' },
        { name: 'Verde brad', hex: '#355E3B', description: 'Coniferii veșnic verzi' }
      ],
      palette: 'bg-gradient-to-r from-blue-200 via-gray-200 to-green-700',
      mood: 'Liniște, puritate, contemplare'
    }
  ];

  const ecosystems = [
    {
      name: 'Oceanul',
      icon: '🌊',
      description: 'Paletele infinite ale apelor',
      colors: [
        { name: 'Albastru profund', hex: '#003366', bg: 'bg-blue-900' },
        { name: 'Turcoaz tropical', hex: '#40E0D0', bg: 'bg-cyan-400' },
        { name: 'Verde algă', hex: '#50C878', bg: 'bg-emerald-500' },
        { name: 'Alb spumă', hex: '#F8F8FF', bg: 'bg-slate-50' }
      ],
      characteristics: 'Gamă largă de albastre, de la profund la cristalin',
      inspiration: 'Calmul profunzimilor și energia valurilor'
    },
    {
      name: 'Pădurea',
      icon: '🌲',
      description: 'Simfonia verde și brună',
      colors: [
        { name: 'Verde închis', hex: '#006400', bg: 'bg-green-800' },
        { name: 'Verde frunză', hex: '#228B22', bg: 'bg-green-600' },
        { name: 'Maro trunchi', hex: '#8B4513', bg: 'bg-amber-800' },
        { name: 'Bej pământ', hex: '#F5DEB3', bg: 'bg-amber-100' }
      ],
      characteristics: 'Dominanța verzii cu accente calde de maro',
      inspiration: 'Stabilitate, creștere și conexiune cu pământul'
    },
    {
      name: 'Deșertul',
      icon: '🏜️',
      description: 'Paleta caldă a supraviețuirii',
      colors: [
        { name: 'Bej nisip', hex: '#F4A460', bg: 'bg-yellow-600' },
        { name: 'Portocaliu teracotă', hex: '#E2725B', bg: 'bg-orange-600' },
        { name: 'Roșu rocă', hex: '#CD5C5C', bg: 'bg-red-500' },
        { name: 'Verde cactus', hex: '#9CAF88', bg: 'bg-lime-600' }
      ],
      characteristics: 'Tonuri calde și pământii cu accente de verde',
      inspiration: 'Reziliență, adaptare și frumusețe în simplitate'
    },
    {
      name: 'Tundra Arctică',
      icon: '🧊',
      description: 'Paleta minimalistă a extremelor',
      colors: [
        { name: 'Alb arctic', hex: '#F0F8FF', bg: 'bg-blue-50' },
        { name: 'Albastru glaciar', hex: '#4682B4', bg: 'bg-blue-600' },
        { name: 'Gri stâncă', hex: '#708090', bg: 'bg-slate-500' },
        { name: 'Verde lichen', hex: '#ADDFAD', bg: 'bg-green-300' }
      ],
      characteristics: 'Palette minimale cu dominanța alb-albastru',
      inspiration: 'Puritate, rezistență și frumusețe spartană'
    }
  ];

  const adaptationExamples = [
    {
      animal: 'Cameleонul',
      icon: '🦎',
      adaptation: 'Mimicry chromatică',
      description: 'Schimbă culoarea pentru camuflaj și comunicare',
      colors: ['Verde frunză', 'Maro bark', 'Galben floare'],
      purpose: 'Supraviețuire și comunicare socială'
    },
    {
      animal: 'Păunul',
      icon: '🦚',
      adaptation: 'Display spectaculos',
      description: 'Culorile iridescente pentru atragerea partenerului',
      colors: ['Albastru metalic', 'Verde smarald', 'Auriu strălucitor'],
      purpose: 'Atragerea partenerului și intimidarea rivalilor'
    },
    {
      animal: 'Fluturele Morpho',
      icon: '🦋',
      adaptation: 'Iridescență structurală',
      description: 'Aripile reflectă lumina în spectre de albastru',
      colors: ['Albastru electric', 'Violet metalic', 'Negru contrast'],
      purpose: 'Confuzarea prădătorilor și recunoașterea speciei'
    },
    {
      animal: 'Peștele Mandarin',
      icon: '🐠',
      adaptation: 'Avertisment toxic',
      description: 'Culori vibrante care semnalează toxicitatea',
      colors: ['Portocaliu intens', 'Albastru electric', 'Verde fosforescent'],
      purpose: 'Avertizarea prădătorilor despre toxicitate'
    }
  ];

  const designInspiration = [
    {
      concept: 'Aurora Boreală',
      colors: ['Verde fosfor', 'Violet cosmic', 'Albastru cosmic'],
      gradient: 'from-green-400 via-purple-500 to-blue-600',
      application: 'Designuri futuriste, aplicații tech, branding inovator'
    },
    {
      concept: 'Apus de Soare',
      colors: ['Portocaliu ardent', 'Roz fucsia', 'Violet profund'],
      gradient: 'from-orange-500 via-pink-500 to-purple-700',
      application: 'Branding romantic, aplicații lifestyle, design emotional'
    },
    {
      concept: 'Coral Reef',
      colors: ['Turcoaz cristal', 'Coral vibrant', 'Galben tropical'],
      gradient: 'from-cyan-400 via-orange-400 to-yellow-400',
      application: 'Designuri tropicale, aplicații de călătorie, branding vară'
    },
    {
      concept: 'Pădurea Înceațată',
      colors: ['Verde smarald', 'Gri argintiu', 'Alb perlat'],
      gradient: 'from-emerald-600 via-gray-400 to-white',
      application: 'Designuri minimale, aplicații wellness, branding eco'
    }
  ];

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
    

      <div className="w-[100%]  px-4">
       
        <div className="pt-20 pb-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigate('/teorie')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                 Înapoi la Teorie
              </button>
           
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              🌿 Culorile în Natură
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Explorează paleta infinită a naturii și învață de la cele mai spectaculoase 
              combinații cromatice create de-a lungul milioanelor de ani.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 pb-20">
         
          <section id="intro" className="mb-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">🌱 Natura: Maestrul Designului</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">De Ce Să Învățăm de la Natură?</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Milioane de ani de evoluție estetică</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Combinații perfect adaptate funcțional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Inspirație infinită și în continuă schimbare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Paleta cea mai bogată și diversă</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Principii Naturale</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Camuflajul și integrarea în mediu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lime-400 mt-1">•</span>
                      <span>Contrastul pentru atenție și supraviețuire</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Gradientele pentru tranziții armonioase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Repetarea pentru coerență și ritm</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">🔬 Știința Culorii în Natură</h3>
                <div className="grid md:grid-cols-3 gap-4 text-base">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">10M+</div>
                    <p className="text-white/80">culori distincte în natură</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-400">4 miliarde</div>
                    <p className="text-white/80">ani de evoluție cromatică</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">99%</div>
                    <p className="text-white/80">din designurile naturale sunt funcționale</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

   
          <section id="seasons" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🌸 Paletele Anotimpurilor</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Fiecare anotimp ne oferă o lecție unică despre combinațiile de culori și 
                emoțiile pe care le pot evoca.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {seasonalPalettes.map((season, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{season.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{season.season}</h3>
                      <p className="text-white/60">{season.description}</p>
                    </div>
                  </div>
                  
                  <div className={`h-12 rounded-lg ${season.palette} mb-6`}></div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {season.colors.map((color, i) => (
                      <div key={i} className="bg-black/30 rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white/30" 
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span className="text-white/80 text-sm font-semibold">{color.name}</span>
                        </div>
                        <p className="text-white/60 text-xs">{color.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/80 text-sm font-semibold mb-1">Atmosfera:</p>
                    <p className="text-white/70 text-sm">{season.mood}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

    
          <section id="ecosystems" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🌊 Ecosisteme și Paletele Lor</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Fiecare ecosistem a dezvoltat o paletă unică, optimizată pentru 
                supraviețuire și frumusețe.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {ecosystems.map((ecosystem, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{ecosystem.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{ecosystem.name}</h3>
                      <p className="text-white/60">{ecosystem.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {ecosystem.colors.map((color, i) => (
                      <div key={i} className="text-center">
                        <div className={`w-full h-12 rounded-lg ${color.bg} border-2 border-white/30`}></div>
                        <p className="text-white/70 text-xs mt-2">{color.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-white/80 text-sm font-semibold mb-1">Caracteristici:</p>
                      <p className="text-white/70 text-sm">{ecosystem.characteristics}</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-white/80 text-sm font-semibold mb-1">Inspirație:</p>
                      <p className="text-white/70 text-sm">{ecosystem.inspiration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

   
          <section id="adaptation" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🦋 Adaptarea Cromatică</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Exemple fascinante de cum natura folosește culoarea pentru supraviețuire 
                și comunicare.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {adaptationExamples.map((example, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{example.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{example.animal}</h3>
                      <p className="text-white/60">{example.adaptation}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-lg mb-6">{example.description}</p>
                  
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm font-semibold mb-2">Culori folosite:</p>
                    <div className="flex gap-2 flex-wrap">
                      {example.colors.map((color, i) => (
                        <span key={i} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/80 text-sm font-semibold mb-1">Scop:</p>
                    <p className="text-white/70 text-sm">{example.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

       
          <section id="inspiration" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🎨 Inspirație pentru Design</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Cum să transformi fenomenele naturale în palete practice pentru proiectele tale.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {designInspiration.map((inspiration, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">{inspiration.concept}</h3>
                  
                  <div className={`h-16 rounded-lg bg-gradient-to-r ${inspiration.gradient} mb-6`}></div>
                  
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm font-semibold mb-2">Palette:</p>
                    <div className="flex gap-2 flex-wrap">
                      {inspiration.colors.map((color, i) => (
                        <span key={i} className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/80 text-sm font-semibold mb-1">Aplicații:</p>
                    <p className="text-white/70 text-sm">{inspiration.application}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">🌿 Natura ca Mentor</h3>
              <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                Natura rămâne cel mai mare artist și designer. Observând și învățând de la 
                paletele ei infinite, putem crea designuri care nu doar arată frumos, 
                ci rezonează profund cu percepția umană.
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">🦋 Adaptare</h4>
                  <p className="text-white/70 text-sm">Funcția culorii</p>
                </div>
              </div>
              
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/joc')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg"
              >
                Felicitări! Să trecem la Jocuri :) 
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg"
              >
                   🎯 Testează: Quiz 🌿 Culorile în Natură
              </button>
             
            </div>
            </div>
          </section>
        </div>

       
      </div>
    </div>
  );
}