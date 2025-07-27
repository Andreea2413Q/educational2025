import { Button } from '../ui/button';

export const NotesHeader = ({ onHelpClick }) => {
  return (
    <div className="pt-20 mb-6 pb-4 justify-between items-center flex flex-col sm:flex-row">
      <h1 className="mb-4 sm:mb-0 font-bold text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400">
        Notițe
      </h1>
      <Button 
        onClick={onHelpClick}
        variant="help"
        size="sm"
        title="Cum se folosește?"
      >
        ?
      </Button>
    </div>
  );
};