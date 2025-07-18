import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Cont/authContext';

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
    <div className="min-h-screen bg-b2">
      <div className="max-w-6xl mx-auto">
     
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pt-5">
          <h1 className="text-2xl sm:text-2xl font-bold text-z1 mb-4 sm:mb-0">
            📝 Notițele Mele
          </h1>
          <button 
            onClick={() => setShowHelp(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            title="Cum se folosește?"
          >
            ?
          </button>
        </div>

        {!currentUser && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-6 text-center">
            🔒 Autentifică-te pentru a sincroniza notițele pe toate dispozitivele!
          </div>
        )}

        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            ➕ Notiță Nouă
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Caută în notițe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-600 rounded-lg shadow-md p-4 text-center border-2 border-white">
            <h3 className="text-xl font-semibold text-yellow-400 ">Total Notițe</h3>
            <p className="text-xl font-bold text-red-600">{notes.length}</p>
          </div>
         
          
          <div className="bg-blue-600 rounded-lg shadow-md p-4 text-center  border-2 border-white">
            <h3 className="text-lg font-semibold text-yellow-400">Sincronizare</h3>
            <p className="text-lg font-bold text-red-600">
              {currentUser ? '☁️ Cloud' : '💾 Local'}
            </p>
          </div>
        </div>

     
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Se încarcă notițele...</p>
          </div>
        )}

       
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchTerm ? 'Nicio notiță găsită' : 'Nicio notiță încă'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'Încearcă un termen de căutare diferit'
                    : 'Creează prima ta notiță apăsând pe butonul "Notiță Nouă"'
                  }
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 cursor-pointer border-l-4 border-yellow-500"
                  onClick={() => editNote(note)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {note.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Șterge notiță"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  {note.subtitle && (
                    <p className="text-md font-medium text-gray-600 mb-3 line-clamp-1">
                      {note.subtitle}
                    </p>
                  )}
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {note.content || 'Fără conținut...'}
                  </p>
                  
                  <div className="text-xs text-gray-500">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingNote ? 'Editează Notiță' : 'Notiță Nouă'}
                </h2>
                <button 
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
                  title="Închide"
                >
                  ×
                </button>
              </div>

          
              <div className="p-6 space-y-4">
           
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titlu *
                  </label>
                  <input
                    type="text"
                    value={currentNote.title}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Introdu titlul notiței..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>

          
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitlu
                  </label>
                  <input
                    type="text"
                    value={currentNote.subtitle}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Introdu subtitlul (opțional)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conținut
                  </label>
                  <textarea
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Scrie conținutul notiței aici..."
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

             
              <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anulează
                </button>
                <button
                  onClick={saveNote}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingNote ? 'Actualizează' : 'Salvează'}
                </button>
              </div>
            </div>
          </div>
        )}

       
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-600 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            
              <div className="sticky top-0 bg-z3  p-6 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-3xl font-bold text-black">? Cum folosești Notițele ?</h2>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-z4 hover:text-z1  text-4xl font-bold leading-none transition-colors duration-300"
                  title="Închide"
                >
                  ×
                </button>
              </div>

         
              <div className="p-6 space-y-8 ">
            
               <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">📝 Crearea Notițelor</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Click "Notiță Nouă":</strong> Deschide formularul pentru o notiță nouă</p>
      <p><strong>2. Completează titlul:</strong> Obligatoriu - numele notiței tale</p>
      <p><strong>3. Adaugă subtitlu:</strong> Opțional - descriere scurtă sau categorie</p>
      <p><strong>4. Scrie conținutul:</strong> Textul principal al notiței</p>
      <p><strong>5. Salvează:</strong> Notița se salvează automat</p>
    </div>
  </div>
</div>

             
              
<div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">🗂️ Gestionarea Notițelor</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Citește:</strong> Click pe orice notiță pentru a o deschide</p>
      <p><strong>2. Editează:</strong> Click pe notiță și modifică conținutul</p>
      <p><strong>3. Șterge:</strong> Click pe iconița de coș de pe fiecare notiță</p>
      <p><strong>4. Caută:</strong> Folosește bara de căutare pentru a găsi notițe</p>
      <p><strong>5. Monitorizează:</strong> Vezi statistici despre notițele tale</p>
    </div>
  </div>
</div>


<div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">🔍 Căutare Avansată</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Caută în toate:</strong> Titlu, subtitlu și conținutul notițelor</p>
      <p><strong>2. Timp real:</strong> Rezultatele se actualizează pe măsură ce scrii</p>
      <p><strong>3. Verifică ortografia:</strong> Dacă nu găsești rezultate</p>
      <p><strong>4. Folosește cuvinte cheie:</strong> Pentru găsire rapidă</p>
    </div>
  </div>
</div>


<div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">☁️ Sincronizare Date</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Cu cont Google:</strong> Notițele se salvează în cloud și se sincronizează</p>
      <p><strong>2. Fără cont:</strong> Notițele se salvează local în browser</p>
      <p><strong>3. Acces multi-device:</strong> Cu contul vezi notițele pe orice dispozitiv</p>
      <p><strong>4. Backup automat:</strong> Nu pierzi niciodată datele cu sincronizarea cloud</p>
    </div>
  </div>
</div>


<div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">📋 Sfaturi pentru Organizare</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Titluri descriptive:</strong> Folosește nume clare și specifice</p>
      <p><strong>2. Subtitluri ca categorii:</strong> "Muncă", "Personal", "Idei", etc.</p>
      <p><strong>3. Căutare cu etichete:</strong> Adaugă cuvinte cheie în conținut</p>
      <p><strong>4. Actualizează regulat:</strong> Editează și completează notițele vechi</p>
      <p><strong>5. Șterge irelevantele:</strong> Păstrează doar ce e important</p>
    </div>
  </div>
</div>


<div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
  <div className="bg-z4 p-6 rounded-xl">
    <h3 className="text-xl font-bold text-blue-900 mb-4">⚡ Funcționalități</h3>
    <div className="space-y-3 text-black">
      <p><strong>1. Timestamp:</strong> Fiecare notiță are data creării și modificării</p>
      <p><strong>2. Responsive:</strong> Funcționează perfect pe toate dispozitivele</p>
      <p><strong>3. Auto-save:</strong> Salvare automată la fiecare modificare</p>
      <p><strong>4. Securitate:</strong> Datele tale sunt protejate și private</p>
    </div>
  </div>
</div>
          </div>
          </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default NotesApp;