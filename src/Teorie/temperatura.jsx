import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function ColorTemperaturePage(){
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  const [roomTemperature, setRoomTemperature] = useState('neutral');

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'science', 'psychology', 'applications', 'examples'];
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

  const temperatureScience = [
    {
      category: 'Culorile Calde',
      range: '1000K - 3500K',
      colors: ['#FF4500', '#FF6B35', '#FF8C42', '#FFB347', '#FFCCCB'],
      characteristics: [
        'Lungimi de undă mai mari (620-700nm)',
        'Energia fotonilor mai mică',
        'Penetrează mai profund în atmosferă',
        'Dominante la răsărit și apus'
      ],
      physiology: 'Stimulează producția de melatonină seara, pregătind corpul pentru somn',
      evolution: 'Asociate cu focul și căldura - semnale de siguranță și confort pentru strămoșii noștri',
      examples: ['Flacăra lumânării (1900K)', 'Becul incandescent (2700K)', 'Lumina soarelui la apus (2000K)']
    },
    {
      category: 'Culorile Reci',
      range: '5000K - 10000K',
      colors: ['#87CEEB', '#4169E1', '#0000FF', '#6A5ACD', '#9370DB'],
      characteristics: [
        'Lungimi de undă mai scurte (380-500nm)',
        'Energia fotonilor mai mare',
        'Se împrăștie mai mult în atmosferă',
        'Dominante în mijlocul zilei'
      ],
      physiology: 'Inhibă melatonina și stimulează cortizolul, menținând starea de alertă',
      evolution: 'Asociate cu cerul senin - semnale de vreme bună și vizibilitate optimă',
      examples: ['Cerul senin (10000K)', 'Monitorul LED (6500K)', 'Lumina zilei (5500K)']
    },
    {
      category: 'Culorile Neutre',
      range: '3500K - 5000K',
      colors: ['#F5F5F5', '#DCDCDC', '#C0C0C0', '#A9A9A9', '#808080'],
      characteristics: [
        'Echilibru între toate lungimile de undă',
        'Reflectă fidel culorile obiectelor',
        'Minimizează oboseala vizuală',
        'Standard în fotografie și design'
      ],
      physiology: 'Mențin echilibrul hormonal fără să perturbe ritmurile circadiene',
      evolution: 'Lumina naturală optimă pentru vânătoare și culegere - maximizează acuitatea vizuală',
      examples: ['Lumina de zi (5000K)', 'Flash fotografic (5500K)', 'Becuri halogen (4000K)']
    }
  ];

  const psychologyEffects = [
    {
      temperature: 'Calde',
      emotion: 'Confort și Intimitate',
      icon: '🔥',
      mood: 'Relaxare, căldură, siguranță',
      physiological: [
        'Scăderea tensiunii arteriale',
        'Relaxarea musculaturii',
        'Creșterea producției de melatonină',
        'Stimularea apetitului'
      ],
      psychological: [
        'Sentiment de apartenență și comunitate',
        'Reducerea anxietății și stresului',
        'Creșterea creativității și spontaneității',
        'Îmbunătățirea comunicării interpersonale'
      ],
      spaces: ['Restaurante romantice', 'Camerele de dormit', 'Living-uri familiare', 'Spa-uri și centre wellness'],
      timing: 'Seara și noaptea - pregătirea pentru odihnă',
      culturalMeaning: 'În majoritatea culturilor: dragoste, pasiune, energie vitală'
    },
    {
      temperature: 'Reci',
      emotion: 'Focalizare și Claritate',
      icon: '❄️',
      mood: 'Alertă, productivitate, profesionalism',
      physiological: [
        'Creșterea tensiunii arteriale',
        'Stimularea sistemului nervos',
        'Inhibarea melatoninei',
        'Îmbunătățirea metabolismului'
      ],
      psychological: [
        'Creșterea capacității de concentrare',
        'Îmbunătățirea gândirii analitice',
        'Reducerea impulsivității',
        'Stimularea raționalității și logicii'
      ],
      spaces: ['Birouri și spații de lucru', 'Spitale și clinici', 'Școli și universități', 'Laboratoare'],
      timing: 'Dimineața și ziua - menținerea alertei',
      culturalMeaning: 'Universale: curățenie, încredere, tehnologie, modernitate'
    },
    {
      temperature: 'Neutre',
      emotion: 'Echilibru și Naturalețe',
      icon: '⚖️',
      mood: 'Calm, echilibru, naturalețe',
      physiological: [
        'Menținerea echilibrului hormonal',
        'Reducerea oboselii vizuale',
        'Stabilizarea ritmurilor circadiene',
        'Optimizarea percepției culorilor'
      ],
      psychological: [
        'Sentiment de echilibru și stabilitate',
        'Îmbunătățirea capacității de luare a deciziilor',
        'Reducerea conflictelor emoționale',
        'Creșterea sentimentului de control'
      ],
      spaces: ['Magazine și showroom-uri', 'Galerii de artă', 'Studiouri foto', 'Spații medicale'],
      timing: 'Oricând - versatilitate maximă',
      culturalMeaning: 'Neutralitate, obiectivitate, profesionalism, eleganță'
    }
  ];

  const practicalApplications = [
    {
      field: 'Design Interior',
      icon: '🏠',
      warmTechniques: [
        'Becuri LED cu 2700K-3000K pentru zonele de relaxare',
        'Nuanțe de portocaliu, galben și roșu pentru mobilier',
        'Materiale naturale: lemn, piatră, textil',
        'Lumina indirectă și difuză pentru ambianță'
      ],
      coolTechniques: [
        'Iluminat LED cu 5000K-6500K pentru zonele de lucru',
        'Palette de albastru, verde și violet',
        'Materiale moderne: metal, sticlă, plastic',
        'Lumina directă și puternică pentru funcționalitate'
      ],
      neutralTechniques: [
        'Iluminat ajustabil 3000K-5000K',
        'Baza neutră cu accente colorate',
        'Combinația de materiale naturale și moderne',
        'Sistem de iluminat pe zone'
      ],
      example: 'IKEA folosește temperatura culorilor pentru a crea "călătorii emoționale" prin magazin - zone calde în secțiunea de textile și reci în secțiunea tehnologie.',
      science: 'Studiile arată că temperatura culorii afectează percepția timpului: culorile calde fac timpul să pară mai lent, culorile reci îl accelerează.'
    },
    {
      field: 'Branding și Marketing',
      icon: '🎯',
      warmTechniques: [
        'Logo-uri și ambalaje cu roșu/portocaliu pentru urgență',
        'Auriu pentru lux și exclusivitate',
        'Roz pentru produse feminine sau dulci',
        'Maro pentru naturalețe și tradiție'
      ],
      coolTechniques: [
        'Albastru pentru încredere și siguranță (bănci, tech)',
        'Verde pentru sustenabilitate și sănătate',
        'Violet pentru creativitate și lux',
        'Cyan pentru inovație și modernitate'
      ],
      neutralTechniques: [
        'Negru pentru lux și eleganță premium',
        'Alb pentru simplitate și curățenie',
        'Gri pentru profesionalism și stabilitate',
        'Bej pentru accesibilitate și căldură discretă'
      ],
      example: 'McDonald\'s folosește roșu și galben (calde) pentru a stimula apetitul și a crea urgență, în timp ce IBM folosește albastru (rece) pentru încredere și profesionalism.',
      science: 'Culorile calde cresc impulsivitatea de cumpărare cu 15%, în timp ce culorile reci îmbunătățesc încrederea în brand cu 23%.'
    },
    {
      field: 'Fotografie și Film',
      icon: '📸',
      warmTechniques: [
        'Filtru orange/amber pentru scene romantice',
        'Lumină tungsten pentru intimitate',
        'Golden hour pentru portrete flatante',
        'Gradarea culorilor spre galben în post-producție'
      ],
      coolTechniques: [
        'Filtru albastru pentru scene de thriller/sci-fi',
        'Lumină LED daylight pentru claritate',
        'Blue hour pentru peisaje dramatice',
        'Gradarea culorilor spre cyan în post-producție'
      ],
      neutralTechniques: [
        'Iluminat echilibrat pentru acuratețea culorilor',
        'Lumină naturală pentru realismul maxim',
        'White balance precis pentru fotografii de produs',
        'Gradarea neutră pentru documentare'
      ],
      example: 'Filmul "Mad Max: Fury Road" folosește orange/amber pentru deșert (ostilitate) și albastru pentru noapte (speranță), creând contrast emoțional puternic.',
      science: 'Temperaturile calde fac tenul să pară mai sănătos și atractiv, în timp ce temperaturile reci evidențiază detaliile și textura.'
    },
    {
      field: 'Tehnologie și UI/UX',
      icon: '💻',
      warmTechniques: [
        'Mode Night/Warm pentru reducerea oboselii vizuale',
        'Notificări cu roșu/portocaliu pentru alertă',
        'Butoane Call-to-Action cu culori calde',
        'Brandingul produselor consumer cu tonuri calde'
      ],
      coolTechniques: [
        'Interfețe de productivitate cu albastru/verde',
        'Aplicații medicale cu alb/albastru pentru încredere',
        'Software profesional cu palete reci',
        'Indicatori de status cu verde/albastru'
      ],
      neutralTechniques: [
        'Tema dark cu griuri pentru confort vizual',
        'Fundal alb pentru citibilitate maximă',
        'Accent colors pe bază neutră',
        'Adaptarea automată la timpul zilei'
      ],
      example: 'iOS schimbă automat către Night Shift (cald) seara pentru a proteja somnul, în timp ce aplicațiile de productivitate folosesc albastru pentru concentrare.',
      science: 'Lumina albastră de la ecrane suprimă melatonina cu 23% mai mult decât lumina caldă, afectând calitatea somnului.'
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '🌡️' },
    { id: 'science', title: 'Știința Temperaturii', icon: '🔬' },
    { id: 'psychology', title: 'Psihologie și Emoții', icon: '🧠' },
    { id: 'applications', title: 'Aplicații Practice', icon: '🛠️' },
    { id: 'examples', title: 'Exemple Interactive', icon: '🎨' }
  ];

  const getRoomColors = () => {
    switch(roomTemperature) {
      case 'warm':
        return {
          background: 'from-orange-400 via-red-400 to-pink-400',
          text: 'text-white',
          furniture: 'from-yellow-600 to-orange-600',
          atmosphere: 'Cameră caldă - relaxantă și intimă'
        };
      case 'cool':
        return {
          background: 'from-blue-400 via-cyan-400 to-teal-400',
          text: 'text-white',
          furniture: 'from-blue-600 to-indigo-600',
          atmosphere: 'Cameră rece - energizantă și focalizată'
        };
      default:
        return {
          background: 'from-gray-300 via-gray-400 to-gray-500',
          text: 'text-black',
          furniture: 'from-gray-600 to-gray-700',
          atmosphere: 'Cameră neutră - echilibrată și naturală'
        };
    }
  };

  const roomStyle = getRoomColors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <nav className="fixed top-20 left-8 z-40 hidden lg:block w-[15%]">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-4 text-center text-lg">Navigare</h3>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

