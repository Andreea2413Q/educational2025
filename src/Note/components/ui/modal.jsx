const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-cyan-400">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-cyan-400 bg-gradient-to-r from-purple-900 to-red-900">
          <h2 className="text-lg sm:text-2xl font-bold text-cyan-300">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-red-400 hover:text-red-300 text-2xl sm:text-3xl font-bold leading-none transition-all duration-300"
            title="Închide"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;