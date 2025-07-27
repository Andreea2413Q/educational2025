import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

const db = getFirestore();

export const useNotes = (currentUser) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const saveNote = async (currentNote, editingNote) => {
    if (!currentNote.title.trim()) {
      alert('Te rugăm să introduceți un titlu pentru notiță!');
      return false;
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
      return true;
    } catch (error) {
      console.error('Eroare la salvarea notiței:', error);
      alert('Eroare la salvarea notiței. Te rog încearcă din nou.');
      return false;
    }
  };

  const deleteNote = async (noteId) => {
 if (!window.confirm('Ești sigur că vrei să ștergi această notiță?')) {
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

  return { notes, loading, saveNote, deleteNote };
};