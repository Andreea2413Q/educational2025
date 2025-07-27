import Modal from '../ui/modal';        // ← Fără {}
import { NoteForm } from './note-form';

export const NoteModal = ({
  isOpen,
  onClose,
  currentNote,
  editingNote,
  onUpdateNote,
  onSave
}) => {
  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingNote ? '✏️ Editează' : '➕ Notiță Nouă'}
    >
      <NoteForm
        currentNote={currentNote}
        onUpdateNote={onUpdateNote}
        onSave={handleSave}
        onCancel={onClose}
        isEditing={!!editingNote}
      />
    </Modal>
  );
};