import { useEffect, useState } from 'react';
import ArtificiiStart from './main';
import Explosion from '../Imagini/explosion.avif';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='bg-black h-screen'>
        <ArtificiiStart />
      </div>

      <div 
        className='relative w-full h-screen bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden '
        style={{
          backgroundImage: `url(${Explosion})`,
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        
        <div className='relative z-10 flex flex-col justify-center items-center h-full px-8'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-8 drop-shadow-2xl bg-gradient-to-r from-pink-300 via-purple-500 to-red-500 bg-clip-text text-transparent'>
              Ce Poți Descoperi Aici:
            </h1>
            
            <p className='text-white text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg max-w-3xl mx-auto'>
              Explorează instrumentele noastre interactive pentru a crea palete personalizate, 
              înțelege psihologia culorilor și testează-ți cunoștințele prin jocuri captivante. 
              Fiecare culoare are propria sa poveste - de la roșul pasional care accelerează pulsul, 
              la albastrul liniștitor care reduce stresul.
            </p>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-br from-gray-900 via-purple-900 to-black w-full py-16 px-8'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-white text-3xl md:text-4xl font-bold mb-12 text-center'>
            Descoperă Instrumentele Noastre
          </h2>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center align-middle mx-auto'>
            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Teoria</h3>
              <p className='text-gray-300'>Învață fundamentele și psihologia din spatele fiecărei culori.</p>
            </div>

            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Palete</h3>
              <p className='text-gray-300'>Pune în aplicare cunoștințele dobândite din teorie pentru a crea palete de colori personalizare proiectelor tale.</p>
            </div>
            
            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Jocuri Interactive</h3>
              <p className='text-gray-300'>Testează-ți cunoștințele prin provocări distractive.</p>
            </div>

            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Notițe Personale</h3>
              <p className='text-gray-300'>Organizează-ți ideile și gândurile cu aplicația noastră de notițe. Creează, editează și caută prin notițele tale cu titlu, subtitlu și conținut sincronizat în cloud.</p>
            </div>

            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Conectare Google</h3>
              <p className='text-gray-300'>Conectează-te cu contul Google pentru o experiență portabilă. Toate creațiile tale sunt automat salvate și sincronizate între dispozitive pentru acces instant.</p>
            </div>

            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Setări Personalizate</h3>
              <p className='text-gray-300'>Personalizează experiența ta prin modificarea temei, ajustarea contrastului și configurarea preferințelor de culoare pentru confort maxim.</p>
            </div>

            <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 md:col-span-2 lg:col-span-1 lg:col-start-2'>
              <h3 className='text-white text-xl font-bold mb-4 indent-10'>Contact & Suport</h3>
              <p className='text-gray-300'>Ai întrebări sau probleme? Contactează echipa noastră pentru asistență rapidă și soluții personalizate pentru nevoile tale cromatice.</p>
            </div>
          </div>
        </div>

        <div className='max-w-4xl mx-auto mt-20 text-center'>
          <h3 className='text-white text-2xl md:text-3xl font-bold mb-8'>
            De Ce Să Alegi Această Platformă?
          </h3>
          <p className='text-gray-300 text-lg leading-relaxed mb-8'>
           Experimentează cu instrumentele noastre avansate pentru a da viață ideilor tale cromatice. De la crearea de palete spectaculoase până la înțelegerea secretelor psihologice ale fiecărei nuanțe, îți oferim totul într-un singur loc. Fiecare click te apropie de măiestria culorilor - fie că vrei să înveți de ce galbenul îți ridică moralul sau cum să combini perfect culorile complementare.
          </p>
          
          <div className='grid md:grid-cols-2 gap-8 mt-12'>
            <div className='text-left'>
              <h4 className='text-pink-400 text-xl font-bold mb-4'>🎨 Instrumente Profesionale</h4>
              <p className='text-gray-300'>Generatoare avansate de palete cu algoritmi bazați pe teoria culorilor.</p>
            </div>
            <div className='text-left'>
              <h4 className='text-purple-400 text-xl font-bold mb-4'>🧠 Învățare Interactivă</h4>
              <p className='text-gray-300'>Cursuri și jocuri care îți dezvoltă înțelegerea culorilor pas cu pas.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;