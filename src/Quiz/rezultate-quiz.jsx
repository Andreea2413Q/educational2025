import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

const QuizResults = ({ 
  currentQuiz, 
  score, 
  timeLeft, 
  quizProgress, 
  currentUser, 
  onRetry, 
  onHome 
}) => {

  if (!currentQuiz || !currentQuiz.questions) {
    return null;
  }

  const percentage = Math.round((score / currentQuiz.questions.length) * 100);
  
  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return { message: "Excelent! Performanță de top! 🏆", color: "text-green-600" };
    if (percentage >= 70) return { message: "Foarte bine! Cunoști subiectul! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Bine, dar mai poți învăța! 👍", color: "text-yellow-600" };
    return { message: "Mai exercitează! 📚", color: "text-red-600" };
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const scoreMsg = getScoreMessage(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-b1 via-b2 to-d4 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r ${currentQuiz.color || 'from-purple-800 to-pink-200'} rounded-full mx-auto mb-4 flex items-center justify-center`}>
              {percentage >= 70 ? (
                <CheckCircle className="text-white" size={40} />
              ) : (
                <XCircle className="text-white" size={40} />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {percentage >= 70 ? 'Felicitări! 🎉' : 'Rezultate'}
            </h2>
            <p className="text-xl text-gray-600 mb-1">{currentQuiz.title}</p>
            <p className="text-gray-500">{currentQuiz.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="text-6xl font-bold text-gray-800 mb-2">{score}</div>
            <div className="text-xl text-gray-600 mb-2">din {currentQuiz.questions.length} întrebări corecte</div>
            <div className="text-3xl font-bold text-purple-600">{percentage}%</div>
            
        
            <div className="mt-4">
              <div className={`w-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full h-3`}>
                <div 
                  className="bg-gray-300 bg-opacity-30 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className={`text-xl font-semibold mb-6 ${scoreMsg.color}`}>
            {scoreMsg.message}
          </div>
          
         
          <div className="mb-6 p-4 bg-black rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Clock size={16} />
              <span className="text-sm text-blue-700">
                Completat pe: {formatDate(new Date().toISOString())}
              </span>
            </div>
            {currentUser && (
              <div className="flex items-center justify-center space-x-2 text-blue-600 mt-1">
                <User size={16} />
                <span className="text-sm">
                  Utilizator: {currentUser.displayName || currentUser.email}
                </span>
              </div>
            )}
            {!currentUser && (
              <div className="flex items-center justify-center space-x-2 text-orange-600 mt-1 bg-black">
                <User size={16} />
                <span className="text-sm">
                  Utilizator: Anonim (Autentifică-te pentru sincronizare)
                </span>
              </div>
            )}
            
         
            <div className="flex items-center justify-center space-x-2 text-gray-600 mt-1">
              <Clock size={16} />
              <span className="text-sm">
                {(quizProgress && quizProgress[currentQuiz.id]?.timeExpired)
                  ? '❗⏰ ❗ Timpul s-a terminat' 
                  : `⏱️ Timp folosit: ${Math.floor(((currentQuiz.timeLimit || 600) - timeLeft) / 60)}:${(((currentQuiz.timeLimit || 600) - timeLeft) % 60).toString().padStart(2, '0')}`
                }
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className={`px-6 py-3 bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} text-white rounded-lg hover:opacity-90 transition-all duration-200 font-semibold`}
            >
              🔄 Încearcă din nou
            </button>
            <button
              onClick={onHome}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold"
            >
              🏠 Înapoi la quiz-uri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;