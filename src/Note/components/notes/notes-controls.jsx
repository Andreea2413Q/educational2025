import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const NotesControls = ({ onAddNote, searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
      <Button onClick={onAddNote}>
        ➕ Adaugă Notiță
      </Button>
      
      <div className="flex-1">
        <Input
          placeholder="Caută ..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};