import { Send } from 'lucide-react';

const ChatInput = ({ 
  inputValue, 
  setInputValue, 
  onSend, 
  onKeyPress, 
  disabled = false 
}) => {
  return (
    <div className="p-3 lg:p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Întreabă despre culori și culturi..."
          disabled={disabled}
          className="flex-1 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          onClick={onSend}
          disabled={!inputValue.trim() || disabled}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1.5 lg:p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
