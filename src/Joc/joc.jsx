import { useNavigate } from 'react-router-dom';
import Woimg from './Group 2.png';
import RGBimg from '../Imagini/rgb.png'
import Circle from '../Imagini/circle.png'
import Memory from '../Imagini/memory.png'

const cardsData = [
  {
    img: RGBimg,
    title: 'Color Game RGB',
    description: 'Testează-ți cunoștințele despre culori! Ghicește culoarea corectă din valorile RGB, HEX sau HSL.',
    link: '/joc/rgb',
  },
  {
    img: Woimg,
    title: 'WoLearn',
    description: 'Dorești să îți improvizezi viteza cu care scrii cuvinte sau să înveți cuvinte noi dintr-un text ales de tine?',
    link: '/joc/wolearn',
  },
  {
    img: Circle,
    title: 'Color Circle',
    description: 'Joc rapid de recunoaștere a culorilor! Găsește culoarea corectă din cercurile colorate în timpul limitat.',
    link: '/joc/color-circle',
  },
  {
    img: Memory,
    title: 'Memory Game',
    description: 'Testează-ți memoria cu un joc captivant de potrivire a culorilor! Trei niveluri de dificultate prin care îți provoci memoria!',
    link: '/joc/memory-game',
  }
];

export default function CardsGrid() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
    
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
       
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Jocuri Interactive
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>

       
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {cardsData.map(({ img, title, description, link }, index) => (
            <div
              key={index}
              onClick={() => navigate(link)}
              className="group bg-gray-900/60 backdrop-blur-lg border-2 border-cyan-400/30 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if(e.key === 'Enter') navigate(link); }}
            >
             
              <div className="h-40 sm:h-48 lg:h-56 xl:h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
                <img 
                  src={img} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>


              <div className="p-4 sm:p-6 lg:p-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-between relative">
             
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 text-center text-transparent bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text group-hover:from-cyan-200 group-hover:to-pink-200 transition-all duration-500">
                    {title}
                  </h2>
                  <p className="text-center text-cyan-100/80 group-hover:text-white/90 leading-relaxed text-sm sm:text-base lg:text-lg transition-all duration-500">
                    {description}
                  </p>
                </div>

              
               

                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-cyan-400/50 to-pink-400/50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

     
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"></div>
          <p className="mt-4 text-cyan-300/60 text-sm sm:text-base">
            Alege un joc și testează-ți abilitățile!
          </p>
        </div>
      </div>

      
    </div>
  );
}