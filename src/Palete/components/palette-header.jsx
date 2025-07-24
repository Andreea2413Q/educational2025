
const PaletteHeader = ({ 
  currentUser, 
  loading, 
  onReload, 
  onShowHelp 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 gap-2">
      <div className="w-full flex">
        <p className="text-lg w-1/2 sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold text-center sm:text-left">
          Palete Salvate
        </p>
        <button 
          onClick={onShowHelp}
          className="text-white mr-2 bg-gradient-to-r from-purple-600 to-red-600 border border-cyan-400 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-red-700 text-sm sm:text-base"
          title="Cum se folosește?"
        >
          ?
        </button>
      </div>

      <div className="flex items-center gap-2 mr-5">
        {currentUser && (
          <button 
            onClick={onReload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
            disabled={loading}
          >
            {loading ? '⟳' : '↻'} Reîncarcă
          </button>
        )}
      </div>
    </div>
  );
};

export default PaletteHeader;