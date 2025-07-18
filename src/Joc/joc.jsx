import React from 'react';
import { useNavigate } from 'react-router-dom';
import Woimg from './Group 2.png';
import RGBimg from '../Imagini/rgb.png'
import Circle from '../Imagini/circle.png'
import Memory from '../Imagini/memory.png'
import HarmonyDedective from '../Imagini/pigment.jpg'
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
  img: HarmonyDedective,
  title: 'Harmony Dedective',
  description: 'Idk',
  link: '/joc/harmony-dedective',
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
    <div className="bg-d2  rounded-md border-d1 min-h-screen p-8" >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 card">
        {cardsData.map(({ img, title, description, link }, index) => (
          <div
            key={index}
            onClick={() => navigate(link)}
            className="bg-b2 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') navigate(link); }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={img} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
              />
            </div>
            <div className="p-6 bg-b2 h-auto min-h-[140px] flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold mb-3 text-b4 text-center">{title}</h1>
                <p className="text-center text-b4 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}