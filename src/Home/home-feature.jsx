import { useRef, useState } from "react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };
  
  const handleMouseEnter = () => {
    setOpacity(0.6);
  };
  
  const handleMouseLeave = () => {
    setOpacity(0);
  };
  
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-neutral-700 bg-neutral-900 bg-opacity-20 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-cyan-400 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

const HomeFeatures = () => {
  return (
    <div className='bg-gradient-to-br from-gray-900 via-purple-900 to-black w-full py-16 px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-white text-3xl md:text-4xl font-bold mb-12 text-center'>
          Descoperă Instrumentele Noastre
        </h2>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center align-middle mx-auto '>
          {/* Linia 1 */}
          <SpotlightCard 
            className="p-6 cursor-pointer" 
            spotlightColor="rgba(0, 255, 255, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Teoria</h3>
            <p className='text-gray-300'>Învață fundamentele și psihologia din spatele fiecărei culori.</p>
          </SpotlightCard>

          <SpotlightCard 
           className="p-6 cursor-pointer" 
            spotlightColor="rgba(147, 51, 234, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Palete</h3>
            <p className='text-gray-300'>Pune în aplicare cunoștințele dobândite din teorie pentru a crea palete de culori personalizare proiectelor tale.</p>
          </SpotlightCard>
          
          <SpotlightCard 
          className="p-6 cursor-pointer" 
            spotlightColor="rgba(236, 72, 153, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Jocuri Interactive</h3>
            <p className='text-gray-300'>Testează-ți cunoștințele prin provocări distractive.</p>
          </SpotlightCard>

          {/* Linia 2 */}
          <SpotlightCard 
          className="p-6 cursor-pointer" 
            spotlightColor="rgba(34, 197, 94, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Notițe Personale</h3>
            <p className='text-gray-300'>Organizează-ți ideile și gândurile cu aplicația noastră de notițe. Creează, editează și caută prin notițele tale cu titlu, subtitlu și conținut sincronizat în cloud.</p>
          </SpotlightCard>

          <SpotlightCard 
         className="p-6 cursor-pointer" 
            spotlightColor="rgba(249, 115, 22, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Conectare Google</h3>
            <p className='text-gray-300'>Conectează-te cu contul Google pentru o experiență portabilă. Toate creațiile tale sunt automat salvate și sincronizate între dispozitive pentru acces instant.</p>
          </SpotlightCard>

          {/* Linia 3 - Coloana 3: Contact & Suport */}
          <SpotlightCard 
            className="p-6 cursor-pointer" 
            spotlightColor="rgba(168, 85, 247, 0.15)"
          >
            <h3 className='text-white text-xl font-bold mb-4 indent-10'>Contact & Suport</h3>
            <p className='text-gray-300'>Ai întrebări sau probleme? Contactează echipa noastră pentru asistență rapidă și soluții personalizate pentru nevoile tale cromatice.</p>
          </SpotlightCard>
        </div>
      </div>

      <div className='max-w-4xl mx-auto mt-20 text-center'>
        <h3 className='text-white text-2xl md:text-3xl font-bold mb-8'>
          De ce să alegi Această Platformă?
        </h3>
        <p className='text-gray-300 text-lg leading-relaxed mb-8'>
         Instrumentele noastre avansate dau viață ideilor tale cromatice. De la crearea de palete spectaculoase până la înțelegerea secretelor fizice,chimice,psihologice ale fiecărei nuanțe, îți oferim totul într-un singur loc. Cu fiecare click te apropii de înțelegerea culorilor, fie că vrei să înveți de ce galbenul îți ridică moralul sau cum să combini perfect mai multe culori.
        </p>
        
        <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
 <SpotlightCard 
   className="p-6 text-left md:col-span-1 lg:col-span-2 w-full md:w-2/3 mx-auto" 
   spotlightColor="rgba(236, 72, 153, 0.2)"
 >
   <h4 className='text-green-400 text-xl font-bold mb-4'>Pentru tine am creat</h4>
   <p className='text-gray-300'>Opțiune de conectare cu contul Google.</p>
   <p className='text-gray-300'>Securitate asigurată de Google Firebase + Netlify</p>


 </SpotlightCard>
 
 <SpotlightCard 
   className="p-6 text-left" 
   spotlightColor="rgba(236, 72, 153, 0.2)"
 >
   <h4 className='text-pink-400 text-xl font-bold mb-4'>Instrumente Profesionale</h4>
   <p className='text-gray-300'>Generator avansate de palete.</p>
   <p className='text-gray-300'>Aplicație de salvare notițe.</p>
 </SpotlightCard>
 
 <SpotlightCard 
   className="p-6 text-left" 
   spotlightColor="rgba(147, 51, 234, 0.2)"
 >
   <h4 className='text-blue-400 text-xl font-bold mb-4'>Învățare Interactivă</h4>
   <p className='text-gray-300'>Asistent AI.</p>
   <p className='text-gray-300'>Quizz-uri și jocuri care îți dezvoltă înțelegerea culorilor pas cu pas.</p>
 </SpotlightCard>
</div>
      </div>
    </div>
  );
};

export default HomeFeatures;