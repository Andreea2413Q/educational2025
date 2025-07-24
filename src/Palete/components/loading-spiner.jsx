
const LoadingSpinner = () => {
  return (
    <div className="w-full text-center py-4">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      <p className="mt-2 text-cyan-300">Se încarcă paletele...</p>
    </div>
  );
};

export default LoadingSpinner;