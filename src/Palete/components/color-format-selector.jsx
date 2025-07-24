const ColorFormatSelector = ({ 
  colorFormat, 
  setColorFormat 
}) => {
  return (
    <div className="w-full sm:w-4/5 mx-auto mb-4">
      <label className="block text-xl font-medium text-cyan-300 mb-2 text-center sm:text-left">
        Format afișare culori la hover:
      </label>
      <select 
        value={colorFormat} 
        onChange={(e) => setColorFormat(e.target.value)}
        className="w-full p-2 border border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg text-cyan-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
      >
        <option value="HEX">HEX (#FFFFFF)</option>
        <option value="RGB">RGB (255, 255, 255)</option>
        <option value="HSL">HSL (360, 100%, 100%)</option>
      </select>
    </div>
  );
};

export default ColorFormatSelector;