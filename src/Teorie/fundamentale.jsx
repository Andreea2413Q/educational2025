import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FundamentalsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

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


  return (
    <div className="min-h-screen bg-gradient-to-br w-full  from-slate-900 via-purple-900 to-indigo-900">


    
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
              
              <div className="relative w-80 h-80 mx-auto">
               
                <div className="absolute inset-0 rounded-full bg-gradient-conic from-red-500 via-orange-500 via-yellow-500 via-lime-500 via-green-500 via-teal-500 via-cyan-500 via-sky-500 via-blue-500 via-indigo-500 via-purple-500 via-pink-500 to-red-500 animate-pulse"></div>
                
             
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Roșu - Primar"></div>
                <div className="absolute bottom-20 right-8 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Albastru - Primar"></div>
                <div className="absolute bottom-20 left-8 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Galben - Primar"></div>
                
             
                <div className="absolute top-20 right-12 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Portocaliu - Secundar"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Verde - Secundar"></div>
                <div className="absolute top-20 left-12 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer" title="Violet - Secundar"></div>
                
              
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
                  <li><strong>12 culori</strong> dispuse circular</li>
                  <li> <strong>3 primare</strong> la 120° distanță</li>
                  <li> <strong>3 secundare</strong> între primare</li>
                  <li><strong>6 terțiare</strong> completează cercul</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎯 Utilitatea Practică</h3>
                <ul className="space-y-2 text-white/80 text-lg">
                  <li> Identifică <strong>culorile complementare</strong></li>
                  <li> Creează <strong>scheme armonice</strong></li>
                  <li> Înțelege <strong>relațiile cromatice</strong></li>
                  <li> Ghidează <strong>alegerile de design</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

       
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
                 Testează: Quiz Fundamentale
              </button>
            </div>
          </div>
        </section>
      </div>

    
    
    </div>
    </div>
  );
};

export default FundamentalsPage;