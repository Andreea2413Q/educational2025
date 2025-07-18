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
    const [showHelp, setShowHelp] = useState(false);

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
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Ești sigură că vrei să continui?")) {
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
            // Fallback dacă clipboard nu merge
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
        <div className="flex flex-col lg:flex-row pt-5 bg-d2 w-screen h-screen overflow-auto" style={{
            paddingTop: '100px'
        }}>
            {!currentUser && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-lg">
                    🔒 Autentifică-te pentru a salva paletele în contul tău!
                </div>
            )}

            <div className={`w-full lg:w-1/2 flex flex-col items-center justify-center ${isScreenBelowMd ? 'pb-8' : ''}`}
                style={{marginTop: isScreenBelowMd ? '0' : '0px'}}
            >
                <div className="md:flex block w-full items-center justify-center my-3 sticky rounded focus:outline-none focus:shadow-outline">
                    <input
                        className="ml-5 py-2 border rounded w-2/5 md:text-base sm:text-sm  xl:text-2xl text-center text-sm "
                        placeholder="Nume Paleta"
                        value={numePaleta}
                        onChange={e => setNumePaleta(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        className={`text-xs md:text-base sm:text-sm  xl:text-2xl w-2/5 ml-2 ${loading ? 'bg-gray-400' : 'bg-b1'} py-2 text-white font-bold rounded focus:outline-none focus:shadow-outline`} 
                        onClick={salveazaPaleta}
                        disabled={loading}
                    >
                        {loading ? 'Se salvează...' : 'Salvează Paleta'}
                    </button>
                </div>
                <SketchPicker color={culoareSelectata} onChangeComplete={schimbaCuloare} width="45%" height="50" />
                <div className="w-full relative items-center flex">
                    <button 
                        className="text-lg md:text-base sm:text-sm xl:text-xl  mt-4 ml-5  bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5" 
                        onClick={adaugaCuloare}
                        disabled={loading}
                    >
                        Adaugă Culoare
                    </button>

                    <button
                        className="text-xs md:text-base sm:text-sm xl:text-xl xl:text-2xl mt-4 ml-2 text-xl bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5"
                        onClick={genereazaCuloriAsemantoare}
                        disabled={loading}
                    >
                        Generează 5 Culori Asemănătoare
                    </button>
                </div>

                {culoriGenerate.length > 0 && (
                    <div className="w-full mt-4 h-full  p-4 bg-white rounded-lg shadow-lg">
                        <h3 className="text-center text-lg font-bold mb-3 text-gray-800">
                            Culori Generate (Click pentru a adăuga în paletă)
                        </h3>
                        <div className="flex flex-wrap justify-center">
                            {culoriGenerate.map((culoare, index) => (
                                <div 
                                    key={index} 
                                    className="m-1 w-16 h-16 cursor-pointer border-2 border-gray-300 hover:border-gray-600 transition-all duration-200 transform hover:scale-105" 
                                    style={{ backgroundColor: culoare }}
                                    onClick={() => adaugaCuloareGenerata(culoare)}
                                    title={`Click pentru a adăuga culoarea ${culoare} în paletă`}
                                >
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-2">
                            <button
                                className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                onClick={() => setCuloriGenerate([])}
                            >
                                Șterge Culorile Generate
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full flex flex-wrap justify-center mt-2">
                    {culori.map((culoare, index) => (
                        <div key={index} className="m-1 w-16 h-16 flex justify-center items-center relative cursor-pointer" style={{ backgroundColor: culoare }}>
                            <button 
                                className="absolute inset-0 w-full h-full  text-black opacity-0 hover:opacity-20 hover:bg-red-900" 
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
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-b1 font-bold text-center sm:text-left">
                        Palete Salvate
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setShowHelp(true)}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                            title="Ajutor - Cum funcționează?"
                        >
                            ?
                        </button>
                        {currentUser && (
                            <button 
                                onClick={incarcaPaleteFirebase}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? '⟳' : '↻'} Reîncarcă
                            </button>
                        )}
                    </div>
                </div>

                {/* Dropdown pentru format culori */}
                <div className="w-full sm:w-4/5 mx-auto mb-4">
                    <label className="block text-xl  font-medium text-gray-700 mb-2 text-center sm:text-left">
                        Format afișare culori la hover:
                    </label>
                    <select 
                        value={formatCuloare} 
                        onChange={(e) => setFormatCuloare(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    >
                        <option value="HEX">HEX (#FFFFFF)</option>
                        <option value="RGB">RGB (255, 255, 255)</option>
                        <option value="HSL">HSL (360, 100%, 100%)</option>
                    </select>
                </div>

                {currentUser && (
                    <div className="w-full sm:w-4/5 mx-auto mb-4 p-3 bg-b2 text-d1 font-bold text-lg sm:text-xl text-center rounded-xl">
                        👋 Bun venit, {currentUser.displayName || currentUser.email || "utilizator"}!
                    </div>
                )}

                {loading && (
                    <div className="w-full text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2">Se încarcă paletele...</p>
                    </div>
                )}

                {palete.length === 0 && !loading && (
                    <div className="w-full text-center py-8 text-gray-500">
                        Nu ai palete salvate încă. Creează prima ta paletă!
                    </div>
                )}

                {palete.map((paleta, index) => (
                    <div key={index} className="flex flex-col bg-gray-600 text-white py-3 px-4 rounded w-full sm:w-4/5 mb-3">
                        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center mb-3 sm:mb-0">
                            <span 
                                className="text-base sm:text-lg lg:text-xl xl:text-2xl cursor-pointer mb-3 sm:mb-0 sm:w-1/3 font-semibold" 
                                onClick={() => incarcaPaleta(paleta)}
                            >
                                {paleta.nume}
                            </span>
                            <div className='flex flex-wrap gap-2 sm:w-2/3 justify-start sm:justify-end'>
                                <button 
                                    className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-green-600 px-3 py-1 rounded transition-colors hover:bg-green-700" 
                                    onClick={() => afiseazaPaleta(paleta)}
                                    disabled={loading}
                                >
                                    {paletaAfisata && paletaAfisata.id === paleta.id ? 'Ascunde' : 'Afișează'}
                                </button>
                                <button 
                                    className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-blue-800 px-3 py-1 rounded transition-colors hover:bg-blue-900" 
                                    onClick={() => incarcaPaleta(paleta)}
                                    disabled={loading}
                                >
                                    {editarePaletaId === paleta.id ? 'Închide Editare' : 'Editează'}
                                </button>
                                <button 
                                    className="text-sm sm:text-base lg:text-lg xl:text-xl text-white bg-red-800 px-3 py-1 rounded transition-colors hover:bg-red-900" 
                                    onClick={() => stergePaleta(paleta.id)}
                                    disabled={loading}
                                >
                                    Șterge
                                </button>
                            </div>
                        </div>
                        {paletaAfisata && paletaAfisata.id === paleta.id && (
                            <div className="w-full">
                                <h3 className="text-lg text-white font-bold mb-3 text-center sm:text-left">Culori în paleta:</h3>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {paletaAfisata.culori.map((culoare, index) => (
                                        <div 
                                            key={index} 
                                            className="w-12 h-12 sm:w-16 sm:h-16 relative cursor-pointer border-2 border-white hover:border-yellow-400 transition-all duration-200 hover:scale-105 rounded" 
                                            style={{ backgroundColor: culoare }}
                                            onMouseEnter={() => setCuloareHover({culoare, index: `${paleta.id}-${index}`})}
                                            onMouseLeave={() => setCuloareHover(null)}
                                            onClick={() => copiazaCuloareInClipboard(culoare)}
                                            title="Click pentru a copia culoarea în clipboard"
                                        >
                                            {culoareHover && culoareHover.index === `${paleta.id}-${index}` && (
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
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

            {/* Modal Help */}
            {showHelp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                        {/* Header cu X */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                            <h2 className="text-3xl font-bold text-gray-800">🎨 Cum funcționează Creator Paleta</h2>
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
                            {/* Secțiunea 1: Crearea paletelor */}
                            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-xl font-bold text-blue-800 mb-4">📝 Crearea Paletelor</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>1. Selectează o culoare:</strong> Folosește color picker-ul pentru a alege culoarea dorită</p>
                                    <p><strong>2. Adaugă culoarea:</strong> Click pe "Adaugă Culoare" pentru a o include în paleta ta</p>
                                    <p><strong>3. Generează culori similare:</strong> Click pe "Generează 5 Culori Asemănătoare" pentru sugestii</p>
                                    <p><strong>4. Denumește paleta:</strong> Introdu un nume unic în câmpul "Nume Paleta"</p>
                                    <p><strong>5. Salvează:</strong> Click pe "Salvează Paleta" pentru a o stoca</p>
                                </div>
                            </div>

                            {/* Secțiunea 2: Gestionarea paletelor */}
                            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                                <h3 className="text-xl font-bold text-green-800 mb-4">🗂️ Gestionarea Paletelor Salvate</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>📋 Afișează:</strong> Vezi toate culorile dintr-o paletă</p>
                                    <p><strong>✏️ Editează:</strong> Modifică o paletă existentă</p>
                                    <p><strong>🗑️ Șterge:</strong> Elimină definitiv o paletă</p>
                                    <p><strong>📋 Copiază culori:</strong> Click pe orice culoare pentru a o copia în clipboard</p>
                                </div>
                            </div>

                            {/* Secțiunea 3: Formate culori */}
                            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-xl font-bold text-purple-800 mb-4">🎨 Formate de Culori</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>HEX:</strong> #FF5733 - format web standard</p>
                                    <p><strong>RGB:</strong> rgb(255, 87, 51) - pentru design digital</p>
                                    <p><strong>HSL:</strong> hsl(14, 100%, 60%) - pentru ajustări precise</p>
                                    <p><strong>💡 Tip:</strong> Schimbă formatul din dropdown-ul de deasupra paletelor</p>
                                </div>
                            </div>

                            {/* Secțiunea 4: Interacțiuni */}
                            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                                <h3 className="text-xl font-bold text-orange-800 mb-4">🖱️ Interacțiuni</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Hover pe culoare:</strong> Vezi valoarea culorii în formatul selectat</p>
                                    <p><strong>Click pe culoare:</strong> Copiază automat culoarea în clipboard</p>
                                    <p><strong>Click pe nume paletă:</strong> Încarcă paleta pentru editare</p>
                                    <p><strong>Culori generate:</strong> Click pe ele pentru a le adăuga în paleta curentă</p>
                                </div>
                            </div>

                            {/* Secțiunea 5: Autentificare */}
                            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                                <h3 className="text-xl font-bold text-yellow-800 mb-4">🔐 Autentificare</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Fără cont:</strong> Paletele se salvează local în browser</p>
                                    <p><strong>Cu cont:</strong> Paletele se sincronizează în cloud</p>
                                    <p><strong>Avantaj:</strong> Accesezi paletele de pe orice dispozitiv</p>
                                </div>
                            </div>

                            {/* Tips & Tricks */}
                            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-500">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Tips & Tricks</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p>• Folosește culori generate pentru variații rapide</p>
                                    <p>• Testează diferite formate pentru workflow-ul tău</p>
                                    <p>• Organizează paletele cu nume descriptive</p>
                                    <p>• Copiază culorile direct în aplicațiile de design</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-gray-50 p-6 text-center border-t border-gray-200 rounded-b-2xl">
                            <button 
                                onClick={() => setShowHelp(false)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Am înțeles! 🎨
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreatorPaleta;