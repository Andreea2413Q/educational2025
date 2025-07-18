import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';
import './rgb.css'

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
    const [showHelp, setShowHelp] = useState(false);


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
        <div className="game-container">
            {/* Mesaj de autentificare */}
            {!currentUser && (
                <div className="auth-notice">
                    🔒 Autentifică-te pentru a salva scorul în contul tău!
                </div>
            )}

            {isOverVisible && (
                <div className="game-overlay">
                    <h1 className="final-score final-score-current">Scor final: {correctCounter}</h1>
                    <h1 className="final-score final-score-best">Cel mai bun scor: {bestScore}</h1>
                    <button className="play-again-btn" onClick={() => setIsOverVisible(false)}>
                        Joacă din nou
                    </button>
                </div>
            )}

            <div className="difficulty-container">
                <div className="difficulty-buttons">
                    <button 
                        className={`difficulty-btn ${difficulty === 2 ? 'selected' : ''}`} 
                        onClick={() => changeDifficulty(2)}
                    >
                        Ușor
                    </button>
                    <button 
                        className={`difficulty-btn ${difficulty === 4 ? 'selected' : ''}`} 
                        onClick={() => changeDifficulty(4)}
                    >
                        Normal
                    </button>
                    <button 
                        className={`difficulty-btn ${difficulty === 6 ? 'selected' : ''}`} 
                        onClick={() => changeDifficulty(6)}
                    >
                        Greu
                    </button>
                   
                </div>
            </div>

           
            <div className="color-format-container w-full flex justify-center">
                <div className='mx-auto'>
                <label className="format-label text-xl mr-10">Format afișare culori:</label>
                
                
                <select 
                    value={colorFormat} 
                    onChange={(e) => setColorFormat(e.target.value)}
                    className="format-select"
                >
                    <option value="RGB">RGB (255, 255, 255)</option>
                    <option value="HEX">HEX (#FFFFFF)</option>
                    <option value="HSL">HSL (360, 100%, 100%)</option>
                </select>
            </div>

 <button 
                        className="help-btn  w-1/6"
                        onClick={() => setShowHelp(true)}
                        title="Cum se joacă?"
                    >
                        ?
                    </button>

            </div>

            

            <div className="info-list">
                <label className="info-item" style={{ color: 'rgb(239 68 68)' }}>
                    Vieți: {score}
                </label>
                <label className="info-item" style={{ color: 'rgb(234 179 8)' }}>
                    Scor Actual: {correctCounter}
                </label>
                <label className="info-item" style={{ color: 'rgb(59 130 246)' }}>
                    Cel Mai Bun Scor: {bestScore}
                </label>
            </div>

            <span className="color-display">{formatColor(pickedColor)}</span>

            <div className="squares-container">
                {colors.map((color, index) => (
                    <div 
                        key={index} 
                        className="square" 
                        style={{ backgroundColor: colorToCss(color) }} 
                        onClick={() => handleSquareClick(color, index)}
                    />
                ))}
            </div>

            {/* Modal Help */}
            {showHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                        {/* Header cu X */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-3xl font-bold text-gray-800">🎯 Cum se joacă Color Game</h2>
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
                                    <p><strong>Scopul:</strong> Găsește culoarea care corespunde valorii afișate</p>
                                    <p><strong>Provocarea:</strong> Trebuie să recunoști culoarea doar din valorile numerice</p>
                                    <p><strong>Învățare:</strong> Dezvolți înțelegerea formatelor de culori (RGB, HEX, HSL)</p>
                                </div>
                            </div>

                            {/* Secțiunea 2: Cum se joacă */}
                            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                                <h3 className="text-xl font-bold text-green-800 mb-4">🎮 Cum se Joacă</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>1. Privește valoarea:</strong> Sus vei vedea o culoare exprimată în format RGB, HEX sau HSL</p>
                                    <p><strong>2. Analizează pătratele:</strong> Compară toate pătratele colorate de pe ecran</p>
                                    <p><strong>3. Ghicește culoarea:</strong> Click pe pătratul care crezi că corespunde valorii</p>
                                    <p><strong>4. Primește feedback:</strong> Culori greșite devin negre, cele corecte îți dau puncte</p>
                                </div>
                            </div>

                            {/* Secțiunea 3: Sisteme de punctaj */}
                            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-xl font-bold text-purple-800 mb-4">📊 Sistem de Punctaj</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>🚨 Vieți:</strong> Începi cu 5 vieți. Pierzi câte una la fiecare greșeală</p>
                                    <p><strong>🎯 Scor Actual:</strong> Câte culori ai ghicit corect în sesiunea curentă</p>
                                    <p><strong>🏆 Cel Mai Bun Scor:</strong> Recordul tău personal (salvat automat)</p>
                                    <p><strong>🔄 Game Over:</strong> Când rămâi fără vieți, jocul se resetează</p>
                                </div>
                            </div>

                            {/* Secțiunea 4: Niveluri de dificultate */}
                            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                                <h3 className="text-xl font-bold text-orange-800 mb-4">⚡ Niveluri de Dificultate</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>🟢 Ușor:</strong> 2 pătrate - șanse mari de ghicire</p>
                                    <p><strong>🟡 Normal:</strong> 4 pătrate - dificultate echilibrată</p>
                                    <p><strong>🔴 Greu:</strong> 6 pătrate - provocare maximă</p>
                                    <p><strong>💡 Strategie:</strong> Începe cu Ușor și avansează treptat</p>
                                </div>
                            </div>

                            {/* Secțiunea 5: Formate de culori */}
                            <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                                <h3 className="text-xl font-bold text-indigo-800 mb-4">🎨 Formate de Culori</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>RGB:</strong> Red, Green, Blue (0-255) - ex: rgb(255, 128, 64)</p>
                                    <p><strong>HEX:</strong> Hexadecimal (#000000-#FFFFFF) - ex: #FF8040</p>
                                    <p><strong>HSL:</strong> Hue, Saturation, Lightness - ex: hsl(30, 100%, 62%)</p>
                                    <p><strong>💡 Tip:</strong> Experimentează cu toate formatele pentru a învăța mai bine</p>
                                </div>
                            </div>

                            {/* Secțiunea 6: Strategii și sfaturi */}
                            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                                <h3 className="text-xl font-bold text-yellow-800 mb-4">🧠 Strategii și Sfaturi</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p>• <strong>RGB:</strong> Valorile mari înseamnă culori intense (255 = maxim)</p>
                                    <p>• <strong>HEX:</strong> FF = 255, 00 = 0. Primele 2 cifre = roșu, următoarele 2 = verde, ultimele 2 = albastru</p>
                                    <p>• <strong>HSL:</strong> H = nuanța (0-360°), S = saturația (0-100%), L = luminozitatea (0-100%)</p>
                                    <p>• <strong>Practică:</strong> Cu timpul vei recunoaște pattern-urile</p>
                                    <p>• <strong>Observație:</strong> Compară valorile mari/mici cu intensitatea culorilor</p>
                                </div>
                            </div>

                            {/* Secțiunea 7: Salvare progres */}
                            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-500">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">💾 Salvare Progres</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Fără cont:</strong> Scorul se salvează local în browser</p>
                                    <p><strong>Cu cont:</strong> Scorul se sincronizează în cloud</p>
                                    <p><strong>Avantaj:</strong> Păstrezi recordurile pe orice dispozitiv</p>
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

export default RGBColorGame;