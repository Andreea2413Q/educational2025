export const NotesStats = ({ totalNotes, isAuthenticated }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg p-3 sm:p-4 text-center border border-cyan-400">
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">Total Notițe</h3>
        <p className="text-xl sm:text-2xl font-bold text-red-400">{totalNotes}</p>
      </div>
      
      <div className="bg-gradient-to-r from-red-800 to-purple-800 rounded-lg p-3 sm:p-4 text-center border border-cyan-400">
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">Status salvare</h3>
        <p className="text-lg sm:text-xl font-bold text-yellow-400">
          {isAuthenticated ? '☁️ Sincronizat' : '💾 Local'}
        </p>
      </div>
    </div>
  );
};