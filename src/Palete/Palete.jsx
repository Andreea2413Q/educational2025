import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useMediaQuery } from '@react-hook/media-query';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import {useAuth} from '../Cont/authContext';

function CreatorPaleta() {
    const { currentUser } = useAuth();
    const isScreenBelowMd = useMediaQuery('(max-width: 768px)');
    const [palete, setPalete] = useState([]);
    const [culori, setCulori] = useState([]);
    const [culoriGenerate, setCuloriGenerate] = useState([]);
    const [culoareSelectata, setCuloareSelectata] = useState('#ffffff');
    const [numePaleta, setNumePaleta] = useState('');
    const [editarePaletaId, setEditarePaletaId] = useState(null);
    const [paletaAfisata, setPaletaAfisata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formatCuloare, setFormatCuloare] = useState('HEX');
    const [culoareHover, setCuloareHover] = useState(null);

    useEffect(() => {
        if (currentUser) {
            incarcaPaleteFirebase();
        } else {
            const paleteSalvate = JSON.parse(localStorage.getItem('paleteCulori'));
            if (paleteSalvate) {
                setPalete(paleteSalvate);
            }
        }
    }, [currentUser]);

    const incarcaPaleteFirebase = async () => {
        if (!currentUser) return;
        
        setLoading(true);
        try {
            const q = query(
                collection(db, 'palete'),
                where('userId', '==', currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            const paleteFirebase = [];
            
            querySnapshot.forEach((doc) => {
                paleteFirebase.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            setPalete(paleteFirebase);
        } catch (error) {
            console.error('Eroare la încărcarea paletelor:', error);
            alert('Eroare la încărcarea paletelor. Te rog încearcă din nou.');
        } finally {
            setLoading(false);
        }
    };

    const schimbaCuloare = (color) => {
        setCuloareSelectata(color.hex);
    };

    const adaugaCuloare = () => {
        if (!culori.includes(culoareSelectata)) {
            setCulori([...culori, culoareSelectata]);
        }
    };

    const adaugaCuloareGenerata = (culoare) => {
        if (!culori.includes(culoare)) {
            setCulori([...culori, culoare]);
        }
    };

    const eliminaCuloare = (culoareDeEliminat) => {
        setCulori(culori.filter(culoare => culoare !== culoareDeEliminat));
    };

    const salveazaPaleta = async () => {
        if (numePaleta.trim() === "") {
            alert('Te rog să introduci un nume pentru paleta.');
            return;
        }

        if (culori.length === 0) {
            alert('Te rog să adaugi cel puțin o culoare în paleta.');
            return;
        }

        const existaDeja = palete.some(paleta => paleta.nume === numePaleta && paleta.id !== editarePaletaId);
        if (existaDeja) {
            alert('O paletă cu acest nume există deja. Te rog alege un nume diferit.');
            return;
        }

        setLoading(true);

        try {
            if (currentUser) {
                const paletaId = editarePaletaId || `${currentUser.uid}_${Date.now()}`;
                const paletaData = {
                    nume: numePaleta,
                    culori: culori,
                    userId: currentUser.uid,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                await setDoc(doc(db, 'palete', paletaId), paletaData);
                
                const paleteActualizate = palete.filter(paleta => paleta.id !== editarePaletaId);
                const nouaPaleta = { id: paletaId, ...paletaData };
                setPalete([...paleteActualizate, nouaPaleta]);
            } else {
                const paleteActualizate = palete.filter(paleta => paleta.id !== editarePaletaId);
                const nouaPaleta = { id: editarePaletaId || Date.now(), nume: numePaleta, culori };
                const paleteNoi = [...paleteActualizate, nouaPaleta];
                setPalete(paleteNoi);
                localStorage.setItem('paleteCulori', JSON.stringify(paleteNoi));
            }

            resetarePaleta();
        } catch (error) {
            console.error('Eroare la salvarea paletei:', error);
            alert('Eroare la salvarea paletei. Te rog încearcă din nou.');
        } finally {
            setLoading(false);
        }
    };

    const resetarePaleta = () => {
        setCulori([]);
        setNumePaleta('');
        setEditarePaletaId(null);
        setCuloriGenerate([]);
    };

    const incarcaPaleta = (paleta) => {
        if (editarePaletaId === paleta.id) {
            resetarePaleta();
        } else {
            setCulori(paleta.culori);
            setNumePaleta(paleta.nume);
            setEditarePaletaId(paleta.id);
            setPaletaAfisata(null);
        }
    };

    const stergePaleta = async (id) => {
        if (window.confirm("Ești sigură că vrei să continui?")) {
            setLoading(true);

            try {
                if (currentUser) {
                    await deleteDoc(doc(db, 'palete', id));
                }

                const paleteActualizate = palete.filter(paleta => paleta.id !== id);
                setPalete(paleteActualizate);
                
                if (!currentUser) {
                    localStorage.setItem('paleteCulori', JSON.stringify(paleteActualizate));
                }

                resetarePaleta();
                if (paletaAfisata && paletaAfisata.id === id) {
                    setPaletaAfisata(null);
                }
            } catch (error) {
                console.error('Eroare la ștergerea paletei:', error);
                alert('Eroare la ștergerea paletei. Te rog încearcă din nou.');
            } finally {
                setLoading(false);
            }
        }
    };

    const afiseazaPaleta = (paleta) => {
        if (paletaAfisata && paletaAfisata.id === paleta.id) {
            setPaletaAfisata(null);
        } else {
            setPaletaAfisata(paleta);
        }
    };

    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const num = parseInt(hex, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255,
        };
    };

    const rgbToHex = ({ r, g, b }) => {
        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const hexToHsl = (hex) => {
        const { r, g, b } = hexToRgb(hex);
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

    const formatCuloareText = (culoare) => {
        switch (formatCuloare) {
            case 'RGB':
                const rgb = hexToRgb(culoare);
                return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            case 'HSL':
                const hsl = hexToHsl(culoare);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            default:
                return culoare.toUpperCase();
        }
    };

    const copiazaCuloareInClipboard = async (culoare) => {
        try {
            const textDecopiat = formatCuloareText(culoare);
            await navigator.clipboard.writeText(textDecopiat);
        } catch (error) {
            const textDecopiat = formatCuloareText(culoare);
            prompt('Copiază manual această culoare:', textDecopiat);
        }
    };

    const genereazaCuloareAsemantoare = (culoareHex) => {
        const rgb = hexToRgb(culoareHex);
        const variatie = 30;

        const modificaComponenta = (comp) => {
            let nou = comp + (Math.floor(Math.random() * (variatie * 2 + 1)) - variatie);
            if (nou < 0) nou = 0;
            if (nou > 255) nou = 255;
            return nou;
        };

        const nouRgb = {
            r: modificaComponenta(rgb.r),
            g: modificaComponenta(rgb.g),
            b: modificaComponenta(rgb.b),
        };

        return rgbToHex(nouRgb);
    };

    const genereazaCuloriAsemantoare = () => {
        const culoriNoi = [];

        for (let i = 0; i < 5; i++) {
            const culoareNoua = genereazaCuloareAsemantoare(culoareSelectata);
            if (!culoriGenerate.includes(culoareNoua) && !culoriNoi.includes(culoareNoua)) {
                culoriNoi.push(culoareNoua);
            }
        }

        if (culoriNoi.length > 0) {
            setCuloriGenerate(culoriNoi);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row pt-5 w-screen min-h-screen overflow-auto" style={{ paddingTop: '100px' }}>
                {!currentUser && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-900/20 border border-yellow-400/30 rounded-xl backdrop-blur-lg p-4 shadow-lg">
                        <p className="text-yellow-300 text-center text-sm sm:text-base">
                            Autentifică-te pentru a putea avea toate realizările cu tine oriunde
                        </p>
                    </div>
                )}

                <div className={`w-full lg:w-1/2 flex flex-col items-center justify-start ${isScreenBelowMd ? 'pb-8' : ''}`}
                    style={{marginTop: isScreenBelowMd ? '0' : '0px'}}
                >
                    <div className="md:flex block w-full items-center justify-center my-3 sticky rounded focus:outline-none focus:shadow-outline">
                        <input
                            className="ml-5 py-2 border border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg rounded w-2/5 md:text-base sm:text-sm xl:text-2xl text-center text-sm text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                            placeholder="Nume Paleta"
                            value={numePaleta}
                            onChange={e => setNumePaleta(e.target.value)}
                            disabled={loading}
                        />
                        <button 
                            className={`text-xs md:text-base sm:text-sm xl:text-2xl w-2/5 ml-2 px-4 py-2 text-white font-bold rounded transition-all duration-300 transform hover:scale-105 ${
                                loading 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50'
                            }`}
                            onClick={salveazaPaleta}
                            disabled={loading}
                        >
                            {loading ? 'Se salvează...' : 'Salvează Paleta'}
                        </button>
                    </div>
                    
                    <div className="mt-4 w-1/2 mx-auto">
                        <SketchPicker color={culoareSelectata} onChangeComplete={schimbaCuloare} width="100%" height="50" />
                    </div>
                    
                    <div className="w-full relative items-center flex">
                        <button 
                            className="text-lg md:text-base sm:text-sm xl:text-xl mt-4 ml-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 w-2/5" 
                            onClick={adaugaCuloare}
                            disabled={loading}
                        >
                            Adaugă Culoare
                        </button>

                        <button
                            className="text-sm md:text-base sm:text-sm xl:text-lg mt-4 ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-2 rounded transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 w-2/5"
                            onClick={genereazaCuloriAsemantoare}
                            disabled={loading}
                        >
                            Generează 5 Culori Asemănătoare
                        </button>
                    </div>

                    {culoriGenerate.length > 0 && (
                        <div className="w-4/5 mx-auto mt-4 h-full p-4 bg-gray-900/60 backdrop-blur-lg border border-pink-400/30 rounded-lg shadow-lg">
                            <h3 className="text-center text-lg font-bold mb-3 text-pink-300">
                                Culori Generate (Click pentru a adăuga în paletă)
                            </h3>
                            <div className="flex flex-wrap justify-center">
                                {culoriGenerate.map((culoare, index) => (
                                    <div 
                                        key={index} 
                                        className="m-1 w-16 h-16 cursor-pointer border-2 border-white/30 hover:border-cyan-400/60 transition-all duration-200 transform hover:scale-105 rounded-lg" 
                                        style={{ backgroundColor: culoare }}
                                        onClick={() => adaugaCuloareGenerata(culoare)}
                                        title={`Click pentru a adăuga culoarea ${culoare} în paletă`}
                                    >
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-2">
                                <button
                                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                                    onClick={() => setCuloriGenerate([])}
                                >
                                    Șterge Culorile Generate
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="w-full flex flex-wrap justify-center mt-2">
                        {culori.map((culoare, index) => (
                            <div key={index} className="m-1 w-16 h-16 flex justify-center items-center relative cursor-pointer rounded-lg border-2 border-white/30 hover:border-red-400/60 transition-all duration-200" style={{ backgroundColor: culoare }}>
                                <button 
                                    className="absolute inset-0 w-full h-full text-black opacity-0 hover:opacity-80 hover:bg-red-900 rounded-lg transition-all duration-200" 
                                    onClick={() => eliminaCuloare(culoare)}
                                    disabled={loading}
                                    title="Click pentru a elimina culoarea"
                                >
                                    Elimină
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col items-center justify-start overflow-auto p-4 saved-palettes-container">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 gap-2">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold text-center sm:text-left">
                            Palete Salvate
                        </p>
                        <div className="flex items-center gap-2 mr-5">
                            {currentUser && (
                                <button 
                                    onClick={incarcaPaleteFirebase}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? '⟳' : '↻'} Reîncarcă
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-full sm:w-4/5 mx-auto mb-4">
                        <label className="block text-xl font-medium text-cyan-300 mb-2 text-center sm:text-left">
                            Format afișare culori la hover:
                        </label>
                        <select 
                            value={formatCuloare} 
                            onChange={(e) => setFormatCuloare(e.target.value)}
                            className="w-full p-2 border border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg text-cyan-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                        >
                            <option value="HEX">HEX (#FFFFFF)</option>
                            <option value="RGB">RGB (255, 255, 255)</option>
                            <option value="HSL">HSL (360, 100%, 100%)</option>
                        </select>
                    </div>

                    {loading && (
                        <div className="w-full text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                            <p className="mt-2 text-cyan-300">Se încarcă paletele...</p>
                        </div>
                    )}

                    {palete.length === 0 && !loading && (
                        <div className="w-full text-center py-8 text-pink-400">
                            Nu ai palete salvate încă. Creează prima ta paletă!
                        </div>
                    )}

                    {palete.map((paleta, index) => (
                        <div key={index} className="flex flex-col bg-gray-900/60 backdrop-blur-lg border border-pink-400/30 text-white py-3 px-4 rounded-xl w-full sm:w-4/5 mb-3 shadow-lg">
                            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center mb-3 sm:mb-0">
                                <span 
                                    className="text-base sm:text-lg lg:text-xl xl:text-2xl cursor-pointer mb-3 sm:mb-0 sm:w-1/3 font-semibold text-pink-300 hover:text-pink-200 transition-colors" 
                                    onClick={() => incarcaPaleta(paleta)}
                                >
                                    {paleta.nume}
                                </span>
                                <div className='flex flex-wrap gap-2 sm:w-2/3 justify-start sm:justify-end'>
                                    <button 
                                        className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50" 
                                        onClick={() => afiseazaPaleta(paleta)}
                                        disabled={loading}
                                    >
                                        {paletaAfisata && paletaAfisata.id === paleta.id ? 'Ascunde' : 'Afișează'}
                                    </button>
                                    <button 
                                        className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50" 
                                        onClick={() => incarcaPaleta(paleta)}
                                        disabled={loading}
                                    >
                                        {editarePaletaId === paleta.id ? 'Închide Editare' : 'Editează'}
                                    </button>
                                    <button 
                                        className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-3 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50" 
                                        onClick={() => stergePaleta(paleta.id)}
                                        disabled={loading}
                                    >
                                        Șterge
                                    </button>
                                </div>
                            </div>
                            {paletaAfisata && paletaAfisata.id === paleta.id && (
                                <div className="w-full">
                                    <h3 className="text-lg text-cyan-300 font-bold mb-3 text-center sm:text-left">Culori în paleta:</h3>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {paletaAfisata.culori.map((culoare, index) => (
                                            <div 
                                                key={index} 
                                                className="w-12 h-12 sm:w-16 sm:h-16 relative cursor-pointer border-2 border-white/30 hover:border-cyan-400/60 transition-all duration-200 hover:scale-105 rounded-lg" 
                                                style={{ backgroundColor: culoare }}
                                                onMouseEnter={() => setCuloareHover({culoare, index: `${paleta.id}-${index}`})}
                                                onMouseLeave={() => setCuloareHover(null)}
                                                onClick={() => copiazaCuloareInClipboard(culoare)}
                                                title="Click pentru a copia culoarea în clipboard"
                                            >
                                                {culoareHover && culoareHover.index === `${paleta.id}-${index}` && (
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-lg text-white text-xs rounded whitespace-nowrap z-10 border border-cyan-400/50">
                                                        {formatCuloareText(culoare)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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

export default CreatorPaleta;