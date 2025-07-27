export const NotesLoading = () => {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      <p className="mt-2 text-cyan-300">Se încarcă notițele...</p>
    </div>
  );
};