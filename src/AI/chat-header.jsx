import { Zap, Settings, X } from 'lucide-react';

const ChatHeader = ({ 
  apiConnected, 
  onToggleApiInput, 
  onClose, 
  showCloseButton = false 
}) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 lg:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="bg-white/20 p-1 lg:p-2 rounded-full">
            <Zap className="h-4 w-4 lg:h-5 lg:w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm lg:text-lg">AI Culori & Cultură</h3>
            <p className="text-xs lg:text-sm opacity-90 flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${apiConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
              {apiConnected ? 'Groq conectat' : 'Mod local'}
            </p>
          </div>
        </div>
        <div className="flex space-x-1 lg:space-x-2">
          <button
            onClick={onToggleApiInput}
            className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Setări API"
          >
            <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
          </button>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors lg:hidden"
            >
              <X className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
