import { MessageCircle } from 'lucide-react';

const FloatingChatButton = ({ onClick, apiConnected }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 lg:hidden bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
      {apiConnected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      )}
    </button>
  );
};

export default FloatingChatButton;