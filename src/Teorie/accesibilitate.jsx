import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AccessibilityPresentation() {
  const [showHelp, setShowHelp] = useState(false);
  const [colorBlindnessFilter, setColorBlindnessFilter] = useState('normal');

  const navigate = useNavigate();

  const colorBlindnessTypes = [
    {
      type: 'Protanopia',
      description: 'Lipsa receptorilor pentru roșu',
      prevalence: '1% bărbați',
      characteristics: 'Dificultate în perceperea roșului',
      impact: 'Roșu apare ca galben-maro sau gri',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Roșu → Galben închis'
    },
    {
      type: 'Deuteranopia',
      description: 'Lipsa receptorilor pentru verde',
      prevalence: '1% bărbați',
      characteristics: 'Dificultate în perceperea verzii',
      impact: 'Verde apare ca galben sau maro',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Verde → Galben/Maro'
    },
    {
      type: 'Tritanopia',
      description: 'Lipsa receptorilor pentru albastru',
      prevalence: '0.01% populație',
      characteristics: 'Dificultate în perceperea albastrului',
      impact: 'Albastru apare ca verde sau gri',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      simulation: 'Albastru → Verde/Gri'
    },
    {
      type: 'Low Vision',
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
      stats: '15% din populație - 1.3 miliarde persoane',
      description: 'Persoanele cu dizabilități au o putere de cumpărare anuală de $8 trilioane',
      actionable: 'Creează produse pentru această piață neexploatată'
    },
    {
      benefit: 'SEO Îmbunătățit',
      stats: '30% creștere în traffic organic',
      description: 'Site-urile accesibile au structură mai bună și UX superior',
      actionable: 'Google prioritizează site-urile cu experiență bună'
    },
    {
      benefit: 'Risc Legal Redus',
      stats: '$75,000 cost mediu proces ADA',
      description: 'Procese juridice în creștere cu 20% anual în SUA',
      actionable: 'Investiția în accesibilitate e insurance împotriva proceselor'
    },
    {
      benefit: 'Brand Reputation',
      stats: '73% consumatori preferă branduri incluzive',
      description: 'Accesibilitatea demonstrează responsabilitate socială',
      actionable: 'Folosește accesibilitatea ca differentiator competitiv'
    }
  ];

  const goodExamples = [
    {
      title: 'Sistem Semafoare Accesibil',
      description: 'Combinație culoare și formă pentru maxima claritate',
      colors: ['#2ECC40', '#FF851B', '#FF4136'],
      shapes: ['●', '▲', '■'],
      accessibility: 'Forme distincte pentru fiecare stare',
      improvement: 'Pozițiile standard plus culori distincte'
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
      title: 'Interfață Erori și Succese',
      description: 'Icoane clare plus culori plus text descriptiv',
      colors: ['#28a745', '#dc3545', '#ffc107'],
      icons: ['✓', '✗', '⚠'],
      accessibility: 'Triple redundancy: culoare, icon, text',
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
   
      <div className="w-full px-4">
        <div className="pt-20 pb-16 px-8">
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigate('/teorie')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                Înapoi la Teorie
              </button>
             
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
               Accesibilitate Cromatică 
            </h1>
            <p className="text-2xl text-white leading-relaxed w-full mx-auto">
              Designul incluziv: cum să creezi palete accesibile pentru persoanele cu 
              deficiențe de vedere și să construiești experiențe pentru toți utilizatorii.
            </p>
          </div>
        </div>

        <div className="w-full mx-auto px-8 pb-20">
       
          <section className="mb-20">
            <h2 className='text-3xl font-bold text-white mb-6'>De ce este importantă accesibilitatea?</h2>
            <p className='text-white my-4 text-lg leading-relaxed'>
              Accesibilitatea cromatică nu este doar o "caracteristică bonus" - este o necesitate pentru milioane de oameni. La nivel global, 300 de milioane de persoane au deficiențe de vedere, iar 8% din bărbați au daltonism. Aceasta înseamnă că unul din 12 bărbați nu poate percepe culorile la fel ca tine.
            </p>
            <p className='text-white mb-4 text-lg leading-relaxed'>
              Când creăm un design, noi creăm pentru toți acești oameni, nu doar pentru cei cu vedere perfectă. Gândește-te așa: dacă ai avea un magazin fizic, ai construi scări fără rampe pentru persoanele cu dizabilități? La fel este și cu designul digital - trebuie să fie accesibil tuturor. Un design accesibil nu este mai urât sau mai limitat; de obicei este mai clar, mai ușor de folosit și mai profesional.
            </p>
            <p className='text-white mb-6 text-lg leading-relaxed'>
              În realitate, când designezi pentru accesibilitate, îmbunătățești experiența pentru toată lumea. Textul cu contrast bun este mai ușor de citit pentru toți, nu doar pentru cei cu probleme de vedere. Culorile bine alese ajută la concentrare și reduc oboseala ochilor. Interfețele clare reduc timpul de învățare și cresc satisfacția utilizatorilor.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Simulator de Contrast</h3>
              <p className='text-white my-4 text-lg leading-relaxed'>
                Contrastul este diferența de luminozitate dintre text și fundal. Este ca diferența dintre a șopti și a vorbi tare - unii oameni aud bine șoaptele, dar alții au nevoie de o voce mai tare pentru a înțelege mesajul.
              </p>
              <p className='text-white my-4 text-lg leading-relaxed'>
                Când testezi contrastul, nu te uita doar la cum arată pe ecranul tău perfect calibrat într-o cameră întunecată. Gândește-te la oameni care citesc pe telefon în soare, la cei cu ecrane mai vechi, sau la cei care au văzul obosit după o zi lungă de muncă. În aceste condiții, un contrast slab devine practic imposibil de citit.
              </p>
              <p className='text-white my-4 text-lg leading-relaxed'>
                De exemplu, textul negru pe fundal alb are un contrast de 21:1, ceea ce îl face perfect pentru citire în orice condiții. Textul gri deschis pe fundal alb are doar 2.8:1, iar multe persoane nu-l pot citi confortabil. Standardele internaționale spun că ai nevoie de cel puțin 4.5:1 pentru text normal și 3:1 pentru text mare sau bold.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Test de Contrast</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-black text-lg">Text negru pe fundal alb</p>
                      <p className="text-gray-600 text-sm">Contrast: 21:1 - Excelent pentru citire</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg">
                      <p className="text-gray-600 text-lg">Text gri pe fundal gri deschis</p>
                      <p className="text-gray-500 text-sm">Contrast: 2.8:1 - Insuficient, dificil de citit</p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-lg">
                      <p className="text-white text-lg">Text alb pe fundal albastru</p>
                      <p className="text-blue-100 text-sm">Contrast: 8.6:1 - Foarte bun pentru citire</p>
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
                    <p className="text-white/80 text-sm mb-2">Vedere normală</p>
                    
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-600 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-yellow-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded border-2 border-white/30"></div>
                      <div className="w-8 h-8 bg-yellow-400 rounded border-2 border-white/30"></div>
                    </div>
                    <p className="text-white/80 text-sm">Cum vede cineva cu protanopia</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Checklist Rapid pentru Designeri</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">Contrast Minim Necesar</p>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>Text normal (sub 18px): minim 4.5:1</li>
                      <li>Text mare (peste 18px): minim 3:1</li>
                      <li>Elemente UI interactive: minim 3:1</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">Principii pentru Culori</p>
                    <ul className="space-y-1 text-white/70 text-sm">
                      <li>Nu transmite informații doar prin culoare</li>
                      <li>Evită combinațiile doar roșu-verde</li>
                      <li>Testează cu simulatoare de daltonism</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <p className='text-white text-lg leading-relaxed'>
              Multe companii descoperă că investiția în accesibilitate le aduce beneficii neașteptate. Nu doar că evită procesele judiciare costisitoare, dar văd și creșteri în numărul de utilizatori, îmbunătățiri în SEO și o imagine de brand mai pozitivă. Accesibilitatea nu este o restricție creativă - este o provocare care duce la soluții mai elegante și mai universale.
            </p>
          </section>

          {/* Tipuri de Deficiențe Vizuale */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Tipuri de Deficiențe Vizuale</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Pentru a crea design-uri cu adevărat incluzive, trebuie să înțelegem diversitatea deficiențelor de vedere și cum afectează ele percepția culorilor și contrastului.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed mb-8'>
              Daltonismul nu înseamnă că oamenii văd lumea în alb și negru. De fapt, majoritatea persoanelor cu daltonism văd culori, dar au dificultăți în a distinge anumite combinații. Cel mai frecvent tip este daltonismul roșu-verde, care afectează capacitatea de a diferenția aceste culori, mai ales când sunt similare în intensitate. Imaginează-ți că încerci să citești un grafic unde linia roșie și cea verde arată aproape identic - exact așa se simt aceste persoane zilnic când întâlnesc design-uri inaccesibile.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {colorBlindnessTypes.map((type, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{type.type}</h3>
                    <p className="text-white/70 text-sm">{type.description}</p>
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
                  
                  {type.type === 'Protanopia' && (
                    <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                      <p className="text-white/80 text-sm">
                        Aceasta este cea mai frecventă formă de daltonism. Persoanele cu protanopia confundă roșul cu galbenul sau maro, ceea ce face extrem de dificilă navigarea pe site-uri care folosesc doar aceste culori pentru a transmite informații importante.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold text-orange-300 mb-4">Observații Importante despre Daltonism</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Un aspect crucial de înțeles este că daltonismul afectează în principal bărbații din cauza modului în care genele pentru percepția culorilor sunt localizate pe cromozomul X. De aceea prevalența la bărbați este mult mai mare decât la femei. În același timp, multe femei sunt "purtătoare" și pot avea o percepție a culorilor ușor diferită.
              </p>
              <p className="text-white/80 leading-relaxed">
                Este important să realizezi că aceste statistici înseamnă că într-o echipă de 20 de persoane, probabil că 1-2 au vreo formă de deficiență vizuală. În audiența ta online, acest procent poate fi și mai mare, pentru că internetul oferă accesibilitate mai mare pentru persoanele cu dizabilități.
              </p>
            </div>
          </section>

         
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Aspecte Legale și Standarde</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Accesibilitatea nu este doar o chestiune de bunăvoință - în multe jurisdicții este o obligație legală cu consecințe financiare semnificative pentru nerespectare.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed mb-8'>
              În ultimii ani, numărul proceselor judiciare legate de accesibilitatea digitală a crescut exponențial. Doar în SUA, în 2023 au fost depuse peste 4,000 de procese ADA legate de accesibilitatea site-urilor web. Costurile medii pentru o companie care pierde un astfel de proces depășesc $75,000, dar adevărata pagubă vine din reputația afectată și clienții pierduți. Multe companii descoperă că este mult mai ieftin să investească în accesibilitate de la început decât să remedieze problemele după un proces juridic.
            </p>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {legalStandards.map((standard, index) => (
                <div key={index} className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{standard.standard}</h3>
                    <p className="text-white/70">{standard.region}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {standard.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                        <p className="text-white/80 text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm font-semibold mb-1">Status actual:</p>
                    <p className="text-white/70 text-sm">{standard.compliance}</p>
                  </div>

                  {standard.standard === 'WCAG 2.1 AA' && (
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                      <p className="text-white/80 text-sm">
                        WCAG este standardul de aur pentru accesibilitate. Nivelul AA este cel mai adoptat la nivel global și reprezintă un echilibru între accesibilitate și fezabilitate tehnică.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 mb-8">
              <h3 className="text-xl font-bold text-red-300 mb-4">Riscuri și Costuri Reale</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
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
              <p className="text-white/80 leading-relaxed">
                Aceste cifre nu includ costurile indirecte: timpul echipei de a reface designul, pierderile de venituri în timpul redesign-ului, și poate cel mai important - încrederea pierdută a clienților. Multe companii raportează că investiția inițială în accesibilitate este de 10-20 de ori mai mică decât costul remedierii după un incident legal.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed'>
              În România, deși legislația este mai recentă, tendința este clară către armonizarea cu standardele europene. Ordonanța 25/2014 privind accesibilitatea site-urilor publice este doar începutul - experiențele din alte țări UE sugerează că legislația se va extinde și către sectorul privat în următorii ani. Companiile care anticipează aceste schimbări și implementează accesibilitatea proactiv vor avea un avantaj competitiv semnificativ.
            </p>
          </section>

        
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Implementare Tehnică</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Accesibilitatea nu este doar o chestiune de design - ea trebuie implementată corect în cod pentru a funcționa în practică cu tehnologiile asistive.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed mb-8'>
              Mulți designeri excelenti creează mockup-uri frumoase și accesibile, dar aceste eforturi sunt zadarnice dacă implementarea tehnică nu respectă standardele. De exemplu, un buton poate să arate perfect accesibil vizual, dar dacă nu are atributele ARIA corecte sau nu poate fi navigat cu tastatura, devine inutil pentru persoanele care folosesc tehnologii asistive. Implementarea corectă necesită colaborare strânsă între designeri și developeri.
            </p>

            <div className="space-y-8">
              {designPatterns.map((pattern, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pattern.pattern}</h3>
                    <p className="text-white/70 leading-relaxed">{pattern.description}</p>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Tehnici de implementare:</h4>
                      <div className="space-y-3">
                        {pattern.techniques.map((technique, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                            <p className="text-white/80 text-sm">{technique}</p>
                          </div>
                        ))}
                      </div>
                      
                      {pattern.pattern === 'Focus Management' && (
                        <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                          <p className="text-white/80 text-sm">
                            Focus management este crucial pentru utilizatorii care navigheaza doar cu tastatura. Fără indicatori clari de focus, aceștia se pierd complet în interfață.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Exemplu de cod:</h4>
                      <div className="bg-black/50 rounded-lg p-4">
                        <pre className="text-green-300 text-xs overflow-x-auto">
                          <code>{pattern.code}</code>
                        </pre>
                      </div>
                      
                      {pattern.pattern === 'Form Accessibility' && (
                        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                          <p className="text-white/80 text-sm">
                            Formularele inaccesibile sunt una dintre cele mai frustrante experiențe pentru utilizatorii cu dizabilități. Investește timp în a le face corect.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Instrumente pentru Testare Automată</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Testarea manuală este esențială, dar instrumentele automate pot detecta multe probleme de accesibilitate rapid și eficient. Axe-core, WAVE și Lighthouse sunt doar câteva dintre toolurile care pot fi integrate în workflow-ul de dezvoltare pentru a prinde problemele înainte ca acestea să ajungă la utilizatori.
              </p>
              <p className="text-white/80 leading-relaxed">
                Totuși, amintește-ti că instrumentele automate detectează doar 30-40% din problemele de accesibilitate. Testarea cu utilizatori reali, mai ales cei care folosesc tehnologii asistive, rămâne cea mai valoroasă metodă de validare.
              </p>
            </div>
          </section>

          {/* Workflow & ROI */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Workflow și Impact Business</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Accesibilitatea nu este doar "responsabilitatea socială" - este o decizie business inteligentă cu ROI măsurabil și beneficii concrete.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed mb-8'>
              Mulți manageri văd accesibilitatea ca pe un cost adițional, dar datele din industrie arată o realitate diferită. Companiile care implementează accesibilitate proactiv raportează creșteri medii de 15-25% în numărul de utilizatori, îmbunătățiri de 30% în metrici SEO și reduceri semnificative în costurile de suport tehnic. Motivul este simplu: designul accesibil este designul mai bun pentru toată lumea.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Beneficii Business Concrete</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {businessBenefits.map((benefit, index) => (
                  <div key={index} className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">{benefit.benefit}</h4>
                    
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-green-400 mb-2">{benefit.stats}</div>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">{benefit.description}</p>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-green-300 text-sm font-semibold mb-1">Cum să acționezi:</p>
                      <p className="text-white/70 text-sm">{benefit.actionable}</p>
                    </div>

                    {benefit.benefit === 'Acces la Piață Extins' && (
                      <div className="mt-4 p-3 bg-green-600/10 rounded-lg border border-green-600/30">
                        <p className="text-white/80 text-sm">
                          Puterea de cumpărare de $8 trilioane a persoanelor cu dizabilități este mai mare decât PIB-ul Germaniei. Aceasta este o piață enormă și loyal care este adesea ignorată de competiție.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Studii de Caz din Industrie</h3>
              <p className='text-white text-lg leading-relaxed mb-6'>
                Aceste exemple nu sunt ficțiune - sunt rezultate reale raportate de companii care au investit serios în accesibilitate. Observă că în fiecare caz, beneficiile au depășit cu mult investiția inițială.
              </p>
              
              <div className="space-y-6">
                {realWorldCases.map((caseStudy, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4">{caseStudy.company}</h4>
                    
                    <div className="grid lg:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h5 className="text-red-300 font-semibold mb-2">Provocarea inițială:</h5>
                        <p className="text-white/80 text-sm leading-relaxed">{caseStudy.problem}</p>
                      </div>
                      <div>
                        <h5 className="text-blue-300 font-semibold mb-2">Soluția adoptată:</h5>
                        <p className="text-white/80 text-sm leading-relaxed">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <h5 className="text-green-300 font-semibold mb-2">Rezultate măsurate:</h5>
                        <p className="text-white/80 text-sm leading-relaxed">{caseStudy.impact}</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="text-yellow-300 font-semibold mb-3">Lecții cheie pentru alte companii:</h5>
                      <div className="space-y-2">
                        {caseStudy.learnings.map((learning, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-yellow-400 mt-1 flex-shrink-0">→</span>
                            <p className="text-white/70 text-sm">{learning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {caseStudy.company === 'Target Corporation' && (
                      <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <p className="text-white/80 text-sm">
                          Cazul Target din 2006 a fost un moment de cotitură pentru industrie. Procesul a durat 6 ani și a costat milioane, dar a sensibilizat întreaga industrie asupra importanței accesibilității.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

      
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Exemple Practice și Comparații</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Nimic nu învață mai bine decât exemplele concrete. Aceste comparații îți vor arăta exact ce funcționează și ce trebuie evitat în designul accesibil.
              </p>
            </div>

            <p className='text-white text-lg leading-relaxed mb-8'>
              În practica de zi cu zi, diferența dintre un design accesibil și unul problematic poate părea subtilă, dar impactul asupra utilizatorilor este dramatic. Un grafic care folosește doar culoarea roșie și verde pentru a diferenția datele poate fi complet inutil pentru 8% din popolazione masculină. În schimb, același grafic cu culori distincte PLUS simboluri sau texturi devine accesibil pentru toți, fără să-și piardă din claritatea vizuală.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-green-400 mb-6">Exemple de Design Accesibil Reușit</h3>
              <p className='text-white leading-relaxed mb-6'>
                Aceste exemple demonstrează că accesibilitatea nu limitează creativitatea - o orientează către soluții mai elegante și universale.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {goodExamples.map((example, index) => (
                  <div key={index} className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">{example.title}</h4>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">{example.description}</p>
                    
                    <div className="flex gap-2 mb-4">
                      {example.colors.map((color, i) => (
                        <div key={i} className="relative">
                          <div className="w-10 h-10 rounded border-2 border-white/30" style={{ backgroundColor: color }}></div>
                          {example.shapes && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
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
                      <p className="text-green-300 text-sm font-semibold mb-1">De ce funcționează:</p>
                      <p className="text-white/70 text-sm leading-relaxed">{example.accessibility}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-green-300 text-sm font-semibold mb-1">Optimizări suplimentare:</p>
                      <p className="text-white/70 text-sm leading-relaxed">{example.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-6">Greșeli Frecvente de Evitat</h3>
              <p className='text-white leading-relaxed mb-6'>
                Aceste exemple sunt extrem de comune în designul digital de astăzi. Recunoașterea lor te va ajuta să eviți capcanele care fac designurile inaccesibile.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {badExamples.map((example, index) => (
                  <div key={index} className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">{example.title}</h4>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">{example.problem}</p>
                    
                    <div className="flex gap-2 mb-4">
                      {example.colors.map((color, i) => (
                        <div key={i} className="w-10 h-10 rounded border-2 border-white/30" style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3 mb-3">
                      <p className="text-red-300 text-sm font-semibold mb-1">De ce este problematic:</p>
                      <p className="text-white/70 text-sm leading-relaxed">{example.issue}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-yellow-300 text-sm font-semibold mb-1">Cum să remediezi:</p>
                      <p className="text-white/70 text-sm leading-relaxed">{example.solution}</p>
                    </div>

                    {example.title === 'Doar Roșu-Verde' && (
                      <div className="mt-4 p-3 bg-red-600/10 rounded-lg border border-red-600/30">
                        <p className="text-white/80 text-sm">
                          Aceasta este cea mai frecventă greșeală în designul digital. Combinația roșu-verde este problematică pentru aproape 10% din utilizatorii masculini.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

    
          <section className="text-center">
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6">Designul pentru Toți - Nu Doar pentru Câțiva</h3>
              <p className="text-white/80 leading-relaxed mb-6 w-full mx-auto text-lg">
                Accesibilitatea nu este o restricție care limitează creativitatea - este un cataliza care împinge designerii către soluții mai inteligente, mai universale și mai eficiente. Când creezi pentru persoanele cu cele mai mari provocări de accesibilitate, îmbunătățești experiența pentru absolut toți utilizatorii.
              </p>
              
              <p className="text-white/80 leading-relaxed mb-8 w-full mx-auto">
                Investiția în accesibilitate nu este doar despre evitarea proceselor judiciare sau respectarea regulamentelor - este despre extinderea pieței, îmbunătățirea brandului și crearea de produse care cu adevărat servesc diversitatea umană. În era digitală, accesibilitatea nu mai este opțională; este o competența esențială pentru orice designer sau dezvoltator serios.
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Testare Constantă</h4>
                  <p className="text-white/70 text-sm">Verifică accesibilitatea în fiecare iterație</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Gândire Incluzivă</h4>
                  <p className="text-white/70 text-sm">Consideră diversitatea utilizatorilor de la început</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Standarde Respectate</h4>
                  <p className="text-white/70 text-sm">Folosește WCAG ca ghid de bază</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Îmbunătățire Continuă</h4>
                  <p className="text-white/70 text-sm">Accesibilitatea este un proces, nu o destinație</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/teorie/psihologie')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  Explorează Psihologia Culorilor
                </button>
                <button
                  onClick={() => navigate('/quiz')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Testează-ți Cunoștințele - Quiz Accesibilitate
                </button>
              </div>
            </div>
          </section>
        </div>

       
       
      </div>
    </div>
  );
}