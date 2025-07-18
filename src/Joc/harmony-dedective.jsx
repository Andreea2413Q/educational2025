import React, { useState, useEffect } from 'react';

const PigmentAlchemist = () => {
  // State pentru culoarea țintă
  const [targetColor, setTargetColor] = useState({ r: 175, g: 128, b: 128 });
  
  // State pentru intensitățile cercurilor (aceasta este culoarea mixtă)
  const [intensities, setIntensities] = useState({
    red: 128,
    green: 128,
    blue: 128
  });
  
  // State pentru joc
  const [score, setScore] = useState(null);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  // Generează culoare țintă aleatoare
  const generateTargetColor = () => {
    const newTarget = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    setTargetColor(newTarget);
    setScore(null);
    
    // Reset intensitățile
    setIntensities({
      red: 128,
      green: 128,
      blue: 128
    });
  };

  // Culoarea mixtă este direct intensitățile
  const mixedColor = {
    r: intensities.red,
    g: intensities.green,
    b: intensities.blue
  };

  // Calculează punctajul
  const calculateScore = () => {
    const rDiff = Math.abs(targetColor.r - mixedColor.r);
    const gDiff = Math.abs(targetColor.g - mixedColor.g);
    const bDiff = Math.abs(targetColor.b - mixedColor.b);
    
    const totalDiff = rDiff + gDiff + bDiff;
    const maxDiff = 255 * 3;
    
    const newScore = Math.max(0, Math.round(100 - (totalDiff / maxDiff) * 100));
    
    setScore(newScore);
    setTotalScore(prev => prev + newScore);
    return newScore;
  };

  // Update intensitatea unei culori
  const updateIntensity = (color, value) => {
    setIntensities(prev => ({
      ...prev,
      [color]: parseInt(value)
    }));
  };

  // Pornește primul joc
  useEffect(() => {
    generateTargetColor();
  }, []);

  const rgbToString = (color) => `rgb(${color.r}, ${color.g}, ${color.b})`;

  const newGame = () => {
    setRound(prev => prev + 1);
    generateTargetColor();
  };

  const resetGame = () => {
    setRound(1);
    setTotalScore(0);
    generateTargetColor();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎨 Pigment Alchemist
          </h1>
          <p className="text-gray-600">Ajustează intensitățile pentru a recrea culoarea țintă!</p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <span className="bg-blue-100 px-3 py-1 rounded-full">Runda: {round}</span>
            <span className="bg-green-100 px-3 py-1 rounded-full">Punctaj Total: {totalScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Target & Current */}
          <div className="space-y-6">
            
            {/* Target Color */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">🎯 Culoarea Țintă</h2>
              <div className="flex items-center justify-center gap-4">
                <div 
                  className="w-24 h-24 rounded-2xl border-4 border-gray-300 shadow-lg"
                  style={{ backgroundColor: rgbToString(targetColor) }}
                ></div>
                <div className="text-sm font-mono bg-gray-100 p-3 rounded-lg">
                  <div className="text-red-600">🔴 Red: {targetColor.r}</div>
                  <div className="text-green-600">🟢 Green: {targetColor.g}</div>
                  <div className="text-blue-600">🔵 Blue: {targetColor.b}</div>
                </div>
              </div>
            </div>

            {/* Current Mixed Color */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">⚗️ Culoarea Ta</h2>
              <div className="flex items-center justify-center gap-4">
                <div 
                  className="w-24 h-24 rounded-2xl border-4 border-gray-300 shadow-lg transition-all duration-300"
                  style={{ backgroundColor: rgbToString(mixedColor) }}
                ></div>
                <div className="text-sm font-mono bg-gray-100 p-3 rounded-lg">
                  <div className="text-red-600">🔴 Red: {mixedColor.r}</div>
                  <div className="text-green-600">🟢 Green: {mixedColor.g}</div>
                  <div className="text-blue-600">🔵 Blue: {mixedColor.b}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {score === null ? (
                <button
                  onClick={calculateScore}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  🧪 Finalizează
                </button>
              ) : (
                <>
                  <button
                    onClick={newGame}
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    🎯 Următoarea
                  </button>
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    🔄 Reset
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Color Controls */}
          <div>
            <h2 className="text-xl font-semibold text-center mb-6">🎛️ Controluri RGB</h2>
            
            {/* Intensity Controls */}
            <div className="space-y-6 bg-white/70 p-6 rounded-xl border border-gray-200">
              
              {/* Red Intensity */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-lg font-medium">
                  <span className="flex items-center gap-2">
                    🔴 <span className="text-red-600">Red (Roșu)</span>
                  </span>
                  <span className="font-mono bg-red-100 px-4 py-2 rounded-lg text-red-700 font-bold text-xl">
                    {intensities.red}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={intensities.red}
                  onChange={(e) => updateIntensity('red', e.target.value)}
                  className="w-full h-4 bg-gradient-to-r from-gray-200 to-red-500 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Green Intensity */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-lg font-medium">
                  <span className="flex items-center gap-2">
                    🟢 <span className="text-green-600">Green (Verde)</span>
                  </span>
                  <span className="font-mono bg-green-100 px-4 py-2 rounded-lg text-green-700 font-bold text-xl">
                    {intensities.green}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={intensities.green}
                  onChange={(e) => updateIntensity('green', e.target.value)}
                  className="w-full h-4 bg-gradient-to-r from-gray-200 to-green-500 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Blue Intensity */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-lg font-medium">
                  <span className="flex items-center gap-2">
                    🔵 <span className="text-blue-600">Blue (Albastru)</span>
                  </span>
                  <span className="font-mono bg-blue-100 px-4 py-2 rounded-lg text-blue-700 font-bold text-xl">
                    {intensities.blue}
                  </span>
                  </label>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={intensities.blue}
                  onChange={(e) => updateIntensity('blue', e.target.value)}
                  className="w-full h-4 bg-gradient-to-r from-gray-200 to-blue-500 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="text-sm text-center text-gray-600 mt-6 bg-blue-50 p-3 rounded-lg">
                💡 Tip: Ajustează valorile RGB pentru a recrea exact culoarea țintă!
              </div>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {score !== null && (
          <div className="mt-6 text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300">
            <h3 className="text-2xl font-bold mb-2">
              {score >= 90 ? '🏆' : score >= 70 ? '🥈' : score >= 50 ? '🥉' : '💪'} 
              Punctajul Tău: {score}/100
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm mt-4">
              <div className="bg-red-200 p-2 rounded">
                <div className="font-semibold">Diferența R</div>
                <div className="font-mono">{Math.abs(targetColor.r - mixedColor.r)}</div>
              </div>
              <div className="bg-green-200 p-2 rounded">
                <div className="font-semibold">Diferența G</div>
                <div className="font-mono">{Math.abs(targetColor.g - mixedColor.g)}</div>
              </div>
              <div className="bg-blue-200 p-2 rounded">
                <div className="font-semibold">Diferența B</div>
                <div className="font-mono">{Math.abs(targetColor.b - mixedColor.b)}</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {score >= 95 && "🎉 Perfect! Maestru absolut al culorilor!"}
              {score >= 85 && score < 95 && "🌟 Excelent! Precizie incredibilă!"}
              {score >= 70 && score < 85 && "👍 Foarte bine! Bună înțelegere a RGB!"}
              {score >= 50 && score < 70 && "😊 Bun început! Continuă să experimentezi!"}
              {score < 50 && "💪 Încearcă să ajustezi sliderele mai atent!"}
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #374151;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #374151;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .slider:focus {
          outline: none;
        }

        .slider::-webkit-slider-track {
          height: 12px;
          border-radius: 6px;
        }

        .slider::-moz-range-track {
          height: 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default PigmentAlchemist;