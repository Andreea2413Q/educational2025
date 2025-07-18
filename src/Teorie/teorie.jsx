import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TFF from './teorie-fun-fact'
import TiltedCard from './Card/tilted-card';
import Roata from './Card/roata'
import Fundamentals from '../Imagini/Fundamentals.png'
import Contrast from '../Imagini/Contrast2.png'
import Accesibilityy from '../Imagini/accesibility.png'
import Psihologie from '../Imagini/Psihologie2.png'



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
      img:Fundamentals
    },
     {
      title: 'Contrast și Lizibilitate',
      description: 'Fundamentul oricărui design reușit: înțelege calculul, aplicarea și optimizarea contrastului pentru experiențe vizuale clare, accesibile și profesionale în orice condiții.',
      icon: '🌓',
      link: '/teorie/contrast',
      color: 'from-violet-500 to-indigo-500',
      img:Contrast
      

    },
     {
      title: 'Accesibilitate Cromatică',
      description: 'Designul incluziv: cum să creezi palete accesibile pentru persoanele cu deficiențe de vedere.',
      icon: '🤝',
      link: '/teorie/accesibilitate',
      color: 'from-violet-500 to-indigo-500',
      img:Accesibilityy
    },
    {
      title: 'Psihologia Culorilor',
      description: 'Înțelege cum culorile influențează emoțiile, comportamentul și deciziile noastre zilnice.',
      icon: '🧠',
      link: '/teorie/psihologie',
      color: 'from-purple-500 to-pink-500',
      img:Psihologie
    },
    {
      title: 'Armonia Cromatică',
      description: 'Învață să combini culorile perfect: complementare, analoge, triadice și monocromatice.',
      icon: '🎼',
      link: '/teorie/armonie',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Culorile în Design',
      description: 'Aplicarea practică a teoriei culorilor în design grafic, web design și artă.',
      icon: '🖌️',
      link: '/teorie/design',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Simbolistica Culorilor',
      description: 'Explorează semnificațiile culturale și simbolice ale culorilor în diferite societăți.',
      icon: '🔮',
      link: '/teorie/simboluri',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Percepția Vizuală',
      description: 'Cum ochiul uman percepe culorile și iluziile optice create de combinațiile cromatice.',
      icon: '👁️',
      link: '/teorie/perceptia',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Temperatura Culorilor',
      description: 'Diferența dintre culorile calde și reci și impactul lor asupra ambianței și stării de spirit.',
      icon: '🌡️',
      link: '/teorie/temperatura',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Culorile în Natură',
      description: 'Explorează paleta infinită a naturii și învață de la cele mai spectaculoase combinații cromatice.',
      icon: '🌿',
      link: '/teorie/natura',
      color: 'from-emerald-500 to-green-500'
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
        <Roata  />


      {/* Introduction Section */}
      <div className="py-20 px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              De Ce Este Importantă Teoria Culorilor?
            </h2>
            <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              Culorile nu sunt doar elemente decorative - ele sunt instrumente puternice de comunicare care 
              influențează emoțiile, comportamentul și chiar deciziile de cumpărare. Înțelegerea teoriei culorilor 
              te ajută să creezi designuri mai eficiente, să îți exprimi personalitatea și să comunici mai bine cu lumea din jur.
            </p>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">85%</div>
              <p className="text-white/80">din cumpărători iau decizii pe baza culorii</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">90s</div>
              <p className="text-white/80">timpul în care oamenii formează o primă impresie</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">80%</div>
              <p className="text-white/80">din informație este procesată vizual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Explorează Capitolele Teoriei
          </h2>
          <p className="text-lg text-white/80 text-center mb-16 max-w-3xl mx-auto">
            Fiecare capitol te va ghida prin aspecte diferite ale teoriei culorilor, 
            de la concepte fundamentale până la aplicații avansate în design și psihologie.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
  {theoryTopics.map((topic, index) => (
    <div
      key={index}
      onClick={() => navigate(topic.link)}
      className="group mb-8 cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <TiltedCard
        imageSrc={topic.img || "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"}
        altText={topic.description}
        captionText={topic.title}
        containerHeight="350px"
        containerWidth="300px"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-6 h-[350px] border border-white/20 hover:border-white/40 transition-all duration-300 flex flex-col justify-between">
            {/* Header cu icon și titlu */}
            <div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl">{topic.icon}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-yellow-300 group-hover:to-pink-300 transition-all duration-300">
                {topic.title}
              </h3>
            </div>
            
            {/* Descrierea */}
            <div className="flex-1">
              <p className="text-white/90 leading-relaxed text-sm mb-4">
                {topic.description}
              </p>
            </div>
            
            {/* Footer cu call to action */}
            <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
              <span className="mr-2 text-sm">Citește mai mult</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        }
      />
    </div>
  ))}
</div>

      {/* Call to Action */}
     
      {/* Quick Facts */}
            
        <TFF  />
         <div className="py-20 px-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Gata să Începi Călătoria?
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Aprofundează-ți cunoștințele despre culori și descoperă cum să le folosești 
            pentru a crea impresii de neuitat. Fiecare capitol îți va dezvălui secrete noi 
            despre fascinanta lume a culorilor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/teorie/fundamentale')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🚀 Începe cu Fundamentele
            </button>
            <button
              onClick={() => navigate('/teorie/psihologie')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🧠 Explorează Psihologia
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
    </div>
  );
};

export default TheoryMainPage;