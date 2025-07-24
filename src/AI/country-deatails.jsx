
const CountryDetails = ({ 
  selectedCountry,
  selectedCapital,
  selectedPopulation,
  totalArea,
  languages,
  onClear 
}) => {
  if (!selectedCountry) return null;

  return (
    <div className="hidden lg:block fixed bottom-4 left-4 z-40 bg-white bg-opacity-95 rounded-lg p-4 max-w-sm shadow-lg">
      <h3 className="font-bold text-lg mb-2 text-green-800">🌍 {selectedCountry}</h3>
      <div className="text-sm space-y-1">
        <p><span className="font-semibold">Capitala:</span> {selectedCapital}</p>
        <p><span className="font-semibold">Populația:</span> {selectedPopulation}</p>
        <p><span className="font-semibold">Suprafața:</span> {totalArea}</p>
        {languages.length > 0 && (
          <p><span className="font-semibold">Limbi:</span> {languages.slice(0, 2).join(', ')}</p>
        )}
      </div>
      <button 
        onClick={onClear}
        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
      >
        ❌ Șterge
      </button>
    </div>
  );
};

export default CountryDetails;