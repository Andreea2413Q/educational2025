import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';
import NotesHelp from './help';

const db = getFirestore();

const NotesApp = () => {
  const { currentUser } = useAuth();
  
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [currentNote, setCurrentNote] = useState({
    title: '',
    subtitle: '',
    content: '',
    createdAt: null,
    updatedAt: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadNotes();
  }, [currentUser]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        const unsubscribe = onSnapshot(
          collection(db, 'utilizatorinote', currentUser.uid, 'notite'),
          (querySnapshot) => {
            const firebaseNotes = [];
            querySnapshot.forEach((doc) => {
              firebaseNotes.push({
                id: doc.id,
                ...doc.data()
              });
            });
            firebaseNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setNotes(firebaseNotes);
            setLoading(false);
          }
        );
        return unsubscribe;
      } else {
        const localNotes = JSON.parse(localStorage.getItem('userStorage1') || '[]');
        localNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setNotes(localNotes);
        setLoading(false);
      }
    } catch (error) {
      console.error('Eroare la încărcarea notițelor:', error);
      setLoading(false);
    }
  };

  const saveNote = async () => {
    if (!currentNote.title.trim()) {
      alert('Te rugăm să introduceți un titlu pentru notiță!');
      return;
    }

    const now = new Date().toISOString();
    const noteToSave = {
      ...currentNote,
      updatedAt: now,
      createdAt: editingNote ? editingNote.createdAt : now
    };

    try {
      if (currentUser) {
        const noteId = editingNote ? editingNote.id : `note_${Date.now()}`;
        await setDoc(doc(db, 'utilizatorinote', currentUser.uid, 'notite', noteId), {
          ...noteToSave,
          userId: currentUser.uid
        });
      } else {
        let updatedNotes;
        if (editingNote) {
          updatedNotes = notes.map(note => 
            note.id === editingNote.id ? { ...noteToSave, id: editingNote.id } : note
          );
        } else {
          const newNote = { ...noteToSave, id: `note_${Date.now()}` };
          updatedNotes = [newNote, ...notes];
        }
        setNotes(updatedNotes);
        localStorage.setItem('userStorage1', JSON.stringify(updatedNotes));
      }
      resetForm();
    } catch (error) {
      console.error('Eroare la salvarea notiței:', error);
      alert('Eroare la salvarea notiței. Te rog încearcă din nou.');
    }
  };

  const deleteNote = async (noteId) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Ești sigur că vrei să ștergi această notiță?')) {
      return;
    }

    try {
      if (currentUser) {
        await deleteDoc(doc(db, 'utilizatorinote', currentUser.uid, 'notite', noteId));
      } else {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);
        localStorage.setItem('userStorage1', JSON.stringify(updatedNotes));
      }
    } catch (error) {
      console.error('Eroare la ștergerea notiței:', error);
      alert('Eroare la ștergerea notiței. Te rog încearcă din nou.');
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setCurrentNote({
      title: note.title,
      subtitle: note.subtitle,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentNote({
      title: '',
      subtitle: '',
      content: '',
      createdAt: null,
      updatedAt: null
    });
    setEditingNote(null);
    setShowModal(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const noteStyles = [
    "bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 border-l-4 border-purple-400",
    "bg-gradient-to-br from-yellow-600 via-orange-700 to-amber-800 border-l-4 border-yellow-400",
    "bg-gradient-to-br from-red-700 via-red-800 to-pink-900 border-l-4 border-red-400",
    "bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 border-l-4 border-green-400",
    "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 border-l-4 border-blue-400",
    "bg-gradient-to-br from-cyan-600 via-teal-700 to-blue-800 border-l-4 border-cyan-400",
    "bg-gradient-to-br from-pink-600 via-purple-700 to-violet-800 border-l-4 border-pink-400",
    "bg-gradient-to-br from-orange-600 via-red-700 to-pink-800 border-l-4 border-orange-400",
    "bg-gradient-to-br from-gray-700 via-slate-800 to-gray-900 border-l-4 border-gray-400"
  ];

  const getStyleForNote = (index) => noteStyles[index % 9];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="main-bg min-h-screen">
      <div className="px-4 mx-auto max-w-6xl  pb-4">
        <div className="pt-20 mb-6 pb-4 justify-between items-center flex flex-col sm:flex-row">
          <h1 className="mb-4 sm:mb-0 font-bold text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400">
           Notițe
          </h1>
          <button 
            onClick={() => setShowHelp(true)}
            className="text-white bg-gradient-to-r from-purple-600 to-red-600 border border-cyan-400 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-red-700 text-sm sm:text-base"
            title="Cum se folosește?"
          >
            ?
          </button>
        </div>

        {!currentUser && (
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-center border border-cyan-400 text-sm sm:text-base">
            🔒 Autentifică-te pentru sincronizare pe toate dispozitivele!
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-400 text-sm sm:text-base"
          >
            ➕ Adaugă Notiță
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Caută ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-cyan-300 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg p-3 sm:p-4 text-center border border-cyan-400">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">Total Notițe</h3>
            <p className="text-xl sm:text-2xl font-bold text-red-400">{notes.length}</p>
          </div>
          
          <div className="bg-gradient-to-r from-red-800 to-purple-800 rounded-lg p-3 sm:p-4 text-center border border-cyan-400">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">Status salvare</h3>
            <p className="text-lg sm:text-xl font-bold text-yellow-400">
              {currentUser ? '☁️ Sincronizat' : '💾 Local'}
            </p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <p className="mt-2 text-cyan-300">Se încarcă notițele...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {filteredNotes.length === 0 ? (
              <div className="col-span-full text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">📝</div>
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-2">
                  {searchTerm ? 'Nu s-a găsit nimic' : 'Nicio notiță'}
                </h3>
                <p className="text-sm sm:text-base text-purple-300">
                  {searchTerm 
                    ? 'Încearcă să cauți altceva'
                    : 'Creează prima ta notiță'}
                </p>
              </div>
            ) : (
              filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className={`${getStyleForNote(index)} rounded-lg transition-all duration-300 p-4 sm:p-5 cursor-pointer hover:border-r-4 hover:border-r-white transform hover:scale-105 note-animation`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => editNote(note)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2">
                      {note.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="text-red-400 hover:text-red-300 transition-all duration-300 text-lg sm:text-xl ml-2"
                      title="Șterge notiță"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  {note.subtitle && (
                    <p className="text-sm sm:text-base font-medium text-gray-200 mb-3 line-clamp-1">
                      {note.subtitle}
                    </p>
                  )}
                  
                  <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3">
                    {note.content || 'Fără conținut...'}
                  </p>
                  
                  <div className="text-xs text-gray-400">
                    <p>Creat: {formatDate(note.createdAt)}</p>
                    {note.updatedAt !== note.createdAt && (
                      <p>Modificat: {formatDate(note.updatedAt)}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-cyan-400">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-cyan-400 bg-gradient-to-r from-purple-900 to-red-900">
                <h2 className="text-lg sm:text-2xl font-bold text-cyan-300">
                  {editingNote ? '✏️ Editează' : '➕ Notiță Nouă'}
                </h2>
                <button 
                  onClick={resetForm}
                  className="text-red-400 hover:text-red-300 text-2xl sm:text-3xl font-bold leading-none transition-all duration-300"
                  title="Închide"
                >
                  ×
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Titlu *
                  </label>
                  <input
                    type="text"
                    value={currentNote.title}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Introdu titlul notei..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Subtitlu
                  </label>
                  <input
                    type="text"
                    value={currentNote.subtitle}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Subtitlu opțional..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Conținut
                  </label>
                  <textarea
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Scrie aici conținutul notei..."
                    rows={8}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-4 sm:p-6 border-t-2 border-cyan-400 bg-gradient-to-r from-purple-900 to-red-900">
                <button
                  onClick={resetForm}
                  className="px-4 sm:px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                >
                  Anulează
                </button>
                <button
                  onClick={saveNote}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 border border-cyan-400 text-sm sm:text-base"
                >
                  {editingNote ? 'Salvează' : 'Creează'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showHelp && (
          <NotesHelp showHelp={showHelp} setShowHelp={setShowHelp} />
        )}
      </div>

      <style jsx>{`
        .main-bg {
          background: 
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at center, #001122 0%, #000011 50%, #000000 100%);
          background-size: 30px 30px, 30px 30px, 100% 100%;
          position: relative;
        }
        
        .main-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(2px 2px at 20px 30px, rgba(0,255,65,0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,0,128,0.3), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(0,255,255,0.3), transparent);
          background-size: 120px 120px;
          animation: bg-move 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes bg-move {
          0%, 100% { 
            background-position: 0% 0%, 0% 0%, 0% 0%; 
          }
          50% { 
            background-position: 100% 100%, -100% 200%, 200% -100%; 
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .note-animation {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NotesApp;