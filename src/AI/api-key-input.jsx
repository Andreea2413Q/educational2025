
const ApiKeyInput = ({ apiKey, setApiKey, onTest }) => {
  return (
    <div className="p-3 lg:p-4 bg-orange-50 border-b border-orange-200">
      <p className="text-xs lg:text-sm text-orange-800 mb-2">
        🔑 Adaugă Groq API Key pentru răspunsuri AI complete:
      </p>
      <div className="flex space-x-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="gsk_..."
          className="flex-1 px-2 lg:px-3 py-1 text-xs lg:text-sm border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={onTest}
          className="px-2 lg:px-3 py-1 bg-orange-600 text-white text-xs lg:text-sm rounded hover:bg-orange-700 transition-colors"
        >
          Test
        </button>
      </div>
      <p className="text-xs text-orange-600 mt-1">
        Obține gratuit de la: <span className="font-mono">console.groq.com</span>
      </p>
    </div>
  );
};

export default ApiKeyInput;