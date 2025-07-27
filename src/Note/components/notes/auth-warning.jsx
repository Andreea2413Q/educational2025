export const AuthWarning = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-center border border-cyan-400 text-sm sm:text-base">
      🔒 Autentifică-te pentru sincronizare pe toate dispozitivele!
    </div>
  );
};