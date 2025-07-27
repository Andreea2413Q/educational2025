
const SuggestedQuestions = ({ onQuestionSelect, show = true }) => {
  const suggestedQuestions = [
    "Ce înseamnă roșul în China?",
    "Semnificația albastru în India", 
    "Cum percep japonezii verdele?",
    "Galben în cultura africană",
    "Culorile tradiționale românești"
  ];

  if (!show) return null;

  return (
    <div className="px-3 lg:px-4 py-2 border-t border-gray-200 bg-white">
      <p className="text-xs text-gray-600 mb-2">Întrebări des întâlnite:</p>
      <div className="space-y-1">
        {suggestedQuestions.slice(0, 3).map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className="text-xs text-orange-600 hover:text-orange-800 block w-full text-left p-1 rounded hover:bg-orange-50 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions