import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PsychologyPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [moodColors, setMoodColors] = useState([]);
  const [currentMood, setCurrentMood] = useState('');
  const [colorHovered, setColorHovered] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'funfacts', 'emotions', 'behavior', 'personality', 'synesthesia', 'culture', 'marketing', 'therapy', 'experiments'];
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

  const emotionalColors = [
    { 
      name: 'Roșu', 
      hex: '#FF0000', 
      emotions: ['Pasiune', 'Energie', 'Agresivitate', 'Putere'],
      description: 'Accelerează pulsul și crește tensiunea arterială. Stimulează acțiunea și urgența.',
      psychEffect: 'Mărește apetitul și poate provoca anxietate în exces',
      frequency: '430-484 THz',
      temperature: '+3°C percepție'
    },
    { 
      name: 'Albastru', 
      hex: '#0066CC', 
      emotions: ['Calm', 'Încredere', 'Stabilitate', 'Profesionalism'],
      description: 'Reduce stresul și tensiunea arterială. Promovează concentrarea și productivitatea.',
      psychEffect: 'Poate reduce apetitul și crea senzația de răceală',
      frequency: '606-668 THz',
      temperature: '-2°C percepție'
    },
    { 
      name: 'Verde', 
      hex: '#00AA00', 
      emotions: ['Echilibru', 'Natură', 'Creștere', 'Armonie'],
      description: 'Cel mai odihnitor pentru ochi. Reduce oboseala vizuală și stresul.',
      psychEffect: 'Îmbunătățește concentrarea și reduce anxietatea',
      frequency: '526-606 THz',
      temperature: 'Neutru'
    },
    { 
      name: 'Galben', 
      hex: '#FFD700', 
      emotions: ['Optimism', 'Creativitate', 'Fericire', 'Energie'],
      description: 'Stimulează activitatea mentală și creativitatea. Atrage atenția rapid.',
      psychEffect: 'Poate provoca agitație și frustrare în cantități mari',
      frequency: '508-526 THz',
      temperature: '+1°C percepție'
    },
    { 
      name: 'Violet', 
      hex: '#8A2BE2', 
      emotions: ['Spiritualitate', 'Lux', 'Mister', 'Creativitate'],
      description: 'Stimulează imaginația și creativitatea. Asociat cu spiritualitatea.',
      psychEffect: 'Poate părea artificial și crea senzația de distanță',
      frequency: '668-789 THz',
      temperature: 'Rece'
    },
    { 
      name: 'Portocaliu', 
      hex: '#FF8C00', 
      emotions: ['Entuziasm', 'Încurajare', 'Stimulare', 'Căldură'],
      description: 'Combină energia roșului cu fericirea galbenului. Foarte prietenos.',
      psychEffect: 'Stimulează apetitul și conversația socială',
      frequency: '484-508 THz',
      temperature: '+2°C percepție'
    }
  ];

  const funFacts = [
    {
      icon: '🧠',
      fact: 'Creierul procesează culorile în 13 milisecunde',
      detail: 'Mai rapid decât orice altă informație vizuală!'
    },
    {
      icon: '👁️',
      fact: 'Femeilele văd mai multe nuanțe decât bărbații',
      detail: 'Datorită genei X suplimentare pentru percepția culorilor'
    },
    {
      icon: '🔵',
      fact: 'Albastrul este cea mai populară culoare din lume',
      detail: 'Peste 40% din oameni o aleg ca favorită'
    },
    {
      icon: '🌈',
      fact: 'Ochiul uman poate distinge 10 milioane de culori',
      detail: 'Dar avem nume pentru mai puțin de 11.000'
    },
    {
      icon: '🐂',
      fact: 'Taurii nu văd roșul',
      detail: 'Sunt dichromați - văd doar albastru și galben'
    },
    {
      icon: '🏃‍♂️',
      fact: 'Roșul te face să alergi mai repede',
      detail: 'Sportivii în roșu au performanțe cu 5% mai bune'
    },
    {
      icon: '🍔',
      fact: 'Culoarea farfuriei influențează gustul',
      detail: 'Mâncarea pare mai dulce pe farfurii albe'
    },
    {
      icon: '💤',
      fact: 'Albastrul îmbunătățește somnul cu 7.5 ore pe noapte',
      detail: 'Comparativ cu 6 ore în camere violet sau portocaliu'
    }
  ];

  const personalityColors = [
    {
      color: 'Roșu',
      hex: '#FF0000',
      personality: 'Liderul Natural',
      traits: ['Confident', 'Dinamic', 'Competitiv', 'Pasional'],
      description: 'Ești o persoană de acțiune care nu se teme să preia controlul.',
      careers: ['CEO', 'Antreprenor', 'Avocat', 'Chirurg']
    },
    {
      color: 'Albastru',
      hex: '#0066CC',
      personality: 'Diplomaticul',
      traits: ['Loial', 'Stabil', 'Înțelegător', 'Pacinic'],
      description: 'Preferi armonia și ești cel la care oamenii vin pentru sfaturi.',
      careers: ['Psiholog', 'Mediator', 'Contabil', 'Inginer']
    },
    {
      color: 'Verde',
      hex: '#00AA00',
      personality: 'Pacificatorul',
      traits: ['Echilibrat', 'Înțelept', 'Calm', 'Empatic'],
      description: 'Ești centrul stabil al grupului și iubești natura.',
      careers: ['Terapeut', 'Medic', 'Profesor', 'Ecologist']
    },
    {
      color: 'Galben',
      hex: '#FFD700',
      personality: 'Creativul',
      traits: ['Optimist', 'Spontan', 'Creativ', 'Comunicativ'],
      description: 'Aduci bucurie oriunde mergi și ai idei neobișnuite.',
      careers: ['Artist', 'Designer', 'Jurnalist', 'Comedian']
    },
    {
      color: 'Violet',
      hex: '#8A2BE2',
      personality: 'Vizionarul',
      traits: ['Intuitiv', 'Spiritual', 'Independent', 'Misterios'],
      description: 'Ești deep thinker și îți place să explorezi misterele vieții.',
      careers: ['Filosof', 'Artist', 'Cercetător', 'Scriitor']
    },
    {
      color: 'Portocaliu',
      hex: '#FF8C00',
      personality: 'Aventurierul',
      traits: ['Entuziast', 'Social', 'Aventuros', 'Prietenos'],
      description: 'Îți place să încerci lucruri noi și să îi faci pe alții să râdă.',
      careers: ['Ghid turistic', 'Event planner', 'Sales', 'Antrenor']
    }
  ];

  const synesthesiaExamples = [
    {
      type: 'Chromesthesia',
      description: 'Sunetele au culori',
      example: 'Do = roșu, Re = portocaliu, Mi = galben'
    },
    {
      type: 'Lexical-gustatory',
      description: 'Cuvintele au gusturi',
      example: '"John" gustă ca ciocolata, "Emily" ca căpșunile'
    },
    {
      type: 'Spatial sequence',
      description: 'Numerele au culori',
      example: '1 = alb, 2 = albastru, 3 = verde'
    }
  ];

  const moodCalculator = (selectedColors) => {
    const colorMoods = {
      '#FF0000': { mood: 'Energic și Motivat', emoji: '⚡', desc: 'Ești gata să cucerești lumea!' },
      '#0066CC': { mood: 'Calm și Concentrat', emoji: '🧘', desc: 'Mint limpede și gândire clară' },
      '#00AA00': { mood: 'Echilibrat și Zen', emoji: '🌱', desc: 'În armonie cu tine și natura' },
      '#FFD700': { mood: 'Optimist și Creativ', emoji: '☀️', desc: 'Plin de idei și energie pozitivă' },
      '#8A2BE2': { mood: 'Introspectiv și Spiritual', emoji: '🔮', desc: 'Conectat cu latura profundă' },
      '#FF8C00': { mood: 'Prietenos și Aventuros', emoji: '🎈', desc: 'Gata de noi experiențe' }
    };
    return colorMoods[selectedColors[selectedColors.length - 1]] || colorMoods['#0066CC'];
  };

  const handleColorSelect = (hex) => {
    const newMoodColors = [...moodColors, hex];
    setMoodColors(newMoodColors);
    const result = moodCalculator(newMoodColors);
    setCurrentMood(result);
  };

  const handlePersonalityTest = (colorHex) => {
    const result = personalityColors.find(p => p.hex === colorHex);
    setPersonalityResult(result);
  };

  const culturalMeanings = [
    {
      color: 'Roșu',
      hex: '#FF0000',
      meanings: {
        'Asia': 'Noroc, prosperitate, fericire (China)',
        'Occident': 'Pasiune, dragoste, pericol',
        'India': 'Puritate, fertilitate (sari roșii)',
        'Africa': 'Moarte, doliu (anumite triburi)'
      }
    },
    {
      color: 'Alb',
      hex: '#FFFFFF',
      meanings: {
        'Occident': 'Inocență, puritate, căsătorie',
        'Asia': 'Moarte, doliu (China, Japonia)',
        'India': 'Pace, spiritualitate',
        'Orientul Mijlociu': 'Puritate, lux'
      }
    },
    {
      color: 'Negru',
      hex: '#000000',
      meanings: {
        'Occident': 'Eleganță, formalitate, doliu',
        'Africa': 'Masculinitate, maturitate',
        'Asia': 'Carieră, cunoaștere (China)',
        'General': 'Putere, autoritate, mister'
      }
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '🧠' },
    { id: 'funfacts', title: 'Fun Facts', icon: '🤯' },
    { id: 'emotions', title: 'Impact Emoțional', icon: '❤️' },
    { id: 'behavior', title: 'Comportament', icon: '🎭' },
    { id: 'personality', title: 'Test Personalitate', icon: '🔮' },
    { id: 'synesthesia', title: 'Sinestesia', icon: '🌈' },
    { id: 'culture', title: 'Influența Culturală', icon: '🌍' },
    { id: 'marketing', title: 'Marketing & Brand', icon: '📈' },
    { id: 'therapy', title: 'Terapie Cromatică', icon: '💊' },
    { id: 'experiments', title: 'Experimente', icon: '🧪' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">

       <nav className="fixed top-20 left-8 z-40 hidden lg:block w-[15%]">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-4 text-center">Navigare</h3>
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
                <span>{item.icon}</span>
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

          <div className="w-[100%] lg:w-[80%] lg:ml-[18%] px-4">
      <div className="pt-20 pb-16 px-8 ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/teorie')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              ← Înapoi la Teorie
            </button>
            <button 
              onClick={() => setShowHelp(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              title="Ghid de navigare"
            >
              ?
            </button>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            🧠 Psihologia Culorilor
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Descoperă fascinanta știință din spatele impactului culorilor asupra minții umane, 
            emoțiilor și comportamentului nostru zilnic.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">🎯 Ce Vei Descoperi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Impactul Psihologic</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Cum culorile influențează emoțiile și starea de spirit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Efectele fiziologice ale culorilor asupra corpului</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Influența asupra deciziilor și comportamentului</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Percepția culturală și simbolismul culorilor</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Aplicații Practice</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Strategii de marketing și branding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Design de interior pentru well-being</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Terapia prin culori și vindecarea</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Optimizarea productivității prin culori</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">🔬 Fapte Științifice</h3>
              <div className="grid md:grid-cols-3 gap-4 text-base">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">85%</div>
                  <p className="text-white/80">din motivele de cumpărare sunt influențate de culoare</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">90s</div>
                  <p className="text-white/80">timpul necesar pentru a forma o primă impresie</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">62-90%</div>
                  <p className="text-white/80">din evaluarea unui produs se bazează pe culoare</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts Section - NEW */}
        <section id="funfacts" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🤯 Fun Facts despre Culori</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Pregătește-te să fii uimit! Acestea sunt cele mai incredibile curiozități despre culori 
              pe care probabil nu le știai.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {funFacts.map((fact, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{fact.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">{fact.fact}</h3>
                  <p className="text-white/70 text-sm">{fact.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-semibold text-white mb-4">🌟 Știați că...</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-cyan-300 font-semibold mb-3">🎨 În Artă și Design</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• Prima culoare artificială a fost violetul (1856)</li>
                  <li>• Vantablack absoarbe 99.965% din lumină</li>
                  <li>• Curcubeul are de fapt milioane de culori</li>
                  <li>• "Roz" nu există în spectrul de lumină</li>
                </ul>
              </div>
              <div>
                <h4 className="text-blue-300 font-semibold mb-3">🧠 În Psihologie</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• Bebelușii văd doar alb-negru până la 3 luni</li>
                  <li>• Culorile reci fac camerele să pară mai mari</li>
                  <li>• Verde reduce oboseala cu 25%</li>
                  <li>• Violet stimulează creativity cu 15%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="emotions" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">❤️ Impactul Emoțional al Culorilor</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Fiecare culoare declanșează reacții emoționale specifice în creierul uman. 
              Acest impact este atât înnăscut, cât și învățat prin experiențele culturale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {emotionalColors.map((color, index) => (
              <div key={index} className="group">
                <div 
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 h-full hover:scale-105"
                  onMouseEnter={() => setColorHovered(color.hex)}
                  onMouseLeave={() => setColorHovered(null)}
                >
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    {colorHovered === color.hex && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-3">{color.name}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-white/80 mb-2">Emoții asociate:</h4>
                    <div className="flex flex-wrap gap-1">
                      {color.emotions.map((emotion, i) => (
                        <span key={i} className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-sm">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-base mb-3">{color.description}</p>
                  
                  <div className="bg-black/30 rounded-lg p-3 mb-3">
                    <p className="text-white/60 text-sm font-semibold mb-1">Efect psihologic:</p>
                    <p className="text-white/80 text-sm">{color.psychEffect}</p>
                  </div>

                  {/* New scientific data */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/10 rounded p-2">
                      <span className="text-white/60">Frecvență:</span>
                      <div className="text-white font-semibold">{color.frequency}</div>
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <span className="text-white/60">Temp. percepută:</span>
                      <div className="text-white font-semibold">{color.temperature}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">🧪 Mecanismul Neuronal</h3>
            <p className="text-white/80 leading-relaxed mb-4 text-lg">
              Când ochiul percepe o culoare, informația este procesată în cortexul vizual și apoi 
              transmisă către sistemul limbic, zona creierului responsabilă pentru emoții. Acest proces 
              se întâmplă în mai puțin de o secundă și poate influența:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Răspunsuri Fiziologice:</h4>
                <ul className="text-white/80 space-y-1 text-base">
                  <li>• Frecvența cardiacă</li>
                  <li>• Tensiunea arterială</li>
                  <li>• Temperatura corpului</li>
                  <li>• Nivelul hormonilor de stress</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Răspunsuri Psihologice:</h4>
                <ul className="text-white/80 space-y-1 text-base">
                  <li>• Starea de spirit</li>
                  <li>• Nivelul de concentrare</li>
                  <li>• Apetitul</li>
                  <li>• Percepția timpului</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="behavior" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🎭 Influența asupra Comportamentului</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Culorile nu doar ne fac să simțim diferit - ele ne determină să acționăm diferit. 
              Studiile arată că mediul cromatic influențează direct deciziile și comportamentul nostru.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🏪 Comportament de Cumpărare</h3>
              
              <div className="space-y-4">
                <div className="bg-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2 text-lg">Roșu în Retail</h4>
                  <p className="text-white/80 text-base">Creează urgență și stimulează cumpărăturile impulsive. Folosit în oferte și reduceri.</p>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2 text-lg">Albastru în Banking</h4>
                  <p className="text-white/80 text-base">Inspiră încredere și stabilitate. Preferat de băncile și firmele financiare.</p>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2 text-lg">Verde pentru Eco</h4>
                  <p className="text-white/80 text-base">Asociat cu natura și sustenabilitatea. Influențează alegerea produselor eco.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🏢 Productivitatea la Locul de Muncă</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">Albastru pentru Focus</h4>
                  <p className="text-white/80 text-sm">Îmbunătățește concentrarea și eficiența mentală. Ideal pentru birouri.</p>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Verde pentru Echilibru</h4>
                  <p className="text-white/80 text-sm">Reduce oboseala vizuală și stresul. Perfect pentru lucrul îndelungat.</p>
                </div>
                
                <div className="bg-yellow-500/20 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-semibold mb-2">Galben pentru Creativitate</h4>
                  <p className="text-white/80 text-sm">Stimulează gândirea creativă și brainstorming-ul în echipe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Studii de Caz Comportamentale</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-purple-300 font-semibold mb-3">Restaurante</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• <strong>Roșu și galben:</strong> Măresc apetitul și viteza de consum</li>
                  <li>• <strong>Verde și albastru:</strong> Promovează alimentația sănătoasă</li>
                  <li>• <strong>Portocaliu:</strong> Încurajează socializarea și conversația</li>
                </ul>
              </div>
              <div>
                <h4 className="text-indigo-300 font-semibold mb-3">Spitale & Clinici</h4>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li>• <strong>Verde deschis:</strong> Reduce anxietatea pacienților</li>
                  <li>• <strong>Albastru pal:</strong> Creează o atmosferă calmă și sigură</li>
                  <li>• <strong>Evită roșul:</strong> Poate mări tensiunea și stresul</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Personality Test Section - NEW */}
        <section id="personality" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔮 Testul de Personalitate Cromatică</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Alege culoarea care îți vorbește cel mai mult pentru a-ți descoperi tipul de personalitate!
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Selectează culoarea ta sufletească:</h3>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {personalityColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handlePersonalityTest(color.hex)}
                  className="group relative"
                >
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/20 hover:border-white/60 transition-all duration-300 hover:scale-110 cursor-pointer mx-auto"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-white/80 text-sm mt-2 group-hover:text-white transition-colors">
                    {color.color}
                  </p>
                </button>
              ))}
            </div>

            {personalityResult && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="text-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-white/30"
                    style={{ backgroundColor: personalityResult.hex }}
                  ></div>
                  <h4 className="text-2xl font-bold text-white">{personalityResult.personality}</h4>
                  <p className="text-white/80">{personalityResult.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Trăsături de caracter:</h5>
                    <div className="flex flex-wrap gap-2">
                      {personalityResult.traits.map((trait, i) => (
                        <span key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Cariere potrivite:</h5>
                    <div className="flex flex-wrap gap-2">
                      {personalityResult.careers.map((career, i) => (
                        <span key={i} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Synesthesia Section - NEW */}
        <section id="synesthesia" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🌈 Sinestesia și Culorile</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Unii oameni experimentează culorile în moduri extraordinare, "văzând" sunete sau 
              "gustând" culori. Bun venit în lumea fascinantă a sinestezia!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🧠 Ce este Sinestesia?</h3>
              <p className="text-white/80 mb-4">
                Sinestesia este o condiție neurologică în care stimularea unui simț declanșează 
                automat și consistent percepția altui simț. Aproximativ 4% din populație o experimentează.
              </p>
              
              <div className="space-y-4">
                {synesthesiaExamples.map((type, index) => (
                  <div key={index} className="bg-rainbow-gradient/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">{type.type}</h4>
                    <p className="text-white/70 text-sm mb-2">{type.description}</p>
                    <p className="text-white/60 text-xs italic">{type.example}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🎨 Impactul în Artă</h3>
              <p className="text-white/80 mb-4">
                Mulți artiști celebri au fost sinestezici, creând opere inspirate de percepțiile lor unice.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold">Wassily Kandinsky</h4>
                  <p className="text-white/70 text-sm">"Văzuie" sunetele ca forme și culori în picturile sale abstracte</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold">David Hockney</h4>
                  <p className="text-white/70 text-sm">Asociază culori cu muzica în designurile pentru operă</p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-lg p-4">
                  <h4 className="text-pink-300 font-semibold">Pharrell Williams</h4>
                  <p className="text-white/70 text-sm">Vede muzica în culori și folosește asta în producție</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rainbow via-rainbow to-rainbow rounded-2xl p-1">
            <div className="bg-black/90 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">🎵 Simulare Sinestezică</h3>
              <p className="text-white/80 text-center mb-4">
                Imaginează-ți cum ar arăta muzica dacă ai putea s-o vezi:
              </p>
              <div className="grid grid-cols-7 gap-2">
                {['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'].map((note, index) => {
                  const colors = ['#FF0000', '#FF8C00', '#FFD700', '#00FF00', '#0066CC', '#4B0082', '#8A2BE2'];
                  return (
                    <div key={index} className="text-center">
                      <div 
                        className="w-full h-12 rounded-lg mb-2 border border-white/30"
                        style={{ backgroundColor: colors[index] }}
                      ></div>
                      <span className="text-white/80 text-sm">{note}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Influența Culturală */}
        <section id="culture" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">🌍 Influența Culturală asupra Percepției</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Deși unele reacții la culori sunt universale, cultura joacă un rol major în 
              modul în care interpretăm și valorizăm diferitele nuanțe.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {culturalMeanings.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                    style={{ backgroundColor: item.hex }}
                  ></div>
                  <h3 className="text-2xl font-bold text-white">{item.color}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(item.meanings).map(([region, meaning], i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">{region}</h4>
                      <p className="text-white/80 text-sm">{meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">🎭 Importanța Contextului Cultural</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Când lucrezi cu culori în design global sau marketing internațional, este esențial să 
              înțelegi contextul cultural. O culoare care simbolizează norocul într-o cultură poate 
              reprezenta ghinionul sau doliul în alta.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <strong className="text-orange-300">Designul Global:</strong> Cercetează semnificațiile locale
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <strong className="text-red-300">Marketing:</strong> Adaptează paletele pentru fiecare piață
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <strong className="text-yellow-300">Comunicare:</strong> Respectă simbolurile culturale
              </div>
            </div>
          </div>
        </section>

        {/* Marketing & Brand */}
        <section id="marketing" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">📈 Psihologia Culorilor în Marketing</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Brandurile de succes folosesc psihologia culorilor pentru a influența percepția consumatorilor 
              și a crea conexiuni emoționale puternice cu audiența lor.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">🎯 Strategii de Brand</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Industrii și Culorile Preferate</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-white/80 text-sm"><strong>Fast Food:</strong> Roșu + Galben (McDonald's, KFC)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="text-white/80 text-sm"><strong>Tech:</strong> Albastru (Facebook, IBM, HP)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-white/80 text-sm"><strong>Eco/Health:</strong> Verde (Whole Foods, Animal Planet)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span className="text-white/80 text-sm"><strong>Luxury:</strong> Violet/Negru (Cadbury, Chanel)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">💡 Call-to-Action (CTA)</h3>
              
              <div className="space-y-4">
                <div className="bg-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-2">Portocaliu - Cel Mai Eficient</h4>
                  <p className="text-white/80 text-sm">Conversie cu 32% mai mare decât alte culori. Prietenos și fără amenințare.</p>
                </div>
                
                <div className="bg-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2">Roșu - Pentru Urgență</h4>
                  <p className="text-white/80 text-sm">Perfect pentru "Limited Time" și oferte speciale. Creează presiune temporală.</p>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Verde - Pentru Siguranță</h4>
                  <p className="text-white/80 text-sm">Ideal pentru tranzacții financiare și achiziții mari. Inspiră încredere.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">🧪 A/B Testing cu Culori</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Testarea A/B este esențială pentru optimizarea culorilor în marketing digital. 
              Studiile arată diferențe semnificative în rata de conversie bazate doar pe culoare.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">+21%</div>
                <p className="text-white/80 text-sm">creștere conversie cu buton roșu vs verde</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">+34%</div>
                <p className="text-white/80 text-sm">mai multe click-uri pe CTA portocaliu</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400 mb-1">+12%</div>
                <p className="text-white/80 text-sm">timp petrecut pe site cu albastru</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terapie Cromatică */}
        <section id="therapy" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">💊 Terapia prin Culori</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Cromoterapia sau terapia prin culori este o metodă alternativă de vindecare care 
              folosește spectrele de lumină colorată pentru a îmbunătăți starea fizică și mentală.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">🔬 Bazele Științifice</h3>
              
              <div className="space-y-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  Terapia prin culori se bazează pe ideea că diferitele frecvențe de lumină pot 
                  influența sistemul nervos și procesele biologice. Deși controversată în medicina 
                  convențională, studiile arată beneficii în anumite domenii.
                </p>
                
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">Lumina Albastră</h4>
                  <p className="text-white/80 text-sm">Tratamentul depresiei sezoniere (SAD). Reglează ritmul circadian.</p>
                </div>
                
                <div className="bg-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2">Lumina Roșie</h4>
                  <p className="text-white/80 text-sm">Terapia cu LED roșu pentru vindecarea rănilor și dureri articulare.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">🏥 Aplicații Medicale</h3>
              
              <div className="space-y-4">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Pediatrie</h4>
                  <p className="text-white/80 text-sm">Camerele colorate în spitale reduc anxietatea copiilor cu 40%.</p>
                </div>
                
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <h4 className="text-purple-300 font-semibold mb-2">Psihiatrie</h4>
                  <p className="text-white/80 text-sm">Culorile calde îmbunătățesc moralul pacienților cu depresie.</p>
                </div>
                
                <div className="bg-cyan-500/20 rounded-lg p-4">
                  <h4 className="text-cyan-300 font-semibold mb-2">Recuperare</h4>
                  <p className="text-white/80 text-sm">Verde și albastru accelerează vindecarea și reduc stresul.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">🏠 Cromoterapia Acasă</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Pentru Relaxare</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Albastru în dormitor pentru somn mai bun</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Verde în birou pentru reducerea stresului</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Violet în spațiul de meditație</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Pentru Energie</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Roșu în sala de fitness pentru motivație</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Portocaliu în bucătărie pentru apetit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">Galben în atelierul de artă pentru creativitate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">⚠️ Precauții și Limitări</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Deși cromoterapia poate avea beneficii, este important să o vezi ca pe un complement, 
              nu ca pe o înlocuire a tratamentului medical convențional.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <strong className="text-indigo-300">Consultă medicul:</strong> Pentru probleme grave de sănătate
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <strong className="text-cyan-300">Efecte individuale:</strong> Răspunsul variază de la persoană la persoană
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Experiments Section - NEW */}
        <section id="experiments" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🧪 Experimente Interactive</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Testează efectele culorilor asupra propriei persoane prin aceste experimente simple și amuzante!
            </p>
          </div>

          {/* Mood Calculator */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">📊 Calculatorul de Mood</h3>
            <p className="text-white/80 text-center mb-6">
              Selectează 3 culori care îți atrag atenția acum și descoperă-ți starea de spirit actuală:
            </p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {emotionalColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color.hex)}
                  className="group relative"
                  disabled={moodColors.length >= 3}
                >
                  <div 
                    className={`w-16 h-16 rounded-full border-4 transition-all duration-300 hover:scale-110 cursor-pointer mx-auto ${
                      moodColors.includes(color.hex) ? 'border-white scale-110' : 'border-white/20 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-white/80 text-sm mt-2">{color.name}</p>
                </button>
              ))}
            </div>

            <div className="text-center mb-4">
              <button
                onClick={() => {
                  setMoodColors([]);
                  setCurrentMood('');
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>

            {currentMood && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">{currentMood.emoji}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{currentMood.mood}</h4>
                <p className="text-white/80">{currentMood.desc}</p>
              </div>
            )}
          </div>

          {/* Color Memory Game */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">🎯 Testul de Memorie Cromatică</h3>
            <p className="text-white/80 text-center mb-6">
              Studiază culorile de mai jos timp de 5 secunde, apoi închide ochii și încearcă să le reproduci!
            </p>
            
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-6">
              {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'].map((color, index) => (
                <div 
                  key={index}
                  className="w-12 h-12 rounded-lg border-2 border-white/20"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/60 text-sm">
                💡 Sfat: Încearcă să asociezi fiecare culoare cu o emoție sau un obiect pentru a o memora mai ușor!
              </p>
            </div>
          </div>

          {/* Color Temperature Experiment */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">🌡️ Experimentul Temperaturii</h3>
            <p className="text-white/80 text-center mb-6">
              Privește alternativ la culorile de mai jos și observă cum îți influențează senzația de temperatură:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-4">🔥 Culori Calde</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['#FF4136', '#FF851B', '#FFDC00'].map((color, index) => (
                    <div 
                      key={index}
                      className="w-full h-16 rounded-lg border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <p className="text-white/70 text-sm">Simți căldură? Confort? Energie?</p>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-4">❄️ Culori Reci</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['#0074D9', '#39CCCC', '#2ECC40'].map((color, index) => (
                    <div 
                      key={index}
                      className="w-full h-16 rounded-lg border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <p className="text-white/70 text-sm">Simți răceală? Calm? Relaxare?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concluzie și Navigare */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Recapitulare</h3>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              Psihologia culorilor este o știință fascinantă care demonstrează puterea culorilor de a 
              influența gândurile, emoțiile și acțiunile noastre. De la marketing și design până la 
              terapie și well-being, înțelegerea acestor principii îți poate transforma modul în care 
              interacționezi cu lumea colorată din jurul tău.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/teorie/armonie')}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
               Următorul: 🎨 Armonia Cromatică
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300"
              >
                🧠 Testează: Quiz Psihologie
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Help */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">🧠 Ghid Psihologia Culorilor</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🧭 Cum să Navighezi</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Meniu lateral</strong>: Click pe orice secțiune pentru navigare rapidă</li>
                  <li>• <strong>Experimente interactive</strong>: Participă la teste și experimente</li>
                  <li>• <strong>Demonstrații hover</strong>: Treci cu mouse-ul peste culorile din exemple</li>
                  <li>• <strong>Testul de personalitate</strong>: Descoperă-ți tipul de personalitate</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Structura Lecției</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Fun Facts</strong>: Curiozități uimitoare despre culori</li>
                  <li>• <strong>Impact Emoțional</strong>: Cum culorile influențează sentimentele</li>
                  <li>• <strong>Test Personalitate</strong>: Descoperă-ți personalitatea prin culori</li>
                  <li>• <strong>Sinestesia</strong>: Cum unii oameni "văd" sunetele</li>
                  <li>• <strong>Experimente</strong>: Testează efectele culorilor asupra ta</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Funcții Interactive</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Calculatorul de Mood</strong>: Descoperă-ți starea de spirit</li>
                  <li>• <strong>Test de memorie</strong>: Antrenează memoria cromatică</li>
                  <li>• <strong>Experimentul temperaturii</strong>: Simte căldura culorilor</li>
                  <li>• <strong>Simulare sinestezică</strong>: Imaginează-ți cum "arată" muzica</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 După Această Lecție</h3>
                <p className="text-gray-600">
                  Vei înțelege profund de ce anumite culori te fac să te simți într-un anumit fel, 
                  vei putea să îți identifici personalitatea prin culori și să folosești aceste 
                  cunoștințe în viața de zi cu zi pentru a-ți îmbunătăți starea de spirit și eficiența.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Să explorez psihologia! 🧠
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PsychologyPage;