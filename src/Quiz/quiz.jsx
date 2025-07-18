import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, User, Calendar, Clock } from 'lucide-react';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';
import Iridescence from './iridence';
  
import ContrastSiAccesibilitate from './contrast_si_accesibilitate.json'
import fundamentaleData from './fundamentale.json';
import psihologia from './psihologia.json'
import armonie from './armonie.json'
import design from './design.json'
import simboluri from './simboluri.json'
import perceptia from './perceptia.json'
import temperatura from './temperatura.json'
import natura from './natura.json'


const db = getFirestore();

const QuizApp = () => {
  const { currentUser } = useAuth(); 
  
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizProgress, setQuizProgress] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);


  const quizDataMap = {
    'fundamentale.json': fundamentaleData,
    'contrast_si_accesibilitate.json':ContrastSiAccesibilitate,
        'psihologia.json': psihologia,
        'armonie.json':armonie,
        'design.json':design,
        'simboluri.json':simboluri,
        'perceptia.json':perceptia,
        'temperatura.json':temperatura,
        'natura.json':natura,
  };

  const quizFiles = [
    'fundamentale.json',
        'contrast_si_accesibilitate.json',
    'psihologia.json',
    'armonie.json',
    'design.json',
    'simboluri.json',
    'perceptia.json',
    'temperatura.json',
    'natura.json',

  ];

  // Timer 
  useEffect(() => {
    let interval = null;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            // Timpul s-a terminat - finalizează automat quiz-ul
            setTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Funcție pentru când se termină timpul
  const handleTimeUp = () => {
    // Finalizează quiz-ul automat
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    const percentage = Math.round((finalScore / currentQuiz.questions.length) * 100);
    
    setScore(finalScore);
    setShowResults(true);
    
    // Salvează progresul cu indicație că timpul s-a terminat
    saveProgress(currentQuiz.id, {
      completed: true,
      score: finalScore,
      totalQuestions: currentQuiz.questions.length,
      percentage: percentage,
      answers: selectedAnswers,
      timeExpired: true
    });
  };

  // Formatează timpul în minute:secunde
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Determină culoarea timer-ului bazat pe timpul rămas
  const getTimerColor = (timeLeft, totalTime) => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Încarcă progresul din Firebase sau localStorage
  useEffect(() => {
    loadProgress();
  }, [currentUser]);

  const loadProgress = async () => {
    try {
      if (currentUser) {
        // Încarcă din Firebase cu listener în timp real
        const unsubscribe = onSnapshot(
          collection(db, 'users', currentUser.uid, 'quizProgress'),
          (querySnapshot) => {
            const firebaseProgress = {};
            querySnapshot.forEach((doc) => {
              firebaseProgress[doc.id] = doc.data();
            });
            setQuizProgress(firebaseProgress);
          }
        );
        return unsubscribe;
      } else {
        // Încarcă din localStorage
        const savedProgress = localStorage.getItem('quizProgress');
        if (savedProgress) {
          try {
            setQuizProgress(JSON.parse(savedProgress));
          } catch (error) {
            console.error('Eroare la încărcarea progresului din localStorage:', error);
          }
        }
      }
    } catch (error) {
      console.error('Eroare la încărcarea progresului:', error);
    }
  };

  // Salvează progresul în Firebase sau localStorage
  const saveProgress = async (quizId, progressData) => {
    const dataToSave = {
      ...progressData,
      timestamp: new Date().toISOString(),
      userId: currentUser?.uid || 'anonymous'
    };
    
    try {
      if (currentUser) {
        // Salvează în Firebase
        await setDoc(doc(db, 'users', currentUser.uid, 'quizProgress', quizId), dataToSave);
      } else {
        // Salvează în localStorage
        const updatedProgress = {
          ...quizProgress,
          [quizId]: dataToSave
        };
        
        setQuizProgress(updatedProgress);
        localStorage.setItem('quizProgress', JSON.stringify(updatedProgress));
      }
    } catch (error) {
      console.error('Eroare la salvarea progresului:', error);
      // Fallback la localStorage dacă Firebase eșuează
      const updatedProgress = {
        ...quizProgress,
        [quizId]: dataToSave
      };
      
      setQuizProgress(updatedProgress);
      localStorage.setItem('quizProgress', JSON.stringify(updatedProgress));
    }
  };

  // Încarcă toate quiz-urile disponibile
  useEffect(() => {
    const loadAllQuizzes = async () => {
      try {
        const quizzesData = [];
        
        for (const fileName of quizFiles) {
          try {
            const data = quizDataMap[fileName];
            
            if (data) {
              quizzesData.push(data);
            }
          } catch (err) {
            console.error(`Eroare la încărcarea ${fileName}:`, err);
          }
        }
        
        setAvailableQuizzes(quizzesData);
        setLoading(false);
      } catch (err) {
        setError('Eroare la încărcarea quiz-urilor');
        setLoading(false);
      }
    };

    loadAllQuizzes();
  }, []);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    // Inițializează timer-ul
    setTimeLeft(quiz.timeLimit || 600); // Default 10 minute dacă nu e specificat
    setTimerActive(true);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    // Oprește timer-ul
    setTimerActive(false);
    
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    const percentage = Math.round((finalScore / currentQuiz.questions.length) * 100);
    
    setScore(finalScore);
    setShowResults(true);
    
    // Salvează progresul
    saveProgress(currentQuiz.id, {
      completed: true,
      score: finalScore,
      totalQuestions: currentQuiz.questions.length,
      percentage: percentage,
      answers: selectedAnswers,
      timeUsed: (currentQuiz.timeLimit || 600) - timeLeft
    });
  };

  const resetToHome = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimerActive(false);
    setTimeLeft(0);
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return { message: "Excelent! Performanță de top! 🏆", color: "text-green-600" };
    if (percentage >= 70) return { message: "Foarte bine! Cunoști subiectul! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Bine, dar mai poți învăța! 👍", color: "text-yellow-600" };
    return { message: "Mai exercitează! 📚", color: "text-red-600" };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'Ușor': return 'bg-green-100 text-green-800';
      case 'Intermediar': return 'bg-yellow-100 text-yellow-800';
      case 'Avansat': return 'bg-white text-red-500';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressIcon = (quiz) => {
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

  const getProgressBar = (quiz) => {
    const progress = quizProgress[quiz.id];
    
    if (!progress || !progress.completed) {
      return null;
    }
    
    const percentage = progress.percentage;
    const barColor = percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    
    return (
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-lg text-blue-700 ">Ultimul rezultat</span>
          <span className="text-lg font-semibold text-b1">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-500 rounded-full h-2">
          <div 
            className={`${barColor} h-2 rounded-full transition-all duration-300  `}
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

  const getQuizHistory = (quiz) => {
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Se încarcă quiz-urile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  // Pagina de rezultate
  if (showResults && currentQuiz) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
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
              
              {/* Bara de progres */}
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
            
            {/* Data și ora completării */}
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
              
              {/* Afișează informații despre timp */}
              <div className="flex items-center justify-center space-x-2 text-gray-600 mt-1">
                <Clock size={16} />
                <span className="text-sm">
                  {quizProgress[currentQuiz.id]?.timeExpired 
                    ? '⏰ Timpul s-a terminat' 
                    : `⏱️ Timp folosit: ${Math.floor(((currentQuiz.timeLimit || 600) - timeLeft) / 60)}:${(((currentQuiz.timeLimit || 600) - timeLeft) % 60).toString().padStart(2, '0')}`
                  }
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setScore(0);
                  // Resetează timer-ul pentru o nouă încercare
                  setTimeLeft(currentQuiz.timeLimit || 600);
                  setTimerActive(true);
                }}
                className={`px-6 py-3 bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} text-white rounded-lg hover:opacity-90 transition-all duration-200 font-semibold`}
              >
                🔄 Încearcă din nou
              </button>
              <button
                onClick={resetToHome}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold"
              >
                🏠 Înapoi la quiz-uri
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz page
  if (currentQuiz) {
    const currentQ = currentQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-400 to-pink-400 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center`}>
                  <span className="text-xl">{currentQuiz.icon || '🎯'}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{currentQuiz.title}</h1>
                  <p className="text-black">Întrebarea {currentQuestion + 1} din {currentQuiz.questions.length}</p>
                </div>
              </div>
              
              {/* Timer și buton de închidere */}
              <div className="flex items-center space-x-4">
                {/* Timer */}
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  timeLeft <= 60 ? 'bg-red-100' : timeLeft <= 300 ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <Clock size={20} className={getTimerColor(timeLeft, currentQuiz.timeLimit || 600)} />
                  <span className={`font-bold text-lg ${getTimerColor(timeLeft, currentQuiz.timeLimit || 600)}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                
                <button
                  onClick={resetToHome}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  title="Înapoi la quiz-uri"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className={`bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Timer progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeLeft <= 60 ? 'bg-red-500' : timeLeft <= 300 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${(timeLeft / (currentQuiz.timeLimit || 600)) * 100}%` }}
              ></div>
            </div>
            
            {/* Avertisment când timpul se apropie de sfârșit */}
            {timeLeft <= 60 && timeLeft > 0 && (
              <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium text-center">
                  ⚠️ Timpul se apropie de sfârșit! Mai ai {timeLeft} secunde!
                </p>
              </div>
            )}
          </div>

          {/* Question */}
          <div className="bg-b1 rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-xl font-semibold text-b4 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left  rounded-xl border-2 transition-all duration-200 text-black  ${
                    selectedAnswers[currentQuestion] === index
                      ? `border-purple-500 bg-purple-50 text-purple-700`
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25 '
                  }`}
                
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center  ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-purple-500 bg-purple-500 '
                        : 'border-gray-300 '
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full text-blue-700"></div>
                      )}
                    </div>
                    <span className="font-medium text-black">{answer}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Anterior
              </button>
              
              <div className="text-sm text-gray-500">
                {Object.keys(selectedAnswers).length} / {currentQuiz.questions.length} răspunsuri
              </div>
              
              {currentQuestion === currentQuiz.questions.length - 1 ? (
                <button
                  onClick={finishQuiz}
                  disabled={Object.keys(selectedAnswers).length !== currentQuiz.questions.length}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    Object.keys(selectedAnswers).length !== currentQuiz.questions.length
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  }`}
                >
                  🏁 Finalizează
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === undefined
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${currentQuiz.color || 'from-purple-500 to-pink-500'} text-white hover:opacity-90`
                  }`}
                >
                  Următorul →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home page 
  return (
    <div className="">
       <div className="absolute  w-full h-[200vh] overflow-hidden z-1">
      <Iridescence
  color={[1, 1, 1]}
  mouseReact={false}
  amplitude={0.1}
  speed={0.4}
/>
</div>

      <div className="max-w-6xl mx-auto  ">

        <div className='w-full flex'>
             <h1 className="text-2xl font-bold text-b1 mb-4 w-3/5 ">
  Alege un quiz și testează-ți cunoștințele! 
</h1> 
        <div className="text-center mx-auto w-2/6 block">
        
          <div className="flex justify-between items-center mb-6">
           
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm">
                {currentUser.photoURL && (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    {currentUser.displayName || 'Utilizator Google'}
                  </div>
                  <div className="text-xs text-gray-500">
                    ☁️ Sincronizat
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 bg-yellow-50 rounded-lg px-4 py-2 shadow-sm border border-yellow-200">
                <User size={20} className="text-yellow-600" />
                <div className="text-left">
                  <div className="text-sm font-medium text-yellow-800">
                    Utilizator Anonim
                  </div>
                  <div className="text-xs text-yellow-600">
                    💾 Salvare locală
                  </div>
                </div>
              </div>
            )}
          
          
       
</div>
</div>
          
          
          {!currentUser && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-black max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                💡 <strong>Sfat:</strong> Autentifică-te cu Google pentru a sincroniza progresul pe toate dispozitivele!
              </p>
            </div>
          )}
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {availableQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-pink-300  h-[500px]  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => startQuiz(quiz)}
            >
              {/* Card Header */}
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

              {/* Card Body */}
              <div className="p-6 h">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-black">📚 {quiz.category || 'General'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-black">
                    <span className="font-medium text-black">⏱️ {Math.round((quiz.timeLimit || 300) / 60)} min</span>
                  </div>
                </div>

                {/* Progress bar */}
                {getProgressBar(quiz)}

                {/* Quiz history */}
                {getQuizHistory(quiz)}

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-black">
                    <span className="font-medium text-black">{quiz.questions?.length || 0}</span> întrebări
                  </div>
                  <div className={`bg-gradient-to-r ${quiz.color || 'from-purple-500 to-pink-500'} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                    {quizProgress[quiz.id]?.completed ? 'Reluează Quiz-ul' : 'Începe Quiz-ul'} →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        {availableQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Nu s-au găsit quiz-uri</h3>
            <p className="text-gray-500">Verifică că fișierele JSON sunt în directorul corect.</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>💡 Progresul tău este salvat {currentUser ? 'în contul Google' : 'local în browser'}. 
          {!currentUser && ' Autentifică-te pentru sincronizare!'}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;