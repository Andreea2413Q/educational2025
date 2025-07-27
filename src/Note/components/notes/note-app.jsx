import { useState, useEffect } from 'react';
import { useAuth } from '../../../Cont/authContext';
import Help from './help';

// Hooks
import { useNotes } from '../../hooks/use-notes';
import { useModal } from '../../hooks/use-modal';
import { useSearch } from '../../hooks/use-search';

// Components
import { NotesHeader } from './notes-header';
import { AuthWarning } from './auth-warning';
import { NotesControls } from './notes-controls';
import { NotesStats } from './notes-stats';
import { NotesList } from './notes-list';
import { NoteModal }  from './note-modal';

const NotesApp = () => {
  const { currentUser } = useAuth();
  const [showHelp, setShowHelp] = useState(false);


  const notes = useNotes(currentUser);
  const modal = useModal();
  const search = useSearch(notes.notes);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveNote = async () => {
    const success = await notes.saveNote(modal.currentNote, modal.editingNote);
    if (success) {
      modal.closeModal();
    }
    return success;
  };

  return (
    <div className="main-bg min-h-screen">
      <div className="px-4 mx-auto max-w-6xl pb-4">
        <NotesHeader onHelpClick={() => setShowHelp(true)} />
        
        <AuthWarning show={!currentUser} />
        
        <NotesControls
          onAddNote={modal.openModal}
          searchTerm={search.searchTerm}
          onSearchChange={search.setSearchTerm}
        />
        
        <NotesStats
          totalNotes={notes.notes.length}
          isAuthenticated={!!currentUser}
        />
        
        <NotesList
          notes={search.filteredNotes}
          loading={notes.loading}
          onEdit={modal.openForEdit}
          onDelete={notes.deleteNote}
          hasSearchTerm={!!search.searchTerm}
        />
        
        <NoteModal
          isOpen={modal.showModal}
          onClose={modal.closeModal}
          currentNote={modal.currentNote}
          editingNote={modal.editingNote}
          onUpdateNote={modal.updateCurrentNote}
          onSave={handleSaveNote}
        />
        
        {showHelp && (
          <Help showHelp={showHelp} setShowHelp={setShowHelp} />
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