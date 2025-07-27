import { useState, useEffect } from 'react';
import { useAuth } from '../Cont/authContext';

const ColorMemoryGame = () => {
  const { currentUser } = useAuth();
  
  //
  const [gameWon, setGameWon] = useState(false);
  const [cards, setCards] = useState([]);
  const [difficulty, setDifficulty] = useState('usor');
  const [matchedCards, setMatchedCards] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestScores, setBestScores] = useState({
    greu: null,
    usor: null,
    mediu: null
  });


  const availableColors = [
    '#FF6B6B', '#4ECDC4', '#96CEB4', '#45B7D1', '#FECA57', 
    '#54A0FF', '#FF9FF3', '#5F27CD', '#FF9F43', '#00D2D3',
    '#EE5A24', '#10AC84', '#0984E3', '#A29BFE', '#6C5CE7',
    '#00B894', '#FD79A8', '#E84393', '#00CEC9', '#74B9FF',
    '#FDCB6E', '#A29BFE', '#FD79A8', '#E17055', '#00B894',
    '#55A3FF', '#6C5CE7', '#74B9FF', '#FF7675', '#FD79A8'
  ];

  // Configuration object
  const difficultyConfig = {
    mediu: { pairs: 12, cols: 6 },
    usor: { pairs: 8, cols: 4 },
    greu: { pairs: 20, cols: 8 }
  };

  // Load best scores function
  const loadBestScores = () => {
    try {
      if (currentUser) {
        const userScores = localStorage.getItem(`memoryGameBestScores_${currentUser.uid}`);
        if (userScores) {
          setBestScores(JSON.parse(userScores));
        }
      } else {
        const localScores = localStorage.getItem('memoryGameBestScores');
        if (localScores) {
          setBestScores(JSON.parse(localScores));
        }
      }
    } catch (error) {
      console.error('Eroare la încărcarea scorurilor:', error);
    }
  };

  // Save score function
  const saveBestScore = (difficulty, score) => {
    const newBestScores = { ...bestScores, [difficulty]: score };
    setBestScores(newBestScores);

    try {
      if (currentUser) {
        localStorage.setItem(`memoryGameBestScores_${currentUser.uid}`, JSON.stringify(newBestScores));
      } else {
        localStorage.setItem('memoryGameBestScores', JSON.stringify(newBestScores));
      }
    } catch (error) {
      console.error('Eroare la salvarea scorului:', error);
    }
  };

  // Generate cards function
  const generateCards = () => {
    const config = difficultyConfig[difficulty];
    const selectedColors = availableColors.slice(0, config.pairs);
    const cardPairs = [...selectedColors, ...selectedColors];
    
    const shuffledCards = cardPairs
      .map((color, index) => ({ id: index, color, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
  };

  // Effects with mixed order
  useEffect(() => {
    loadBestScores();
  }, [currentUser]);

  useEffect(() => {
    generateCards();
  }, [difficulty]);

  // Card click handler
  const handleCardClick = (cardId) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const card = cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prevCards => 
      prevCards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard.color === secondCard.color) {
        const newMatchedCards = [...matchedCards, firstCardId, secondCardId];
        setMatchedCards(newMatchedCards);
        
        setCards(prevCards => 
          prevCards.map(c => 
            newMatchedCards.includes(c.id) ? { ...c, isMatched: true } : c
          )
        );
        
        setFlippedCards([]);

        if (newMatchedCards.length === cards.length) {
          setGameWon(true);
          
          const currentBest = bestScores[difficulty];
          if (!currentBest || moves + 1 < currentBest) {
            saveBestScore(difficulty, moves + 1);
          }
        }
      } else {
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(c => 
              newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    generateCards();
  };

  const getDifficultyLabel = (diff) => {
    const labels = { greu: 'Greu', usor: 'Ușor', mediu: 'Mediu' };
    return labels[diff];
  };

  // Help modal component
  const HelpModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/90 backdrop-blur-lg border border-cyan-400/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-lg p-6 flex items-center justify-between rounded-t-2xl border-b border-cyan-400/30">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Cum să joci Color Memory Game
          </h2>
          <button 
            onClick={() => setShowHelp(false)}
            className="text-cyan-400 hover:text-pink-400 text-3xl font-bold leading-none transition-colors duration-300 w-8 h-8 flex items-center justify-center"
            title="Închide"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 p-1 rounded-xl border border-cyan-400/30">
            <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                🎯 Obiectivul Jocului
              </h3>
              <div className="space-y-3 text-gray-300">
                <p><label className="text-pink-400 font-bold">Scopul:</label> Găsește toate perechile de culori identice</p>
                <p><label className="text-pink-400 font-bold">Metoda:</label> Întoarce două cărți pe rând pentru a vedea culorile</p>
                <p><label className="text-pink-400 font-bold">Câștig:</label> Jocul se termină când toate perechile sunt găsite</p>
                <p><label className="text-pink-400 font-bold">Scor:</label> Cu cât folosești mai puține mișcări, cu atât e mai bine!</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-1 rounded-xl border border-blue-400/30">
            <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                🎮 Cum să Joci
              </h3>
              <div className="space-y-3 text-gray-300">
                <p><label className="text-cyan-400 font-bold">Pasul 1:</label> Click pe o carte pentru a o întoarce și vedea culoarea</p>
                <p><label className="text-cyan-400 font-bold">Pasul 2:</label> Click pe a doua carte pentru a o întoarce</p>
                <p><label className="text-cyan-400 font-bold">Potrivire:</label> Dacă culorile sunt identice, cărțile rămân întoarse</p>
                <p><label className="text-cyan-400 font-bold">Nepotrivire:</label> Dacă culorile sunt diferite, cărțile se întorc la loc</p>
                <p><label className="text-cyan-400 font-bold">Continuă:</label> Repetă până când toate perechile sunt găsite</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 p-1 rounded-xl border border-purple-400/30">
            <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                ⚙️ Niveluri de Dificultate
              </h3>
              <div className="space-y-3 text-gray-300">
                <p><label className="text-green-400 font-bold">Ușor:</label> 8 perechi (16 cărți) - Perfect pentru începători</p>
                <p><label className="text-yellow-400 font-bold">Mediu:</label> 12 perechi (24 cărți) - Provocare echilibrată</p>
                <p><label className="text-red-400 font-bold">Greu:</label> 20 perechi (40 cărți) - Pentru experți în memorie</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20 p-1 rounded-xl border border-yellow-400/30">
            <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                📊 Sistemul de Scoruri
              </h3>
              <div className="space-y-3 text-gray-300">
                <p><label className="text-orange-400 font-bold">Mișcări:</label> Fiecare pereche de cărți întoarse = 1 mișcare</p>
                <p><label className="text-orange-400 font-bold">Cel mai bun scor:</label> Numărul minim de mișcări pentru completare</p>
                <p><label className="text-orange-400 font-bold">Record personal:</label> Se salvează automat pentru fiecare dificultate</p>
                <p><label className="text-orange-400 font-bold">Progres:</label> Urmărește câte perechi ai găsit din total</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-cyan-900/20 p-1 rounded-xl border border-pink-400/30">
            <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl">
              <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                💡 Strategii și Sfaturi
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>• Încearcă să îți amintești pozițiile culorilor văzute anterior</p>
                <p>• Începe cu colțurile și marginile pentru orientare mai bună</p>
                <p>• Dezvoltă un sistem de memorare (ex: mental grid)</p>
                <p>• Concentrează-te și evită distragerea atenției</p>
                <p>• Practică zilnic pentru îmbunătățirea memoriei</p>
                <p>• Începe cu dificultatea Ușor și progresează treptat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-lg p-6 text-center border-t border-cyan-400/30 rounded-b-2xl">
          <button 
            onClick={() => setShowHelp(false)}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            Am înțeles! 🚀
          </button>
        </div>
      </div>
    </div>
  );

  const config = difficultyConfig[difficulty];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {!currentUser && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-400/30 rounded-xl backdrop-blur-lg max-w-4xl mx-auto">
            <p className="text-yellow-300 text-center text-sm sm:text-base">
              Autentifică-te pentru a salva scorurile în contul tău!
            </p>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Color Memory Game
              </h1>
              <button
                onClick={() => setShowHelp(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-lg border-2 border-cyan-400/50 rounded-full flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-600/40 hover:via-purple-600/40 hover:to-pink-600/40 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 group"
                title="Ajutor"
              >
                <span className="text-sm sm:text-lg font-bold group-hover:animate-pulse">?</span>
              </button>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          </div>

          {showHelp && <HelpModal />}

          <div className="bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-4 sm:p-6 mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text mb-4 text-center">
              Alege Dificultatea
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {Object.keys(difficultyConfig).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 border-2 text-sm sm:text-base ${
                    difficulty === diff
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400 text-white shadow-lg shadow-yellow-500/50 scale-105'
                      : 'bg-gray-900/60 border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-900/20'
                  }`}
                >
                  {getDifficultyLabel(diff)} ({difficultyConfig[diff].pairs} perechi)
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-900/40 border border-green-400/30 rounded-xl p-4 text-center backdrop-blur-lg">
              <h3 className="text-green-300 text-sm sm:text-base font-semibold mb-1">Perechi Găsite</h3>
              <p className="text-green-400 text-xl sm:text-2xl font-bold">{matchedCards.length / 2}/{config.pairs}</p>
            </div>
            <div className="bg-blue-900/40 border border-blue-400/30 rounded-xl p-4 text-center backdrop-blur-lg">
              <h3 className="text-blue-300 text-sm sm:text-base font-semibold mb-1">Mișcări</h3>
              <p className="text-blue-400 text-xl sm:text-2xl font-bold">{moves}</p>
            </div>
            <div className="bg-purple-900/40 border border-purple-400/30 rounded-xl p-4 text-center backdrop-blur-lg">
              <h3 className="text-purple-300 text-sm sm:text-base font-semibold mb-1">Cel Mai Bun Scor</h3>
              <p className="text-purple-400 text-xl sm:text-2xl font-bold">
                {bestScores[difficulty] || '-'}
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50 border border-red-400/50"
            >
              Joc Nou
            </button>
          </div>

          <div 
            className={`grid gap-3 sm:gap-4 lg:gap-4 mx-auto max-w-fit mb-8`}
            style={{ 
              gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24
                  rounded-xl cursor-pointer transition-all duration-300 
                  flex items-center justify-center border-2 border-white/30
                  transform hover:scale-110 active:scale-95 hover:border-white/60
                  ${card.isFlipped || card.isMatched 
                    ? 'rotate-0 shadow-lg' 
                    : 'bg-gradient-to-br from-gray-700/80 to-gray-900/80 hover:from-gray-600/80 hover:to-gray-800/80 backdrop-blur-lg'
                  }
                  ${card.isMatched ? 'ring-2 ring-cyan-400 shadow-cyan-400/50' : ''}
                `}
                style={{
                  backgroundColor: card.isFlipped || card.isMatched ? card.color : undefined
                }}
              >
                {card.isMatched && (
                  <span className="text-white text-lg sm:text-xl font-bold drop-shadow-lg">✓</span>
                )}
              </div>
            ))}
          </div>

          {gameWon && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900/90 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-6 sm:p-8 text-center max-w-md w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">Felicitări!</h2>
                <p className="text-base sm:text-lg text-white/80 mb-4">
                  Ai completat jocul în <strong className="text-pink-400">{moves} mișcări</strong>!
                </p>
                {bestScores[difficulty] === moves && (
                  <p className="text-yellow-400 font-bold mb-6">
                    Nou record personal!
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setGameWon(false)}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                  >
                    Continuă
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
                  >
                    Joc Nou
                  </button>
                </div>
              </div>
            </div>
          )}
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
};

export default ColorMemoryGame;