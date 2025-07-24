
const CurrentColorsList = ({ 
  colors, 
  onRemoveColor, 
  loading 
}) => {
  return (
    <div className="w-full flex flex-wrap justify-center mt-2">
      {colors.map((color, index) => (
        <div 
          key={index} 
          className="m-1 w-16 h-16 flex justify-center items-center relative cursor-pointer rounded-lg border-2 border-white/30 hover:border-red-400/60 transition-all duration-200" 
          style={{ backgroundColor: color }}
        >
          <button 
            className="absolute inset-0 w-full h-full text-black opacity-0 hover:opacity-80 hover:bg-red-900 rounded-lg transition-all duration-200" 
            onClick={() => onRemoveColor(color)}
            disabled={loading}
            title="Click pentru a elimina culoarea"
          >
            Elimină
          </button>
        </div>
      ))}
    </div>
  );
};

export default CurrentColorsList;