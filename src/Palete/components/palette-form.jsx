
const PaletteForm = ({ 
  paletteName, 
  setPaletteName, 
  onSave, 
  loading 
}) => {
  return (
    <div className="md:flex mx-auto block w-full items-center justify-center my-3 sticky rounded focus:outline-none focus:shadow-outline">
      <input
        className="px-4 py-2 border  my-2 border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg rounded w-1/3 mr-5 md:text-md text-sm text-center  text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        placeholder="Nume Paleta"
        value={paletteName}
        onChange={e => setPaletteName(e.target.value)}
        disabled={loading}
      />
      <button 
        className={`text-xs md:text-base  w-2/4 px-4 py-2 text-white font-bold rounded transition-all duration-300 transform hover:scale-105 ${
          loading 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50'
        }`}
        onClick={onSave}
        disabled={loading}
      >
        {loading ? 'Se salvează...' : 'Salvează Paleta'}
      </button>
    </div>
  );
};

export default PaletteForm;