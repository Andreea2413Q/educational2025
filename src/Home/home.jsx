import HomeFeatures from './home-feature';
import Hyperspeed from './HyperSpeed/hyper-speed';
import CyberpunkBackground from './main';

const Home = () => {
return (
  <>
 
    <div className='relative h-[100vh] overflow-hidden bg-blue-700'>
      <div className='absolute inset-0 z-0'>
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 450,
            roadWidth: 18,
            islandWidth: 2,
            lanesPerRoad: 6,
            fov: 95,
            fovSpeedUp: 160,
            speedUp: 1.5,
            carLightsFade: 0.5,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 60,
            shoulderLinesWidthPercentage: 0.08,
            brokenLinesWidthPercentage: 0.12,
            brokenLinesLengthPercentage: 0.6,
            lightStickWidth: [0.15, 0.6],
            lightStickHeight: [1.5, 2.0],
            movingAwaySpeed: [70, 100],
            movingCloserSpeed: [-140, -180],
            carLightsLength: [450 * 0.04, 450 * 0.25],
            carLightsRadius: [0.08, 0.18],
            carWidthPercentage: [0.25, 0.45],
            carShiftX: [-0.9, 0.9],
            carFloorSeparation: [0, 8],
            colors: {
              roadColor: 'black',
              islandColor: 'white',
              background: 'blue',
              shoulderLines: 'gray',
              brokenLines: 'black',
              leftCars: ['purple', 'blue', 'red'],
              rightCars: ['lime', 'yellow', 'pink'],
              sticks: 0x00FF7F,
            }
          }}
        />
      </div>
      
      <div className='relative z-10 h-full flex flex-col items-center justify-start pt-24 mx-5'>
        <div className='flex items-center gap-6'>
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight *1.2,
                behavior: 'smooth'
              });
            }}
            className='bg-gradient-to-r from-purple-600 to-pink-600
                      hover:from-purple-700 hover:to-pink-700
                      text-white font-bold p-4 rounded-full
                      shadow-2xl hover:shadow-purple-500/50
                      transition-all duration-300
                      border-2 border-white/20'
          >
            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </button>
          
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl bg-gradient-to-r from-yellow-500 via-white to-yellow-500 bg-clip-text text-transparent text-center'>
            Accelerează Prin Călătoria Cromatică
          </h1>
          
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 1.2,
                behavior: 'smooth'
              });
            }}
            className='bg-gradient-to-r from-purple-600 to-pink-600
                      hover:from-purple-700 hover:to-pink-700
                      text-white font-bold p-4 rounded-full
                      shadow-2xl hover:shadow-purple-500/50
                      transition-all duration-300
                      border-2 border-white/20'
          >
            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <CyberpunkBackground />
    <HomeFeatures />
  </>
);
};

export default Home;