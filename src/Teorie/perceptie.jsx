import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const VisualPerceptionPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'anatomy', 'process', 'illusions', 'applications'];
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

  const eyeAnatomy = [
    {
      part: 'Cornea',
      function: 'Prima lentilă care refractă lumina',
      colorRole: 'Filtrează parțial lumina UV și ajustează focalizarea inițială',
      details: 'Transparentă și fără vase de sânge, cornea asigură 65-75% din puterea de refracție a ochiului.'
    },
    {
      part: 'Iris',
      function: 'Controlează cantitatea de lumină',
      colorRole: 'Pupila se dilată/contractă pentru a optimiza percepția culorilor',
      details: 'Conține mușchi care ajustează diametrul pupilei de la 2mm (lumină puternică) la 8mm (întuneric).'
    },
    {
      part: 'Cristalinul',
      function: 'Focalizează lumina pe retină',
      colorRole: 'Ajustează focusul pentru claritatea culorilor la diferite distanțe',
      details: 'Se modifică cu vârsta, devenind mai galben și reducând percepția albastru-violet.'
    },
    {
      part: 'Retina',
      function: 'Convertește lumina în semnale electrice',
      colorRole: 'Conține celule care detectează și procesează culorile',
      details: 'Zona cea mai complexă, cu peste 120 milioane de bastonașe și 6 milioane de conuri.'
    },
    {
      part: 'Conuri (S, M, L)',
      function: 'Detectează culorile specifice',
      colorRole: 'S=albastru (420nm), M=verde (530nm), L=roșu (560nm)',
      details: 'Distribuția: 64% L (roșu), 32% M (verde), 2% S (albastru). Concentrați în fovea.'
    },
    {
      part: 'Bastonașe',
      function: 'Detectează lumina slabă și mișcarea',
      colorRole: 'Nu detectează culori, dar influențează percepția în condiții de lumină scăzută',
      details: 'De 500 ori mai sensibili la lumină decât conurile, dar nu pot distinge culorile.'
    }
  ];

  const perceptionProcess = [
    {
      stage: '1. Captarea Luminii',
      time: '0ms',
      description: 'Fotonii ajung la retină',
      details: 'Lumina cu diferite lungimi de undă (380-700nm) pătrunde în ochi și ajunge la fotoreceptori.',
      mechanism: 'Cornea și cristalinul focalizează raza de lumină pe o zonă de doar 0.3mm în fovea.',
      visual: (
        <div className="w-full h-20 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">380nm ←→ 700nm</span>
        </div>
      )
    },
    {
      stage: '2. Activarea Fotoreceptorilor',
      time: '1-10ms',
      description: 'Conurile și bastonașele răspund la stimuli',
      details: 'Fiecare tip de con răspunde diferit la lungimile de undă, creând patternul de bază al culorii.',
      mechanism: 'Rodopsina din bastonașe și opsina din conuri suferă modificări chimice când absorb fotoni.',
      visual: (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-500 h-16 rounded flex items-center justify-center text-white font-bold">S - 420nm</div>
          <div className="bg-green-500 h-16 rounded flex items-center justify-center text-white font-bold">M - 530nm</div>
          <div className="bg-red-500 h-16 rounded flex items-center justify-center text-white font-bold">L - 560nm</div>
        </div>
      )
    },
    {
      stage: '3. Procesarea în Retină',
      time: '10-50ms',
      description: 'Celulele ganglionare procesează informația',
      details: 'Semnalele sunt organizate în canale opponent: roșu-verde, albastru-galben, luminos-întunecat.',
      mechanism: 'Celulele bipolare și ganglionare creează contraste și detectează marginile și mișcarea.',
      visual: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-red-500 to-green-500 h-12 rounded flex items-center justify-center text-white font-bold">Roșu ↔ Verde</div>
          <div className="bg-gradient-to-r from-blue-500 to-yellow-500 h-12 rounded flex items-center justify-center text-white font-bold">Albastru ↔ Galben</div>
        </div>
      )
    },
    {
      stage: '4. Transmiterea la Creier',
      time: '50-100ms',
      description: 'Nervul optic transmite semnalele',
      details: 'Un milion de fibre ale nervului optic duc informația la cortexul vizual prin talamul lateral.',
      mechanism: 'Semnalele sunt comprimate și organizate înainte de a ajunge la cortexul vizual primar (V1).',
      visual: (
        <div className="bg-purple-600 h-16 rounded flex items-center justify-center text-white font-bold">
          Ochi → Talamus → Cortex V1
        </div>
      )
    },
    {
      stage: '5. Interpretarea Finală',
      time: '100-200ms',
      description: 'Cortexul vizual interpretează culoarea',
      details: 'Zonele V4 și IT integrează informația cu memoria și contextul pentru percepția finală a culorii.',
      mechanism: 'Creierul compară cu experiențele anterioare și ajustează percepția în funcție de context.',
      visual: (
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-16 rounded flex items-center justify-center text-white font-bold">
          🧠 Percepție Conștientă
        </div>
      )
    }
  ];

  const opticalIllusions = [
    {
      name: 'Contrastul Simultan',
      description: 'Aceeași culoare pare diferită pe fundal-uri diferite',
      mechanism: 'Celulele ganglionare accentuează diferențele între zonele adiacente pentru a detecta mai bine marginile.',
      demo: (
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-red-600 p-8 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-400 rounded"></div>
          </div>
          <div className="bg-blue-600 p-8 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-400 rounded"></div>
          </div>
        </div>
      ),
      explanation: 'Pătratele gri sunt identice, dar par diferite din cauza contrastului cu fundalul.'
    },
    {
      name: 'Adaptarea Cromatică',
      description: 'Ochiul se adaptează la dominanta de culoare',
      mechanism: 'După expunerea prelungită la o culoare, sensibilitatea la acea culoare scade temporar.',
      demo: (
        <div className="text-center">
          <div className="bg-green-500 w-32 h-32 mx-auto rounded-lg mb-4 flex items-center justify-center">
            <span className="text-white font-bold">Privește 30s</span>
          </div>
          <div className="bg-white w-32 h-32 mx-auto rounded-lg flex items-center justify-center border-2 border-gray-300">
            <span className="text-gray-600">Apoi aici</span>
          </div>
        </div>
      ),
      explanation: 'După ce privești verdele, vei vedea o imagine afterimage roșiatică pe fundalul alb.'
    },
    {
      name: 'Iluzia Bezold',
      description: 'Liniile subțiri schimbă percepția culorii de bază',
      mechanism: 'Creierul face o medie a culorilor din zonele mici, modificând percepția generală.',
      demo: (
        <div className="grid grid-cols-2 gap-8">
          <div className="relative">
            <div className="bg-red-500 w-32 h-32 rounded"></div>
            <div className="absolute inset-0 flex flex-col">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex-1 border-b border-white opacity-50"></div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-red-500 w-32 h-32 rounded"></div>
            <div className="absolute inset-0 flex flex-col">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex-1 border-b border-black opacity-30"></div>
              ))}
            </div>
          </div>
        </div>
      ),
      explanation: 'Același roșu pare diferit cu linii albe vs. negre datorită efectului de medie optică.'
    },
    {
      name: 'Constanța Culorii',
      description: 'Percepem aceeași culoare în condiții diferite de lumină',
      mechanism: 'Creierul compensează automat pentru temperatura de culoare a luminii ambientale.',
      demo: (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-yellow-200 p-4 rounded">
            <div className="bg-red-500 w-16 h-16 rounded"></div>
            <p className="text-center mt-2 text-sm">Lumină caldă</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <div className="bg-red-500 w-16 h-16 rounded"></div>
            <p className="text-center mt-2 text-sm">Lumină neutră</p>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <div className="bg-red-500 w-16 h-16 rounded"></div>
            <p className="text-center mt-2 text-sm">Lumină rece</p>
          </div>
        </div>
      ),
      explanation: 'Roșul pare constant deși lumina ambientală modifică lungimile de undă reflectate.'
    }
  ];

  const practicalApplications = [
    {
      field: 'Design UI/UX',
      icon: '💻',
      principles: [
        'Folosește contrastul simultan pentru a face butoanele să iasă în evidență',
        'Evită combinații care creează vibrații optice (roșu pur pe verde pur)',
        'Testează designul în diferite condiții de lumină',
        'Consideră adaptarea cromatică pentru interfețele folosite mult timp'
      ],
      example: 'Instagram folosește fundaluri neutre pentru a face fotografiile să pară mai vibrante prin contrast.',
      science: 'Contrastul simultan face ca fundalul gri să intensifice culorile din poze prin mecanismul opponent-color.'
    },
    {
      field: 'Artă și Ilustrație',
      icon: '🎨',
      principles: [
        'Exploatează contrastul simultan pentru efecte dramatice',
        'Folosește temperatura culorii pentru a crea atmosferă',
        'Aplică principiile complementarelor pentru vibrație optică controlată',
        'Joacă-te cu constanța culorii pentru realismul scenelor'
      ],
      example: 'Impressioniștii foloseau puncte de culoare pură care se "amestecau" în ochiul privitorului.',
      science: 'Tehnica pointillismului exploatează fuziunea optică - creierul combină punctele colorate în nuanțe complexe.'
    },
    {
      field: 'Iluminat și Arhitectură',
      icon: '🏗️',
      principles: [
        'Calculează temperatura de culoare pentru confortul vizual',
        'Folosește iluminatul pentru a modifica percepția spațiului',
        'Evită flickerul care obosește sistemul vizual',
        'Adaptează iluminatul la ritmurile circadiene'
      ],
      example: 'Spitalele folosesc lumina albastră diminețea și caldă seara pentru a regula somnul pacienților.',
      science: 'Celulele ganglionare ipRGC detectează lumina albastră și reglează melatonina pentru ciclul somn-veghe.'
    },
    {
      field: 'Marketing și Publicitate',
      icon: '📢',
      principles: [
        'Folosește culorile calde pentru a atrage atenția rapid',
        'Aplică constanța culorii pentru consistența brandului',
        'Exploatează asocierile culturale ale culorilor',
        'Testează vizibilitatea în diferite medii'
      ],
      example: 'Coca-Cola folosește roșu pentru că activează centrii de recompensă și stimulează apetitul.',
      science: 'Roșul crește frecvența cardiacă și activează sistemul nervos simpatic, creând senzația de urgență.'
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '👁️' },
    { id: 'anatomy', title: 'Anatomia Ochiului', icon: '🔬' },
    { id: 'process', title: 'Procesul de Percepție', icon: '⚡' },
    { id: 'illusions', title: 'Iluzii Optice', icon: '🌀' },
    { id: 'applications', title: 'Aplicații Practice', icon: '🛠️' }
  ];

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
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            👁️ Percepția Vizuală
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Cum ochiul uman percepe culorile și iluziile optice create de combinațiile cromatice.
            O explorare științifică a sistemului vizual uman.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">👁️ Minunea Vederii în Culori</h2>
            
            <div className="mb-8">
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Vederea în culori este una dintre cele mai complexe și fascinante funcții ale sistemului nervos uman. 
                În fiecare secundă, ochiul tău procesează milioane de fotoni, transformându-i în informații precise 
                despre lumea înconjurătoare. Acest proces, care pare atât de natural și eficient, implică de fapt o 
                cascadă incredibil de sofisticată de reacții biochimice și procesări neuronale.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Culorile nu există în realitate - ele sunt construcții ale creierului nostru. Ceea ce numim "roșu" 
                este de fapt interpretarea creierului pentru anumite lungimi de undă ale luminii (aproximativ 620-750nm). 
                Ochiul uman poate distinge peste 10 milioane de nuanțe diferite, o performanță care depășește cu mult 
                capacitățile oricărui instrument creat de om. Această sensibilitate extraordinară ne permite să navigăm 
                prin lume, să identificăm hrana, să recunoaștem emoțiile și să apreciem frumusețea.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed">
                Dar sistemul vizual nu este doar un receptor pasiv - el interpretează, ajustează și uneori ne "înșeală" 
                prin iluziile optice. Înțelegerea acestor mecanisme nu este doar o curiozitate științifică, ci o 
                cunoaștere practică esențială pentru designeri, artiști, marketeri și oricine dorește să comunice 
                eficient prin mijloace vizuale. Această explorare îți va dezvălui secretele percepției vizuale și 
                îți va oferi instrumentele pentru a le aplica în mod strategic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Performanțe Extraordinare</h3>
                <ul className="space-y-3 text-white/80 text-xl">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1 text-xl">•</span>
                    <span>Detectează diferențe de 1nm în lungimea de undă</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 text-xl">•</span>
                    <span>Procesează informația în doar 13 milisecunde</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1 text-xl">•</span>
                    <span>Se adaptează la 10 miliarde de niveluri de luminozitate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">•</span>
                    <span>Menține constanța culorii în condiții variabile</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Complexitate Biologică</h3>
                <ul className="space-y-3 text-white/80 text-xl">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 text-xl">•</span>
                    <span>130 milioane de fotoreceptori în fiecare ochi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1 text-xl">•</span>
                    <span>1 milion de fibre ale nervului optic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-xl">•</span>
                    <span>30% din cortexul cerebral dedicat vederii</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lime-400 mt-1 text-xl">•</span>
                    <span>Procesare paralelă în 12+ zone cerebrale</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-3">🔬 Descoperiri Științifice</h3>
              <div className="grid md:grid-cols-3 gap-4 text-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">3 tipuri</div>
                  <p className="text-white/80 text-lg">de conuri pentru vederea în culori</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">100ms</div>
                  <p className="text-white/80 text-lg">pentru procesarea completă a culorii</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">10M+</div>
                  <p className="text-white/80 text-lg">culori distincte pe care le poate percepe</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="anatomy" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔬 Anatomia Ochiului și Percepția Culorilor</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Fiecare componentă a ochiului joacă un rol specific în transformarea luminii în percepția bogată a culorilor.
            </p>
          </div>
          <img src='https://cdn.contentspeed.ro/slir/w400/pfarma.websales.ro/cs-content/cs-photos/articles/original/2367__1558018249.jpg.webp' alt="ochi"
          className='mx-auto my-5'
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {eyeAnatomy.map((part, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">{part.part}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white/90 mb-2">🔧 Funcția Generală:</h4>
                    <p className="text-white/80 text-lg">{part.function}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white/90 mb-2">🌈 Rolul în Percepția Culorilor:</h4>
                    <p className="text-white/80 text-lg">{part.colorRole}</p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white/90 mb-2">📋 Detalii Științifice:</h4>
                    <p className="text-white/70 text-lg">{part.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">🔬 Conurile și Vederea Trichromatică</h3>
            <img src='https://media.istockphoto.com/id/1400512247/ro/vector/spectru-de-lumin%C4%83-vizibil%C4%83-infared-%C8%99i-ultraviolete-lungimea-de-und%C4%83-a-luminii-spectrul-de.jpg?s=612x612&w=0&k=20&c=ULQ479TzSDbGKTZyFdVp-IQpXCIiQvPQ4re2eS3mRbM='
            alt="" 
            className='mx-auto my-4'
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">S</div>
                <h4 className="text-xl font-semibold text-white mb-2">Conuri S (Short)</h4>
                <p className="text-white/80 text-lg mb-2">Sensibile la albastru-violet</p>
                <p className="text-white/70">Sensibilitate maximă:: 420nm | ~2% din conuri</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">M</div>
                <h4 className="text-xl font-semibold text-white mb-2">Conuri M (Medium)</h4>
                <p className="text-white/80 text-lg mb-2">Sensibile la verde</p>
                <p className="text-white/70">Sensibilitate maximă:: 530nm | ~32% din conuri</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">L</div>
                <h4 className="text-xl font-semibold text-white mb-2">Conuri L (Long)</h4>
                <p className="text-white/80 text-lg mb-2">Sensibile la roșu</p>
                <p className="text-white/70">Sensibilitate maximă:: 560nm | ~64% din conuri</p>
              </div>
            </div>
          </div>
        </section>

        

        <section id="process" className="mb-20">
           
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">⚡ Procesul de Percepție a Culorilor</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              De la fotonul care pătrunde în ochi până la percepția conștientă a culorii - 
              o călătorie de doar 200 de milisecunde prin sistemul nervos.
            </p>
          </div>
           <img src='https://www.colegiu.info/wp-content/uploads/2018/02/Ochiul-Globul-ocular-Retina-Structura-retinei.jpg' alt="conuri si bastonase" 
            className='mx-auto my-4'

            />

          <div className="space-y-8">
            {perceptionProcess.map((stage, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{stage.stage}</h3>
                        <p className="text-white/60 text-xl">Timp: {stage.time}</p>
                      </div>
                    </div>
                    
                    <p className="text-white/90 text-xl leading-relaxed mb-4">{stage.details}</p>
                    
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-white/70 text-lg">
                        <strong className="text-white">Mecanism:</strong> {stage.mechanism}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white/10 rounded-lg p-6">
                      <p className="text-white/60 text-lg mb-4">Demonstrație:</p>
                      {stage.visual}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="illusions" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🌀 Iluzii Optice și Mecanismele lor</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Iluziile optice nu sunt "defecte" ale vederii, ci consecințe ale optimizărilor evolutive 
              ale sistemului vizual pentru supraviețuire în lumea reală.
            </p>
          </div>

          <div className="space-y-12">
            {opticalIllusions.map((illusion, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-6">{illusion.name}</h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/90 text-xl leading-relaxed mb-6">{illusion.description}</p>
                    
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-6 mb-6">
                      <h4 className="text-xl font-semibold text-white mb-3">🔬 Mecanism Neuronal:</h4>
                      <p className="text-white/80 text-lg">{illusion.mechanism}</p>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white/90 mb-2">💡 Explicație:</h4>
                      <p className="text-white/70 text-lg">{illusion.explanation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 rounded-lg p-6 w-full">
                      <h4 className="text-xl font-semibold text-white mb-4 text-center">Demonstrație Interactivă</h4>
                      {illusion.demo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">🧠 De Ce Apar Iluziile Optice?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Avantaje Evolutive</h4>
                <ul className="text-white/80 text-lg space-y-2">
                  <li>• Detectarea rapidă a marginilor și mișcării (pentru supraviețuire)</li>
                  <li>• Compensarea automată pentru condițiile de lumină variabile</li>
                  <li>• Economisirea energiei prin procesarea eficientă</li>
                  <li>• Îmbunătățirea contrastului pentru recunoașterea obiectelor</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Limitări Moderne</h4>
                <ul className="text-white/80 text-lg space-y-2">
                  <li>• Sistemul vizual nu a evoluat pentru ecrane și lumină artificială</li>
                  <li>• Confuzia între stimuli artificiali și naturali</li>
                  <li>• Oboseala vizuală în medii digitale</li>
                  <li>• Interpretarea greșită a culorilor pe dispozitive</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="applications" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🛠️ Aplicații Practice în Design și Artă</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Înțelegerea percepției vizuale permite designerilor și artiștilor să creeze experiențe 
              vizuale mai puternice și mai eficiente.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {practicalApplications.map((app, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{app.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{app.field}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white/90 mb-3">📋 Principii de Aplicat:</h4>
                    <ul className="space-y-2">
                      {app.principles.map((principle, i) => (
                        <li key={i} className="text-white/80 text-lg flex items-start gap-3">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white/90 mb-2">💼 Exemplu Practic:</h4>
                    <p className="text-white/80 text-lg">{app.example}</p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white/90 mb-2">🔬 Baza Științifică:</h4>
                    <p className="text-white/70 text-lg">{app.science}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔬 Experimente Interactive</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Testează-ți propria percepție vizuală cu aceste demonstrații științifice.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Test de Acuitate Cromatică</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-8 rounded"
                    style={{ 
                      backgroundColor: `hsl(${120 + i * 2}, 70%, ${50 + i % 4 * 10}%)` 
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-white/70 text-lg">Poți distinge toate nuanțele de verde?</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Testul Stroop</h3>
              <div className="space-y-3 mb-4">
                <div className="text-red-500 text-2xl font-bold">ALBASTRU</div>
                <div className="text-blue-500 text-2xl font-bold">VERDE</div>
                <div className="text-green-500 text-2xl font-bold">ROȘU</div>
                <div className="text-yellow-500 text-2xl font-bold">VIOLET</div>
              </div>
              <p className="text-white/70 text-lg">Spune culoarea, nu cuvântul!</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">🌈 Afterimage</h3>
              <div className="relative">
                <div className="w-24 h-24 bg-red-500 mx-auto rounded-lg mb-4"></div>
                <div className="w-24 h-24 bg-white mx-auto rounded-lg border-2 border-gray-300"></div>
              </div>
              <p className="text-white/70 text-lg">Privește roșul 30s, apoi albul</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">👁️ Înțelege și Aplică!</h3>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto text-xl">
              Percepția vizuală este fundamentul oricărei comunicări vizuale eficiente. 
              Cu aceste cunoștințe științifice, poți crea experiențe vizuale care funcționează 
              în armonie cu sistemul nervos uman.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">🔬 Anatomie</h4>
                <p className="text-white/70 text-lg">Structura ochiului</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">⚡ Procesare</h4>
                <p className="text-white/70 text-lg">De la foton la percepție</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">🌀 Iluzii</h4>
                <p className="text-white/70 text-lg">Mecanisme și efecte</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">🛠️ Aplicații</h4>
                <p className="text-white/70 text-lg">Design și artă</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/teorie/temperatura')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg"
              >
                Următorul: 🌡️ Temperatura Culorilor
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg"
              >
                🧪 Quiz: Percepția Vizuală
              </button>
             
            </div>
          </div>
        </section>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">👁️ Ghid Percepția Vizuală</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Scopul Prezentării</h3>
                <p className="text-gray-600 text-lg">
                  Înțelege mecanismele științifice ale percepției vizuale pentru a crea 
                  designuri și experiențe vizuale mai eficiente și impactante.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🔬 Structura Științifică</h3>
                <ul className="space-y-2 text-gray-600 text-lg">
                  <li>• <strong>Anatomie</strong>: Structura ochiului și fotoreceptorii</li>
                  <li>• <strong>Procesare</strong>: De la fotoni la percepția conștientă</li>
                  <li>• <strong>Iluzii</strong>: Mecanismele neurologice și evolutive</li>
                  <li>• <strong>Aplicații</strong>: Design, artă și comunicare vizuală</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">⚡ Interactivitate</h3>
                <ul className="space-y-2 text-gray-600 text-lg">
                  <li>• Demonstrații vizuale pentru fiecare concept</li>
                  <li>• Experimente interactive de percepție</li>
                  <li>• Exemple practice din design și artă</li>
                  <li>• Teste de acuitate și iluzii optice</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 După Prezentare</h3>
                <p className="text-gray-600 text-lg">
                  Vei înțelege cum funcționează vederea în culori și vei putea aplica 
                  aceste cunoștințe pentru a crea experiențe vizuale mai eficiente.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors text-lg"
              >
                Să explorez vederea! 👁️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default VisualPerceptionPage;