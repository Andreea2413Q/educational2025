const PaletteItem = ({ 
  palette, 
  displayedPalette, 
  editingPaletteId,
  hoveredColor,
  loading,
  onLoadPalette,
  onDisplayPalette,
  onDeletePalette,
  onColorHover,
  onColorLeave,
  onCopyColor,
  formatColorText
}) => {
  return (
    <div className="flex flex-col bg-gray-900/60 backdrop-blur-lg border border-pink-400/30 text-white py-3 px-4 rounded-xl w-full sm:w-4/5 mb-3 shadow-lg">
      <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center mb-3 sm:mb-0">
        <span 
          className="text-base sm:text-lg lg:text-xl xl:text-2xl cursor-pointer mb-3 sm:mb-0 sm:w-1/3 font-semibold text-pink-300 hover:text-pink-200 transition-colors" 
          onClick={() => onLoadPalette(palette)}
        >
          {palette.name}
        </span>
        <div className='flex flex-wrap gap-2 sm:w-2/3 justify-start sm:justify-end'>
          <button 
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50" 
            onClick={() => onDisplayPalette(palette)}
            disabled={loading}
          >
            {displayedPalette && displayedPalette.id === palette.id ? 'Ascunde' : 'Afișează'}
          </button>
          <button 
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50" 
            onClick={() => onLoadPalette(palette)}
            disabled={loading}
          >
            {editingPaletteId === palette.id ? 'Închide Editare' : 'Editează'}
          </button>
          <button 
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50" 
            onClick={() => onDeletePalette(palette.id)}
            disabled={loading}
          >
            Șterge
          </button>
        </div>
      </div>
      
      {displayedPalette && displayedPalette.id === palette.id && (
        <div className="w-full">
          <h3 className="text-lg text-cyan-300 font-bold mb-3 text-center sm:text-left">
            Culori în paleta:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
          
            {displayedPalette.colors && Array.isArray(displayedPalette.colors) ? (
              displayedPalette.colors.map((color, index) => (
                <div 
                  key={index} 
                  className="w-12 h-12 sm:w-16 sm:h-16 relative cursor-pointer border-2 border-white/30 hover:border-cyan-400/60 transition-all duration-200 hover:scale-105 rounded-lg" 
                  style={{ backgroundColor: color }}
                  onMouseEnter={() => onColorHover({color, index: `${palette.id}-${index}`})}
                  onMouseLeave={onColorLeave}
                  onClick={() => onCopyColor(color)}
                  title="Click pentru a copia culoarea în clipboard"
                >
                  {hoveredColor && hoveredColor.index === `${palette.id}-${index}` && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-lg text-white text-xs rounded whitespace-nowrap z-10 border border-cyan-400/50">
                      {formatColorText(color)}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                Nu există culori în această paletă
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteItem;