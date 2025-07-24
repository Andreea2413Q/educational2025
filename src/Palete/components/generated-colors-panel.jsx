
const GeneratedColorsPanel = ({ 
  generatedColors, 
  onAddGeneratedColor, 
  onClearGenerated 
}) => {
  if (generatedColors.length === 0) return null;

  return (
    <div className="w-4/5 mx-auto mt-4 h-full p-4 bg-gray-900/60 backdrop-blur-lg border border-pink-400/30 rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-bold mb-3 text-pink-300">
        Culori Generate (click pentru a adăuga în paletă)
      </h3>
      <div className="flex flex-wrap justify-center">
        {generatedColors.map((color, index) => (
          <div 
            key={index} 
            className="m-1 w-16 h-16 cursor-pointer border-2 border-white/30 hover:border-cyan-400/60 transition-all duration-200 transform hover:scale-105 rounded-lg" 
            style={{ backgroundColor: color }}
            onClick={() => onAddGeneratedColor(color)}
            title={`Click pentru a adăuga culoarea ${color} în paletă`}
          >
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <button
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
          onClick={onClearGenerated}
        >
          Șterge Culorile Generate
        </button>
      </div>
    </div>
  );
};

export default GeneratedColorsPanel;