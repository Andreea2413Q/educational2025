const PaletteHeader = ({ 
  currentUser, 
  loading, 
  onReload, 
  onShowHelp 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-4 gap-4">
     
      <div className="flex items-center gap-3 flex-1">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold">
          Palete Salvate
        </h1>
        <button 
          onClick={onShowHelp}
          className="flex items-center justify-center w-8 h-8 text-white bg-gradient-to-r from-purple-600 to-red-600 border border-cyan-400 rounded-full transition-all duration-300 hover:from-purple-700 hover:to-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          title="Cum se folosește?"
          aria-label="Afișează ajutorul pentru utilizarea paletelor"
        >
          <span className="text-sm font-semibold">?</span>
        </button>
      </div>

   
      <div className="flex items-center gap-2">
        {currentUser && (
          <button 
            onClick={onReload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            disabled={loading}
            aria-label={loading ? "Se reîncarcă paletele..." : "Reîncarcă paletele salvate"}
          >
            <span className={`text-base ${loading ? 'animate-spin' : ''}`}>
              {loading ? '⟳' : '↻'}
            </span>
            <span className="hidden sm:inline">
              {loading ? 'Se reîncarcă...' : 'Reîncarcă'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PaletteHeader;