import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ColorHarmonyPresentation = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'types', 'rules', 'examples'];
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

  const harmonyTypes = [
    {
      name: 'Complementare',
      icon: '🔄',
      description: 'Culori opuse pe roata cromatică',
      colors: [
        { name: 'Roșu + Verde', bg: 'bg-gradient-to-r from-red-500 to-green-500' },
        { name: 'Albastru + Portocaliu', bg: 'bg-gradient-to-r from-blue-500 to-orange-500' },
        { name: 'Galben + Violet', bg: 'bg-gradient-to-r from-yellow-500 to-purple-500' }
      ],
      usage: 'Perfect pentru contrast maxim și puncte focale dramatice',
      effect: 'Vibrant, energic, atrage atenția'
    },
    {
      name: 'Analoge',
      icon: '🌊',
      description: 'Culori vecine pe roata cromatică',
      colors: [
        { name: 'Apus de soare', bg: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500' },
        { name: 'Ocean calm', bg: 'bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400' },
        { name: 'Pădure verde', bg: 'bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400' }
      ],
      usage: 'Ideal pentru fundal-uri și atmosfere relaxante',
      effect: 'Calm, natural, armonios'
    },
    {
      name: 'Triadice',
      icon: '🔺',
      description: 'Trei culori egal distanțate',
      colors: [
        { name: 'Triada primară', bg: 'bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400' },
        { name: 'Triada secundară', bg: 'bg-gradient-to-r from-orange-500 via-green-500 to-purple-500' }
      ],
      usage: 'Excelent pentru designuri creative și echilibrate',
      effect: 'Dinamic, echilibrat, versatil'
    },
    {
      name: 'Monocromatice',
      icon: '🎯',
      description: 'Variații ale aceleiași culori',
      colors: [
        { name: 'Albastru elegant', bg: 'bg-gradient-to-r from-blue-900 via-blue-500 to-blue-100' },
        { name: 'Verde natural', bg: 'bg-gradient-to-r from-green-900 via-green-500 to-green-100' },
        { name: 'Violet luxos', bg: 'bg-gradient-to-r from-purple-900 via-purple-500 to-purple-100' }
      ],
      usage: 'Perfect pentru branding sofisticat și minimal',
      effect: 'Elegant, coerent, profesional'
    }
  ];

  const practicalRules = [
    {
      rule: '60-30-10',
      icon: '📊',
      description: '60% culoare dominantă, 30% secundară, 10% accent',
      description2:'Natura folosește proporția aurie (1:1.618) nu doar în forme, ci și în combinațiile de culori care ne par plăcute ochiului. Când aplicăm această proporție în palete -  62% culoare dominantă, 38% secundară - obții un echilibru vizual care pare "natural" și estetic plăcut, chiar dacă observatorul nu înțelege de ce îi place combinația respectivă.',
      example: 'Fundal alb (60%) + elemente gri (30%) + accente colorate (10%)',
      visual: (
        <div className="flex h-8 rounded overflow-hidden">
          <div className="bg-gray-100 w-3/5"></div>
          <div className="bg-gray-400 w-3/10"></div>
          <div className="bg-blue-500 w-1/10"></div>
        </div>
      )
    },
    {
      rule: 'Temperatura',
      icon: '🌡️',
      description: 'Combină culori calde cu reci pentru echilibru',
      example: 'Albastru rece + portocaliu cald = contrast plăcut',
      visual: (
        <div className="flex h-8 rounded overflow-hidden">
          <div className="bg-blue-500 w-1/2"></div>
          <div className="bg-orange-500 w-1/2"></div>
        </div>
      )
    },
    {
      rule: 'Contextul',
      icon: '🎭',
      description: 'Aceeași culoare arată diferit pe fundaluri diferite',
      example: 'Gri pare albăstrui lângă portocaliu',
      visual: (
        <div className="flex gap-2">
          <div className="bg-orange-200 p-2 rounded">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="bg-blue-200 p-2 rounded">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      )
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '🎨' },
    { id: 'types', title: 'Tipuri de Armonii', icon: '🌈' },
    { id: 'rules', title: 'Reguli Practice', icon: '⚙️' },
    { id: 'examples', title: 'Exemple și Aplicații', icon: '💡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">

       <nav className="fixed top-20 left-8 z-40 hidden lg:block w-[15%]">

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 ">

          <h3 className="text-white font-semibold mb-4 text-center ">Navigare</h3>
          <div className="space-y-2 ">
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
      <div className="pt-20  pb-16 px-8">
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
            🎨 Armonia Cromatică
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Învață să combini culorile perfect: complementare, analoge, triadice și monocromatice. 
           
          </p>
        
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">🎯 De Ce Contează Armonia?</h2>
            <p className='text-white indent-10 my-3'>Culorile nu doar că arată bine împreună - ele creează și răspunsuri emoționale specifice care influențează comportamentul utilizatorilor. O paletă complementară roșu-verde poate transmite energie și vitalitate, perfectă pentru branduri sportive, în timp ce o paletă analogă albastru-verde sugerează calm și încredere, ideală pentru servicii financiare sau medicale. Fiecare combinație are propria personalitate și impact psihologic asupra observatorului.</p>
            <p className='text-white indent-10 mb-5'>Asocierile culturale joacă un rol crucial în percepția armoniei cromatice - combinația roșu-auriu este considerată norocoasă în cultura chineză, dar poate părea agresivă în contexte occidentale. Un designer profesionist adaptează paleta în funcție de audiența țintă și contextul cultural, înțelegând că aceeași armonie poate transmite mesaje complet diferite în diverse părți ale lumii.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Puterea Combinațiilor</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Creează echilibru vizual și plăcere estetică</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Ghidează ochiul prin design în mod natural</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Transmite emoții și mesaje specifice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Diferențiază lucrul profesional de amateur</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Beneficii Practice</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Îmbunătățește recunoașterea brandului</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">•</span>
                    <span>Mărește rata de conversie în design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Creează conexiuni emoționale puternice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lime-400 mt-1">•</span>
                    <span>Accelerează procesul de luare a deciziilor</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">📊 Impact Demonstrat</h3>
              <div className="grid md:grid-cols-3 gap-4 text-base">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">85%</div>
                  <p className="text-white/80">din deciziile de cumpărare sunt influențate de culoare</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">200%</div>
                  <p className="text-white/80">creșterea recunoașterii brandului cu culori corecte</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">73%</div>
                  <p className="text-white/80">din companii folosesc culoarea în branding</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🌈 Tipuri de Armonii Cromatice</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Patru tipuri fundamentale de combinații care funcționează mereu, 
              bazate pe principii matematice și perceptuale.
            </p>
          </div>

          {/* Roata Cromatică */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">🎡 Roata Cromatică - Baza Tuturor Armoniilor</h3>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center">
                <div className="relative mx-auto" style={{ width: 300, height: 300 }}>
                  <svg width="300" height="300" className="absolute inset-0">
                    {/* Roata cromatică cu 12 culori */}
                    {[
                      '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
                      '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080'
                    ].map((color, index) => {
                      const angle = (index * 30) - 90;
                      const radian = (angle * Math.PI) / 180;
                      const radius = 120;
                      const centerX = 150;
                      const centerY = 150;
                      const x = centerX + radius * Math.cos(radian);
                      const y = centerY + radius * Math.sin(radian);
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="20"
                          fill={color}
                          stroke="#fff"
                          strokeWidth="3"
                          className="transition-all duration-300 hover:r-25 cursor-pointer"
                        />
                      );
                    })}
                    
                    {/* Linii pentru a arăta relațiile */}
                    {/* Complementare - linie prin centru */}
                    <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5"/>
                    <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5"/>
                    
                    {/* Centrul roții */}
                    <circle cx="150" cy="150" r="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <text x="150" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Roata</text>
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2 text-xl">Culori Primare</h4>
                  <p className="text-white/80 text-lg">Roșu, Albastru, Galben - baza tuturor celorlalte culori</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white/30"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white/30"></div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white/30"></div>
                  </div>
                </div>
                
                <div className="bg-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-2 text-xl">Culori Secundare</h4>
                  <p className="text-white/80 text-lg">Verde, Portocaliu, Violet - rezultatul amestecării primarelor</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white/30"></div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white/30"></div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white/30"></div>
                  </div>
                </div>
                
                <div className="bg-yellow-500/20 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-semibold mb-2 text-xl">Cum Funcționează</h4>
                  <ul className="text-white/80 text-lg space-y-1">
                    <li>• Culorile opuse = complementare (contrast maxim)</li>
                    <li>• Culorile vecine = analoge (armonie naturală)</li>
                    <li>• 3 culori la 120° = triadice (echilibru perfect)</li>
                    <li>• Variații ale uneia = monocromatice (eleganță)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {harmonyTypes.map((harmony, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{harmony.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{harmony.name}</h3>
                    <p className="text-white/60">{harmony.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {harmony.colors.map((color, i) => (
                    <div key={i} className="space-y-2">
                      <div className={`h-8 rounded-lg ${color.bg}`}></div>
                      <p className="text-white/70 text-sm">{color.name}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/80 text-sm font-semibold mb-1">Utilizare:</p>
                    <p className="text-white/70 text-sm">{harmony.usage}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-white/80 text-sm font-semibold mb-1">Efect:</p>
                    <p className="text-white/70 text-sm">{harmony.effect}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">⚙️ Reguli Practice de Aplicat</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Trei principii esențiale care te vor ajuta să creezi palete 
              profesionale indiferent de proiect.
            </p>
          </div>

          <div className="space-y-8">
            {practicalRules.map((rule, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{rule.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Regula {rule.rule}</h3>
                        <p className="text-white/90">{rule.description}</p>
                         <p className="text-white">{rule.description2}</p>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-white/70 text-sm">
                        <strong>Exemplu:</strong> {rule.example}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-white/60 text-sm mb-3">Demonstrație vizuală:</p>
                      {rule.visual}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="examples" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">💡 Exemple și Aplicații</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Cum să aplici armonia cromatică în diferite contexte și industrii.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🎯 Marketing & Branding</h3>
              
              <div className="space-y-4">
                <div className="bg-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-300 font-semibold mb-2">Fast Food</h4>
                  <p className="text-white/80 text-sm">Roșu + Galben pentru stimularea apetitului și urgență (McDonald's, KFC)</p>
                </div>
                
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">Tech & Finance</h4>
                  <p className="text-white/80 text-sm">Albastru monochromatic pentru încredere și profesionalism (IBM, PayPal)</p>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Eco & Health</h4>
                  <p className="text-white/80 text-sm">Verde analogic pentru natura și sănătatea (Whole Foods, Spotify)</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">💻 Design Digital</h3>
              
              <div className="space-y-4">
                <div className="bg-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-2">Call-to-Action</h4>
                  <p className="text-white/80 text-sm">Portocaliu complementar pentru butoane cu conversie maximă</p>
                </div>
                
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <h4 className="text-purple-300 font-semibold mb-2">UI/UX Design</h4>
                  <p className="text-white/80 text-sm">Palete monocromatice pentru interfețe clean și accesibile</p>
                </div>
                
                <div className="bg-cyan-500/20 rounded-lg p-4">
                  <h4 className="text-cyan-300 font-semibold mb-2">E-commerce</h4>
                  <p className="text-white/80 text-sm">Triadic echilibrat pentru categorii de produse distincte</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">🛠️ Unelte Recomandate</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Adobe Color</h4>
                <p className="text-white/80 text-sm">Generează automat palete bazate pe reguli de armonie</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-2">Coolors.co</h4>
                <p className="text-white/80 text-sm">Generator rapid cu previzualizare în timp real</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-2">Paletton</h4>
                <p className="text-white/80 text-sm">Roată cromatică interactivă cu toate tipurile de armonii</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concluzie */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Recapitulare </h3>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              Armonia cromatică nu e magie - e știință aplicată. Cu aceste patru tipuri de combinații 
              și cele trei reguli practice, ai instrumentele pentru orice proiect profesional.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">🔄 Complementare</h4>
                <p className="text-white/70 text-sm">Contrast maxim</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">🌊 Analoge</h4>
                <p className="text-white/70 text-sm">Armonie naturală</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">🔺 Triadice</h4>
                <p className="text-white/70 text-sm">Echilibru dinamic</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">🎯 Monocromatice</h4>
                <p className="text-white/70 text-sm">Eleganță simplă</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/teorie/design')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              >
                Următorul: 🖌️ Culorile în Design
              </button>
              <button
                onClick={() => navigate('/palete')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                🎨 Practică: Creează Palete
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300"
              >
                🧪 Quiz: Testează-ți Cunoștințele
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
              <h2 className="text-2xl font-bold text-gray-800">🎨 Ghid Armonia Cromatică</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 Obiectivul Prezentării</h3>
                <p className="text-gray-600">
                  Această prezentare concisă îți oferă principiile esențiale ale armoniei cromatice 
                  într-un format accesibil și aplicabil imediat.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🧭 Structura Optimizată</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Introducere</strong>: De ce contează armonia și beneficiile practice</li>
                  <li>• <strong>4 Tipuri</strong>: Complementare, analoge, triadice, monocromatice</li>
                  <li>• <strong>3 Reguli</strong>: 60-30-10, temperatura, contextul</li>
                  <li>• <strong>Aplicații</strong>: Exemple concrete din marketing și design</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Quick Start</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Începe cu monocromatice pentru siguranță</li>
                  <li>• Aplică regula 60-30-10 în orice design</li>
                  <li>• Folosește complementare doar pentru accente</li>
                  <li>• Testează pe diferite ecrane și context</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 După Prezentare</h3>
                <p className="text-gray-600">
                  Vei putea să identifici și să creezi palete armonioase pentru orice proiect, 
                  de la logo-uri simple la interface-uri complexe.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Să încep să învăț! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ColorHarmonyPresentation;