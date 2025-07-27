import { NoteItem } from './note-item';
import { NotesEmpty } from './notes-empty';
import { NotesLoading } from './notes-loading';

export const NotesList = ({ notes, loading, onEdit, onDelete, hasSearchTerm }) => {
  if (loading) {
    return <NotesLoading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
      {notes.length === 0 ? (
        <NotesEmpty hasSearchTerm={hasSearchTerm} />
      ) : (
        notes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};