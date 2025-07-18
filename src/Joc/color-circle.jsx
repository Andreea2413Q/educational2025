import React, { useState, useEffect } from 'react';
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
  const [showHelp, setShowHelp] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br bg-b2 flex flex-col items-center p-4">
      {/* Mesaj de autentificare */}
      {!currentUser && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-4 text-center">
          🔒 Autentifică-te pentru a salva scorul în contul tău!
        </div>
      )}

      <div className="flex items-center justify-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white">
          Ajustează setările și obține cel mai bun scor
        </h1>
        <button 
          onClick={() => setShowHelp(true)}
          className="bg-gray-500 text-white px-3 py-2 rounded text-lg hover:bg-gray-600 transition-colors"
          title="Cum se joacă?"
        >
          ?
        </button>
      </div>

      {/* Settings */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6 w-full max-w-xl justify-center">
        <select
          value={circleCount}
          onChange={(e) => setCircleCount(Number(e.target.value))}
          className="p-2 rounded text-lg text-center"
        >
          <option value={12}>12 cercuri</option>
          <option value={24}>24 cercuri</option>
          <option value={36}>36 cercuri</option>
        </select>

        <select
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="p-2 rounded text-lg text-center"
        >
          <option value={15}>15 secunde</option>
          <option value={30}>30 secunde</option>
          <option value={60}>60 secunde</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <button
          onClick={() => setTimerActive((prev) => !prev)}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white font-semibold transition-colors"
        >
          {timerActive ? 'Pauză' : 'Start'}
        </button>
        <button
          onClick={resetGame}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold transition-colors"
        >
          Resetează
        </button>
      </div>

      {/* Challenge Color */}
      {challengeColor && (
        <div className="text-center mb-6">
          <p className="text-white text-lg mb-2 font-semibold">Găsește această culoare:</p>
          <div
            className="w-16 h-16 rounded-full mx-auto cursor-pointer border-1 border-white shadow-lg"
            style={{ backgroundColor: challengeColor }}
            title="Culoarea căutată"
          />
        </div>
      )}

      {/* Timer */}
      <p className="text-xl font-semibold text-pink-300 mb-6">
        Timp rămas: {timeLeft.toFixed(1)}s
      </p>

      {/* Circles Grid - 6 per row */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3 lg:gap-4 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
        {circles.map((color, i) => (
          <button
            key={i}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full focus:outline-none border-2 border-white hover:scale-110 transition-transform duration-200 shadow-md"
            style={{ backgroundColor: color }}
            onClick={() => handleCircleClick(color)}
            aria-label={`Cerc culoare ${color}`}
          />
        ))}
      </div>

      {/* Scores */}
      <div className="mt-10 text-center text-white space-y-2">
        <p className="text-xl sm:text-2xl font-bold text-orange-400">Scor Actual: {score}</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">Cel Mai Bun Scor: {bestScore}</p>
      </div>

      {/* Modal Help */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Header cu X */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-3xl font-bold text-gray-800">🎯 Cum se joacă Color Circle</h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 text-4xl font-bold leading-none transition-colors"
                title="Închide"
              >
                ×
              </button>
            </div>

            {/* Conținut */}
            <div className="p-6 space-y-8">
              {/* Secțiunea 1: Obiectivul jocului */}
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Obiectivul Jocului</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Scopul:</strong> Găsește și click pe cercul care are aceeași culoare ca exemplul afișat</p>
                  <p><strong>Provocarea:</strong> Obține cel mai mic timp</p>
                  <p><strong>Atenție:</strong> Culorile se schimbă după fiecare ghicire corectă</p>
                </div>
              </div>

              {/* Secțiunea 2: Cum se joacă */}
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 mb-4">🎮 Cum se Joacă</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>1. Alege setările:</strong> Numărul de cercuri (12/24/36) și timpul (15/30/60 secunde)</p>
                  <p><strong>2. Apasă Start:</strong> Timerul începe și jocul se activează</p>
                  <p><strong>3. Observă exemplul:</strong> Culoarea afișată deasupra grilei</p>
                  <p><strong>4. Găsește și click:</strong> Pe cercul cu aceeași culoare din grilă</p>
                  <p><strong>5. Repetă:</strong> Culorile se schimbă automat după fiecare răspuns corect</p>
                </div>
              </div>

              {/* Secțiunea 3: Sistem de punctaj */}
              <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-800 mb-4">📊 Sistem de Punctaj</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>✅ Răspuns corect:</strong> +1 punct și culorile se schimbă</p>
                  <p><strong>❌ Răspuns greșit:</strong> -1 punct (nu poate fi sub 0)</p>
                  <p><strong>🏆 Cel mai bun scor:</strong> Se salvează automat (în cont sau local)</p>
                  <p><strong>⏰ La final de timp:</strong> Jocul se oprește automat</p>
                </div>
              </div>

              {/* Secțiunea 4: Setări și dificultate */}
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-800 mb-4">⚙️ Setări și Dificultate</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>12 cercuri:</strong> Mai ușor - mai puține opțiuni de ales</p>
                  <p><strong>24 cercuri:</strong> Dificultate medie - echilibru bun</p>
                  <p><strong>36 cercuri:</strong> Dificultate mare - multe distrageri</p>
                  <p><strong>Timp:</strong> Alege între 15, 30 sau 60 de secunde</p>
                </div>
              </div>

              {/* Secțiunea 5: Strategii */}
              <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-800 mb-4">🧠 Strategii și Sfaturi</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• <strong>Concentrează-te:</strong> Privește atent culoarea exemplu înainte să cauți</p>
                  <p>• <strong>Scanează metodic:</strong> Parcurge grila în mod organizat</p>
                  <p>• <strong>Nu te grăbi:</strong> Un răspuns greșit îți scade punctajul</p>
                  <p>• <strong>Antrenează-te:</strong> Începe cu mai puține cercuri și timp mai mult</p>
                  <p>• <strong>Folosește pauza:</strong> Pentru a-ți planifica strategia</p>
                </div>
              </div>

              {/* Secțiunea 6: Culorile disponibile */}
              <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">🎨 Culorile Disponibile</h3>
                <div className="space-y-3 text-gray-700">
                  <p>Jocul folosește 7 culori de bază:</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-500 border border-gray-300"></div>
                      <span>Albastru</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-red-500 border border-gray-300"></div>
                      <span>Roșu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-500 border border-gray-300"></div>
                      <span>Mov</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-yellow-500 border border-gray-300"></div>
                      <span>Galben</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-green-500 border border-gray-300"></div>
                      <span>Verde</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-pink-500 border border-gray-300"></div>
                      <span>Roz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-black border border-gray-300"></div>
                      <span>Negru</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 text-center border-t border-gray-200 rounded-b-2xl">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Să începem jocul! 🎯
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}