const UserNotification = ({ currentUser }) => {
  if (currentUser) return null;

  return (
    <div className="mx-auto mt-4 bg-yellow-900/20 border border-yellow-400/30 rounded-xl backdrop-blur-lg p-4 shadow-lg">
      <p className="text-yellow-300 text-center text-sm sm:text-base">
        Conectează-te pentru a-ți sincroniza progresul pe toate dispozitivele, oricând și oriunde.
      </p>
    </div>
  );
};

export default UserNotification;