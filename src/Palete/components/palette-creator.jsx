import { useMediaQuery } from '@react-hook/media-query';
import UserNotification from './user-notification';
import ColorPicker from './color-picker';
import PaletteForm from './palette-form';
import ColorActionButtons from './color-actions-button';
import GeneratedColorsPanel from './generated-colors-panel';
import CurrentColorsList from './current-colors-list';

const PaletteCreator = ({
  currentUser,
  paletteName,
  setPaletteName,
  selectedColor,
  onColorChange,
  colors,
  generatedColors,
  loading,
  onSavePalette,
  onAddColor,
  onGenerateSimilar,
  onAddGeneratedColor,
  onRemoveColor,
  onClearGenerated
}) => {
  const isScreenBelowMd = useMediaQuery('(max-width: 768px)');

  return (
    <div className="relative z-10 flex flex-col lg:flex-row mt-2 overflow-auto w-3/4 mx-auto">
      <UserNotification currentUser={currentUser} />
      
      <div className="relative z-10 flex flex-col lg:flex-row pt-5 w-screen min-h-screen overflow-auto">
        <div 
          className={`w-full lg:w-1/2 flex flex-col items-center justify-start ${isScreenBelowMd ? 'pb-8' : ''}`}
          style={{marginTop: isScreenBelowMd ? '0' : '0px'}}
        >
          <PaletteForm
            paletteName={paletteName}
            setPaletteName={setPaletteName}
            onSave={onSavePalette}
            loading={loading}
          />
          
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={onColorChange}
          />
          
          <ColorActionButtons
            onAddColor={onAddColor}
            onGenerateSimilar={onGenerateSimilar}
            loading={loading}
          />

          <GeneratedColorsPanel
            generatedColors={generatedColors}
            onAddGeneratedColor={onAddGeneratedColor}
            onClearGenerated={onClearGenerated}
          />

          <CurrentColorsList
            colors={colors}
            onRemoveColor={onRemoveColor}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaletteCreator;