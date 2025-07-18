import './HomeBackground.css'; 
import Circle from './bkHome'
import Wheel from './wheel'

const Fireworks = () => {
 
  const HomeBackground = ({ children }) => {
    return (
    <div className='w-full flex flex-col md:flex-row'>
 
  <div className="relative min-h-screen overflow-hidden w-full md:w-1/2">
    <div className="absolute inset-0 home-gradient"></div>

    <div className="absolute inset-0 flex items-center justify-center">
      <Circle className="w-[15%] border-[10px] border-black bg-opacity-10 rotating-slow " />
      <Circle className="w-[30%] border-[10px] border-gray-900 bg-opacity-10 rotating-slow " />
      <Circle className="w-[45%] border-[10px] border-gray-700 bg-opacity-10 rotating-slow" />
      <Circle className="w-[60%] border-[10px] border-gray-600 bg-opacity-10 rotating-slow" />
      <Circle className="w-[80%] border-[10px] border-gray-500 bg-opacity-10 rotating-slow" />
    </div>

    <div className="relative z-10">
      {children}
    </div>
  </div>


  <div className='w-full md:w-1/2 px-4 py-6 bg-d1'>
    <h1 className='text-b1 py-3 bg-d4 text-center'>
      Descoperă Lumea Fascinantă a Culorilor
    </h1>
    <br />
    <p className='text-b1 text-center indent-5'>
      Teoria culorilor este fundamentul înțelegerii modului în care culorile interacționează, se combină și ne afectează. Fie că ești artist, designer, decorator sau pur și simplu curios să înțelegi mai bine lumea din jurul tău, cunoașterea teoriei culorilor îți va deschide noi perspective asupra frumuseții și armoniei vizuale.
    </p>
    <Wheel />
  </div>
</div>

    );
  };

  return (
    <HomeBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-white text-5xl font-bold mb-8 animate-fade-in">
            Bine ați venit!
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-white text-xl leading-relaxed animate-fade-in-delay">
              Culorile ne înconjoară în fiecare moment al vieții și au un impact profund asupra emoțiilor, comportamentului și percepției noastre asupra lumii. Fiecare nuanță poate evoca sentimente specifice și poate influența modul în care ne simțim și acționăm.
            </p>
          </div>
        </div>
      </div>
    </HomeBackground>
  );
};

export default Fireworks;