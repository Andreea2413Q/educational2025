import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';

const db = getFirestore();

function Wolearn() {
  const { currentUser } = useAuth();

  const [inputText, setInputText] = useState('');
  const [highlightWord, setHighlightWord] = useState('');
  const [userWord, setUserWord] = useState('');
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(10);
  const [inputBorderColor, setInputBorderColor] = useState('border-cyan-400');
  const [noteTitle, setNoteTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [noteToEditId, setNoteToEditId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const selectRandomWord = (text) => {
    if (!text) {
      setHighlightWord('');
      return;
    }
    const words = text.split(' ').filter(w =>
      w.trim().length >= minLength && w.trim().length <= maxLength
    );
    if (words.length > 0) {
      setHighlightWord(words[Math.floor(Math.random() * words.length)]);
    } else {
      setHighlightWord('');
    }
  };

  useEffect(() => {
    if (!currentUser) {
      setNotes([]);
      setInputText('');
      setNoteTitle('');
      setEditMode(false);
      setNoteToEditId(null);
      setActiveNoteId(null);
      return;
    }

    const notesRef = collection(db, 'users', currentUser.uid, 'Wonotes');
    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    selectRandomWord(inputText);
  }, [inputText, minLength, maxLength]);

  useEffect(() => {
    if (userWord.trim().toLowerCase() === highlightWord.trim().toLowerCase() && highlightWord !== '') {
      setUserWord('');
      setInputBorderColor('border-green-400 shadow-green-400/50');
      selectRandomWord(inputText);
      setTimeout(() => setInputBorderColor('border-cyan-400'), 1000);
    } else {
      setInputBorderColor('border-cyan-400');
    }
  }, [userWord, highlightWord, inputText]);

  const formatText = (text) => {
    if (!text) return '';
    return text.split(' ').map((word) => (
      word === highlightWord
        ? `<span class="underline text-pink-400 font-bold animate-pulse glow-pink">${word}</span>`
        : `<span class="text-cyan-100">${word}</span>`
    )).join(' ');
  };

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleUserWordChange = (e) => setUserWord(e.target.value);
  const handleMinLengthChange = (e) => {
    const val = Number(e.target.value);
    if (val >= 0 && val <= maxLength) setMinLength(val);
  };
  const handleMaxLengthChange = (e) => {
    const val = Number(e.target.value);
    if (val >= minLength) setMaxLength(val);
  };
  const handleNoteTitleChange = (e) => setNoteTitle(e.target.value);

  const reset = () => {
    selectRandomWord(inputText);
    setUserWord('');
    setInputBorderColor('border-cyan-400');
  };

  const saveOrUpdateNote = async () => {
    if (!noteTitle.trim() || !inputText.trim()) {
      setError('Te rog să introduci un titlu și un text pentru notă.');
      return;
    }
    if (!currentUser) {
      setError('Trebuie să fii conectat pentru a salva notele.');
      return;
    }

    const notesRef = collection(db, 'users', currentUser.uid, 'Wonotes');

    try {
      const existingNote = notes.find(note => note.title === noteTitle && note.id !== noteToEditId);

      if (existingNote) {
        setError('Există deja o notă cu acest titlu.');
        return;
      }

      if (editMode && noteToEditId) {
        const noteDocRef = doc(db, 'users', currentUser.uid, 'Wonotes', noteToEditId);
        await updateDoc(noteDocRef, {
          title: noteTitle,
          text: inputText
        });
      } else {
        await addDoc(notesRef, {
          title: noteTitle,
          text: inputText
        });
      }

      setNoteTitle('');
      setInputText('');
      setEditMode(false);
      setNoteToEditId(null);
      setActiveNoteId(null);
      setError('');
      reset();

    } catch (err) {
      setError('Eroare la salvarea notei: ' + err.message);
    }
  };

  const loadNote = (noteId) => {
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
      setNoteTitle('');
      setInputText('');
      setEditMode(false);
      setNoteToEditId(null);
      reset();
    } else {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        setInputText(note.text);
        setNoteTitle(note.title);
        setEditMode(true);
        setNoteToEditId(note.id);
        setActiveNoteId(note.id);
        reset();
      }
    }
  };

  const deleteNote = async (noteId) => {
    if (!currentUser) {
      setError('Trebuie să fii conectat pentru a șterge notele.');
      return;
    }
    try {
      const noteDocRef = doc(db, 'users', currentUser.uid, 'Wonotes', noteId);
      await deleteDoc(noteDocRef);

      if (noteToEditId === noteId) {
        setInputText('');
        setNoteTitle('');
        setEditMode(false);
        setNoteToEditId(null);
        setActiveNoteId(null);
      }
      setError('');
    } catch (err) {
      setError('Eroare la ștergerea notei: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
     
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
       
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Wolearn
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="block text-cyan-300 font-semibold text-sm sm:text-base">
              Introdu textul
            </label>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              className={`w-full h-32 sm:h-40 lg:h-48 p-4 rounded-xl border-2 ${inputBorderColor} 
                bg-gray-900/80 backdrop-blur-lg text-cyan-100 placeholder-cyan-500/50 
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:shadow-lg focus:shadow-cyan-400/25
                resize-none transition-all duration-300 text-sm sm:text-base`}
              placeholder="Te rog introdu textul aici..."
            />
          </div>

          <div className="space-y-4">
            <label className="block text-pink-300 font-semibold text-sm sm:text-base">
              Text formatat
            </label>
            <div
              className="w-full h-32 sm:h-40 lg:h-48 p-4 rounded-xl border-2 border-pink-400/50 
                bg-gray-900/80 backdrop-blur-lg overflow-auto scrollbar-thin scrollbar-thumb-pink-400/50"
              dangerouslySetInnerHTML={{ __html: formatText(inputText) }}
              style={{ scrollbarWidth: 'thin' }}
            />
          </div>
        </div>

    
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-cyan-300 font-semibold mb-2 text-sm sm:text-base">
              Scrie cuvântul subliniat
            </label>
            <input
              type="text"
              value={userWord}
              onChange={handleUserWordChange}
              className={`w-full p-3 sm:p-4 rounded-xl border-2 ${inputBorderColor} 
                bg-gray-900/80 backdrop-blur-lg text-cyan-100 placeholder-cyan-500/50 
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:shadow-lg focus:shadow-cyan-400/25
                text-sm sm:text-base transition-all duration-300`}
              placeholder="Scrie cuvântul subliniat aici..."
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={reset}
              className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 
                transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50
                text-sm sm:text-base border border-purple-400/50"
            >
              Resetare
            </button>
          </div>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 items-center">
          <div>
            <label className="block text-cyan-300 font-semibold mb-2 text-sm">Lungime minimă</label>
            <input
              type="number"
              value={minLength}
              onChange={handleMinLengthChange}
              className="w-full p-3 rounded-xl border-2 border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg 
                text-cyan-100 text-center focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                text-sm sm:text-base"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-transparent bg-gradient-to-r 
              from-cyan-400 to-pink-400 bg-clip-text px-2">
              Selectează numărul minim și maxim de litere pentru cuvântul tău
            </h2>
          </div>
          
          <div>
            <label className="block text-pink-300 font-semibold mb-2 text-sm">Lungime maximă</label>
            <input
              type="number"
              value={maxLength}
              onChange={handleMaxLengthChange}
              className="w-full p-3 rounded-xl border-2 border-pink-400/50 bg-gray-900/80 backdrop-blur-lg 
                text-pink-100 text-center focus:outline-none focus:ring-2 focus:ring-pink-400/50
                text-sm sm:text-base"
            />
          </div>
        </div>

   
        <div className="bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-4 sm:p-6 mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text mb-4">
            Salvează nota
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={noteTitle}
                onChange={handleNoteTitleChange}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-cyan-400/50 bg-gray-900/80 backdrop-blur-lg 
                  text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                  text-sm sm:text-base"
                placeholder="Titlul notei"
              />
            </div>
            
            <button
              onClick={saveOrUpdateNote}
              className="px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold 
                rounded-xl hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 
                transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 border border-cyan-400/50
                text-sm sm:text-base"
            >
              {editMode ? 'Actualizează ' : 'Salvează '}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-400/50 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

     
        <div className="bg-gray-900/40 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-6">
            Texte Salvate ({notes.length})
          </h3>
          
          {notes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-cyan-300/70 text-sm sm:text-base">Nu există note salvate încă.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`relative group cursor-pointer p-4 rounded-xl border-2 transition-all duration-300
                    ${activeNoteId === note.id 
                      ? 'border-pink-400 bg-pink-900/20 shadow-lg shadow-pink-400/25' 
                      : 'border-cyan-400/30 bg-gray-900/60 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25'
                    }`}
                >
                  <div
                    onClick={() => loadNote(note.id)}
                    className="flex-1"
                  >
                    <h4 className={`font-bold text-sm sm:text-base mb-2 transition-all duration-300 
                      ${activeNoteId === note.id ? 'text-pink-300' : 'text-cyan-300 group-hover:text-cyan-200'}`}>
                      {note.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-3">
                      {note.text.substring(0, 100)}...
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-600/80 hover:bg-red-600 
                      text-white rounded-full flex items-center justify-center text-xs sm:text-sm 
                      transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .glow-pink {
          text-shadow: 0 0 10px rgba(236, 72, 153, 0.8);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.5);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.7);
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}

export default Wolearn;