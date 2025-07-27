
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import { useCountryData } from './use-country-data';
import { useAI } from './use-ai';
import InteractiveMap from './interactive-map';
import ChatSidebar from './chat-sidebar';
import CountryDetails from './country-deatails';
import FloatingChatButton from './floating-chat-button';

const WorldMapWithAI = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    selectedCountry,
    setSelectedCountry,
    selectedCapital,
    selectedPopulation,
    totalArea,
    languages,
    fetchCountryDetails,
    resetCountryDetails
  } = useCountryData();

  const {
    apiKey,
    setApiKey,
    apiConnected,
    isTyping,
    sendToGroq,
    getFallbackResponse,
    testApiKey
  } = useAI();

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleCountryDetailsSelect = async (countryName) => {
    await fetchCountryDetails(countryName);
    const aiMessage = `Tocmai am selectat ${countryName} pe hartă. Poți să îmi spui despre culorile importante în cultura din ${countryName}?`;
    return await handleAIMessage(aiMessage);
  };

  const handleAIMessage = async (message) => {
    try {
      let response;
      if (apiKey && apiConnected) {
        response = await sendToGroq(message);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = getFallbackResponse(message, selectedCountry);
      }
      return response;
    } catch (error) {
      return `X ${error.message}\n\n📝 Răspuns local: ${getFallbackResponse(message, selectedCountry)} X`;
    }
  };

  const handleClearCountry = () => {
    setSelectedCountry('');
    resetCountryDetails();
  };

  return (
    <div className="w-full min-h-screen bg-green-800 relative">
      <div className="flex flex-col lg:flex-row h-screen">
    
        <div className="w-full lg:w-3/4 h-3/5 lg:h-full">
          <InteractiveMap
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
            onCountryDetailsSelect={handleCountryDetailsSelect}
            selectedCapital={selectedCapital}
          />
        </div>

   
        {isOpen && (
          <ChatSidebar
            selectedCountry={selectedCountry}
            selectedCapital={selectedCapital}
            apiConnected={apiConnected}
            apiKey={apiKey}
            setApiKey={setApiKey}
            onTestApiKey={testApiKey}
            onAIMessage={handleAIMessage}
            isTyping={isTyping}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>

 
      {!isOpen && (
        <FloatingChatButton
          onClick={() => setIsOpen(true)}
          apiConnected={apiConnected}
        />
      )}

     
      <CountryDetails
        selectedCountry={selectedCountry}
        selectedCapital={selectedCapital}
        selectedPopulation={selectedPopulation}
        totalArea={totalArea}
        languages={languages}
        onClear={handleClearCountry}
      />
    </div>
  );
};

export default WorldMapWithAI;