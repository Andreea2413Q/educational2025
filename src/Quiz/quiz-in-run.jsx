import { Clock } from 'lucide-react';

const QuizHeader = ({ currentQuiz, currentQuestion, timeLeft, onClose }) => {

  if (!currentQuiz || !currentQuiz.questions) {
    return null;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = (timeLeft, totalTime) => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center`}>
            <span className="text-xl">{currentQuiz.icon || '❗'}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentQuiz.title}</h1>
            <p className="text-black">Întrebarea {currentQuestion + 1} din {currentQuiz.questions.length}</p>
          </div>
        </div>
        
       
        <div className="flex items-center space-x-4">
         
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            timeLeft <= 60 ? 'bg-red-100' : timeLeft <= 300 ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            <Clock size={20} className={getTimerColor(timeLeft, currentQuiz.timeLimit || 600)} />
            <span className={`font-bold text-lg ${getTimerColor(timeLeft, currentQuiz.timeLimit || 600)}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            title="Înapoi la quiz-uri"
          >
            ✕
          </button>
        </div>
      </div>
      
    
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className={`bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} h-3 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
 
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft <= 60 ? 'bg-red-500' : timeLeft <= 300 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${(timeLeft / (currentQuiz.timeLimit || 600)) * 100}%` }}
        ></div>
      </div>
      
    
      {timeLeft <= 60 && timeLeft > 0 && (
        <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium text-center">
            ⚠️ Timpul se apropie de sfârșit! Mai ai {timeLeft} secunde!
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizHeader;