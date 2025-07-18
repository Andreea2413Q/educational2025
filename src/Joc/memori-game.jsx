import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';

const db = getFirestore();

const ColorMemoryGame = () => {
  const { currentUser } = useAuth();
  
  const [difficulty, setDifficulty] = useState('usor');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScores, setBestScores] = useState({
    usor: null,
    mediu: null,
    greu: null
  });
  const [showHelp, setShowHelp] = useState(false);

  // Culori disponibile pentru joc
  const availableColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', 
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#10AC84', '#EE5A24', '#0984E3', '#6C5CE7', '#A29BFE',
    '#FD79A8', '#E84393', '#00B894', '#00CEC9', '#74B9FF',
    '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055', '#00B894',
    '#6C5CE7', '#74B9FF', '#55A3FF', '#FF7675', '#FD79A8'
  ];

  // Configurări pentru fiecare dificultate
  const difficultyConfig = {
    usor: { pairs: 8, cols: 4 },
    mediu: { pairs: 12, cols: 6 },
    greu: { pairs: 20, cols: 8 }
  };

  // Încarcă cel mai bun scor
  const loadBestScores = async () => {
    try {
      if (currentUser) {
        const docRef = doc(db, 'memoryGameScores', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBestScores(docSnap.data().scores || { usor: null, mediu: null, greu: null });
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

  // Salvează cel mai bun scor
  const saveBestScore = async (difficulty, score) => {
    const newBestScores = { ...bestScores, [difficulty]: score };
    setBestScores(newBestScores);

    try {
      if (currentUser) {
        await setDoc(doc(db, 'memoryGameScores', currentUser.uid), {
          scores: newBestScores,
          userId: currentUser.uid,
          lastUpdated: new Date()
        });
      } else {
        localStorage.setItem('memoryGameBestScores', JSON.stringify(newBestScores));
      }
    } catch (error) {
      console.error('Eroare la salvarea scorului:', error);
    }
  };

  // Generează cărțile pentru joc
  const generateCards = () => {
    const config = difficultyConfig[difficulty];
    const selectedColors = availableColors.slice(0, config.pairs);
    const cardPairs = [...selectedColors, ...selectedColors];
    
    // Amestecă cărțile
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

  // Inițializează jocul când se schimbă dificultatea
  useEffect(() => {
    generateCards();
  }, [difficulty]);

  // Încarcă scorurile la montare și la schimbarea utilizatorului
  useEffect(() => {
    loadBestScores();
  }, [currentUser]);

  // Gestionează click pe carte
  const handleCardClick = (cardId) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Nu permite click pe cărți deja întoarse sau potrivite
    const card = cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Actualizează starea cărții
    setCards(prevCards => 
      prevCards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    // Verifică dacă sunt 2 cărți întoarse
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard.color === secondCard.color) {
        // Potrivire găsită
        const newMatchedCards = [...matchedCards, firstCardId, secondCardId];
        setMatchedCards(newMatchedCards);
        
        setCards(prevCards => 
          prevCards.map(c => 
            newMatchedCards.includes(c.id) ? { ...c, isMatched: true } : c
          )
        );
        
        setFlippedCards([]);

        // Verifică dacă jocul este câștigat
        if (newMatchedCards.length === cards.length) {
          setGameWon(true);
          
          // Verifică și salvează cel mai bun scor
          const currentBest = bestScores[difficulty];
          if (!currentBest || moves + 1 < currentBest) {
            saveBestScore(difficulty, moves + 1);
          }
        }
      } else {
        // Nu se potrivesc - întoarce cărțile după o pauză
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
    const labels = { usor: 'Ușor', mediu: 'Mediu', greu: 'Greu' };
    return labels[diff];
  };

  const config = difficultyConfig[difficulty];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Mesaj de autentificare */}
      {!currentUser && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-4 text-center max-w-4xl mx-auto">
          🔒 Autentifică-te pentru a salva scorurile în contul tău!
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-0">
            🎯 Joc de Memorie cu Culori
          </h1>
          <button 
            onClick={() => setShowHelp(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-gray-600 transition-colors"
            title="Cum se joacă?"
          >
            ?
          </button>
        </div>

        {/* Selecție dificultate */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 text-center">Alege Dificultatea</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {Object.keys(difficultyConfig).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  difficulty === diff
                    ? 'bg-yellow-500 text-black scale-105'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {getDifficultyLabel(diff)} ({difficultyConfig[diff].pairs} perechi)
              </button>
            ))}
          </div>
        </div>

        {/* Statistici */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 bg-opacity-80 rounded-lg p-4 text-center">
            <h3 className="text-white text-lg font-semibold">Mișcări</h3>
            <p className="text-white text-2xl font-bold">{moves}</p>
          </div>
          <div className="bg-green-500 bg-opacity-80 rounded-lg p-4 text-center">
            <h3 className="text-white text-lg font-semibold">Perechi Găsite</h3>
            <p className="text-white text-2xl font-bold">{matchedCards.length / 2}/{config.pairs}</p>
          </div>
          <div className="bg-purple-500 bg-opacity-80 rounded-lg p-4 text-center">
            <h3 className="text-white text-lg font-semibold">Cel Mai Bun Scor</h3>
            <p className="text-white text-2xl font-bold">
              {bestScores[difficulty] || '-'}
            </p>
          </div>
        </div>

        {/* Buton reset */}
        <div className="text-center mb-6">
          <button
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🔄 Joc Nou
          </button>
        </div>

        {/* Grila de joc */}
        <div 
          className={`grid gap-2 sm:gap-3 mx-auto max-w-fit`}
          style={{ 
            gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                rounded-lg cursor-pointer transition-all duration-300 
                flex items-center justify-center border-2 border-white
                transform hover:scale-105 active:scale-95
                ${card.isFlipped || card.isMatched 
                  ? 'rotate-0' 
                  : 'bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
                }
                ${card.isMatched ? 'ring-4 ring-yellow-400' : ''}
              `}
              style={{
                backgroundColor: card.isFlipped || card.isMatched ? card.color : undefined
              }}
            >
              {card.isMatched && (
                <span className="text-white text-xl font-bold">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Modal câștig */}
        {gameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Felicitări!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Ai completat jocul în <strong>{moves} mișcări</strong>!
              </p>
              {bestScores[difficulty] === moves && (
                <p className="text-green-600 font-bold mb-4">
                  🏆 Nou record personal!
                </p>
              )}
              <button
                onClick={() => setGameWon(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Continuă
              </button>
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Joc Nou
              </button>
            </div>
          </div>
        )}

        {/* Modal Help */}
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Header cu X */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-3xl font-bold text-gray-800">🧠 Cum se joacă Memory Game</h2>
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
                {/* Obiectivul */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Obiectivul Jocului</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Scopul:</strong> Găsește toate perechile de culori identice</p>
                    <p><strong>Provocarea:</strong> Fă asta în cât mai puține mișcări</p>
                    <p><strong>Memoria:</strong> Ține minte unde ai văzut fiecare culoare</p>
                  </div>
                </div>

                {/* Reguli */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-800 mb-4">📋 Reguli de Joc</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1. Click pe carte:</strong> Întoarce o carte pentru a vedea culoarea</p>
                    <p><strong>2. Click pe a doua:</strong> Întoarce o a doua carte</p>
                    <p><strong>3. Potrivire:</strong> Dacă culorile se potrivesc, rămân întoarse</p>
                    <p><strong>4. Nu se potrivesc:</strong> Cărțile se întorc cu fața în jos</p>
                    <p><strong>5. Continuă:</strong> Până găsești toate perechile</p>
                  </div>
                </div>

                {/* Dificultăți */}
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">⚡ Niveluri de Dificultate</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>🟢 Ușor:</strong> 8 perechi (16 cărți) - 4 pe rând</p>
                    <p><strong>🟡 Mediu:</strong> 12 perechi (24 cărți) - 6 pe rând</p>
                    <p><strong>🔴 Greu:</strong> 20 perechi (40 cărți) - 8 pe rând</p>
                  </div>
                </div>

                {/* Punctaj */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">🏆 Sistem de Punctaj</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Mișcări:</strong> Fiecare încercare de potrivire = 1 mișcare</p>
                    <p><strong>Obiectiv:</strong> Completează jocul în cât mai puține mișcări</p>
                    <p><strong>Record:</strong> Cel mai mic număr de mișcări pentru fiecare dificultate</p>
                    <p><strong>Salvare:</strong> Recordurile se salvează automat</p>
                  </div>
                </div>

                {/* Strategii */}
                <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">🧠 Strategii</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• <strong>Concentrează-te:</strong> Memorează pozițiile culorilor</p>
                    <p>• <strong>Metodă sistematică:</strong> Explorează grila organizat</p>
                    <p>• <strong>Folosește memoria vizuală:</strong> Asociază culorile cu poziții</p>
                    <p>• <strong>Nu te grăbi:</strong> Gândește înainte de fiecare mișcare</p>
                    <p>• <strong>Practică:</strong> Începe cu nivelul ușor și avansează treptat</p>
                  </div>
                </div>

                {/* Indicatori vizuali */}
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">👁️ Indicatori Vizuali</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>✓ Bifă verde:</strong> Pereche găsită și potrivită</p>
                    <p><strong>🟡 Chenar galben:</strong> Cărți potrivite cu succes</p>
                    <p><strong>Hover effect:</strong> Carta se mărește când treci cu mouse-ul</p>
                    <p><strong>Statistici live:</strong> Vezi progresul în timp real</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 p-6 text-center border-t border-gray-200 rounded-b-2xl">
                <button 
                  onClick={() => setShowHelp(false)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Să testez memoria! 🧠
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorMemoryGame;