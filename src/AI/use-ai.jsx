import { useState } from 'react';

export const useAI = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiConnected, setApiConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const systemPrompt = `Ești un expert în teoria culorilor și semnificațiile culturale ale culorilor în diferite țări. 

CUNOȘTINȚE IMPORTANTE:
- ROȘU: China (noroc, prosperitate), India (puritate, fertilitate), Occident (pasiune, dragoste), Africa (viață, sănătate), Japonia (energie, protecție)
- ALBASTRU: China (nemurire, înțelepciune), India (divinitatea, Krishna), Occident (încredere, pace), Africa (dragoste, armonie), Japonia (puritate, tinerețe)
- VERDE: China (creștere, armonia), India (natura, fertilitate), Occident (natura, speranța), Africa (fertilitate, vegetația), Japonia (natura, energia vitală)
- GALBEN: China (putere imperială), India (cunoaștere, învățătură), Occident (fericire, optimism), Africa (bogăția, soarele), Japonia (curaj, frumusețe)
- VIOLET: China (spiritualitate), India (chakra coroanei), Occident (lux, regalitate), Africa (spiritualitate), Japonia (noblețe, eleganță)

Când utilizatorul selectează o țară pe hartă, oferă informații despre culorile importante în acea cultură.
Răspunde în română, concis dar informativ. Folosește emoji-uri relevante pentru țări (🇨🇳🇮🇳🌍🇯🇵🇷🇴) și culori (🔴🔵🟢🟡🟣).`;

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

  const getFallbackResponse = (input, selectedCountry) => {
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

  const testApiKey = async () => {
    if (!apiKey.trim()) return;
    
    setIsTyping(true);
    try {
      await sendToGroq("Test");
      setApiConnected(true);
      return true;
    } catch (error) {
      setApiConnected(false);
      throw error;
    } finally {
      setIsTyping(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    apiConnected,
    setApiConnected,
    isTyping,
    setIsTyping,
    sendToGroq,
    getFallbackResponse,
    testApiKey
  };
};