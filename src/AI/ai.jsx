import  { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { Send, Bot, User, Zap, MessageCircle, X, Settings } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import worldData from './countries.geo.json';


import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorldMapWithAI = () => {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCapital, setSelectedCapital] = useState('');
  const [selectedPopulation, setSelectedPopulation] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [nationalDay, setNationalDay] = useState('');
  const [languages, setLanguages] = useState([]);
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const geoJsonRef = useRef(null);


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
  const [isTyping, setIsTyping] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiConnected, setApiConnected] = useState(false);
  const messagesEndRef = useRef(null);

 
  useEffect(() => {
    
    setCountries(worldData);
    setLoading(false);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `Ești un expert în teoria culorilor și semnificațiile culturale ale culorilor în diferite țări. 

CUNOȘTINȚE IMPORTANTE:
- ROȘU: China (noroc, prosperitate), India (puritate, fertilitate), Occident (pasiune, dragoste), Africa (viață, sănătate), Japonia (energie, protecție)
- ALBASTRU: China (nemurire, înțelepciune), India (divinitatea, Krishna), Occident (încredere, pace), Africa (dragoste, armonie), Japonia (puritate, tinerețe)
- VERDE: China (creștere, armonia), India (natura, fertilitate), Occident (natura, speranța), Africa (fertilitate, vegetația), Japonia (natura, energia vitală)
- GALBEN: China (putere imperială), India (cunoaștere, învățătură), Occident (fericire, optimism), Africa (bogăția, soarele), Japonia (curaj, frumusețe)
- VIOLET: China (spiritualitate), India (chakra coroanei), Occident (lux, regalitate), Africa (spiritualitate), Japonia (noblețe, eleganță)

Când utilizatorul selectează o țară pe hartă, oferă informații despre culorile importante în acea cultură.
Răspunde în română, concis dar informativ. Folosește emoji-uri relevante pentru țări (🇨🇳🇮🇳🌍🇯🇵🇷🇴) și culori (🔴🔵🟢🟡🟣).`;

  const fetchCountryDetails = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      if (!data || !Array.isArray(data) || data.length === 0) {
        resetCountryDetails();
        return;
      }

      const countryData = data[0];
      const capital = countryData.capital ? countryData.capital[0] : 'Necunoscută';
      const population = countryData.population ? countryData.population.toLocaleString() : 'Necunoscută';
      const area = countryData.area ? `${countryData.area.toLocaleString()} km²` : 'Necunoscută';

      setSelectedCapital(capital);
      setSelectedPopulation(population);
      setTotalArea(area);

      if (countryData.currencies) {
        const currencyCode = Object.keys(countryData.currencies)[0];
        setCurrency(`${countryData.currencies[currencyCode].name} (${countryData.currencies[currencyCode].symbol || currencyCode})`);
      } else {
        setCurrency('Necunoscută');
      }

      setLanguages(countryData.languages ? Object.values(countryData.languages) : []);
      fetchNationalDay(countryData.cca2 || countryData.alpha2Code);

      const aiMessage = `Tocmai am selectat ${countryName} pe hartă. Poți să îmi spui despre culorile importante în cultura din ${countryName}?`;
      handleAIMessage(aiMessage);

    } catch (error) {
      console.error('Error fetching country details:', error);
      resetCountryDetails();
    }
  };

  const fetchNationalDay = async (code) => {
    try {
      const response = await fetch(`https://date.nager.at/api/v3/publicholidays/2024/${code}`);
      const holidays = await response.json();
      if (!Array.isArray(holidays) || holidays.length === 0) {
        setNationalDay('Indisponibil');
        return;
      }

      const nationalDayHoliday = holidays.find(holiday =>
        holiday.types.includes('Public') &&
        (holiday.name.toLowerCase().includes('national') ||
         holiday.name.toLowerCase().includes('independence') ||
         holiday.name.toLowerCase().includes('republic') ||
         holiday.name.toLowerCase().includes('revolution') ||
         holiday.name.toLowerCase().includes('liberation'))
      );

      setNationalDay(nationalDayHoliday ? `${nationalDayHoliday.date} - ${nationalDayHoliday.name}` : 'Necunoscută');
    } catch (error) {
      console.error('Error fetching national day:', error);
      setNationalDay('Eroare la obținerea informațiilor');
    }
  };

  const resetCountryDetails = () => {
    setSelectedCapital('Necunoscută');
    setSelectedPopulation('Necunoscută');
    setTotalArea('Necunoscută');
    setNationalDay('Necunoscută');
    setLanguages([]);
    setCurrency('Necunoscută');
  };

  const sendToGroq = async (userMessage) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API Key invalid. Verifică cheia ta Groq.');
        }
        throw new Error(`Eroare API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw new Error(error.message || 'Nu pot conecta la Groq API');
    }
  };

  const getFallbackResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('romania') || lowerInput.includes('românia')) {
      return "🇷🇴 În România, culorile tradiționale sunt roșu, galben și albastru (drapelul). Roșul simbolizează vitejia, galbenul prosperitatea și albastrul libertatea și cerul! De asemenea, în tradițiile populare românești, roșul este foarte important în costume și la sărbători! 🔴🟡🔵";
    }
    
    if (lowerInput.includes('roșu') || lowerInput.includes('rosu')) {
      if (lowerInput.includes('china')) {
        return "🇨🇳 În China, roșul simbolizează norocul, fericirea și prosperitatea. Este culoarea tradițională pentru nunți și Anul Nou Chinezesc! 🔴";
      }
      return "🔴 Roșul are semnificații foarte diferite în culturi: noroc în China 🇨🇳, puritate în India 🇮🇳, pasiune în Occident 🌍, și energie în Japonia 🇯🇵!";
    }
    
    if (lowerInput.includes('albastru')) {
      return "🔵 Albastrul simbolizează încrederea și pacea în Occident 🌍, divinitatea în India 🇮🇳, și înțelepciunea în China 🇨🇳!";
    }
    
    if (lowerInput.includes('verde')) {
      return "🟢 Verdele reprezintă natura și creșterea în majoritatea culturilor, dar în China 🇨🇳 simbolizează și armonia, iar în Africa fertilitatea pământului!";
    }

    if (selectedCountry) {
      return `🗺️ Ai selectat ${selectedCountry}! Pentru informații complete despre culorile din această cultură, adaugă un Groq API Key. De asemenea, poți întreba despre culori specifice! 🎨`;
    }

    return "🤖 Pentru răspunsuri AI complete, adaugă API Key-ul tău Groq în setări! Selectează o țară pe hartă sau întreabă despre roșu, albastru, verde, galben, violet în diferite culturi! 🎨🗺️";
  };

  const handleAIMessage = async (message) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response;
      if (apiKey && apiConnected) {
        response = await sendToGroq(message);
        setApiConnected(true);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = getFallbackResponse(message);
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setApiConnected(false);
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: `❌ ${error.message}\n\n📝 Răspuns local: ${getFallbackResponse(message)}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    await handleAIMessage(inputValue);
    setInputValue('');
  };

  const testApiKey = async () => {
    if (!apiKey.trim()) return;
    
    setIsTyping(true);
    try {
      await sendToGroq("Test");
      setApiConnected(true);
      setShowApiInput(false);
      
      const successMessage = {
        id: messages.length + 1,
        type: 'bot',
        content: '🎉 Perfect! Groq AI conectat cu succes! Acum pot oferi răspunsuri AI complete despre teoria culorilor și culturile din lume! ⚡🎨🗺️',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      setApiConnected(false);
      alert(`Eroare API: ${error.message}`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  
  const getCountryStyle = (feature) => ({
    color: 'black',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6,
    fillColor: feature.properties.NAME === selectedCountry || feature.properties.ADMIN === selectedCountry ? '#3388ff' : 'white',
  });

  const highlightStyle = {
    fillColor: '#ff7800',
    weight: 2,
    opacity: 1,
    color: '#ff7800',
    fillOpacity: 0.8
  };

  const onEachCountry = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle(highlightStyle);
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getCountryStyle(feature));
      },
      click: (e) => {
        const countryName = feature.properties.NAME || feature.properties.ADMIN || 'Țară necunoscută';
        setSelectedCountry(countryName);
        fetchCountryDetails(countryName);
        
        setPopupInfo({
          name: countryName,
          latlng: e.latlng
        });
        
        console.log(`Țară selectată: ${countryName}`);
      }
    });
  };

  const updateCountryStyles = () => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer(layer => {
        layer.setStyle(getCountryStyle(layer.feature));
      });
    }
  };

  useEffect(() => {
    updateCountryStyles();
  }, [selectedCountry]);

  const suggestedQuestions = [
    "Ce înseamnă roșul în China?",
    "Semnificația albastru în India", 
    "Cum percep japonezii verdele?",
    "Galben în cultura africană",
    "Culorile tradiționale românești"
  ];

  return (
    <div className="w-full min-h-screen bg-green-800 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-40">
          <div className="text-lg">Se încarcă harta lumii...</div>
        </div>
      )}
      
   
      <div className="flex flex-col lg:flex-row h-screen">
       
        <div className="w-full lg:w-3/4 h-3/5 lg:h-full">
          <MapContainer 
            style={{ height: '100%', width: '100%' }} 
            zoom={2} 
            center={[20, 0]}  
            minZoom={2}  
            worldCopyJump={false}
            maxBounds={[[90, -180], [-90, 180]]}  
            maxBoundsViscosity={1.0}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; OpenStreetMap contributors" 
            />
            
            {countries && (
              <GeoJSON 
                data={countries} 
                onEachFeature={onEachCountry}
                style={getCountryStyle}
                ref={geoJsonRef} 
              />
            )}
            
            {popupInfo && (
              <Popup
                position={popupInfo.latlng}
                onClose={() => setPopupInfo(null)}
              >
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">🌍 {popupInfo.name}</h3>
                  {selectedCapital && selectedCapital !== 'Necunoscută' && (
                    <p className="text-sm">
                      <span className="font-semibold">Capitala:</span> {selectedCapital}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">Întreabă AI-ul despre culorile din această cultură! →</p>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>

      
        <div className="w-full lg:w-1/4 h-2/5 lg:h-full bg-white lg:border-l border-gray-300 flex flex-col">
       
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
                  onClick={() => setShowApiInput(!showApiInput)}
                  className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Setări API"
                >
                  <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 lg:p-2 hover:bg-white/20 rounded-full transition-colors lg:hidden"
                >
                  <X className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>
              </div>
            </div>
          </div>

        
          {showApiInput && (
            <div className="p-3 lg:p-4 bg-orange-50 border-b border-orange-200">
              <p className="text-xs lg:text-sm text-orange-800 mb-2">
                🔑 Adaugă Groq API Key pentru răspunsuri AI complete:
              </p>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="flex-1 px-2 lg:px-3 py-1 text-xs lg:text-sm border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={testApiKey}
                  className="px-2 lg:px-3 py-1 bg-orange-600 text-white text-xs lg:text-sm rounded hover:bg-orange-700 transition-colors"
                >
                  Test
                </button>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Obține gratuit de la: <span className="font-mono">console.groq.com</span>
              </p>
            </div>
          )}

       
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
                🗺️ <span className="font-semibold">Țară selectată:</span> {selectedCountry}
              </p>
              {selectedCapital && selectedCapital !== 'Necunoscută' && (
                <p className="text-xs text-blue-600">
                  🏛️ <span className="font-semibold">Capitala:</span> {selectedCapital}
                </p>
              )}
            </div>
          )}

          {messages.length === 1 && (
            <div className="px-3 lg:px-4 py-2 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-2">Întrebări sugerite:</p>
              <div className="space-y-1">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="text-xs text-orange-600 hover:text-orange-800 block w-full text-left p-1 rounded hover:bg-orange-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

      
          <div className="p-3 lg:p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Întreabă despre culori și culturi..."
                className="flex-1 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1.5 lg:p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

   
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 lg:hidden bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          {apiConnected && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </button>
      )}

      {selectedCountry && (
        <div className="hidden lg:block fixed bottom-4 left-4 z-40 bg-white bg-opacity-95 rounded-lg p-4 max-w-sm shadow-lg">
          <h3 className="font-bold text-lg mb-2 text-green-800">🌍 {selectedCountry}</h3>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Capitala:</span> {selectedCapital}</p>
            <p><span className="font-semibold">Populația:</span> {selectedPopulation}</p>
            <p><span className="font-semibold">Suprafața:</span> {totalArea}</p>
            {languages.length > 0 && (
              <p><span className="font-semibold">Limbi:</span> {languages.slice(0, 2).join(', ')}</p>
            )}
          </div>
          <button 
            onClick={() => {
              setSelectedCountry('');
              setPopupInfo(null);
              resetCountryDetails();
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
          >
            ❌ Șterge
          </button>
        </div>
      )}
    </div>
  );
};

export default WorldMapWithAI;