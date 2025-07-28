import { useState } from 'react';
import { useAuth } from '../Cont/authContext';
import { usePaletteData } from './hooks/use-pallete-data';
import { useColorManagement } from './hooks/color-management';

import PaletteCreator from './components/palette-creator';
import PalettesList from './components/palettes-list';


const PaleteHelp = ({ showHelp, setShowHelp }) => {
  console.log('🎨 PaleteHelp render - showHelp:', showHelp); 
  
  if (!showHelp) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }} 
      onClick={(e) => {
     
        if (e.target === e.currentTarget) {
          setShowHelp(false);
        }
      }}
    >
      <div 
        className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} 
      >
      
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-white">
            🎨 Cum folosim Paletele de Culori
          </h2>
          <button 
            onClick={() => {
              console.log('Close button clicked'); 
              setShowHelp(false);
            }}
            className="text-white hover:text-red-300 text-4xl font-bold leading-none transition-colors duration-300 hover:scale-110 w-10 h-10 flex items-center justify-center"
            title="Închide"
            aria-label="Închide fereastra de ajutor"
          >
            ×
          </button>
        </div>

       
        <div className="p-6 space-y-8 bg-gradient-to-b from-gray-800 to-gray-900">
          
        
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 rounded-xl">
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                🎨 1. Crearea Paletelor
              </h3>
              <div className="space-y-3 text-gray-200">
                <p><strong className="text-blue-300">Selectează culoare:</strong> folosește picker-ul pentru a alege culoarea dorită</p>
                <p><strong className="text-blue-300">Completează numele paletei:</strong> obligatoriu pentru salvare</p>
                <p><strong className="text-blue-300">Adaugă culoare:</strong> click pe "Adaugă Culoare" pentru a o include în paletă</p>
                <p><strong className="text-blue-300">Generează culori asemănătoare:</strong> obține automat 5 culori similare</p>
                <p><strong className="text-blue-300">Salvează paleta:</strong> se salvează automat local sau în cont</p>
              </div>
            </div>
          </div>

        
          <div className="bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 p-1 rounded-xl">
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                🗂️ 2. Gestionarea Paletelor
              </h3>
              <div className="space-y-3 text-gray-200">
                <p><strong className="text-green-300">Afișează:</strong> click pe "Afișează" pentru a vedea toate culorile din paletă</p>
                <p><strong className="text-green-300">Editează:</strong> click pe "Editează" pentru a modifica paleta existentă</p>
                <p><strong className="text-green-300">Șterge:</strong> click pe "Șterge" pentru a elimina definitiv paleta</p>
                <p><strong className="text-green-300">Copiază culori:</strong> click pe orice culoare pentru a o copia în clipboard</p>
                <p><strong className="text-green-300">Reîncarcă:</strong> actualizează lista de palete salvate</p>
              </div>
            </div>
          </div>

      
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-1 rounded-xl">
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                🔧 3. Funcții Avansate
              </h3>
              <div className="space-y-3 text-gray-200">
                <p><strong className="text-orange-300">Format culori:</strong> alege între HEX, RGB sau HSL pentru afișare</p>
                <p><strong className="text-orange-300">Preview la hover:</strong> treci cu mouse-ul peste culori pentru a vedea codul</p>
                <p><strong className="text-orange-300">Elimină din paletă:</strong> hover pe culoare în editare și click "Elimină"</p>
                <p><strong className="text-orange-300">Culori generate:</strong> click pe culorile generate pentru a le adăuga în paletă</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 p-1 rounded-xl">
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                ☁️ 4. Sincronizare Date
              </h3>
              <div className="space-y-3 text-gray-200">
                <p><strong className="text-purple-300">Conectat în cont:</strong> salvare în cloud sincronizată</p>
                <p><strong className="text-purple-300">Fără cont:</strong> salvare locală în browser</p>
                <p><strong className="text-purple-300">Beneficii Cont:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• <strong className="text-purple-300">Acces multi-device:</strong> acces la toate paletele de pe orice dispozitiv</li>
                  <li>• <strong className="text-purple-300">Backup automat:</strong> paletele tale sunt mereu în siguranță</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
   
       
        <div className="sticky bottom-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center border-t border-gray-600 rounded-b-2xl">
          <button 
            onClick={() => {
              console.log('Footer button clicked'); 
              setShowHelp(false);
            }}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Am înțeles! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

