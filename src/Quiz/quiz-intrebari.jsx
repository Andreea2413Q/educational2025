const QuizQuestion = ({ 
  quiz, 
  currentQuestion, 
  selectedAnswers, 
  onSelectAnswer, 
  onPrevQuestion, 
  onNextQuestion, 
  onFinishQuiz 
}) => {

  if (!quiz || !quiz.questions || !quiz.questions[currentQuestion]) {
    return null;
  }

  const currentQ = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const allAnswersProvided = selectedAnswers ? Object.keys(selectedAnswers).length === quiz.questions.length : false;

  return (
    <>
     
      <div className="bg-gray-900 border-2 border-white rounded-2xl shadow-lg p-8 mb-6 ">
        <h2 className="text-xl font-semibold text-b4 mb-6 leading-relaxed">
          {currentQ.question}
        </h2>
        
        <div className="space-y-3 bg-gray-700 py-4 rounded-md w-full mx-auto">
          {currentQ.answers && currentQ.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={` w-4/5 mx-auto flex p-4 text-left rounded-xl border-2 transition-all duration-200 text-white ${
                selectedAnswers && selectedAnswers[currentQuestion] === index
                  ? `border-blue-900 bg-blue-700 `
                  : ' hover:border-white hover:bg-blue-400 hover:text-white text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers && selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-white'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers && selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2  rounded-full text-blue-400"></div>
                  )}
                </div>
                <span className="font-medium text-white">{answer}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-100 text-black cursor-not-allowed'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            ← Anterior
          </button>
          
          <div className="text-sm text-gray-700">
            {selectedAnswers ? Object.keys(selectedAnswers).length : 0} / {quiz.questions.length} răspunsuri
          </div>
          
          {isLastQuestion ? (
            <button
              onClick={onFinishQuiz}
              disabled={!allAnswersProvided}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                !allAnswersProvided
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
              }`}
            >
              🏁 Finalizează
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              disabled={!selectedAnswers || selectedAnswers[currentQuestion] === undefined}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                (!selectedAnswers || selectedAnswers[currentQuestion] === undefined)
                  ? 'bg-gray-100 text-black cursor-not-allowed'
                  : `bg-gradient-to-r ${quiz.color || 'from-purple-500 to-pink-500'} text-white hover:opacity-90`
              }`}
            >
              Următorul →
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;