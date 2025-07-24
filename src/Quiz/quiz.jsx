import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';
import Iridescence from './iridence';

import QuizCard from './quiz-card';
import QuizHeader from './quiz-in-run';
import QuizQuestion from './quiz-intrebari';
import QuizResults from './rezultate-quiz';

import ContrastSiAccesibilitate from './Intrebari/contrast_si_accesibilitate.json';
import fundamentaleData from './Intrebari/fundamentale.json';
import psihologia from './Intrebari/psihologia.json';
import armonie from './Intrebari/armonie.json';
import design from './Intrebari/design.json';
import simboluri from './Intrebari/simboluri.json';
import perceptia from './Intrebari/perceptia.json';
import temperatura from './Intrebari/temperatura.json';
import natura from './Intrebari/natura.json';

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
    'contrast_si_accesibilitate.json': ContrastSiAccesibilitate,
    'psihologia.json': psihologia,
    'armonie.json': armonie,
    'design.json': design,
    'simboluri.json': simboluri,
    'perceptia.json': perceptia,
    'temperatura.json': temperatura,
    'natura.json': natura,
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

  
  useEffect(() => {
    let interval = null;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
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

 
  useEffect(() => {
    loadProgress();
  }, [currentUser]);


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

  const handleTimeUp = () => {
   
    if (!currentQuiz || !currentQuiz.questions) {
      return;
    }

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
    
    saveProgress(currentQuiz.id, {
      completed: true,
      score: finalScore,
      totalQuestions: currentQuiz.questions.length,
      percentage: percentage,
      answers: selectedAnswers,
      timeExpired: true
    });
  };

  const loadProgress = async () => {
    try {
      if (currentUser) {
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

  const saveProgress = async (quizId, progressData) => {
    if (!quizId || !progressData) {
      return;
    }

    const dataToSave = {
      ...progressData,
      timestamp: new Date().toISOString(),
      userId: currentUser?.uid || 'anonymous'
    };
    
    try {
      if (currentUser) {
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'users', currentUser.uid, 'quizProgress', quizId), dataToSave);
      } else {
        const updatedProgress = {
          ...quizProgress,
          [quizId]: dataToSave
        };
        
        setQuizProgress(updatedProgress);
        localStorage.setItem('quizProgress', JSON.stringify(updatedProgress));
      }
    } catch (error) {
      console.error('Eroare la salvarea progresului:', error);
      const updatedProgress = {
        ...quizProgress,
        [quizId]: dataToSave
      };
      
      setQuizProgress(updatedProgress);
      localStorage.setItem('quizProgress', JSON.stringify(updatedProgress));
    }
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(quiz.timeLimit || 600);
    setTimerActive(true);
  };

  const finishQuiz = () => {
   
    if (!currentQuiz || !currentQuiz.questions) {
      return;
    }

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

  const retryQuiz = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setTimeLeft(currentQuiz.timeLimit || 600);
    setTimerActive(true);
  };

  
  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className=" top-0 left-0 w-full h-full min-h-screen overflow-hidden z-0">
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={0.4}
          />
        </div>
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-indigo-100/30 via-purple-50/30 to-pink-100/30 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Se încarcă quiz-urile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full min-h-screen overflow-hidden z-0">
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={0.4}
          />
        </div>
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-indigo-100/30 via-purple-50/30 to-pink-100/30 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-600 text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }


  if (showResults && currentQuiz) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full min-h-screen overflow-hidden z-0">
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={0.4}
          />
        </div>
        <div className="relative z-10">
          <QuizResults
            currentQuiz={currentQuiz}
            score={score}
            timeLeft={timeLeft}
            quizProgress={quizProgress || {}}
            currentUser={currentUser}
            onRetry={retryQuiz}
            onHome={resetToHome}
          />
        </div>
      </div>
    );
  }

  
  if (currentQuiz) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full min-h-screen overflow-hidden z-0">
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={false}
            amplitude={0.1}
            speed={0.4}
          />
        </div>
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-purple-800/20 via-purple-400/20 to-pink-400/20 p-4">
          <div className="max-w-2xl mx-auto">
            <QuizHeader
              currentQuiz={currentQuiz}
              currentQuestion={currentQuestion}
              timeLeft={timeLeft}
              onClose={resetToHome}
            />
            
            <QuizQuestion
              quiz={currentQuiz}
              currentQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              onSelectAnswer={(answerIndex) => {
                setSelectedAnswers(prev => ({
                  ...prev,
                  [currentQuestion]: answerIndex
                }));
              }}
              onPrevQuestion={() => setCurrentQuestion(prev => prev - 1)}
              onNextQuestion={() => setCurrentQuestion(prev => prev + 1)}
              onFinishQuiz={finishQuiz}
            />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full min-h-screen overflow-hidden z-[-1]">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={0.4}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        <div className='w-full flex flex-col lg:flex-row'>
          <h1 className="text-2xl font-bold text-b1 text-center mb-4 w-full lg:w-3/5">
            Alege un quiz și testează-ți cunoștințele! 
          </h1> 
          
          <div className="text-center mx-auto w-full lg:w-2/6 block">
            <div className="flex justify-center lg:justify-between items-center mb-6">
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

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {availableQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              quizProgress={quizProgress || {}}
              onStartQuiz={startQuiz}
            />
          ))}
        </div>

        {availableQuizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Nu s-au găsit quiz-uri</h3>
            <p className="text-gray-500">Verifică că fișierele JSON sunt în directorul corect.</p>
          </div>
        )}

      
       <div className="text-center mt-12 py-4 border-2 rounded-lg border-black text-black bg-slate-400 w-3/5 mx-auto flex justify-center items-center min-h-[40px]">           
  <p>💾 Progresul tău este salvat {currentUser ? 'în contul Google' : 'local, în browser'} 💾            
    {!currentUser && ' Autentifică-te pentru sincronizare!'}
  </p>         

</div>
      </div>
    </div>
  );
};

export default QuizApp;