<div className="w-[100%] lg:w-[80%] lg:ml-[18%] px-4">
      <div className="pt-20 pb-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/teorie')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-lg"
            >
              ← Înapoi la Teorie
            </button>
            <button 
              onClick={() => setShowHelp(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-lg"
              title="Ghid de navigare"
            >
              ?
            </button>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
            🌡️ Temperatura Culorilor
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Diferența dintre culorile calde și reci și impactul lor profund asupra ambianței, 
            stării de spirit și comportamentului uman.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">🌡️ Călătoria prin Spectrum-ul Termic</h2>
            
            <div className="mb-8">
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Temperatura culorilor nu se referă la căldura fizică, ci la o proprietate psihologică și fizică 
                fundamentală care influențează totul - de la starea noastră de spirit până la productivitate și 
                chiar calitatea somnului. Acest concept, măsurat în grade Kelvin (K), ne ajută să înțelegem 
                de ce unele culori ne fac să ne simțim energizați, în timp ce altele ne relaxează.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Culorile calde (roșu, portocaliu, galben) au lungimi de undă mai mari și energie mai mică, 
                în timp ce culorile reci (albastru, verde, violet) au lungimi de undă mai scurte și energie 
                mai mare. Această diferență fizică se traduce în efecte biologice și psihologice distincte 
                asupra sistemului nervos uman, influnțând producția de hormoni și activitatea creierului.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed">
                În lumea modernă, înțelegerea temperaturii culorilor nu este doar o curiozitate teoretică - 
                este o necesitate practică. Designerii creează experiențe emoționale prin alegerea conscientă 
                a temperaturii, mărcile își construiesc identitatea prin asocieri termice, iar tehnologia 
                noastră devine din ce în ce mai adaptată la ritmurile naturale ale corpului uman.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Culorile Calde</h3>
                <p className="text-white/80 text-lg">1000K - 3500K | Relaxare, intimitate, confort</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-xl p-6">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Culorile Neutre</h3>
                <p className="text-white/80 text-lg">3500K - 5000K | Echilibru, naturalețe, versatilitate</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6">
                <div className="text-4xl mb-4">❄️</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Culorile Reci</h3>
                <p className="text-white/80 text-lg">5000K - 10000K | Alertă, focalizare, productivitate</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-cyan-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-3">🔬 Fapte Științifice Fascinante</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">23%</div>
                  <p className="text-white/80 text-lg">diferența în suprimarea melatoninei între lumina caldă și rece</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">15°C</div>
                  <p className="text-white/80 text-lg">diferența percepută de temperatură între camerele calde și reci</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">40%</div>
                  <p className="text-white/80 text-lg">îmbunătățirea productivității cu iluminat optim</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="science" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔬 Știința din Spatele Temperaturii</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              De la fizica fotonilor la neurostiință - cum temperatura culorilor afectează corpul și mintea umană.
            </p>
          </div>

          <div className="space-y-8">
            {temperatureScience.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">{category.category}</h3>
                    <div className="text-2xl text-white/60 mb-6">{category.range}</div>
                    
                    <div className="flex gap-2 mb-6">
                      {category.colors.map((color, i) => (
                        <div 
                          key={i}
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white/90 mb-4">🔬 Caracteristici Fizice</h4>
                    <ul className="space-y-2 mb-6">
                      {category.characteristics.map((char, i) => (
                        <li key={i} className="text-white/80 text-lg flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <h5 className="text-lg font-semibold text-white/90 mb-2">🧬 Impact Fiziologic</h5>
                      <p className="text-white/70">{category.physiology}</p>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-4">
                      <h5 className="text-lg font-semibold text-white/90 mb-2">🧭 Avantaj Evolutiv</h5>
                      <p className="text-white/80">{category.evolution}</p>
                    </div>

                    <h4 className="text-xl font-semibold text-white/90 mb-3">💡 Exemple Naturale</h4>
                    <ul className="space-y-2">
                      {category.examples.map((example, i) => (
                        <li key={i} className="text-white/80 text-lg flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">📊 Spectrul Complet al Temperaturii</h3>
            <div className="space-y-4">
              <div className="h-16 bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 via-white via-cyan-400 to-blue-600 rounded-lg flex items-center justify-between px-4">
                <span className="text-white font-bold bg-black/50 px-2 py-1 rounded">1000K</span>
                <span className="text-black font-bold bg-white/80 px-2 py-1 rounded">5500K</span>
                <span className="text-white font-bold bg-black/50 px-2 py-1 rounded">10000K</span>
              </div>
              <div className="grid grid-cols-5 gap-4 text-center text-lg">
                <div>
                  <div className="font-bold text-orange-400">Lumânare</div>
                  <div className="text-white/60">1900K</div>
                </div>
                <div>
                  <div className="font-bold text-yellow-400">Tungsten</div>
                  <div className="text-white/60">3200K</div>
                </div>
                <div>
                  <div className="font-bold text-white">Lumina Zilei</div>
                  <div className="text-white/60">5500K</div>
                </div>
                <div>
                  <div className="font-bold text-cyan-400">Cer Înnorat</div>
                  <div className="text-white/60">7000K</div>
                </div>
                <div>
                  <div className="font-bold text-blue-400">Cer Senin</div>
                  <div className="text-white/60">10000K</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="psychology" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🧠 Psihologia și Efectele Emoționale</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Cum temperatura culorilor influențează comportamentul, emoțiile și performanța umană 
              prin mecanisme psihologice și neurologice complexe.
            </p>
          </div>



 <div className="space-y-12">
  {psychologyEffects.map((effect, index) => (
    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{effect.icon}</span>
        <div>
          <h3 className="text-3xl font-bold text-white">{effect.category || `Culorile ${effect.temperature}`}</h3>
          
          <p className="text-xl my-3 text-white">Efecte: {effect.emotion}</p>
          <p className="text-xl text-white">Stări: {effect.mood}</p>
          <p className="text-xl my-3 text-white">Timing: {effect.timing}</p>
          
    
          <div className="text-xl my-3 text-white">
            <strong>Spații:</strong>
            {effect.spaces.map((space, spaceIndex) => (
              <span key={spaceIndex}>{space}{spaceIndex < effect.spaces.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
          
       
          <div className="text-white my-4">
            <h4 className="text-lg font-semibold mb-2">Efecte fiziologice:</h4>
            {effect.physiological.map((item, itemIndex) => (
              <p key={itemIndex} className="text-sm ml-4">• {item}</p>
            ))}
          </div>
          
        
          <div className="text-white my-4">
            <h4 className="text-lg font-semibold mb-2">Efecte psihologice:</h4>
            {effect.psychological.map((item, itemIndex) => (
              <p key={itemIndex} className="text-sm ml-4">• {item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            


          </section>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/teorie/natura')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg"
              >
                Următorul: 🌿 Culorile în Natură
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg"
              >
                   🎯 Testează: Quiz Temperatura Culorilor
              </button>
             
            </div>
          </div>
          
          </div>
          </div>
        
  )}