import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TFF from './teorie-fun-fact'
import TiltedCard from './Card/tilted-card';
import Roata from './Card/roata'
import Fundamentals from '../Imagini/Fundamentals.png'
import Contrast from '../Imagini/Contrast2.png'
import Accesibilityy from '../Imagini/accesibility.png'
import Psihologie from '../Imagini/Psihologie2.png'
import Armonie from '../Imagini/armonie.png'
import Design from '../Imagini/design.jpg'
import Simbol from '../Imagini/simbol.jpg'
import Perceptie from '../Imagini/perceptie.avif'
import Temperatura from '../Imagini/temperatura.jpg'
import Natura from '../Imagini/natura.webp'

const TheoryMainPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theoryTopics = [
    {
      title: 'Fundamentele Culorilor',
      description: 'Descoperă bazele teoriei culorilor: cercul cromatic, culorile primare, secundare și terțiare.',
      icon: '🎨',
      link: '/teorie/fundamentale',
      color: 'from-red-500 to-orange-500',
      img: Fundamentals
    },
    {
      title: 'Contrast și Lizibilitate',
      description: 'Fundamentul oricărui design reușit: înțelege calculul, aplicarea și optimizarea contrastului pentru experiențe vizuale clare, accesibile și profesionale în orice condiții.',
      icon: '🌓',
      link: '/teorie/contrast',
      color: 'from-violet-500 to-indigo-500',
      img: Contrast
    },
    {
      title: 'Accesibilitate Cromatică',
      description: 'Designul incluziv: cum să creezi palete accesibile pentru persoanele cu deficiențe de vedere.',
      icon: '🤝',
      link: '/teorie/accesibilitate',
      color: 'from-violet-500 to-indigo-500',
      img: Accesibilityy
    },
    {
      title: 'Psihologia Culorilor',
      description: 'Înțelege cum culorile influențează emoțiile, comportamentul și deciziile noastre zilnice.',
      icon: '🧠',
      link: '/teorie/psihologie',
      color: 'from-purple-500 to-pink-500',
      img: Psihologie
    },
    {
      title: 'Armonia Cromatică',
      description: 'Învață să combini culorile perfect: complementare, analoge, triadice și monocromatice.',
      icon: '🎼',
      link: '/teorie/armonie',
      color: 'from-blue-500 to-cyan-500',
      img: Armonie
    },
    {
      title: 'Culorile în Design',
      description: 'Aplicarea practică a teoriei culorilor în design grafic, web design și artă.',
      icon: '🖌️',
      link: '/teorie/design',
      color: 'from-green-500 to-teal-500',
      img: Design
    },
    {
      title: 'Simbolistica Culorilor',
      description: 'Explorează semnificațiile culturale și simbolice ale culorilor în diferite societăți.',
      icon: '🔮',
      link: '/teorie/simboluri',
      color: 'from-indigo-500 to-purple-500',
      img: Simbol
    },
    {
      title: 'Percepția Vizuală',
      description: 'Cum ochiul uman percepe culorile și iluziile optice create de combinațiile cromatice.',
      icon: '👁️',
      link: '/teorie/perceptia',
      color: 'from-pink-500 to-rose-500',
      img: Perceptie
    },
    {
      title: 'Temperatura Culorilor',
      description: 'Diferența dintre culorile calde și reci și impactul lor asupra ambianței și stării de spirit.',
      icon: '🌡️',
      link: '/teorie/temperatura',
      color: 'from-orange-500 to-red-500',
      img: Temperatura
    },
    {
      title: 'Culorile în Natură',
      description: 'Explorează paleta infinită a naturii și învață de la cele mai spectaculoase combinații cromatice.',
      icon: '🌿',
      link: '/teorie/natura',
      color: 'from-emerald-500 to-green-500',
      img: Natura
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
      </div>
      <Roata />

      {/* Introduction Section */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              De Ce Este Importantă Teoria Culorilor?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
              Culorile nu sunt doar elemente decorative - ele sunt instrumente puternice de comunicare care 
              influențează emoțiile, comportamentul și chiar deciziile de cumpărare. Înțelegerea teoriei culorilor 
              te ajută să creezi designuri mai eficiente, să îți exprimi personalitatea și să comunici mai bine cu lumea din jur.
            </p>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20 px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">85%</div>
              <p className="text-sm sm:text-base text-white/80">din cumpărători iau decizii pe baza culorii</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pink-400 mb-2">90s</div>
              <p className="text-sm sm:text-base text-white/80">timpul în care oamenii formează o primă impresie</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">80%</div>
              <p className="text-sm sm:text-base text-white/80">din informație este procesată vizual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-3 sm:mb-4 px-2">
            Explorează Capitolele Teoriei
          </h2>
          <p className="text-base sm:text-lg text-white/80 text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
            Fiecare capitol te va ghida prin aspecte diferite ale teoriei culorilor, 
            de la concepte fundamentale până la aplicații avansate în design și psihologie.
          </p>
          
          {/* Responsive Grid with Perfect Centering - Maximum 3 per row */}
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
              {theoryTopics.map((topic, index) => (
                <div
                  key={index}
                  onClick={() => navigate(topic.link)}
                  className="group my-4  cursor-pointer transform transition-all duration-500 hover:scale-105 flex justify-center"
                >
                  <TiltedCard
                    imageSrc={topic.img || "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"}
                    altText={topic.description}
                    captionText={topic.title}
                    containerHeight="400px"
                    containerWidth="320px"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 h-[400px] w-[320px] border border-white/20 hover:border-white/40 transition-all duration-500 flex flex-col justify-between group-hover:shadow-2xl group-hover:shadow-cyan-500/25 relative overflow-hidden">
                      
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                        </div>
                        
                        <div className="relative z-10 ">
                        
                          <div>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${topic.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/30 transition-all duration-500`}>
                              <span className="text-lg sm:text-xl">{topic.icon}</span>
                            </div>
                            
                            <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-300 group-hover:via-white group-hover:to-purple-300 transition-all duration-500 group-hover:drop-shadow-lg leading-tight">
                              {topic.title}
                            </h3>
                          </div>
                          
                          {/* Descrierea */}
                          <div className="flex-1 mb-4">
                            <p className="text-white/85 group-hover:text-white/95 leading-relaxed text-xs sm:text-sm transition-all duration-500 group-hover:drop-shadow-md">
                              {topic.description}
                            </p>
                          </div>
                          
                          {/* Footer cu call to action */}
                          <div className="flex items-center text-white/60 group-hover:text-cyan-300 transition-all duration-500 group-hover:drop-shadow-lg">
                            <span className="mr-2 text-xs sm:text-sm font-medium group-hover:font-semibold transition-all duration-500">
                              Citește mai mult
                            </span>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Additional Luminous Border Effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-cyan-400/50 to-purple-400/50 shadow-inner"></div>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <TFF />
      
      {/* Call to Action */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Gata să Începi Călătoria?
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed px-4">
            Aprofundează-ți cunoștințele despre culori și descoperă cum să le folosești 
            pentru a crea impresii de neuitat. Fiecare capitol îți va dezvălui secrete noi 
            despre fascinanta lume a culorilor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => navigate('/teorie/fundamentale')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
               Începe cu Fundamentele
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryMainPage;