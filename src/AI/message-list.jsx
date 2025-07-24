import { Zap, User } from 'lucide-react';

const MessageList = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs px-3 lg:px-4 py-2 rounded-2xl ${
              message.type === 'user'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white border border-gray-200 text-gray-800'
            }`}
          >
            <div className="flex items-start space-x-2">
              {message.type === 'bot' && (
                <Zap className="h-3 w-3 lg:h-4 lg:w-4 mt-0.5 text-orange-600 flex-shrink-0" />
              )}
              {message.type === 'user' && (
                <User className="h-3 w-3 lg:h-4 lg:w-4 mt-0.5 text-white flex-shrink-0" />
              )}
              <div className="whitespace-pre-wrap text-xs lg:text-sm leading-relaxed">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 text-gray-800 px-3 lg:px-4 py-2 rounded-2xl max-w-xs">
            <div className="flex items-center space-x-2">
              <Zap className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList