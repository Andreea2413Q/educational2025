import { useState, useRef, useEffect } from 'react';

const ContinuousColorWheel = ({ onColorChange, size = 240 }) => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('rgb(255, 0, 0)');
  const [isDragging, setIsDragging] = useState(false);

  // Convertește HSV la RGB
  const hsvToRgb = (h, s, v) => {
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    
    let r, g, b;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  };

  // Desenează roata de culori
  const drawColorWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    
    // Curăță canvas-ul
    ctx.clearRect(0, 0, size, size);
    
    // Desenează pixel cu pixel
    const imageData = ctx.createImageData(size, size);
    
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) {
          // Calculează unghiul (hue)
          let angle = Math.atan2(dy, dx) * 180 / Math.PI;
          if (angle < 0) angle += 360;
          
          // Calculează saturația bazată pe distanță
          const saturation = Math.min(distance / radius, 1);
          
          // Convertește la RGB
          const rgb = hsvToRgb(angle, saturation, 1);
          
          const index = (y * size + x) * 4;
          imageData.data[index] = rgb.r;     // R
          imageData.data[index + 1] = rgb.g; // G
          imageData.data[index + 2] = rgb.b; // B
          imageData.data[index + 3] = 255;   // A
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  // Obține culoarea din poziția mouse-ului
  const getColorFromPosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Verifică dacă e în roată
    if (distance > size / 2) return null;
    
    // Calculează unghiul și saturația
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    
    const saturation = Math.min(distance / (size / 2), 1);
    
    // Convertește la RGB
    const rgb = hsvToRgb(angle, saturation, 1);
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };

  const handleInteraction = (e) => {
    const color = getColorFromPosition(e);
    if (color) {
      setSelectedColor(color);
      onColorChange(color);
    }
  };

  useEffect(() => {
    drawColorWheel();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Roata de culori */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-full cursor-crosshair shadow-2xl border-2 border-white"
          onClick={handleInteraction}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleInteraction(e);
          }}
          onMouseMove={(e) => isDragging && handleInteraction(e)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        />
        
        {/* Indicator în centru */}
        <div 
          className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border-2 border-black shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: selectedColor }}
        />
      </div>

      {/* Afișaj culoare selectată */}
      <div className="bg-gray-800 backdrop-blur-sm rounded-lg px-3 py-1">
        <span className="text-white/90 text-sm font-mono">
          {selectedColor}
        </span>
      </div>
      
      <p className="  bg-gray-400 border-2 rounded-xl px-2 py-3 text-lg text-black text-center max-w-xs">
        Selectează pe roată pentru a schimba background-ul
      </p>
    </div>
  );
};

const Roata = () => {
  const [backgroundColor, setBackgroundColor] = useState('from-indigo-900 to-purple-900');

  const handleColorChange = (color) => {
    // Extrage valorile RGB din string
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return;
    
    const [, r, g, b] = match.map(Number);
    
    // Convertește RGB în clase Tailwind bazate pe culoarea dominantă
    let gradientClass;
    
    if (r > g && r > b) {
      // Roșu dominant
      if (g > 100) {
        gradientClass = 'from-red-900 to-orange-900';
      } else {
        gradientClass = 'from-red-900 to-pink-900';
      }
    } else if (g > r && g > b) {
      // Verde dominant
      if (r > 100) {
        gradientClass = 'from-yellow-900 to-green-900';
      } else if (b > 100) {
        gradientClass = 'from-green-900 to-teal-900';
      } else {
        gradientClass = 'from-green-800 to-green-900';
      }
    } else if (b > r && b > g) {
      // Albastru dominant
      if (r > 100) {
        gradientClass = 'from-purple-900 to-blue-900';
      } else if (g > 100) {
        gradientClass = 'from-blue-900 to-teal-900';
      } else {
        gradientClass = 'from-blue-900 to-indigo-900';
      }
    } else {
      // Culori mixte sau gri
      if (r > 150 && g > 150 && b > 150) {
        gradientClass = 'from-gray-700 to-gray-900';
      } else {
        gradientClass = 'from-slate-800 to-slate-900';
      }
    }
    
    setBackgroundColor(gradientClass);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundColor} transition-all duration-1000 ease-in-out`}>
      <div className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-yellow-100 to-yellow-600 bg-clip-text text-transparent drop-shadow-2xl">
              Teoria Culorilor
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90  leading-relaxed font-bold max-w-4xl mx-auto">
              Descoperă fascinanta lume a culorilor și transformă-ți înțelegerea despre impactul lor asupra vieții noastre
            </p>
          </div>
          
          {/* Roata de culori în loc de pensula */}
          <div className="relative mx-auto mb-12">
            <ContinuousColorWheel 
              onColorChange={handleColorChange}
              size={240}
            />
          </div>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            De la roșul care ne accelerează pulsul până la albastrul care ne calmează mintea,
            fiecare culoare are o poveste de spus. Explorează știința, psihologia și arta din spatele culorilor
            și descoperă cum să le folosești pentru a crea impresii de neuitat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roata;