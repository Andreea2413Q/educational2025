import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AccessibilityPresentation() {
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);
  const [colorBlindnessFilter, setColorBlindnessFilter] = useState('normal');

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'types', 'principles', 'tools', 'testing', 'examples', 'legal', 'implementation', 'workflow'];
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

  const colorBlindnessTypes = [
    {
      type: 'Protanopia',
      icon: '🔴',
      description: 'Lipsa receptorilor pentru roșu',
      prevalence: '1% bărbați',
      characteristics: 'Dificultate în perceperea roșului',
      impact: 'Roșu apare ca galben-maro sau gri',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Roșu → Galben închis'
    },
    {
      type: 'Deuteranopia',
      icon: '🟢',
      description: 'Lipsa receptorilor pentru verde',
      prevalence: '1% bărbați',
      characteristics: 'Dificultate în perceperea verzii',
      impact: 'Verde apare ca galben sau maro',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Verde → Galben/Maro'
    },
    {
      type: 'Tritanopia',
      icon: '🔵',
      description: 'Lipsa receptorilor pentru albastru',
      prevalence: '0.01% populație',
      characteristics: 'Dificultate în perceperea albastrului',
      impact: 'Albastru apare ca verde sau gri',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Albastru → Verde/Gri'
    },
    {
      type: 'Low Vision',
      icon: '🌫️',
      description: 'Vedere slabă generalizată',
      prevalence: '3.4% populație',
      characteristics: 'Acuitate vizuală redusă',
      impact: 'Necesită contrast și fonturi mari',
      colors: ['#000000', '#ffffff', '#ff0000', '#0066cc'],
      simulation: 'Tot mai neclar'
    }
  ];

  const legalStandards = [
    {
      standard: 'WCAG 2.1 AA',
      region: 'Standard Internațional',
      icon: '🌍',
      requirements: [
        'Contrast 4.5:1 pentru text normal',
        'Contrast 3:1 pentru text mare',
        'Nu doar culoare pentru informații'
      ],
      compliance: 'Obligatoriu în UE, SUA, Canada'
    },
    {
      standard: 'ADA (SUA)',
      region: 'Statele Unite',
      icon: '🇺🇸',
      requirements: [
        'Acces egal la servicii publice',
        'Penalități până la $75,000',
        'Procese judiciare frecvente'
      ],
      compliance: 'Obligatoriu pentru toate site-urile publice'
    },
    {
      standard: 'EN 301 549',
      region: 'Uniunea Europeană',
      icon: '🇪🇺',
      requirements: [
        'Directive europene de accesibilitate',
        'Implementare până în 2025',
        'Monitorizare și raportare'
      ],
      compliance: 'Obligatoriu pentru instituții publice'
    },
    {
      standard: 'LGPD + Accesibilitate',
      region: 'România',
      icon: '🇷🇴',
      requirements: [
        'Ordonanța 25/2014',
        'Site-uri publice accesibile',
        'Aplicații mobile incluse'
      ],
      compliance: 'În vigoare din 2020'
    }
  ];

  const designPatterns = [
    {
      pattern: 'Focus Management',
      icon: '🎯',
      description: 'Gestionarea focusului pentru navigare cu tastatura',
      techniques: [
        'Focus indicators vizibili',
        'Skip links pentru navigare rapidă',
        'Focus trapping în modale',
        'Logical tab order'
      ],
      code: `/* CSS pentru focus accesibil */
:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 6px;
  top: 6px;
}`
    },
    {
      pattern: 'Form Accessibility',
      icon: '📝',
      description: 'Formulare accesibile cu validări clare',
      techniques: [
        'Labels asociate cu inputs',
        'Error messages descriptive',
        'Success states vizibile',
        'Required field indicators'
      ],
      code: `/* Stiluri pentru formulare accesibile */
.form-error {
  color: #d63384;
  background: #f8d7da;
  border-left: 4px solid #d63384;
  padding: 8px 12px;
}

.form-success {
  color: #0f5132;
  background: #d1e7dd;
  border-left: 4px solid #198754;
}`
    },
    {
      pattern: 'Button States',
      icon: '🔘',
      description: 'Stări clare pentru toate elementele interactive',
      techniques: [
        'Hover states distinctive',
        'Active/pressed indicators',
        'Disabled states recognizable',
        'Loading states accesibile'
      ],
      code: `.btn {
  /* Base state */
  background: #0066cc;
  border: 2px solid transparent;
}

.btn:hover {
  background: #0052a3;
  transform: translateY(-1px);
}

.btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}`
    },
    {
      pattern: 'Dark Mode Accessibility',
      icon: '🌙',
      description: 'Menținerea accesibilității în tema întunecată',
      techniques: [
        'Contrast păstrat în dark mode',
        'Color adjustments pentru visibility',
        'User preference detection',
        'Smooth transitions'
      ],
      code: `@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
    --bg-color: #121212;
    --accent-color: #4dabf7;
  }
  
  .card {
    background: var(--bg-color);
    color: var(--text-color);
    border: 1px solid #333;
  }
}`
    }
  ];

  const realWorldCases = [
    {
      company: 'Target Corporation',
      icon: '🎯',
      problem: 'Proces juridic de $6 milioane pentru site inaccesibil',
      solution: 'Redesign complet cu focus pe accesibilitate',
      impact: '40% creștere în conversii, reducerea proceselor',
      learnings: [
        'Investiția inițială în accesibilitate e mai ieftină',
        'Testarea cu utilizatori reali e esențială',
        'Training-ul echipei e crucial'
      ]
    },
    {
      company: 'BBC iPlayer',
      icon: '📺',
      problem: 'Subtitrări și controale inaccesibile',
      solution: 'Interfață redesigned cu focus pe accesibilitate',
      impact: '25% creștere în utilizatori cu dizabilități',
      learnings: [
        'Accesibilitatea îmbunătățește experiența pentru toți',
        'Feedback-ul utilizatorilor e foarte valoros',
        'Implementarea poate fi graduală'
      ]
    },
    {
      company: 'Shopify',
      icon: '🛒',
      problem: 'Merchants cu dizabilități nu puteau folosi platforma',
      solution: 'Accessibility-first design system',
      impact: 'Creștere de 15% în merchant retention',
      learnings: [
        'Design systems facilitează consistența',
        'Automated testing reduce costurile',
        'Accesibilitatea e un competitive advantage'
      ]
    }
  ];

  const businessBenefits = [
    {
      benefit: 'Acces la Piață Extins',
      icon: '📈',
      stats: '15% din populație - 1.3 miliarde persoane',
      description: 'Persoanele cu dizabilități au o putere de cumpărare anuală de $8 trilioane',
      actionable: 'Creează produse pentru această piață neexploatată'
    },
    {
      benefit: 'SEO Îmbunătățit',
      icon: '🔍',
      stats: '30% creștere în traffic organic',
      description: 'Site-urile accesibile au structură mai bună și UX superior',
      actionable: 'Google prioritizează site-urile cu experiență bună'
    },
    {
      benefit: 'Risc Legal Redus',
      icon: '⚖️',
      stats: '$75,000 cost mediu proces ADA',
      description: 'Procese juridice în creștere cu 20% anual în SUA',
      actionable: 'Investiția în accesibilitate e insurance împotriva proceselor'
    },
    {
      benefit: 'Brand Reputation',
      icon: '⭐',
      stats: '73% consumatori preferă branduri incluzive',
      description: 'Accesibilitatea demonstrează responsabilitate socială',
      actionable: 'Folosește accesibilitatea ca differentiator competitiv'
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '♿' },
    { id: 'types', title: 'Tipuri Deficiențe', icon: '👁️' },
    { id: 'principles', title: 'Principii Design', icon: '📐' },
    { id: 'tools', title: 'Instrumente', icon: '🛠️' },
    { id: 'testing', title: 'Testare', icon: '🧪' },
    { id: 'examples', title: 'Exemple', icon: '💡' },
    { id: 'legal', title: 'Aspecte Legale', icon: '⚖️' },
    { id: 'implementation', title: 'Implementare', icon: '⚙️' },
    { id: 'workflow', title: 'Workflow & ROI', icon: '💼' }
  ];

  const filterOptions = [
    { value: 'normal', label: 'Vedere Normală' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' }
  ];

  const goodExamples = [
    {
      title: 'Sistem Semafoare Accesibil',
      description: 'Combinație culoare + formă pentru maxima claritate',
      colors: ['#2ECC40', '#FF851B', '#FF4136'],
      shapes: ['●', '▲', '■'],
      accessibility: 'Forme distincte pentru fiecare stare',
      improvement: 'Pozițiile standard + culori distincte'
    },
    {
      title: 'Grafic cu Linii Multiple',
      description: 'Stiluri diferite de linii pentru diferențiere',
      colors: ['#0074D9', '#FF851B', '#2ECC40'],
      patterns: ['───', '- - -', '· · ·'],
      accessibility: 'Stiluri punctare distincte',
      improvement: 'Markers diferite la puncte'
    },
    {
      title: 'Interfață Erori/Succese',
      description: 'Icoane clare + culori + text descriptiv',
      colors: ['#28a745', '#dc3545', '#ffc107'],
      icons: ['✓', '✗', '⚠'],
      accessibility: 'Triple redundancy: culoare + icon + text',
      improvement: 'Mesaje clare și acționabile'
    },
    {
      title: 'Hartă cu Regiuni',
      description: 'Modele și texturi în loc de doar culori',
      colors: ['#E8F4FD', '#B6E0FE', '#7CC7FC', '#42AEFA'],
      patterns: ['░░', '▓▓', '██', '▐▐'],
      accessibility: 'Densități de pattern pentru nivele',
      improvement: 'Legende cu multiple coduri vizuale'
    }
  ];

  const badExamples = [
    {
      title: 'Doar Roșu-Verde',
      problem: 'Cele mai confuzate culori pentru daltoniști',
      colors: ['#ff0000', '#00ff00'],
      issue: 'Indistinguibile pentru 8% din bărbați',
      solution: 'Folosește albastru-portocaliu sau adaugă simboluri'
    },
    {
      title: 'Contrast Insuficient',
      problem: 'Text gri pe fundal alb',
      colors: ['#999999', '#ffffff'],
      issue: 'Contrast 2.8:1 - sub minimul 4.5:1',
      solution: 'Folosește #767676 pentru contrast 4.5:1'
    },
    {
      title: 'Informație Doar prin Culoare',
      problem: 'Grafic care diferențiază doar prin culoare',
      colors: ['#ff0000', '#ff4444', '#ff8888'],
      issue: 'Imposibil de diferențiat pentru unii utilizatori',
      solution: 'Adaugă etichete, forme sau modele'
    },
    {
      title: 'Palette Pastel Similare',
      problem: 'Culori pastel fără contrast suficient',
      colors: ['#ffcccc', '#ccffcc', '#ccccff'],
      issue: 'Diferențe subtile greu de perceput',
      solution: 'Mărește contrastul sau adaugă borduri'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigare fixă */}
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
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.title}</span>
              </button>
            ))}
          </div>
          
          {/* Simulator Daltonism */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <h4 className="text-white text-sm font-semibold mb-2">Simulator</h4>
            <select
              value={colorBlindnessFilter}
              onChange={(e) => setColorBlindnessFilter(e.target.value)}
              className="w-full bg-white/10 text-white text-xs rounded px-2 py-1 border border-white/20"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-black">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* Header */} 
      <div className="w-[100%] lg:w-[80%] lg:ml-[18%] px-4">
        <div className="pt-20 pb-16 px-8">
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
            
            <label className='text-5xl md:text-5xl'>🔓
            <h1 className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent inline-flex">
               Accesibilitate Cromatică 
            </h1>
            🔓
            </label>
            <p className="text-2xl text-white leading-relaxed max-w-3xl mx-auto">
              Designul incluziv: cum să creezi palete accesibile pentru persoanele cu 
              deficiențe de vedere și să construiești experiențe pentru toți utilizatorii.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 pb-20">
          {/* Introducere */}
          <section id="intro" className="mb-20">
            <h2 className='text-3xl font-bold text-white mb-6'>🌍 De ce este importantă accesibilitatea?</h2>
            <p className='text-white my-3'>
              Accesibilitatea cromatică nu este doar o "caracteristică bonus" - este o necesitate pentru milioane de oameni. La nivel global, 300 de milioane de persoane au deficiențe de vedere, iar 8% din bărbați au daltonism. Aceasta înseamnă că unul din 12 bărbați nu poate percepe culorile la fel ca tine.
            </p>
            <p className='text-white mb-5'>
              Când creăm un design, noi creăm pentru toți acești oameni, nu doar pentru cei cu vedere perfectă.
              Gândește-te așa: dacă ai avea un magazin fizic, ai construi scări fără rampe pentru persoanele cu dizabilități? La fel este și cu designul digital - trebuie să fie accesibil tuturor. Un design accesibil nu este mai urât sau mai limitat; de obicei este mai clar, mai ușor de folosit și mai profesional.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Simulator de Contrast</h3>
              <p className='text-white my-3'>
                Contrastul este diferența de luminozitate dintre text și fundal. Este ca diferența dintre a șopti și a vorbi tare - unii oameni aud bine șoaptele, dar alții au nevoie de o voce mai tare pentru a înțelege mesajul.
              </p>
              <p className='text-white my-3'>
                Când testezi contrastul, nu te uita doar la cum arată pe ecranul tău perfect calibrat într-o cameră întunecată. Gândește-te la oameni care citesc pe telefon în soare, la cei cu ecrane mai vechi, sau la cei care au văzul obosit după o zi lungă de muncă.
              </p>
              <p className='text-white my-3'>
                <strong>Exemplu:</strong> Textul negru pe fundal alb are un contrast de 21:1 (perfect pentru citire). Textul gri deschis pe fundal alb are doar 2.8:1 (multe persoane nu-l pot citi confortabil). Standardele internaționale spun că ai nevoie de cel puțin 4.5:1 pentru text normal.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Test de Contrast</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-black text-lg">Text negru pe fundal alb</p>
                      <p className="text-gray-600 text-sm">Contrast: 21:1 ✅ WCAG AAA</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg">
                      <p className="text-gray-600 text-lg">Text gri pe fundal gri deschis</p>
                      <p className="text-gray-500 text-sm">Contrast: 2.8:1 ❌ Insuficient</p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-lg">
                      <p className="text-white text-lg">Text alb pe fundal albastru</p>
                      <p className="text-blue-100 text-sm">Contrast: 8.6:1 ✅ WCAG AAA</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Simulare Daltonism</h4>
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-green-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded border-2 border-white/30"></div>
                    </div>
                    <p className="text-white/80 text-sm mb-2">Vedere normală ↑</p>
                    
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-600 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-yellow-400 rounded border-2 border-white/30"></div>
                    </div>
                    <p className="text-white/80 text-sm">Protanopia (fără roșu) ↑</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">🎯 Checklist Rapid</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">Contrast ✅</p>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• Text normal: minim 4.5:1</li>
                      <li>• Text mare: minim 3:1</li>
                      <li>• Elemente UI: minim 3:1</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">Culori ✅</p>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>• Nu doar culoare pentru info</li>
                      <li>• Evită doar roșu-verde</li>
                      <li>• Testează cu simulatoare</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tipuri de Deficiențe Vizuale */}
          <section id="types" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">👁️ Tipuri de Deficiențe Vizuale</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Înțelegerea diversității deficiențelor de vedere pentru un design cu adevărat incluziv.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {colorBlindnessTypes.map((type, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{type.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{type.type}</h3>
                      <p className="text-white/70 text-sm">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Prevalența:</p>
                      <p className="text-white text-lg">{type.prevalence}</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Impact:</p>
                      <p className="text-white/70 text-sm">{type.impact}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    {type.colors.map((color, i) => (
                      <div key={i} className="w-8 h-8 rounded border-2 border-white/30" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                  
                  <p className="text-white/60 text-sm">{type.simulation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Aspecte Legale */}
          <section id="legal" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">⚖️ Aspecte Legale și Standarde</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Legislația actuală și standardele obligatorii pentru accesibilitatea digitală.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {legalStandards.map((standard, index) => (
                <div key={index} className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{standard.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{standard.standard}</h3>
                      <p className="text-white/70">{standard.region}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {standard.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <p className="text-white/80 text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-1">Status:</p>
                    <p className="text-white/70 text-sm">{standard.compliance}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-300 mb-4">🚨 Riscuri și Costuri</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">$75,000</div>
                  <p className="text-white/70 text-sm">Cost mediu proces ADA</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">+20%</div>
                  <p className="text-white/70 text-sm">Creștere procese anual</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">74%</div>
                  <p className="text-white/70 text-sm">Site-uri inaccesibile</p>
                </div>
              </div>
            </div>
          </section>

          {/* Implementare Tehnică */}
          <section id="implementation" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">⚙️ Implementare Tehnică</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Tehnici și pattern-uri pentru implementarea accesibilității în cod.
              </p>
            </div>

            <div className="space-y-8">
              {designPatterns.map((pattern, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{pattern.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{pattern.pattern}</h3>
                      <p className="text-white/70">{pattern.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Tehnici:</h4>
                      <div className="space-y-2">
                        {pattern.techniques.map((technique, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <p className="text-white/80 text-sm">{technique}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Exemplu Cod:</h4>
                      <div className="bg-black/50 rounded-lg p-4">
                        <pre className="text-green-300 text-xs overflow-x-auto">
                          <code>{pattern.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow & ROI */}
          <section id="workflow" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">💼 Workflow & Business Impact</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Cum să integrezi accesibilitatea în procesele de dezvoltare și beneficiile business.
              </p>
            </div>

            {/* Business Benefits */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">📈 Beneficii Business</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {businessBenefits.map((benefit, index) => (
                  <div key={index} className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{benefit.icon}</span>
                      <h4 className="text-xl font-bold text-white">{benefit.benefit}</h4>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-green-400">{benefit.stats}</div>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-3">{benefit.description}</p>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-green-300 text-sm font-semibold mb-1">Acțiune:</p>
                      <p className="text-white/70 text-sm">{benefit.actionable}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Cases */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">🏢 Studii de Caz Reale</h3>
              <div className="space-y-6">
                {realWorldCases.map((caseStudy, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{caseStudy.icon}</span>
                      <h4 className="text-xl font-bold text-white">{caseStudy.company}</h4>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div>
                        <h5 className="text-red-300 font-semibold mb-2">Problemă:</h5>
                        <p className="text-white/80 text-sm">{caseStudy.problem}</p>
                      </div>
                      <div>
                        <h5 className="text-blue-300 font-semibold mb-2">Soluție:</h5>
                        <p className="text-white/80 text-sm">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <h5 className="text-green-300 font-semibold mb-2">Impact:</h5>
                        <p className="text-white/80 text-sm">{caseStudy.impact}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-black/30 rounded-lg p-4">
                      <h5 className="text-yellow-300 font-semibold mb-2">Lecții învățate:</h5>
                      <div className="space-y-1">
                        {caseStudy.learnings.map((learning, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">→</span>
                            <p className="text-white/70 text-sm">{learning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Exemple Bune și Rele */}
          <section id="examples" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">💡 Exemple Bune și Rele</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Comparații practice pentru înțelegerea principiilor de accesibilitate cromatică.
              </p>
            </div>

            {/* Exemple Bune */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-green-400 mb-6">✅ Exemple Bune</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {goodExamples.map((example, index) => (
                  <div key={index} className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">{example.title}</h4>
                    <p className="text-white/80 text-sm mb-4">{example.description}</p>
                    
                    <div className="flex gap-2 mb-3">
                      {example.colors.map((color, i) => (
                        <div key={i} className="relative">
                          <div className="w-8 h-8 rounded border-2 border-white/30" style={{ backgroundColor: color }}></div>
                          {example.shapes && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                              {example.shapes[i]}
                            </span>
                          )}
                          {example.patterns && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                              {example.patterns[i]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3 mb-3">
                      <p className="text-green-300 text-sm font-semibold mb-1">Accesibilitate:</p>
                      <p className="text-white/70 text-sm">{example.accessibility}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-green-300 text-sm font-semibold mb-1">Îmbunătățire:</p>
                      <p className="text-white/70 text-sm">{example.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exemple Rele */}
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-6">❌ Exemple de Evitat</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {badExamples.map((example, index) => (
                  <div key={index} className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">{example.title}</h4>
                    <p className="text-white/80 text-sm mb-4">{example.problem}</p>
                    
                    <div className="flex gap-2 mb-3">
                      {example.colors.map((color, i) => (
                        <div key={i} className="w-8 h-8 rounded border-2 border-white/30" style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3 mb-3">
                      <p className="text-red-300 text-sm font-semibold mb-1">Problemă:</p>
                      <p className="text-white/70 text-sm">{example.issue}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-yellow-300 text-sm font-semibold mb-1">Soluție:</p>
                      <p className="text-white/70 text-sm">{example.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Concluzie */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">✍ Designul pentru Toți 📱</h3>
              <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                Accesibilitatea nu este o restricție, ci o oportunitate de a crea experiențe 
                mai bune pentru toți utilizatorii. Un design accesibil este un design mai bun, 
                legal compliant și cu ROI demonstrabil.
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">🛠️ Testare</h4>
                  <p className="text-white/70 text-sm">Verifică regulat</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">👥 Incluziune</h4>
                  <p className="text-white/70 text-sm">Design pentru toți</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">📙 Standarde</h4>
                  <p className="text-white/70 text-sm">Respectă WCAG</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">📈 Îmbunătățire</h4>
                  <p className="text-white/70 text-sm">Proces continuu</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/teorie/psihologie')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  🧠 Psihologia Culorilor
                </button>
                <button
                  onClick={() => navigate('/quiz')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  🎯 Testează: Quiz Accesibilitate & Contrast și Lizibilitate
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
                <h2 className="text-2xl font-bold text-gray-800">♿ Ghid Accesibilitate Cromatică</h2>
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
                    Această prezentare completă te învață să creezi designuri accesibile pentru persoanele 
                    cu deficiențe de vedere, respectând standardele legale și principiile incluziunii.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🧭 Structura Explorării</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>Introducere</strong>: Importanța accesibilității în design</li>
                    <li>• <strong>Tipuri Deficiențe</strong>: Daltonism, Low Vision și alte condiții</li>
                    <li>• <strong>Aspecte Legale</strong>: WCAG, ADA, EN 301 549 și legislația română</li>
                    <li>• <strong>Implementare</strong>: Pattern-uri tehnice și cod practic</li>
                    <li>• <strong>Workflow & ROI</strong>: Business impact și studii de caz</li>
                    <li>• <strong>Exemple</strong>: Cazuri bune și rele cu soluții</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Funcții Interactive</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Simulator daltonism în sidebar</li>
                    <li>• Exemple de contrast în timp real</li>
                    <li>• Code snippets pentru implementare</li>
                    <li>• Calculatoare ROI și business impact</li>
                    <li>• Studii de caz din industrie</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 După Prezentare</h3>
                  <p className="text-gray-600">
                    Vei putea să implementezi accesibilitate completă în proiectele tale, 
                    să respecti standardele legale și să demonstrezi ROI-ul investiției în incluziune.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 text-center">
                <button 
                  onClick={() => setShowHelp(false)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  Să învăț accesibilitatea completă! 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}