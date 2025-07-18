import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FundamentalsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);

  // Auto-scroll pentru secțiuni
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'primary', 'secondary', 'tertiary', 'wheel', 'properties'];
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

  const primaryColors = [
    { name: 'Roșu', hex: '#FF0000', description: 'Culoarea energiei și pasiunii' },
    { name: 'Albastru', hex: '#0000FF', description: 'Culoarea calmului și încrederii' },
    { name: 'Galben', hex: '#FFFF00', description: 'Culoarea optimismului și creativității' }
  ];

  const secondaryColors = [
    { name: 'Verde', hex: '#00FF00', description: 'Roșu + Galben = Echilibru și natură', mix: ['#FF0000', '#FFFF00'] },
    { name: 'Portocaliu', hex: '#FFA500', description: 'Roșu + Galben = Energie și entuziasm', mix: ['#FF0000', '#FFFF00'] },
    { name: 'Violet', hex: '#8000FF', description: 'Roșu + Albastru = Mister și spiritualitate', mix: ['#FF0000', '#0000FF'] }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '🎯' },
    { id: 'primary', title: 'Culori Primare', icon: '🔴' },
    { id: 'secondary', title: 'Culori Secundare', icon: '🟠' },
    { id: 'tertiary', title: 'Culori Terțiare', icon: '🟡' },
    { id: 'wheel', title: 'Cercul Cromatic', icon: '🎨' },
    { id: 'properties', title: 'Proprietăți', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">

      {/* Fixed Navigation */}

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
                    ? 'bg-gradient-to-r from-blue-800 to-green-500 text-white'
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
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400  to-white bg-clip-text text-transparent">
            🔑 Fundamentele Culorilor 🔑
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Descoperă bazele teoriei culorilor și înțelege cum se construiește întreaga paletă cromatică 
            pornind de la doar trei culori fundamentale.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        {/* Introducere */}
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">⌲ Ce Vei Învăța</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Concepte Fundamentale</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Cele 3 culori primare și de ce sunt speciale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Cum se formează culorile secundare prin amestec</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Culorile terțiare și subtilitățile lor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Structura și logica cercului cromatic</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Aplicații Practice</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Cum să combini culorile eficient</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Proprietățile culorilor: saturație, luminozitate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Principiile de bază ale armoniei cromatice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Fundația pentru designul profesional</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Culori Primare */}
        <section id="primary" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔴 Culorile Primare</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Culorile primare sunt fundația întregii teorii cromatice. Acestea nu pot fi create prin amestecarea 
              altor culori și servesc ca punct de plecare pentru createa tuturor celelalte nuanțe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {primaryColors.map((color, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div 
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{color.name}</h3>
                  <p className="text-white/70 text-center mb-4 text-lg">{color.description}</p>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <span className="text-white/80 font-mono text-base">{color.hex}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">💡 De Ce Sunt Speciale?</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              Culorile primare sunt pure și nu pot fi descompuse în pigmenți mai simpli. Ele formează 
              vârfurile unui triunghi echilateral, în cercul cromatic și sunt poziționate la 120° una față de alta. 
              Această distanță egală creează echilibrul perfect și permite generarea tuturor celorlalte culori.
            </p>
          </div>
        </section>

        {/* Culori Secundare */}
        <section id="secondary" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🟠 Culorile Secundare</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Culorile secundare rezultă din amestecarea în proporții egale a două culori primare. 
              Acestea se află la jumătatea distanței între culorile primare pe cercul cromatic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {secondaryColors.map((color, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                  {/* Demonstrație amestec */}
                  <div className="flex items-center justify-center mb-6 gap-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color.mix[0] }}
                    ></div>
                    <span className="text-white text-2xl">+</span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color.mix[1] }}
                    ></div>
                    <span className="text-white text-2xl">=</span>
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{color.name}</h3>
                  <p className="text-white/70 text-center mb-4 text-base">{color.description}</p>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <span className="text-white/80 font-mono text-base">{color.hex}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">🔬 Știința Amestecului</h3>
            <p className="text-white/80 leading-relaxed mb-4 text-lg">
              Când amesteci două culori primare, obții o culoare secundară care moștenește caracteristicile 
              ambelor culori primare. De exemplu, verdele (albastru + galben) combină calmul albastrului cu 
              energia galbenului, creând o senzație de echilibru și natură.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-base">
              <div className="bg-orange-500/20 rounded-lg p-3">
                <strong className="text-orange-300">Portocaliu:</strong> Energie + Căldură
              </div>
              <div className="bg-green-500/20 rounded-lg p-3">
                <strong className="text-green-300">Verde:</strong> Calm + Vitalitate
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3">
                <strong className="text-purple-300">Violet:</strong> Pasiune + Spiritualitate
              </div>
            </div>
          </div>
        </section>

        {/* Culori Terțiare */}
        <section id="tertiary" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🟡 Culorile Terțiare</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Culorile terțiare se formează prin amestecarea unei culori primare cu o culoare secundară adiacentă. 
              Acestea completează cercul cromatic cu 6 nuanțe suplimentare, oferind o paletă de 12 culori de bază.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Cele 6 Culori Terțiare</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: 'Roșu-Portocaliu', hex: '#FF4500', mix: 'Roșu + Portocaliu' },
                { name: 'Galben-Portocaliu', hex: '#FFAE00', mix: 'Galben + Portocaliu' },
                { name: 'Galben-Verde', hex: '#9AFF00', mix: 'Galben + Verde' },
                { name: 'Albastru-Verde', hex: '#00FF9A', mix: 'Albastru + Verde' },
                { name: 'Albastru-Violet', hex: '#4000FF', mix: 'Albastru + Violet' },
                { name: 'Roșu-Violet', hex: '#C000FF', mix: 'Roșu + Violet' }
              ].map((color, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-white/20 hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <h4 className="text-white font-semibold text-base mb-1">{color.name}</h4>
                  <p className="text-white/60 text-sm">{color.mix}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">🎨 Importanța Culorilor Terțiare</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              Culorile terțiare oferă nuanțe mai subtile și complexe, permițând designerilor să creeze 
              tranziții mai fine între culori și să obțină efecte vizuale mai sofisticate. Ele sunt 
              esențiale pentru crearea de gradiente naturale și armonii cromatice rafinate.
            </p>
          </div>
        </section>

        {/* Cercul Cromatic */}
        <section id="wheel" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🎨 Cercul Cromatic</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Cercul cromatic este reprezentarea vizuală a relațiilor dintre culori. 
              Este instrumentul fundamental pentru înțelegerea armoniei cromatice.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Cerc cromatic vizual interactiv */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Cercul cromatic principal */}
                <div className="absolute inset-0 rounded-full bg-gradient-conic from-red-500 via-orange-500 via-yellow-500 via-lime-500 via-green-500 via-teal-500 via-cyan-500 via-sky-500 via-blue-500 via-indigo-500 via-purple-500 via-pink-500 to-red-500 animate-pulse"></div>
                
                {/* Puncte pentru culorile primare */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Roșu - Primar"></div>
                <div className="absolute bottom-20 right-8 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Albastru - Primar"></div>
                <div className="absolute bottom-20 left-8 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Galben - Primar"></div>
                
                {/* Puncte pentru culorile secundare */}
                <div className="absolute top-20 right-12 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Portocaliu - Secundar"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Verde - Secundar"></div>
                <div className="absolute top-20 left-12 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Violet - Secundar"></div>
                
                {/* Centrul cercului */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center border-4 border-white/20">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="text-white font-semibold text-sm">Cercul</div>
                    <div className="text-white font-semibold text-sm">Cromatic</div>
                    <div className="text-white/60 text-xs mt-1">12 Culori</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">📐 Structura Cercului</h3>
                <ul className="space-y-2 text-white/80 text-lg">
                  <li>• <strong>12 culori</strong> dispuse circular</li>
                  <li>• <strong>3 primare</strong> la 120° distanță</li>
                  <li>• <strong>3 secundare</strong> între primare</li>
                  <li>• <strong>6 terțiare</strong> completează cercul</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎯 Utilitatea Practică</h3>
                <ul className="space-y-2 text-white/80 text-lg">
                  <li>• Identifică <strong>culorile complementare</strong></li>
                  <li>• Creează <strong>scheme armonice</strong></li>
                  <li>• Înțelege <strong>relațiile cromatice</strong></li>
                  <li>• Ghidează <strong>alegerile de design</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Proprietăți */}
        <section id="properties" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">⚙️ Proprietățile Culorilor</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Pentru a înțelege complet culorile, trebuie să cunoștem cele trei proprietăți fundamentale 
              care definesc orice nuanță cromatică.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white">Nuanța (Hue)</h3>
              </div>
              <p className="text-white/80 text-center mb-4 text-lg">
                Culoarea pură, pozițiunea pe cercul cromatic. Este ceea ce numim de obicei "culoarea".
              </p>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white/70 text-base text-center">
                  Exemplu: Roșu, Albastru, Verde
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-red-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white">Saturația</h3>
              </div>
              <p className="text-white/80 text-center mb-4 text-lg">
                Intensitatea sau puritatea culorii. Cât de vibrantă sau palidă este culoarea.
              </p>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white/70 text-sm text-center">
                  0% = Gri, 100% = Culoare pură
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-black to-white rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white">Luminozitatea</h3>
              </div>
              <p className="text-white/80 text-center mb-4 text-lg">
                Cât de luminoasă sau întunecată este culoarea. Cantitatea de alb sau negru adăugată.
              </p>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white/70 text-sm text-center">
                  0% = Negru, 100% = Alb
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">🔬 Exemplu Practic</h3>
            <p className="text-white/80 leading-relaxed text-center mb-6 text-lg">
              O culoare roșie poate avea diferite variații: roșu aprins (saturație mare), roșu pastel (saturație mică), 
              roșu închis (luminozitate mică) sau roșu deschis (luminozitate mare). Aceleași principii se aplică 
              tuturor culorilor din cercul cromatic.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-lg mx-auto mb-2"></div>
                <p className="text-white/70 text-sm">Roșu Standard</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-300 rounded-lg mx-auto mb-2"></div>
                <p className="text-white/70 text-sm">Roșu Pastel</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-900 rounded-lg mx-auto mb-2"></div>
                <p className="text-white/70 text-sm">Roșu Închis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-200 rounded-lg mx-auto mb-2"></div>
                <p className="text-white/70 text-sm">Roșu Deschis</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concluzie și Navigare */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">🎯 Recapitulare</h3>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto text-lg">
              Acum cunoști fundamentele teoriei culorilor! De la cele 3 culori primare până la proprietățile 
              complexe ale fiecărei nuanțe, ai toate bazele necesare pentru a înțelege lumea culorilor. 
              Următorul pas este să explorezi cum se combină aceste culori pentru a crea armonie vizuală.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/teorie/contrast')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                 Următorul: 🔍 Contrast și Lizibilitate
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300"
              >
                🎯 Testează: Quiz Fundamentale
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
              <h2 className="text-2xl font-bold text-gray-800">📖 Ghid de Navigare</h2>
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
                  <li>• <strong>Meniu lateral</strong> (desktop): Click pe orice secțiune pentru a sări direct la ea</li>
                  <li>• <strong>Scroll natural</strong>: Navighează prin pagină și meniul se actualizează automat</li>
                  <li>• <strong>Butoane de navigare</strong>: La final găsești link-uri către următoarele capitole</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Structura Paginii</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Introducere</strong>: Prezentare generală și ce vei învăța</li>
                  <li>• <strong>Culori Primare</strong>: Roșu, Albastru, Galben - fundația teoriei</li>
                  <li>• <strong>Culori Secundare</strong>: Verde, Portocaliu, Violet - rezultatul amestecului</li>
                  <li>• <strong>Culori Terțiare</strong>: Cele 6 nuanțe intermediare</li>
                  <li>• <strong>Cercul Cromatic</strong>: Reprezentarea vizuală a relațiilor</li>
                  <li>• <strong>Proprietăți</strong>: Nuanța, Saturația, Luminozitatea</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Sfaturi pentru Învățare</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Ia-o pas cu pas</strong>: Nu te grăbi, înțelege fiecare concept</li>
                  <li>• <strong>Observă exemplele</strong>: Fiecare culoare are demonstrații vizuale</li>
                  <li>• <strong>Experimentează</strong>: Încearcă să combini culorile mental</li>
                  <li>• <strong>Revino</strong>: Conceptele se consolidează prin repetare</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 După Această Lecție</h3>
                <p className="text-gray-600">
                  Vei înțelege cum toate culorile se derivă din doar 3 culori de bază și vei putea 
                  să identifici relațiile dintre diferite nuanțe. Această cunoaștere este fundamentală 
                  pentru toate capitolele următoare despre psihologie, armonie și design.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Am Înțeles! 🎨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FundamentalsPage;