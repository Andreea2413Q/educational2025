import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ColorDesignPresentation = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showHelp, setShowHelp] = useState(false);

  const navigate = useNavigate()
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'graphic', 'web', 'art', 'principles'];
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

  const designAreas = [
    {
      name: 'Design Grafic',
      icon: '🎨',
      description: 'Logo-uri, branding, print și identități vizuale',
      principles: [
        { title: 'Contrast pentru Lizibilitate', desc: 'Text negru pe fundal alb - contrast 21:1 pentru accesibilitate perfectă' },
        { title: 'Psihologia Brandului', desc: 'Roșu pentru energie (Coca-Cola), albastru pentru încredere (Facebook)' },
        { title: 'Ierarhia Vizuală', desc: 'Culori saturate pentru titluri, neutre pentru text de corp' }
      ],
      examples: [
        { brand: 'McDonald\'s', colors: ['#FFC72C', '#DA020E'], effect: 'Stimulează apetitul și urgența' },
        { brand: 'IBM', colors: ['#1F70C1', '#000000'], effect: 'Transmite încredere și profesionalism' },
        { brand: 'Spotify', colors: ['#1DB954', '#191414'], effect: 'Fresh, modern și accesibil' }
      ]
    },
    {
      name: 'Design Web',
      icon: '💻',
      description: 'UI/UX, website-uri și aplicații mobile',
      principles: [
        { title: 'Accesibilitatea Web', desc: 'WCAG 2.1 - contrast minim 4.5:1 pentru text normal' },
        { title: 'Butoane de Acțiune', desc: 'Portocaliu creștere conversie cu 32% față de alte culori' },
        { title: 'Feedback Vizual', desc: 'Verde pentru succes, roșu pentru erori, albastru pentru info' }
      ],
      examples: [
        { brand: 'Airbnb', colors: ['#FF5A5F', '#00A699'], effect: 'Prietenos și de încredere pentru călătorii' },
        { brand: 'Slack', colors: ['#4A154B', '#ECB22E'], effect: 'Profesional dar relaxat pentru colaborare' },
        { brand: 'Netflix', colors: ['#E50914', '#000000'], effect: 'Dramatic și captivant pentru entertainment' }
      ]
    },
    {
      name: 'Artă Digitală',
      icon: '🖼️',
      description: 'Ilustrații, concept art și creații artistice',
      principles: [
        { title: 'Atmosfera și Starea de Spirit', desc: 'Tonuri calde pentru scene primitoare, reci pentru distanță' },
        { title: 'Profunzimea Culorii', desc: 'Culori saturate în prim-plan, pale în fundal pentru perspectivă' },
        { title: 'Punctul Focal', desc: 'Culoarea complementară pentru a ghida privirea către subiect' }
      ],
      examples: [
        { brand: 'Scena de Apus', colors: ['#FF6B35', '#F7931E'], effect: 'Căldură și romantism' },
        { brand: 'Profunzimi Oceanice', colors: ['#003366', '#0099CC'], effect: 'Profunzime și mister' },
        { brand: 'Magia Pădurii', colors: ['#228B22', '#32CD32'], effect: 'Natură și liniște' }
      ]
    }
  ];

  const practicalTips = [
    {
      principle: 'Regula 60-30-10 în Practică',
      icon: '📊',
      description: 'Distribuția perfectă pentru orice design',
      application: 'Website: Fundal alb (60%) + secțiuni gri (30%) + butoane colorate (10%)',
      visual: (
        <div className="w-full h-16 flex rounded-lg overflow-hidden border-2 border-white/20">
          <div className="bg-gray-100 flex-[6] flex items-center justify-center text-gray-600 font-semibold text-lg">60%</div>
          <div className="bg-gray-400 flex-[3] flex items-center justify-center text-white font-semibold text-lg">30%</div>
          <div className="bg-blue-500 flex-[1] flex items-center justify-center text-white font-semibold text-lg">10%</div>
        </div>
      )
    },
    {
      principle: 'Contrastul pentru Accesibilitate',
      icon: '♿',
      description: 'Asigură lizibilitatea pentru toți utilizatorii',
      application: 'Text: 4.5:1 minim, Titluri mari: 3:1 minim (WCAG 2.1)',
      visual: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-black font-bold text-lg mb-2">✅ Bun</div>
            <div className="text-gray-800 text-lg">Contrast 7:1</div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            <div className="text-gray-400 font-bold text-lg mb-2">❌ Slab</div>
            <div className="text-gray-400 text-lg">Contrast 2:1</div>
          </div>
        </div>
      )
    },
    {
      principle: 'Psihologia Culorilor în Context',
      icon: '🧠',
      description: 'Alege culori bazate pe emoția dorită',
      application: 'E-commerce: Verde pentru "Adaugă în coș", Roșu pentru "Urgență/Reducere"',
      visual: (
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">
            Adaugă în Coș
          </button>
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors">
            Ofertă Limitată!
          </button>
        </div>
      )
    }
  ];

  const navigationItems = [
    { id: 'intro', title: 'Introducere', icon: '🎨' },
    { id: 'graphic', title: 'Design Grafic', icon: '🖌️' },
    { id: 'web', title: 'Design Web', icon: '💻' },
    { id: 'art', title: 'Artă Digitală', icon: '🖼️' },
    { id: 'principles', title: 'Principii Practice', icon: '⚙️' }
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
            <Link
              to="/teorie"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-lg"
            >
              ← Înapoi la Teorie
            </Link>
            <button 
              onClick={() => setShowHelp(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-lg"
              title="Ghid de navigare"
            >
              ?
            </button>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            🎨 Culorile în Design
          </h1>
          <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Aplicarea practică a teoriei culorilor în design grafic, web design și artă.
            De la concepte la implementare profesională.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <section id="intro" className="mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6">🎯 Puterea Culorilor în Design</h2>
            
            <div className="mb-8">
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Culorile nu sunt doar elemente decorative într-un design - ele sunt instrumente puternice de comunicare 
                care pot influența dramatic percepția, emoțiile și comportamentul utilizatorilor. În era digitală, 
                unde prima impresie se formează în mai puțin de 0.05 secunde, alegerea culorilor poate face diferența 
                între succesul și eșecul unui proiect.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Studiile neuroscientifice arată că procesarea culorilor se întâmplă în cortexul vizual înainte ca 
                informația să ajungă la zonele responsabile pentru recunoașterea formelor și textului. Aceasta înseamnă 
                că oamenii "simt" culorile înainte să înțeleagă conținutul. Această realitate face culorile unul dintre 
                cele mai importante aspecte ale oricărui design de succes.
              </p>
              
              <p className="text-white/90 text-xl leading-relaxed">
                De la brandurile globale care investesc milioane în cercetarea culorilor perfecte, până la artistii 
                digitali care folosesc paleta pentru a transmite emoții complexe, aplicarea corectă a teoriei culorilor 
                poate transforma complet impactul unei creații. Această prezentare îți va oferi instrumentele concrete 
                pentru a stăpâni această artă.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Impact Demonstrat</h3>
                <ul className="space-y-3 text-white/80 text-xl">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 mt-1 text-xl">•</span>
                    <span>Creștere cu 80% a recunoașterii brandului</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1 text-xl">•</span>
                    <span>Îmbunătățirea conversiilor cu până la 35%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-1 text-xl">•</span>
                    <span>Reducerea timpului de decizie cu 60%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1 text-xl">•</span>
                    <span>Mărirea încrederii utilizatorilor cu 42%</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Aplicații Esențiale</h3>
                <ul className="space-y-3 text-white/80 text-xl">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 text-xl">•</span>
                    <span>Branding și identitate vizuală</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1 text-xl">•</span>
                    <span>Interface design și UX/UI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1 text-xl">•</span>
                    <span>Marketing vizual și publicitate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lime-400 mt-1 text-xl">•</span>
                    <span>Artă digitală și ilustrație</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-3">📊 Statistici Cheie</h3>
              <div className="grid md:grid-cols-3 gap-4 text-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">93%</div>
                  <p className="text-white/80 text-lg">din comunicarea vizuală se bazează pe culoare</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">0.05s</div>
                  <p className="text-white/80 text-lg">timpul pentru prima impresie vizuală</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">85%</div>
                  <p className="text-white/80 text-lg">din consumatori iau decizii bazate pe culoare</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {designAreas.map((area, index) => (
          <section key={area.name} id={area.name === 'Design Grafic' ? 'graphic' : area.name === 'Design Web' ? 'web' : 'art'} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{area.icon} {area.name}</h2>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                {area.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">⚙️ Principii Fundamentale</h3>
                
                <div className="mb-6">
                  <p className="text-white/90 text-xl leading-relaxed mb-4">
                    {area.name} se bazează pe înțelegerea profundă a modului în care culorile influențează percepția și 
                    comportamentul țintei de audiență. Fiecare decizie cromatică trebuie să fie strategică și justificată 
                    prin obiectivele concrete ale proiectului.
                  </p>
                  <p className="text-white/90 text-xl leading-relaxed">
                    {area.name === 'Design Grafic' 
                      ? 'În design grafic, culorile devin parte din identitatea brandului și trebuie să funcționeze consistent pe toate mediile - de la print la digital, de la aplicații mari la favicon-uri mici.'
                      : area.name === 'Design Web' 
                      ? 'În design web, culorile trebuie să îndeplinească cerințe stricte de accesibilitate, să ghideze utilizatorul prin interfață și să optimizeze conversiile fără să obosească ochiul.'
                      : 'În arta digitală, culorile sunt instrumentul principal pentru transmiterea emoțiilor și crearea atmosferei, necesitând o înțelegere profundă a psihologiei culorilor și a compoziției vizuale.'
                    }
                  </p>
                </div>
                
                <div className="space-y-6">
                  {area.principles.map((principle, i) => (
                    <div key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                      <h4 className="text-xl font-semibold text-white mb-2">{principle.title}</h4>
                      <p className="text-white/80 text-lg">{principle.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">💡 Exemple de Succes</h3>
                
                <div className="mb-6">
                  <p className="text-white/90 text-xl leading-relaxed">
                    Aceste branduri au investit considerabil în cercetarea și testarea culorilor, ajungând la combinații 
                    care nu doar că arată bine, ci și îndeplinesc obiective specifice de business și comunicare. 
                    Fiecare culoare a fost aleasă strategic pentru a evoca anumite emoții și comportamente.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {area.examples.map((example, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-4">
                      <h4 className="text-xl font-semibold text-white mb-3">{example.brand}</h4>
                      <div className="flex gap-2 mb-3">
                        {example.colors.map((color, j) => (
                          <div 
                            key={j}
                            className="w-12 h-12 rounded-lg border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-white/70 text-lg mb-2">{example.effect}</p>
                      <p className="text-white/60 text-base">
                        {example.brand === 'McDonald\'s' 
                          ? 'Studiile arată că combinația roșu-galben mărește apetitul cu 25% și reduce timpul de decizie în restaurante cu 15 secunde în medie.'
                          : example.brand === 'IBM' 
                          ? 'Albastrul IBM a fost testat pe 50.000 de utilizatori și s-a dovedit că inspiră încredere în serviciile financiare și tehnologice cu 40% mai mult decât alte culori.'
                          : example.brand === 'Spotify' 
                          ? 'Verdele Spotify creează o asociere puternică cu muzica și energia tinerească, mărindu-le baza de utilizatori tineri cu 300% în 5 ani.'
                          : example.brand === 'Airbnb' 
                          ? 'Paleta Airbnb transmite siguranță și aventură simultan, contribuind la creșterea bookingurilor cu 23% după rebrand.'
                          : example.brand === 'Slack' 
                          ? 'Culorile Slack reduc stresul asociat cu comunicarea la locul de muncă, îmbunătățind productivitatea echipelor cu 18%.'
                          : example.brand === 'Netflix' 
                          ? 'Paleta Netflix optimizează experiența de viewing, mărindu-le timpul petrecut pe platformă cu 31% per sesiune.'
                          : example.brand === 'Scena de Apus' 
                          ? 'Tonurile calde de portocaliu și roșu activează zonele cerebrale asociate cu confortul și intimitatea, fiind preferate în 78% din artele romantice.'
                          : example.brand === 'Profunzimi Oceanice' 
                          ? 'Albastrul profund creează senzația de infinit și mister, folosit în 65% din operele artistice care explorează teme filozofice și spirituale.'
                          : 'Verdele natural reduce cortizolul (hormonul stresului) cu 15% la vizualizare, fiind folosit terapeutic în spitale și centre de recuperare.'
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">🎯 Considerații Strategice pentru {area.name}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Factori de Luat în Considerare</h4>
                  <ul className="text-white/80 text-lg space-y-2">
                    {area.name === 'Design Grafic' ? (
                      <>
                        <li>• Adaptabilitatea pe diferite medii (print, digital, merchandise)</li>
                        <li>• Vizibilitatea la dimensiuni mici (favicon, ștampile)</li>
                        <li>• Compatibilitatea cu standardele de imprimare</li>
                        <li>• Diferențierea față de competitori din industrie</li>
                      </>
                    ) : area.name === 'Design Web' ? (
                      <>
                        <li>• Conformitatea cu standardele WCAG 2.1 pentru accesibilitate</li>
                        <li>• Performanța pe diferite tipuri de ecrane și device-uri</li>
                        <li>• Impactul asupra vitezei de încărcare a paginii</li>
                        <li>• Consistența în diferite browsere și sisteme de operare</li>
                      </>
                    ) : (
                      <>
                        <li>• Atmosfera și starea de spirit dorită pentru lucrare</li>
                        <li>• Compatibilitatea cu diferite spații de culoare (sRGB, Adobe RGB)</li>
                        <li>• Impactul lighting-ului asupra percepției culorilor</li>
                        <li>• Originalitatea și diferențierea artistică</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Best Practices</h4>
                  <ul className="text-white/80 text-lg space-y-2">
                    {area.name === 'Design Grafic' ? (
                      <>
                        <li>• Testează logo-ul în grayscale pentru verificarea contrastului</li>
                        <li>• Creează variante pentru fundal deschis și închis</li>
                        <li>• Documentează codurile culorilor în ghidul de brand</li>
                        <li>• Verifică reproducerea pe diferite tipuri de hârtie</li>
                      </>
                    ) : area.name === 'Design Web' ? (
                      <>
                        <li>• Folosește variabile CSS pentru consistența culorilor</li>
                        <li>• Implementează modul întunecat ca alternativă</li>
                        <li>• Testează cu utilizatori cu deficiențe de vedere</li>
                        <li>• Optimizează pentru reducerea oboseii vizuale</li>
                      </>
                    ) : (
                      <>
                        <li>• Studiază capodoperele pentru inspirație cromatică</li>
                        <li>• Experimentează cu limitări de paletă pentru disciplină</li>
                        <li>• Analizează lumina naturală pentru realism</li>
                        <li>• Documentează procesul pentru viitoare referințe</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="principles" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">⚙️ Principii Practice de Aplicat</h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Reguli concrete pe care le poți aplica imediat în orice proiect de design.
            </p>
          </div>

          <div className="space-y-12">
            {practicalTips.map((tip, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{tip.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{tip.principle}</h3>
                        <p className="text-white/80 text-xl">{tip.description}</p>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-6">
                      <p className="text-white/70 text-lg">
                        <strong className="text-white">Aplicare:</strong> {tip.application}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-lg p-6">
                      <p className="text-white/60 text-lg mb-4">Demonstrație:</p>
                      {tip.visual}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">🎯 Aplică Imediat!</h3>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto text-xl">
              Culorile nu sunt doar decorative - sunt instrumente puternice de comunicare. 
              Cu aceste principii, poți transforma orice design într-o experiență memorabilă.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">🎨 Design Grafic</h4>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">💻 Design Web</h4>
                <p className="text-white/70 text-lg">Interfețe intuitive și accesibile</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-2">🖼️ Artă Digitală</h4>
                <p className="text-white/70 text-lg">Creații impactante și emoționale</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teorie/simboluri"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg text-center"
              >
                Următorul: 🔮 Simbolistica Culorilor
              </Link>
              <Link
                to="/quiz"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg text-center"
              >
                   🎯 Testează: Quiz Design
              </Link>
             
            </div>
          </div>
        </section>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">🎨 Ghid Culorile în Design</h2>
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
                  Învață să aplici teoria culorilor în proiecte reale de design grafic, 
                  web design și artă digitală cu principii concrete și exemple practice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">📚 Structura Aplicativă</h3>
                <ul className="space-y-2 text-gray-600 text-lg">
                  <li>• <strong>Design Grafic</strong>: Logo-uri, branding și identități vizuale</li>
                  <li>• <strong>Design Web</strong>: UI/UX, accesibilitate și conversii</li>
                  <li>• <strong>Artă Digitală</strong>: Ilustrații, atmosferă și emoții</li>
                  <li>• <strong>Principii Practice</strong>: Reguli concrete aplicabile imediat</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Aplicare Imediată</h3>
                <ul className="space-y-2 text-gray-600 text-lg">
                  <li>• Folosește regula 60-30-10 în orice design</li>
                  <li>• Verifică contrastul pentru accesibilitate</li>
                  <li>• Alege culori bazate pe psihologia dorită</li>
                  <li>• Testează pe diferite device-uri și contexte</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 După Prezentare</h3>
                <p className="text-gray-600 text-lg">
                  Vei putea să aplici principiile culorilor în orice proiect de design, 
                  de la logo-uri simple la interface-uri complexe și opere de artă digitală.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 text-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors text-lg"
              >
                Să aplic culorile! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ColorDesignPresentation;