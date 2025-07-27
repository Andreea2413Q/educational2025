import  { useState, useEffect, useRef } from 'react';
import ChatHeader from './chat-header';
import ApiKeyInput from './api-key-input';
import MessageList from './message-list';
import ChatInput from './chat-input';
import SuggestedQuestions from './suggested-questions';

const ChatSidebar = ({ 
  selectedCountry,
  selectedCapital,
  apiConnected,
  apiKey,
  setApiKey,
  onTestApiKey,
  onAIMessage,
  isTyping 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bună! Sunt AI-ul tău pentru teoria culorilor și geografia culturală, powered by Groq! 🎨⚡🗺️\n\nSelectează o țară pe hartă și întreabă-mă despre semnificația culorilor în acea cultură!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const response = await onAIMessage(inputValue);
    
    if (response) {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTestApiKey = async () => {
    try {
      await onTestApiKey();
      setShowApiInput(false);
      
      const successMessage = {
        id: messages.length + 1,
        type: 'bot',
        content: '🎉 Perfect! Groq AI conectat cu succes! Acum pot oferi răspunsuri AI complete despre teoria culorilor și culturile din lume! ⚡🎨🗺️',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      alert(`Eroare API: ${error.message}`);
    }
  };

  return (
    <div className="w-full lg:w-1/4 h-2/5 lg:h-full bg-white lg:border-l border-gray-300 flex flex-col">
      <ChatHeader 
        apiConnected={apiConnected}
        onToggleApiInput={() => setShowApiInput(!showApiInput)}
        onClose={() => setIsOpen(false)}
        showCloseButton={true}
      />

      {showApiInput && (
        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          onTest={handleTestApiKey}
        />
      )}

      <MessageList 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      {!apiConnected && (
        <div className="px-3 lg:px-4 py-2 bg-yellow-50 border-t border-yellow-200">
          <p className="text-xs text-yellow-800">
            ⚡ Pentru AI complet, adaugă Groq API Key în setări! Momentan rulează în mod local.
          </p>
        </div>
      )}

      {selectedCountry && (
        <div className="px-3 lg:px-4 py-2 bg-blue-50 border-t border-blue-200">
          <p className="text-xs text-blue-800">
            🗺️ <span className="font-semibold text-black">Țară selectată:</span> {selectedCountry}
          </p>
          {selectedCapital && selectedCapital !== 'Necunoscută' && (
            <p className="text-xs text-blue-600">
              🏛️ <span className="text-black font-semibold ">Capitala:</span> {selectedCapital}
            </p>
          )}
        </div>
      )}

      <SuggestedQuestions 
        onQuestionSelect={setInputValue}
        show={messages.length === 1}
      />

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatSidebar