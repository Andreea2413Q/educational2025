export const NotesEmpty = ({ hasSearchTerm }) => {
  return (
    <div className="col-span-full text-center py-8 sm:py-12">
      <div className="text-4xl sm:text-6xl mb-4">📝</div>
      <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-2">
        {hasSearchTerm ? 'Nu s-a găsit nimic' : 'Nicio notiță'}
      </h3>
      <p className="text-sm sm:text-base text-purple-300">
        {hasSearchTerm 
          ? 'Încearcă să cauți altceva'
          : 'Creează prima ta notiță'}
      </p>
    </div>
  );
};