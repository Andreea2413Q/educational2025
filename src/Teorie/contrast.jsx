import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContrastRatioExplanation() {
  const navigate = useNavigate();
  const [selectedExample, setSelectedExample] = useState(0);
  const [showCalculation, setShowCalculation] = useState(false);
  const [userForeground, setUserForeground] = useState('#000000');
  const [userBackground, setUserBackground] = useState('#ffffff');
  const [calculatedRatio, setCalculatedRatio] = useState(21);
  const [selectedVisionType, setSelectedVisionType] = useState('normal');

  const contrastExamples = [
    {
      name: "Contrast Perfect",
      foreground: "#000000",
      background: "#ffffff", 
      ratio: 21,
      readability: "Perfect pentru toată lumea",
      description: "Negru pe alb - contrastul maxim posibil",
      analogy: "Ca diferența dintre liniște completă și muzică la maxim",
      wcag: "AAA",
      icon: "🌟",
      useCases: "Textul principal, etichete importante, instrucțiuni critice"
    },
    {
      name: "Contrast Excelent",
      foreground: "#ffffff",
      background: "#0066cc",
      ratio: 8.6,
      readability: "Excelent pentru citire",
      description: "Alb pe albastru închis",
      analogy: "Ca diferența dintre șoaptă și voce normală",
      wcag: "AAA",
      icon: "✅",
      useCases: "Butoane principale, titluri, link-uri importante"
    },
    {
      name: "Contrast Minim Acceptabil",
      foreground: "#767676",
      background: "#ffffff",
      ratio: 4.5,
      readability: "Acceptabil pentru majoritatea",
      description: "Gri mediu pe alb - exact la limită",
      analogy: "Ca diferența dintre muzică încet și volum mediu",
      wcag: "AA",
      icon: "⚠️",
      useCases: "Text secundar, subtitluri, informații suplimentare"
    },
    {
      name: "Contrast Insuficient",
      foreground: "#999999",
      background: "#ffffff",
      ratio: 2.8,
      readability: "Problematic pentru mulți",
      description: "Gri deschis pe alb - sub standard",
      analogy: "Ca diferența dintre muzică încet și puțin mai tare",
      wcag: "FAIL",
      icon: "❌",
      useCases: "NU folosiți pentru text important!"
    },
    {
      name: "Contrast Foarte Slab",
      foreground: "#cccccc",
      background: "#ffffff",
      ratio: 1.6,
      readability: "Greu de citit pentru majoritatea",
      description: "Gri foarte deschis pe alb",
      analogy: "Ca două volume de muzică aproape identice",
      wcag: "FAIL",
      icon: "🚫",
      useCases: "Doar pentru elemente decorative fără text"
    }
  ];

  const visionTypes = [
    {
      id: 'normal',
      name: 'Vedere Normală',
      description: 'Fără probleme de vedere',
      icon: '👁️',
      requirements: 'Standard WCAG AA (4.5:1) este suficient'
    },
    {
      id: 'presbyopia',
      name: 'Prezbiopia',
      description: 'Probleme cu vederea de aproape (vârsta)',
      icon: '👓',
      requirements: 'Contrast mai mare (6:1+) și text mai mare'
    },
    {
      id: 'cataracts',
      name: 'Cataractă',
      description: 'Vedere încetoșată, sensibilitate la lumină',
      icon: '🌫️',
      requirements: 'Contrast foarte mare (10:1+), evitați alb strălucitor'
    },
    {
      id: 'glaucoma',
      name: 'Glaucom',
      description: 'Câmpul vizual redus, vedere periferică afectată',
      icon: '🎯',
      requirements: 'Contrast maxim (15:1+), evitați gradientele'
    },
    {
      id: 'colorblind',
      name: 'Daltonism',
      description: 'Dificultăți în perceperea culorilor',
      icon: '🌈',
      requirements: 'Nu vă bazați doar pe culoare, folosiți contrast luminanță'
    }
  ];

  const designFactors = [
    {
      title: "Mărimea Fontului",
      description: "Textul mai mic are nevoie de contrast mai mare",
      examples: [
        "Text 12px: minim 7:1",
        "Text 14px: minim 4.5:1", 
        "Text 18px+: minim 3:1"
      ],
      icon: "📏"
    },
    {
      title: "Grosimea Fontului",
      description: "Fonturile subțiri sunt mai greu de citit",
      examples: [
        "Light/Thin: +2 puncte contrast",
        "Regular: standard",
        "Bold/Black: -1 punct OK"
      ],
      icon: "⋆═══════⋆"
    },
    {
      title: "Lumina Ambientală",
      description: "Condițiile de iluminare afectează percepția",
      examples: [
        "Ecran în soare: +5 puncte necesare",
        "Cameră întunecată: standard OK",
        "Lumină fluorescent: +2 puncte"
      ],
      icon: "🔆"
    },
    {
      title: "Tipul de Ecran",
      description: "Tehnologia afișului influențează contrastul",
      examples: [
        "OLED: contrast excelent natural",
        "LCD: poate avea probleme cu negrul",
        "E-ink: contrast maxim"
      ],
      icon: "💻"
    }
  ];

  const calculateLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const calculateContrastRatio = (fg, bg) => {
    const l1 = calculateLuminance(fg);
    const l2 = calculateLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  useEffect(() => {
    const ratio = calculateContrastRatio(userForeground, userBackground);
    setCalculatedRatio(ratio);
  }, [userForeground, userBackground]);

  const getWCAGLevel = (ratio) => {
    if (ratio >= 7) return { level: "AAA", color: "text-green-400", description: "Excelent - Perfect pentru toată lumea" };
    if (ratio >= 4.5) return { level: "AA", color: "text-yellow-400", description: "Bun - Acceptabil pentru majoritatea" };
    if (ratio >= 3) return { level: "AA Large", color: "text-orange-400", description: "Limită - OK doar pentru text mare" };
    return { level: "FAIL", color: "text-red-400", description: "Prost - Inacceptabil pentru text" };
  };

  const getDetailedAnalysis = (ratio) => {
    if (ratio >= 15) return {
      quality: "Perfect",
      accessibility: "Excelent pentru toate tipurile de probleme de vedere",
      recommendations: "Ideal pentru aplicații medicale, educaționale sau pentru vârstnici"
    };
    if (ratio >= 7) return {
      quality: "Foarte bun",
      accessibility: "Potrivit pentru majoritatea persoanelor cu probleme de vedere",
      recommendations: "Recomandat pentru conținut important și interfețe profesionale"
    };
    if (ratio >= 4.5) return {
      quality: "Acceptabil",
      accessibility: "Standard minim pentru majoritatea utilizatorilor",
      recommendations: "OK pentru text normal, dar evitați pentru text mic sau subțire"
    };
    if (ratio >= 3) return {
      quality: "Marginal",
      accessibility: "Problematic pentru multe persoane",
      recommendations: "Folosiți doar pentru text mare (18pt+) și nu pentru informații critice"
    };
    return {
      quality: "Inacceptabil",
      accessibility: "Greu de citit pentru majoritatea oamenilor",
      recommendations: "Nu folosiți pentru text - doar pentru elemente decorative"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            🌓 Contrastul și Lizibilitatea 🌗
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Contrastul este diferența de culoare sau luminanță dintre două elemente, cum ar fi textul și fundalul, care permite ochiului să le distingă clar.
          </p>
                 <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Lizibilitatea este măsura în care un text poate fi citit ușor și rapid, determinată de factori precum contrastul, dimensiunea fontului, spațierea și tipul de caracter.

                 </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">⚛️ Știința din Spatele Contrastului</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
      
              <p className="text-white/90 mb-4">
                <strong>Luminanța</strong> este măsura științifică a cât de multă lumină emite sau reflectă o suprafață. 
                Nu este același lucru cu luminozitatea pe care o percepem vizual.
              </p>
              <div className="bg-black rounded-lg p-4 mb-4">
                <p className="text-white text-lg">
                  <strong>Exemplu:</strong> Galbenul pare mai luminos decât albastrul, chiar dacă au aceeași luminanță
                  💛 💙
                </p>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Formula de calcul:</h4>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm text-white/90">
                L = 0.2126×R + 0.7152×G + 0.0722×B
              </div>
              <p className="text-white/70 text-sm mt-2">
                Ochiul nostru este cel mai sensibil la verde (71.52%), apoi la roșu (21.26%) și cel mai puțin la albastru (7.22%)
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">De ce este important contrastul?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h4 className="text-white font-medium">Procesarea cerebrală</h4>
                    <p className="text-white/70 text-sm">Creierul nostru identifică formele prin diferențe de luminanță, nu de culoare.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👁️</span>
                  <div>
                    <h4 className="text-white font-medium">Funcționarea ochiului</h4>
                    <p className="text-white/70 text-sm">Bastoanele (vision în condiții de lumină slabă) văd doar luminanța, nu culorile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">😑</span>
                  <div>
                    <h4 className="text-white font-medium">Oboseala vizuală</h4>
                    <p className="text-white/70 text-sm">Contrastul slab forțează ochiul să lucreze mai mult, cauzând oboseală.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h4 className="text-white font-medium">Vârsta și vederea</h4>
                    <p className="text-white/70 text-sm">După 40 de ani, sensibilitatea la contrast scade cu 1-2% pe an.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <h2 className='text-xl mx-2 my-6 text-white'>

          Standardul WCAG AA este o regulă internațională care stabilește cât de lizibil trebuie să fie textul pe un site, printr-un contrast minim de 4.5:1 între text și fundal.
Scopul este să asigure că informațiile pot fi citite ușor de toți utilizatorii, inclusiv de cei cu probleme de vedere.
        </h2>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">👥 Cum Afectează Problemele de Vedere Contrastul</h2>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {visionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedVisionType(type.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    selectedVisionType === type.id 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span className="text-sm">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-black/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{visionTypes.find(t => t.id === selectedVisionType)?.icon}</span>
                  <h3 className="text-xl font-bold text-white">
                    {visionTypes.find(t => t.id === selectedVisionType)?.name}
                  </h3>
                </div>
                <p className="text-white/80 mb-4">
                  {visionTypes.find(t => t.id === selectedVisionType)?.description}
                </p>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Cerințe speciale:</h4>
                  <p className="text-blue-200 text-sm">
                    {visionTypes.find(t => t.id === selectedVisionType)?.requirements}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Statistici despre Problemele de Vedere</h3>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Prezbiopia (40+ ani)</span>
                    <span className="text-white font-bold">83%</span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Daltonism (bărbați)</span>
                    <span className="text-white font-bold">8%</span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Cataractă (60+ ani)</span>
                    <span className="text-white font-bold">68%</span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Glaucom (mondial)</span>
                    <span className="text-white font-bold">3.5%</span>
                  </div>
                </div>
              </div>
              <p className="text-white text-sm mt-4">
                 !! Peste 90% dintre utilizatori au cel puțin o problemă minoră de vedere care beneficiază de contrast îmbunătățit. !!
              </p>
            </div>
          </div>
        </div>

        {/* Factorii care Afectează Lizibilitatea */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">⚙️ Factori care Afectează Lizibilitatea</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designFactors.map((factor, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-3xl">{factor.icon}</span>
                  <h3 className="text-lg font-semibold text-white mt-2">{factor.title}</h3>
                </div>
                <p className="text-white/80 text-sm mb-4 text-center">{factor.description}</p>
                <div className="space-y-2">
                  {factor.examples.map((example, i) => (
                    <div key={i} className="bg-white/10 rounded p-2">
                      <p className="text-white/70 text-xs">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explicația de bază - extinsă */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">📖 Cum se Calculează Raportul de Contrast</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Formula simplificată</h3>
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    (L1 + 0.05) ÷ (L2 + 0.05)
                  </div>
                  <p className="text-white/70 text-sm">
                    unde L1 = luminanța mai mare, L2 = luminanța mai mică
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowCalculation(!showCalculation)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
              >
                {showCalculation ? 'Ascunde' : 'Arată'} calculul pas cu pas
              </button>

              {showCalculation && (
                <div className="bg-black/40 rounded-lg p-4 space-y-3">
                  <h4 className="text-white font-semibold">Exemplu: Negru (#000000) pe Alb (#ffffff), (L=Luminanța)</h4>
                  <div className="text-sm text-white/80 space-y-2">
                    <p><strong>Pas 1:</strong> Calculăm luminanța pentru alb </p>
                    <p className="ml-4">L_alb = 0.2126×1 + 0.7152×1 + 0.0722×1 = 1.0</p>
                    
                    <p><strong>Pas 2:</strong> Calculăm luminanța pentru negru</p>
                    <p className="ml-4">L_negru = 0.2126×0 + 0.7152×0 + 0.0722×0 = 0.0</p>
                    
                    <p><strong>Pas 3:</strong> Aplicăm formula raportului</p>
                    <p className="ml-4">Raport = (1.0 + 0.05) ÷ (0.0 + 0.05) = 1.05 ÷ 0.05 = 21</p>
                    
                    <div className="bg-green-500/20 rounded p-2 mt-3">
                      <p className="text-green-200"><strong>Rezultat: 21:1</strong> - Contrastul maxim posibil!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Analogia cu volumul muzicii - detaliată</h3>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔊</span>
                    <span className="text-white font-semibold">21:1 = Liniște vs Concert Rock</span>
                  </div>
                  <p className="text-white/70 text-sm">Diferența maximă - oricine o simte instantaneu</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔉</span>
                    <span className="text-white font-semibold">7:1 = Cameră liniștită vs Conversație</span>
                  </div>
                  <p className="text-white/70 text-sm">Diferență clară, confortabilă pentru toată lumea</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔈</span>
                    <span className="text-white font-semibold">4.5:1 = Șoaptă vs Voce normală</span>
                  </div>
                  <p className="text-white/70 text-sm">Diferență perceptibilă, dar necesită atenție</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔇</span>
                    <span className="text-white font-semibold">3:1 = Două șoapte diferite</span>
                  </div>
                  <p className="text-white/70 text-sm">Diferență subtilă, dificil de distins</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exemple Interactive - extinsă */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Exemple Interactive Detaliate</h2>
          
          {/* Selector Exemple */}
          <div className="flex flex-wrap gap-4 mb-8">
            {contrastExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  selectedExample === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <span>{example.icon}</span>
                <span className="text-sm">{example.name}</span>
              </button>
            ))}
          </div>

          {/* Demonstrația selectată */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div 
                className="p-8 rounded-xl border-4 border-white/30 mb-4"
                style={{ 
                  backgroundColor: contrastExamples[selectedExample].background,
                  color: contrastExamples[selectedExample].foreground 
                }}
              >
                <h3 className="text-3xl font-bold mb-4">Test de Lizibilitate</h3>
                <p className="text-lg mb-4">
                  Acesta este un exemplu de text cu raportul de contrast {contrastExamples[selectedExample].ratio}:1.
                </p>
                <p className="text-base mb-4">
                  Poți citi acest paragraf confortabil? Observi cum îți este de dificil sau ușor să procesezi informația?
                </p>
                <p className="text-sm mb-4">
                  Acest text mai mic testează lizibilitatea pentru fonturi de dimensiuni reduse. 
                  Persoanele cu probleme de vedere pot avea dificultăți crescute aici.
                </p>
                <div className="border-t border-current pt-4">
                  <h4 className="font-bold text-lg">Test de viteză de citire</h4>
                  <p className="text-sm">
                    Încearcă să citești acest text cât mai repede posibil. 
                    Contrastul slab încetinește viteza de procesare cu până la 40%!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-black/30 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{contrastExamples[selectedExample].icon}</span>
                  <span className="text-white font-semibold text-xl">
                    {contrastExamples[selectedExample].ratio}:1
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-1">Descriere:</h4>
                    <p className="text-white/80 text-sm">{contrastExamples[selectedExample].description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-1">Lizibilitate:</h4>
                    <p className="text-white/80 text-sm">{contrastExamples[selectedExample].readability}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-1">Analogie:</h4>
                    <p className="text-white/70 text-sm italic">{contrastExamples[selectedExample].analogy}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-1">Cazuri de folosire:</h4>
                    <p className="text-white/70 text-sm">{contrastExamples[selectedExample].useCases}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-1">Standard WCAG:</h4>
                    <span className={`px-2 py-1 rounded text-sm font-bold ${
                      contrastExamples[selectedExample].wcag === 'AAA' ? 'bg-green-500' :
                      contrastExamples[selectedExample].wcag === 'AA' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white`}>
                      {contrastExamples[selectedExample].wcag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Culorile folosite */}
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Culorile folosite:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border-2 border-white/30"
                      style={{ backgroundColor: contrastExamples[selectedExample].background }}
                    ></div>
                    <div>
                      <p className="text-white/80 text-sm">Fundal</p>
                      <p className="text-white/60 text-xs font-mono">
                        {contrastExamples[selectedExample].background}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border-2 border-white/30"
                      style={{ backgroundColor: contrastExamples[selectedExample].foreground }}
                    ></div>
                    <div>
                      <p className="text-white/80 text-sm">Text</p>
                      <p className="text-white/60 text-xs font-mono">
                        {contrastExamples[selectedExample].foreground}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Interactiv - extins */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">🧮 Calculator Avansat de Contrast</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Configurează culorile</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-3">Culoarea textului (foreground):</label>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="color"
                      value={userForeground}
                      onChange={(e) => setUserForeground(e.target.value)}
                      className="w-16 h-16 rounded-lg border-2 border-white/30 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={userForeground}
                      onChange={(e) => setUserForeground(e.target.value)}
                      className="bg-black/30 text-white px-3 py-2 rounded font-mono text-sm flex-1"
                      placeholder="#000000"
                    />
                  </div>
                  <p className="text-white/60 text-xs">
                    Luminanța: {calculateLuminance(userForeground).toFixed(3)}
                  </p>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-3">Culoarea fundalului (background):</label>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="color"
                      value={userBackground}
                      onChange={(e) => setUserBackground(e.target.value)}
                      className="w-16 h-16 rounded-lg border-2 border-white/30 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={userBackground}
                      onChange={(e) => setUserBackground(e.target.value)}
                      className="bg-black/30 text-white px-3 py-2 rounded font-mono text-sm flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                  <p className="text-white/60 text-xs">
                    Luminanța: {calculateLuminance(userBackground).toFixed(3)}
                  </p>
                </div>

                {/* Preset-uri rapide */}
                <div>
                  <h4 className="text-white font-medium mb-3">Preset-uri rapide:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {setUserForeground('#000000'); setUserBackground('#ffffff');}}
                      className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
                    >
                      Negru/Alb
                    </button>
                    <button
                      onClick={() => {setUserForeground('#ffffff'); setUserBackground('#000000');}}
                      className="bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors border border-white/30"
                    >
                      Alb/Negru
                    </button>
                    <button
                      onClick={() => {setUserForeground('#0066cc'); setUserBackground('#ffffff');}}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Albastru/Alb
                    </button>
                    <button
                      onClick={() => {setUserForeground('#767676'); setUserBackground('#ffffff');}}
                      className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                    >
                      Gri/Alb
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Rezultatele analizei</h3>
              
              {/* Preview */}
              <div 
                className="p-6 rounded-xl border-4 border-white/30 mb-6"
                style={{ backgroundColor: userBackground, color: userForeground }}
              >
                <h4 className="text-2xl font-bold mb-3">Textul tău de test</h4>
                <p className="text-lg mb-2">
                  Acest text folosește culorile pe care le-ai ales.
                </p>
                <p className="text-base mb-2">
                  Se citește ușor? Observi vreo oboseală vizuală?
                </p>
                <p className="text-sm">
                  Acest text mai mic simulează etichete sau informații secundare.
                </p>
              </div>

              {/* Rezultate detaliate */}
              <div className="bg-black/30 rounded-lg p-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-white">
                    {calculatedRatio.toFixed(1)}:1
                  </span>
                  <p className="text-white/60 text-sm mt-1">Raportul de contrast</p>
                </div>
                
                {(() => {
                  const wcag = getWCAGLevel(calculatedRatio);
                  const analysis = getDetailedAnalysis(calculatedRatio);
                  return (
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className={`text-xl font-bold ${wcag.color}`}>
                          {wcag.level}
                        </span>
                        <p className="text-white/70 text-sm mt-1">{wcag.description}</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <h5 className="text-white font-medium mb-2">Calitatea generală:</h5>
                        <p className="text-white/80 text-sm mb-3">{analysis.quality}</p>
                        
                        <h5 className="text-white font-medium mb-2">Accesibilitate:</h5>
                        <p className="text-white/80 text-sm mb-3">{analysis.accessibility}</p>
                        
                        <h5 className="text-white font-medium mb-2">Recomandări:</h5>
                        <p className="text-white/80 text-sm">{analysis.recommendations}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white/10 rounded p-3">
                          <p className="text-white/60 text-xs">Text normal</p>
                          <p className={`font-bold ${calculatedRatio >= 4.5 ? 'text-green-400' : 'text-red-400'}`}>
                            {calculatedRatio >= 4.5 ? '✓' : '✗'}
                          </p>
                        </div>
                        <div className="bg-white/10 rounded p-3">
                          <p className="text-white/60 text-xs">Text mare</p>
                          <p className={`font-bold ${calculatedRatio >= 3 ? 'text-green-400' : 'text-red-400'}`}>
                            {calculatedRatio >= 3 ? '✓' : '✗'}
                          </p>
                        </div>
                        <div className="bg-white/10 rounded p-3">
                          <p className="text-white/60 text-xs">Level AAA</p>
                          <p className={`font-bold ${calculatedRatio >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {calculatedRatio >= 7 ? '✓' : '○'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Ghidul de interpretare - extins */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">📏 Ghidul Complet de Interpretare</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Standardele WCAG în detaliu</h3>
              <div className="space-y-4">
                <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400 font-bold text-lg">AAA</span>
                    <span className="text-white font-medium">Nivel 7:1+</span>
                  </div>
                  <p className="text-green-100 text-sm mb-2">
                    <strong>Perfect pentru:</strong> Aplicații medicale, educaționale, pentru vârstnici
                  </p>
                  <p className="text-green-200/80 text-xs">
                    Accesibil pentru 99.9% din populație, inclusiv persoane cu probleme severe de vedere
                  </p>
                </div>
                
                <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-yellow-400 font-bold text-lg">AA</span>
                    <span className="text-white font-medium">Nivel 4.5:1+</span>
                  </div>
                  <p className="text-yellow-100 text-sm mb-2">
                    <strong>Standard pentru:</strong> Site-uri web, aplicații business, interfețe publice
                  </p>
                  <p className="text-yellow-200/80 text-xs">
                    Cerința legală minimă în multe țări, accesibil pentru 95% din populație
                  </p>
                </div>
                
                <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-orange-400 font-bold text-lg">AA Large</span>
                    <span className="text-white font-medium">Nivel 3:1+</span>
                  </div>
                  <p className="text-orange-100 text-sm mb-2">
                    <strong>Doar pentru:</strong> Text mare (18pt+ sau 14pt+ bold), grafice, butoane mari
                  </p>
                  <p className="text-orange-200/80 text-xs">
                    Acceptabil pentru text decorativ sau secțiuni neprioritare
                  </p>
                </div>
                
                <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-red-400 font-bold text-lg">FAIL</span>
                    <span className="text-white font-medium">Sub 3:1</span>
                  </div>
                  <p className="text-red-100 text-sm mb-2">
                    <strong>Nu folosiți pentru:</strong> Text, etichete, informații importante
                  </p>
                  <p className="text-red-200/80 text-xs">
                    Inacceptabil pentru conținut functional, poate fi ilegal în unele contexte
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Reguli practice pentru designeri</h3>
              <div className="space-y-4">
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-200 font-semibold mb-2">🎯 Pentru butoane și CTA-uri</h4>
                  <ul className="text-blue-100/80 text-sm space-y-1">
                    <li>• Minimum 4.5:1, preferabil 7:1+</li>
                    <li>• Testați în condiții de lumină slabă</li>
                    <li>• Adăugați border pentru contrast suplimentar</li>
                  </ul>
                </div>
                
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <h4 className="text-purple-200 font-semibold mb-2">📝 Pentru text de conținut</h4>
                  <ul className="text-purple-100/80 text-sm space-y-1">
                    <li>• Minimum absolut 4.5:1</li>
                    <li>• Pentru citire lungă: 7:1+</li>
                    <li>• Text mic (sub 16px): 7:1+ obligatoriu</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-semibold mb-2">🎨 Pentru elemente decorative</h4>
                  <ul className="text-green-100/80 text-sm space-y-1">
                    <li>• Pot avea contrast mai mic</li>
                    <li>• NU trebuie să conțină informații importante</li>
                    <li>• Evitați să arate ca butoane</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-500/20 rounded-lg p-4">
                  <h4 className="text-yellow-200 font-semibold mb-2">⚠️ Excepții și cazuri speciale</h4>
                  <ul className="text-yellow-100/80 text-sm space-y-1">
                    <li>• Logo-uri: nu au cerințe de contrast</li>
                    <li>• Imagini: textul din imagini trebuie să respecte standardele</li>
                    <li>• Placeholders: preferabil să respecte AA</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools și Testare */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">🛠️ Tools-uri și Metode de Testare</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🌐 Online Tools</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>• WebAIM Contrast Checker</li>
                <li>• Colour Contrast Analyser</li>
                <li>• Stark (Figma/Sketch plugin)</li>
                <li>• Coolors.co contrast checker</li>
                <li>• Adobe Color accessibility tools</li>
              </ul>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🔧 Developer Tools</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>• Chrome DevTools Lighthouse</li>
                <li>• Firefox Accessibility Inspector</li>
                <li>• axe DevTools extension</li>
                <li>• WAVE evaluation tool</li>
                <li>• Pa11y command line tool</li>
              </ul>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">📱 Testare Manuală</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>• Testați în lumină puternică</li>
                <li>• Reduceți luminozitatea ecranului</li>
                <li>• Folosiți filtrul de lumină albastră</li>
                <li>• Testați cu ochelari de soare</li>
                <li>• Simulați probleme de vedere</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Sfaturi pentru testare</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-2">Metoda "Squint Test"</h4>
                <p className="text-white/80 text-sm">
                  Închiști parțial ochii când te uiți la design. Elementele importante trebuie să rămână vizibile.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Testul "5 Second Rule"</h4>
                <p className="text-white/80 text-sm">
                  Utilizatorii trebuie să poată identifica și citi informațiile principale în 5 secunde.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Simularea Daltonismului</h4>
                <p className="text-white/80 text-sm">
                  Folosiți simulatoare online sau filtere pentru a testa cum văd persoanele cu daltonism.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Testarea pe Dispozitive</h4>
                <p className="text-white/80 text-sm">
                  Ecranele diferite redau culorile diferit. Testați pe multiple dispozitive și setări.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigație */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/teorie/accesibilitate')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Următoarea Lecție:  Accesibilitate Cromatică
          </button>
        </div>
      </div>
    </div>
  );
}