const ColorPaletteCreator = () => {
  const { currentUser } = useAuth();
  const [paletteName, setPaletteName] = useState('');
  const [editingPaletteId, setEditingPaletteId] = useState(null);
  const [displayedPalette, setDisplayedPalette] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const {
    palettes,
    loading,
    loadFirebasePalettes,
    savePalette,
    deletePalette
  } = usePaletteData(currentUser);

  const {
    colors,
    setColors,
    generatedColors,
    setGeneratedColors,
    selectedColor,
    colorFormat,
    setColorFormat,
    hoveredColor,
    setHoveredColor,
    formatColorText,
    copyColorToClipboard,
    generateSimilarColors,
    addColor,
    addGeneratedColor,
    removeColor,
    resetColors,
    changeColor
  } = useColorManagement();

  const handleSavePalette = async () => {
    const success = await savePalette(paletteName, colors, editingPaletteId);
    if (success) {
      resetPalette();
    }
  };

  const resetPalette = () => {
    setColors([]);
    setPaletteName('');
    setEditingPaletteId(null);
    setGeneratedColors([]);
  };

  const handleLoadPalette = (palette) => {
    if (editingPaletteId === palette.id) {
      resetPalette();
    } else {
      setColors(palette.colors);
      setPaletteName(palette.name);
      setEditingPaletteId(palette.id);
      setDisplayedPalette(null);
    }
  };

  const handleDisplayPalette = (palette) => {
    if (displayedPalette && displayedPalette.id === palette.id) {
      setDisplayedPalette(null);
    } else {
      setDisplayedPalette(palette);
    }
  };

  const handleDeletePalette = async (id) => {
    const success = await deletePalette(id);
    if (success) {
      resetPalette();
      if (displayedPalette && displayedPalette.id === id) {
        setDisplayedPalette(null);
      }
    }
  };

  const handleClearGenerated = () => {
    setGeneratedColors([]);
  };

  const handleShowHelp = () => {
    console.log('🎨 HELP: handleShowHelp called, current showHelp:', showHelp); 
    setShowHelp(true);
    console.log('🎨 HELP: showHelp set to true'); 
  };

  console.log('🎨 ColorPaletteCreator render - showHelp:', showHelp, 'handleShowHelp:', typeof handleShowHelp); 

  return (
    <div className="min-h-screen md:flex bg-gradient-to-br block from-gray-900 via-purple-900 to-black relative overflow-hidden">
     



      <PaletteCreator
        currentUser={currentUser}
        paletteName={paletteName}
        setPaletteName={setPaletteName}
        selectedColor={selectedColor}
        onColorChange={changeColor}
        colors={colors}
        generatedColors={generatedColors}
        loading={loading}
        onSavePalette={handleSavePalette}
        onAddColor={addColor}
        onGenerateSimilar={generateSimilarColors}
        onAddGeneratedColor={addGeneratedColor}
        onRemoveColor={removeColor}
        onClearGenerated={handleClearGenerated}
      />

      <PalettesList
        currentUser={currentUser}
        palettes={palettes}
        loading={loading}
        displayedPalette={displayedPalette}
        editingPaletteId={editingPaletteId}
        hoveredColor={hoveredColor}
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
        onReloadPalettes={loadFirebasePalettes}
        onShowHelp={handleShowHelp} 
        onLoadPalette={handleLoadPalette}
        onDisplayPalette={handleDisplayPalette}
        onDeletePalette={handleDeletePalette}
        onColorHover={setHoveredColor}
        onColorLeave={() => setHoveredColor(null)}
        onCopyColor={copyColorToClipboard}
        formatColorText={formatColorText}
      />

      <PaleteHelp showHelp={showHelp} setShowHelp={setShowHelp} />
    </div>
  );
};

export default ColorPaletteCreator;