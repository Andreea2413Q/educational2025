import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';

const db = getFirestore();

export default function App() {
  const { currentUser } = useAuth();

  const [circleCount, setCircleCount] = useState(12);
  const [circles, setCircles] = useState([]);
  const [time, setTime] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [score, setScore] = useState(0);
  const [challengeColor, setChallengeColor] = useState('');
  const [bestScore, setBestScore] = useState(0);

  const getRandomColor = () => {
    const colors = ['blue', 'red', 'purple', 'yellow', 'green', 'pink', 'black'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetGame = () => {
    setTimerActive(false);
    setTimeLeft(time);
    setScore(0);
    const newChallengeColor = getRandomColor();
    let newCircles = Array.from({ length: circleCount - 1 }, () => getRandomColor());
    newCircles.push(newChallengeColor);
    newCircles = shuffleArray(newCircles);
    setCircles(newCircles);
    setChallengeColor(newChallengeColor);
  };

  const startTimer = () => {
    if (!timerActive) {
      setTimerActive(true);
      setTimeLeft(time);
      const newChallengeColor = getRandomColor();
      setChallengeColor(newChallengeColor);
      setScore(0);

      let newCircles = Array.from({ length: circleCount - 1 }, () => getRandomColor());
      newCircles.push(newChallengeColor);
      newCircles = shuffleArray(newCircles);

      setCircles(newCircles);
    }
  };

  useEffect(() => {
    resetGame();
  }, [circleCount, time]);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timerActive]);

  const handleCircleClick = (color) => {
    if (!timerActive || timeLeft <= 0) return;

    if (color === challengeColor) {
      setScore((prev) => prev + 1);

      const newChallengeColor = getRandomColor();
      let newCircles = Array.from({ length: circleCount - 1 }, () => getRandomColor());
      newCircles.push(newChallengeColor);
      newCircles = shuffleArray(newCircles);

      setCircles(newCircles);
      setChallengeColor(newChallengeColor);
    } else {
      setScore((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  useEffect(() => {
    if (!currentUser) {
      setBestScore(0);
      return;
    }

    const bestScoreDocRef = doc(db, 'color-circle-bestScores', currentUser.uid);

    getDoc(bestScoreDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        setBestScore(docSnap.data().score || 0);
      } else {
        setBestScore(0);
      }
    }).catch(console.error);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    if (score > bestScore) {
      setBestScore(score);

      const bestScoreDocRef = doc(db, 'color-circle-bestScores', currentUser.uid);

      setDoc(bestScoreDocRef, { score }, { merge: true }).catch(console.error);
    }
  }, [score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Color Circle Game
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>

        {!currentUser && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-400/30 rounded-xl backdrop-blur-lg">
            <p className="text-yellow-300 text-center text-sm sm:text-base">
              Autentifică-te pentru a salva scorul în contul tău!
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mb-8 w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <select
              value={circleCount}
              onChange={(e) => setCircleCount(Number(e.target.value))}
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-900/80 border-2 border-cyan-400/50 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 backdrop-blur-lg text-center text-sm sm:text-base"
            >
              <option value={12}>12 cercuri</option>
              <option value={24}>24 cercuri</option>
              <option value={36}>36 cercuri</option>
            </select>

            <select
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-900/80 border-2 border-pink-400/50 text-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400/50 backdrop-blur-lg text-center text-sm sm:text-base"
            >
              <option value={15}>15 secunde</option>
              <option value={30}>30 secunde</option>
              <option value={60}>60 secunde</option>
            </select>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => setTimerActive((prev) => !prev)}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 border border-orange-400/50 text-sm sm:text-base"
            >
              {timerActive ? 'Pauză' : 'Start'}
            </button>
            <button
              onClick={resetGame}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 border border-purple-400/50 text-sm sm:text-base"
            >
              Resetează
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
          {challengeColor && (
            <div className="bg-gray-900/60 border-2 border-cyan-400/50 rounded-lg p-3 sm:p-4 backdrop-blur-lg">
              <p className="text-cyan-300 text-xs sm:text-sm mb-2 font-semibold">Găsește această culoare:</p>
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto border-2 border-white/50 shadow-lg hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: challengeColor }}
                title="Culoarea căutată"
              />
            </div>
          )}

          <div className="bg-pink-900/20 border border-pink-400/30 rounded-lg p-3 sm:p-4 text-center backdrop-blur-lg">
            <div className="text-pink-300 font-semibold text-xs sm:text-sm mb-1">Timp rămas</div>
            <div className="text-pink-400 text-lg sm:text-xl font-bold">{timeLeft.toFixed(1)}s</div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-3 lg:gap-4 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mb-8">
          {circles.map((color, i) => (
            <button
              key={i}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full focus:outline-none border-2 border-white/30 hover:border-white/70 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-white/25"
              style={{ backgroundColor: color }}
              onClick={() => handleCircleClick(color)}
              aria-label={`Cerc culoare ${color}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <div className="bg-orange-900/20 border border-orange-400/30 rounded-xl p-4 text-center backdrop-blur-lg">
            <div className="text-orange-300 font-semibold text-sm mb-1">Scor Actual</div>
            <div className="text-orange-400 text-xl sm:text-2xl font-bold">{score}</div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-xl p-4 text-center backdrop-blur-lg">
            <div className="text-yellow-300 font-semibold text-sm mb-1">Cel Mai Bun Scor</div>
            <div className="text-yellow-400 text-xl sm:text-2xl font-bold">{bestScore}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}