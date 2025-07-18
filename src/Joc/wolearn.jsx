import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext'; // presupun contextul tău de autentificare

const db = getFirestore();

function Wolearn() {
  const { currentUser } = useAuth();

  const [inputText, setInputText] = useState('');
  const [highlightWord, setHighlightWord] = useState('');
  const [userWord, setUserWord] = useState('');
  const [minLength, setMinLength] = useState(1);
  const [maxLength, setMaxLength] = useState(10);
  const [inputBorderColor, setInputBorderColor] = useState('border-black');
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

    const notesRef = collection(db, 'users', currentUser.uid, 'notes');
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
      setInputBorderColor('border-green-500');
      selectRandomWord(inputText);
    } else {
      setInputBorderColor('border-black');
    }
  }, [userWord, highlightWord, inputText]);

  const formatText = (text) => {
    if (!text) return '';
    return text.split(' ').map((word) => (
      word === highlightWord
        ? `<span class="underline text-green-400">${word}</span>`
        : `<span class="text-black">${word}</span>`
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
    setInputBorderColor('border-black');
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

    const notesRef = collection(db, 'users', currentUser.uid, 'notes');

    try {
      const existingNote = notes.find(note => note.title === noteTitle && note.id !== noteToEditId);

      if (existingNote) {
        setError('Există deja o notă cu acest titlu.');
        return;
      }

      if (editMode && noteToEditId) {
        const noteDocRef = doc(db, 'users', currentUser.uid, 'notes', noteToEditId);
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
      const noteDocRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
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
    <div className="App p-4 bg-b2 min-h-screen">
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className={`border rounded p-2 m-2 w-full text-center ${inputBorderColor} sm:text-sm md:text-md lg:text-lg xl:text-xl`}
        placeholder="Te rog introdu textul aici..."
        style={{ minHeight: '150px', resize: 'both' }}
      />
      <div
        className="border-2 border-b5 rounded p-2 m-2 w-full sm:text-sm md:text-md lg:text-lg xl:text-xl"
        dangerouslySetInnerHTML={{ __html: formatText(inputText) }}
        style={{ minHeight: '150px', overflow: 'auto' }}
      />
      <div className="w-full flex mx-auto">
        <input
          type="text"
          value={userWord}
          onChange={handleUserWordChange}
          className={`border rounded p-2 m-2
            sm:w-64 sm:h-4 sm:text-smc 
            md:w-96 md:h-6 md:text-mdc text-blue-800 md:py-2
            lg:w-128 lg:h-8 lg:text-lg 
            xl:w-2/5 xl:h-10 xl:text-xl 
            ${inputBorderColor}`}
          placeholder="Scrie cuvântul subliniat aici..."
        />
        <button
          className="h-12 m-auto text-center justify-center text-2xl text-violet-600 font-bold bg-slate-100 rounded-2xl hover:bg-green-400 duration-500 transition-all hover:text-blue-600
            sm:text-sm sm:w-32 sm:h-6
            md:text-md md:w-40 md:h-7
            lg:text-lg lg:w-48 lg:h-8
            xl:text-xl xl:w-1/5 xl:h-10"
          onClick={reset}
        >
          Resetare
        </button>
      </div>
      <div className="w-full flex justify-between mt-4 align-middle items-center">
        <input
          type="number"
          value={minLength}
          onChange={handleMinLengthChange}
          className="border rounded p-2 text-center
           sm:text-mdc sm:w-16 sm:h-5
           md:text-md md:w-24 md:h-6
           lg:text-lg lg:w-32 lg:h-8
           xl:text-xl xl:w-48 xl:h-10"
          placeholder="Lungime minimă"
        />
        <h1 className="w-2/5 text-black text-center m-auto font-bold sm:text-md md:text-lg lg:text-xl xl:text-xl">
          Selectează numărul minim și maxim de litere pentru cuvântul tău
        </h1>
        <input
          type="number"
          value={maxLength}
          onChange={handleMaxLengthChange}
          className="border rounded p-2  text-center
           sm:text-md sm:w-16 sm:h-5
           md:text-lg md:w-24 md:h-6
           lg:text-xl lg:w-32 lg:h-8
           xl:text-2xl xl:w-48 xl:h-10"
          placeholder="Lungime maximă"
        />
      </div>

      <div className="mt-6 flex items-center">
        <input
          type="text"
          value={noteTitle}
          onChange={handleNoteTitleChange}
          className="border rounded p-2 m-2 w-2/5 
          sm:text-sdc sm:w-48
          md:text-mdc md:w-64 
          lg:text-lg lg:w-96 
          xl:text-xl xl:w-2/5 h-full"
          placeholder="Titlul notei"
        />
        <button
          className="duration-700 w-1/6 h-12 m-auto text-center justify-center text-2xl text-violet-600 font-bold bg-slate-100 rounded-2xl hover:bg-green-400 transition hover:text-blue-600
          sm:text-smc sm:w-32 sm:h-7
          md:text-mdc md:w-40 md:h-9
          lg:text-lg lg:w-48 lg:h-10
          xl:text-2xl xl:w-64 xl:h-12"
          onClick={saveOrUpdateNote}
        >
          {editMode ? 'Actualizează Nota' : 'Salvează Nota'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2 text-white sm:text-md md:text-lg lg:text-xl xl:text-2xl">Texte Salvate</h2>
        <ul className="list-disc pl-5">
          {notes.map((note) => (
            <li key={note.id} className="flex justify-center items-center cursor-pointer mb-2">
              <span
                onClick={() => loadNote(note.id)}
                className={`sm:text-md md:text-lg lg:text-xl xl:text-2xl w-2/5 font-bold transition-all duration-500 ${
                  activeNoteId === note.id ? 'text-white' : 'text-yellow-400'
                } hover:text-d3`}
              >
                {note.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="text-xl font-bold text-red-500 duration-500 hover:text-red-700 sm:text-sm md:text-md lg:text-lg xl:text-xl"
              >
                Șterge
              </button>
            </li>
          ))}
          {notes.length === 0 && <p className="text-d3">Nu există note salvate încă.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Wolearn;
