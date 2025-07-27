import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const NoteForm = ({ currentNote, onUpdateNote, onSave, onCancel, isEditing }) => {
  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2">
            Titlu *
          </label>
          <Input
            value={currentNote.title}
            onChange={(e) => onUpdateNote('title', e.target.value)}
            placeholder="Introdu titlul notei..."
            className="w-full"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2">
            Subtitlu
          </label>
          <Input
            value={currentNote.subtitle}
            onChange={(e) => onUpdateNote('subtitle', e.target.value)}
            placeholder="Subtitlu opțional..."
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2">
            Conținut
          </label>
          <Textarea
            value={currentNote.content}
            onChange={(e) => onUpdateNote('content', e.target.value)}
            placeholder="Scrie aici conținutul notei..."
            rows={8}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-4 sm:p-6 border-t-2 border-cyan-400 bg-gradient-to-r from-purple-900 to-red-900">
        <Button
          onClick={onCancel}
          variant="secondary"
        >
          Anulează
        </Button>
        <Button
          onClick={onSave}
          variant="danger"
        >
          {isEditing ? 'Salvează' : 'Creează'}
        </Button>
      </div>
    </>
  );
};
