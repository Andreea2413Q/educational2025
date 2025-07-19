import { CheckCircle, XCircle, Calendar } from 'lucide-react';

const QuizCard = ({ quiz, quizProgress, onStartQuiz }) => {
  
  if (!quiz) {
    return null;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'ușor': return 'bg-gray-700 text-green-800';
      case 'intermediar': return 'bg-gray-700 text-yellow-800';
      case 'avansat': return 'bg-gray-700 text-red-800';
      default: return 'bg-gray-700 text-red-800';
    }
  };

  const getProgressIcon = () => {
    if (!quizProgress) {
      return <XCircle className="text-gray-400" size={24} />;
    }
    
    const progress = quizProgress[quiz.id];
    
    if (!progress || !progress.completed) {
      return <XCircle className="text-gray-400" size={24} />;
    }
    
    if (progress.percentage >= 70) {
      return <CheckCircle className="text-green-500" size={24} />;
    } else {
      return <XCircle className="text-red-500" size={24} />;
    }
  };

  const getProgressBar = () => {
    if (!quizProgress) {
      return null;
    }
    
    const progress = quizProgress[quiz.id];
    
    if (!progress || !progress.completed) {
      return null;
    }
    
    const percentage = progress.percentage;
    const barColor = percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    
    return (
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-lg text-blue-700">Ultimul rezultat</span>
          <span className="text-lg font-semibold text-b1">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-500 rounded-full h-2">
          <div 
            className={`${barColor} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
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

  const getQuizHistory = () => {
    if (!quizProgress) {
      return null;
    }
    
    const progress = quizProgress[quiz.id];
    if (!progress || !progress.completed) return null;
    
    return (
      <div className="mt-3 p-3 bg-gray-200 rounded-lg">
        <div className="flex items-center justify-between text-xs text-black">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span className='text-black'>{formatDate(progress.timestamp)}</span>
          </div>
          <div className="flex items-center space-x-1 text-black">
            <span className='text-black'>{progress.score}/{progress.totalQuestions} corecte</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-pink-300 h-[500px] border-2 border-blue-900  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onStartQuiz(quiz)}
    >
     
      <div className={`bg-gradient-to-r ${quiz.color || 'from-purple-500 to-pink-500'} h-1/2 p-6 rounded-t-2xl text-yellow-300 text-center relative`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{quiz.icon || '🎯'}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)} bg-white bg-opacity-20 text-white`}>
            {quiz.difficulty || 'Mediu'}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-white text-lg text-opacity-90">{quiz.description}</p>
      </div>

     
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-black">📒 {quiz.category || 'General'}</span>
          </div>
          <div className="flex items-center space-x-2 text-black">
            <span className="font-medium text-black">⏱ {Math.round((quiz.timeLimit || 300) / 60)} min</span>
          </div>
        </div>

        {getProgressBar()}

      
        {getQuizHistory()}

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-black">
            <span className="font-medium text-black">{quiz.questions?.length || 0}</span> întrebări
          </div>
          <div className={`bg-gradient-to-r ${quiz.color || 'from-purple-500 to-pink-500'} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
            {(quizProgress && quizProgress[quiz.id]?.completed) ? 'Reluează Quiz-ul' : 'Începe Quiz-ul'} →
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;