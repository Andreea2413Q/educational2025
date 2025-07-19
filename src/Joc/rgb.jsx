import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';

function RGBColorGame() {
    const { currentUser } = useAuth();
    const [isOverVisible, setIsOverVisible] = useState(false);
    const [score, setScore] = useState(5);
    const [correctCounter, setCorrectCounter] = useState(0);
    const [numSquares, setNumSquares] = useState(4);
    const [colors, setColors] = useState([]);
    const [pickedColor, setPickedColor] = useState("");
    const [bestScore, setBestScore] = useState(0);
    const [difficulty, setDifficulty] = useState(4);
    const [colorFormat, setColorFormat] = useState('RGB');

    useEffect(() => {
        loadBestScore();                                  
        resetGame();
    }, [currentUser]);

    useEffect(() => {
        resetGame();
    }, [numSquares, colorFormat]);

    const loadBestScore = async () => {
        try {
            if (currentUser) {
                const docRef = doc(db, 'gameScores', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBestScore(docSnap.data().bestScore || 0);
                }
            } else {
                const localBestScore = localStorage.getItem('colorGameBestScore');
                if (localBestScore) {
                    setBestScore(parseInt(localBestScore));
                }
            }
        } catch (error) {
            console.error('Eroare la încărcarea scorului:', error);
        }
    };

    const saveBestScore = async (newBestScore) => {
        try {
            if (currentUser) {
                await setDoc(doc(db, 'gameScores', currentUser.uid), {
                    bestScore: newBestScore,
                    userId: currentUser.uid,
                    lastUpdated: new Date()
                });
            } else {
                localStorage.setItem('colorGameBestScore', newBestScore.toString());
            }
        } catch (error) {
            console.error('Eroare la salvarea scorului:', error);
        }
    };

    const genRandomColors = (num) => {
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(randomColor());
        }
        return arr;
    };

    const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return { r, g, b };
    };

    const rgbToHex = ({ r, g, b }) => {
        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const rgbToHsl = ({ r, g, b }) => {
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
                case gNorm: h = (bNorm - rNorm) / d + 2; break;
                case bNorm: h = (rNorm - gNorm) / d + 4; break;
                default: h = 0;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const formatColor = (colorObj) => {
        switch (colorFormat) {
            case 'HEX':
                return rgbToHex(colorObj);
            case 'HSL':
                const hsl = rgbToHsl(colorObj);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            default: // RGB
                return `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
        }
    };

    const colorToCss = (colorObj) => {
        return `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
    };

    const handleSquareClick = (color, index) => {
        if (JSON.stringify(color) === JSON.stringify(pickedColor)) {
            const newCorrectCounter = correctCounter + 1;
            setCorrectCounter(newCorrectCounter);
            
            if (newCorrectCounter > bestScore) {
                setBestScore(newCorrectCounter);
                saveBestScore(newCorrectCounter);
            }
            
            reset();
        } else {
            setScore(prev => prev - 1);
            setColors(prevColors => prevColors.map((item, idx) =>
                idx === index ? { r: 0, g: 0, b: 0 } : item
            ));
            if (score - 1 === 0) {
                resetGame();
                setIsOverVisible(true);
            }
        }
    };

    const resetGame = () => {
        const newColors = genRandomColors(numSquares);
        const newPickedColor = newColors[Math.floor(Math.random() * newColors.length)];
        setColors(newColors);
        setPickedColor(newPickedColor);
        setIsOverVisible(false);
        setScore(5);
        setCorrectCounter(0);
    };

    const reset = () => {
        const newColors = genRandomColors(numSquares);
        const newPickedColor = chooseColor(newColors);
        setColors(newColors);
        setPickedColor(newPickedColor);
    };

    const chooseColor = (colors) => {
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
    };

    const changeDifficulty = (newDifficulty) => {
        setNumSquares(newDifficulty);
        setDifficulty(newDifficulty);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
       
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8 w-full mx-auto">
           
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        RGB Color Game
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

                {isOverVisible && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900/90 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-6 sm:p-8 text-center max-w-md w-full">
                            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4">Game Over</h2>
                            <div className="space-y-3 mb-6">
                                <p className="text-pink-300 text-lg sm:text-xl">Scor final: {correctCounter}</p>
                                <p className="text-purple-300 text-lg sm:text-xl">Cel mai bun scor: {bestScore}</p>
                            </div>
                            <button 
                                onClick={() => setIsOverVisible(false)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                            >
                                Joacă din nou
                            </button>
                        </div>
                    </div>
                )}

            
                <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                 
                    <div className="flex gap-1 sm:gap-2">
                        <button 
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-300 border-2 text-xs sm:text-sm ${
                                difficulty === 2 
                                    ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/50' 
                                    : 'bg-gray-900/60 border-green-400/30 text-green-300 hover:border-green-400/60 hover:bg-green-900/20'
                            }`}
                            onClick={() => changeDifficulty(2)}
                        >
                            Ușor
                        </button>
                        <button 
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-300 border-2 text-xs sm:text-sm ${
                                difficulty === 4 
                                    ? 'bg-yellow-600 border-yellow-400 text-white shadow-lg shadow-yellow-500/50' 
                                    : 'bg-gray-900/60 border-yellow-400/30 text-yellow-300 hover:border-yellow-400/60 hover:bg-yellow-900/20'
                            }`}
                            onClick={() => changeDifficulty(4)}
                        >
                            Normal
                        </button>
                        <button 
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-300 border-2 text-xs sm:text-sm ${
                                difficulty === 6 
                                    ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-500/50' 
                                    : 'bg-gray-900/60 border-red-400/30 text-red-300 hover:border-red-400/60 hover:bg-red-900/20'
                            }`}
                            onClick={() => changeDifficulty(6)}
                        >
                            Greu
                        </button>
                    </div>

         
                    <div className="flex items-center gap-2 sm:gap-3">
                        <label className="text-cyan-300 font-semibold text-xs sm:text-sm">
                            Format afișare culori:
                        </label>
                        <select 
                            value={colorFormat} 
                            onChange={(e) => setColorFormat(e.target.value)}
                            className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-gray-900/80 border-2 border-cyan-400/50 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 backdrop-blur-lg text-xs sm:text-sm"
                        >
                            <option value="RGB">RGB (255, 255, 255)</option>
                            <option value="HEX">HEX (#FFFFFF)</option>
                            <option value="HSL">HSL (360, 100%, 100%)</option>
                        </select>
                    </div>
                </div>

      
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-3 text-center backdrop-blur-lg">
                        <div className="text-red-300 font-semibold text-xs sm:text-sm">Vieți</div>
                        <div className="text-red-400 text-lg sm:text-xl font-bold">{score}</div>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-3 text-center backdrop-blur-lg">
                        <div className="text-yellow-300 font-semibold text-xs sm:text-sm">Scor Actual</div>
                        <div className="text-yellow-400 text-lg sm:text-xl font-bold">{correctCounter}</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-3 text-center backdrop-blur-lg">
                        <div className="text-blue-300 font-semibold text-xs sm:text-sm">Cel Mai Bun Scor</div>
                        <div className="text-blue-400 text-lg sm:text-xl font-bold">{bestScore}</div>
                    </div>
                </div>

      
                <div className="mb-8 text-center">
                    <div className="bg-gray-900/60 border-2 border-pink-400/50 rounded-xl p-4 sm:p-6 backdrop-blur-lg inline-block">
                        <div className="text-pink-300 text-xs sm:text-sm mb-2 font-semibold">Găsește această culoare:</div>
                        <div className="text-pink-400 text-lg sm:text-xl lg:text-2xl font-mono font-bold">
                            {formatColor(pickedColor)}
                        </div>
                    </div>
                </div>

       
                <div className={`grid justify-center items-center w-full   mx-auto ${
                    numSquares === 2 ? 'grid-cols-2 gap-8 sm:gap-10 lg:gap-12' : 
                    numSquares === 4 ? 'grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8' : 
                    'grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12'
                }`}>
                    {colors.map((color, index) => (
                        <div 
                            key={index} 
                            className="aspect-square w-40 m h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-3xl 
                            cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                             hover:shadow-white/40 border-3 border-white/30 hover:border-white/70 mx-10 justify-self-center"
                            style={{ backgroundColor: colorToCss(color) }} 
                            onClick={() => handleSquareClick(color, index)}
                        />
                    ))}
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

export default RGBColorGame;