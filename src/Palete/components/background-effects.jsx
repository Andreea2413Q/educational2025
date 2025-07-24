const BackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
};

export default BackgroundEffects;