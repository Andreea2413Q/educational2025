import PaletteHeader from './palette-header';
import ColorFormatSelector from './color-format-selector';
import LoadingSpinner from './loading-spiner';
import EmptyPalettesMessage from './empty-palette-message';
import PaletteItem from './palette-item';

const PalettesList = ({
  currentUser,
  palettes,
  loading,
  displayedPalette,
  editingPaletteId,
  hoveredColor,
  colorFormat,
  setColorFormat,
  onReloadPalettes,
  onShowHelp,
  onLoadPalette,
  onDisplayPalette,
  onDeletePalette,
  onColorHover,
  onColorLeave,
  onCopyColor,
  formatColorText
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-start overflow-auto p-4 saved-palettes-container">
      <PaletteHeader
        currentUser={currentUser}
        loading={loading}
        onReload={onReloadPalettes}
        onShowHelp={onShowHelp}
      />

      <ColorFormatSelector
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
      />

      {loading && <LoadingSpinner />}

      {palettes.length === 0 && !loading && <EmptyPalettesMessage />}

      {palettes.map((palette, index) => (
        <PaletteItem
          key={index}
          palette={palette}
          displayedPalette={displayedPalette}
          editingPaletteId={editingPaletteId}
          hoveredColor={hoveredColor}
          loading={loading}
          onLoadPalette={onLoadPalette}
          onDisplayPalette={onDisplayPalette}
          onDeletePalette={onDeletePalette}
          onColorHover={onColorHover}
          onColorLeave={onColorLeave}
          onCopyColor={onCopyColor}
          formatColorText={formatColorText}
        />
      ))}
    </div>
  );
};

export default PalettesList;