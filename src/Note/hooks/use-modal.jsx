import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [currentNote, setCurrentNote] = useState({
    title: '',
    subtitle: '',
    content: '',
    createdAt: null,
    updatedAt: null
  });

  const openModal = () => {
    setShowModal(true);
  };

  const openForEdit = (note) => {
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

  const closeModal = () => {
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

  const updateCurrentNote = (field, value) => {
    setCurrentNote(prev => ({ ...prev, [field]: value }));
  };

  return {
    showModal,
    editingNote,
    currentNote,
    openModal,
    openForEdit,
    closeModal,
    updateCurrentNote
  };
};