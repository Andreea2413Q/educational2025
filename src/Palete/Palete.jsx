import { useState } from 'react';
import { useAuth } from '../Cont/authContext';
import { usePaletteData } from './hooks/use-pallete-data';
import { useColorManagement } from './hooks/color-management';
import Help from './help';
import BackgroundEffects from './components/background-effects';
import PaletteCreator from './components/palette-creator';
import PalettesList from './components/palettes-list';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <BackgroundEffects />

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
        onShowHelp={() => setShowHelp(true)}
        onLoadPalette={handleLoadPalette}
        onDisplayPalette={handleDisplayPalette}
        onDeletePalette={handleDeletePalette}
        onColorHover={setHoveredColor}
        onColorLeave={() => setHoveredColor(null)}
        onCopyColor={copyColorToClipboard}
        formatColorText={formatColorText}
      />

      {showHelp && (
        <Help showHelp={showHelp} setShowHelp={setShowHelp} />
      )}
    </div>
  );
};

export default ColorPaletteCreator