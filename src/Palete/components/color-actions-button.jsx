
const ColorActionButtons = ({ 
  onAddColor, 
  onGenerateSimilar, 
  loading 
}) => {
  return (
    <div className="w-full relative items-center flex">
      <button 
        className="text-sm md:text-base mt-4 ml-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 w-2/5" 
        onClick={onAddColor}
        disabled={loading}
      >
        Adaugați Culoare
      </button>

      <button
        className="text-sm md:text-base mt-4 ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-2 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-2/5"
        onClick={onGenerateSimilar}
        disabled={loading}
      >
        Generează 5 Culori Asemănătoare
      </button>
    </div>
  );
};

export default ColorActionButtons;