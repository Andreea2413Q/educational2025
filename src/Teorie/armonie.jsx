import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const ColorHarmonyPresentation = () => {
  const navigate = useNavigate();

  const harmonyTypes = [
    {
      name: 'Complementare',
      description: 'Culori opuse pe roata cromatică',
      colors: [
        { name: 'Roșu + Verde', bg: 'bg-gradient-to-r from-red-500 to-green-500' },
        { name: 'Albastru + Portocaliu', bg: 'bg-gradient-to-r from-blue-500 to-orange-500' },
        { name: 'Galben + Violet', bg: 'bg-gradient-to-r from-yellow-500 to-purple-500' }
      ],
      usage: 'Perfect pentru contrast maxim și puncte focale dramatice',
      effect: 'Vibrant, energic, atrage atenția'
    },
    {
      name: 'Analoge',
      description: 'Culori vecine pe roata cromatică',
      colors: [
        { name: 'Apus de soare', bg: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500' },
        { name: 'Ocean calm', bg: 'bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400' },
        { name: 'Pădure verde', bg: 'bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400' }
      ],
      usage: 'Ideal pentru fundal-uri și atmosfere relaxante',
      effect: 'Calm, natural, armonios'
    },
    {
      name: 'Triadice',
      description: 'Trei culori egal distanțate',
      colors: [
        { name: 'Triada primară', bg: 'bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400' },
        { name: 'Triada secundară', bg: 'bg-gradient-to-r from-orange-500 via-green-500 to-purple-500' }
      ],
      usage: 'Excelent pentru designuri creative și echilibrate',
      effect: 'Dinamic, echilibrat, versatil'
    },
    {
      name: 'Monocromatice',
      description: 'Variații ale aceleiași culori',
      colors: [
        { name: 'Albastru elegant', bg: 'bg-gradient-to-r from-blue-900 via-blue-500 to-blue-100' },
        { name: 'Verde natural', bg: 'bg-gradient-to-r from-green-900 via-green-500 to-green-100' },
        { name: 'Violet luxos', bg: 'bg-gradient-to-r from-purple-900 via-purple-500 to-purple-100' }
      ],
      usage: 'Perfect pentru branding sofisticat și minimal',
      effect: 'Elegant, coerent, profesional'
    }
  ];

  const practicalRules = [
    {
      rule: '60-30-10',
      description: '60% culoare dominantă, 30% secundară, 10% accent',
      explanation: 'Natura folosește proporția aurie (1:1.618) nu doar în forme, ci și în combinațiile de culori care ne par plăcute ochiului. Când aplicăm această proporție în palete - 62% culoare dominantă, 38% secundară - obții un echilibru vizual care pare "natural" și estetic plăcut, chiar dacă observatorul nu înțelege de ce îi place combinația respectivă.',
      example: 'Fundal alb (60%) + elemente gri (30%) + accente colorate (10%)',
      visual: (
        <div className="flex h-8 rounded overflow-hidden">
          <div className="bg-gray-100 w-3/5"></div>
          <div className="bg-gray-400 w-3/10"></div>
          <div className="bg-blue-500 w-1/10"></div>
        </div>
      )
    },
    {
      rule: 'Temperatura',
      description: 'Combină culori calde cu reci pentru echilibru',
      explanation: 'Temperaturile diferite ale culorilor pot influența fundamental percepția spațială și emoțională. Culorile calde (roșu, portocaliu, galben) par să se apropie de observator și creează o senzație de intimitate și energie, în timp ce culorile reci (albastru, verde, violet) par să se retragă și transmit calm și profesionalism. Echilibrarea acestora în design creează profunzime vizuală și previne oboseala ochiului.',
      example: 'Albastru rece + portocaliu cald = contrast plăcut',
      visual: (
        <div className="flex h-8 rounded overflow-hidden">
          <div className="bg-blue-500 w-1/2"></div>
          <div className="bg-orange-500 w-1/2"></div>
        </div>
      )
    },
    {
      rule: 'Contextul',
      description: 'Aceeași culoare arată diferit pe fundaluri diferite',
      explanation: 'Fenomenul de contrast simultan înseamnă că percepția unei culori este influențată dramatic de culorile din jurul ei. De exemplu, un gri neutral va părea mai albăstrui pe un fundal portocaliu și mai portocaliu pe un fundal albastru. Acest principiu este crucial în designul UI/UX, unde culorile trebuie să funcționeze pe diferite tipuri de conținut și în diverse contexte de utilizare.',
      example: 'Gri pare albăstrui lângă portocaliu',
      visual: (
        <div className="flex gap-2">
          <div className="bg-orange-200 p-2 rounded">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="bg-blue-200 p-2 rounded">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="w-[95%] mx-auto px-4">
        <div className="pt-20 pb-16 px-8">
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigate('/teorie')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                Înapoi la Teorie
              </button>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Armonia Cromatică
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed w-full mx-auto">
              Învață să combini culorile perfect: complementare, analoge, triadice și monocromatice pentru designuri profesionale și atractive.
            </p>
          </div>
        </div>

        <div className="w-[95%] mx-auto px-8 pb-20">
          <section className="mb-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">De Ce Contează Armonia Cromatică?</h2>
              <p className='text-white text-lg leading-relaxed mb-4'>
                Culorile nu doar că arată bine împreună - ele creează și răspunsuri emoționale specifice care influențează comportamentul utilizatorilor. O paletă complementară roșu-verde poate transmite energie și vitalitate, perfectă pentru branduri sportive, în timp ce o paletă analogă albastru-verde sugerează calm și încredere, ideală pentru servicii financiare sau medicale. Fiecare combinație are propria personalitate și impact psihologic asupra observatorului.
              </p>
              <p className='text-white text-lg leading-relaxed mb-6'>
                Asocierile culturale joacă un rol crucial în percepția armoniei cromatice. Combinația roșu-auriu este considerată norocoasă în cultura chineză, dar poate părea agresivă în contexte occidentale. Un designer profesionist adaptează paleta în funcție de audiența țintă și contextul cultural, înțelegând că aceeași armonie poate transmite mesaje complet diferite în diverse părți ale lumii. Din punct de vedere neurologic, creierul procesează culorile armonioase mai rapid și cu mai puțin efort, ceea ce duce la o experiență plăcută și la o percepție pozitivă a brandului sau produsului.
              </p>
              <p className='text-white text-lg leading-relaxed mb-6'>
                Studiile de neuromarketing demonstrează că deciziile de cumpărare sunt luate în primele 90 de secunde de interacțiune cu un produs, iar 62-90% din această evaluare se bazează exclusiv pe culoare. Acest lucru înseamnă că armonia cromatică nu este doar o chestiune estetică, ci un factor determinant în succesul comercial. Companiile care investesc în palete coerente și armonioase raportează creșteri medii de 23% în recunoașterea brandului și 15% în loialitatea clienților.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Puterea Combinațiilor</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Creează echilibru vizual și plăcere estetică naturală</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Ghidează ochiul prin design în mod intuitiv și eficient</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Transmite emoții și mesaje specifice fără cuvinte</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Diferențiază lucrul profesional de cel amateur</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Beneficii Practice Măsurabile</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Îmbunătățește recunoașterea brandului cu până la 80%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Mărește rata de conversie în design cu 15-20%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Creează conexiuni emoționale mai puternice cu audiența</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lime-400 mt-1">•</span>
                      <span>Accelerează procesul de luare a deciziilor</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Impact Demonstrat în Studii</h3>
                <div className="grid md:grid-cols-3 gap-4 text-base">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">85%</div>
                    <p className="text-white/80">din deciziile de cumpărare sunt influențate de culoare</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">200%</div>
                    <p className="text-white/80">creșterea recunoașterii brandului cu culori corecte</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-400">73%</div>
                    <p className="text-white/80">din companii folosesc culoarea strategic în branding</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Tipuri de Armonii Cromatice</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Patru tipuri fundamentale de combinații care funcționează mereu, bazate pe principii matematice și perceptuale validate științific.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Roata Cromatică - Baza Tuturor Armoniilor</h3>
              <p className="text-white text-lg leading-relaxed mb-6">
                Roata cromatică nu este doar un instrument vizual - este o reprezentare a modului în care ochiul uman percepe și procesează culorile. Bazată pe teoriile lui Isaac Newton și dezvoltată de Johannes Itten la Bauhaus, această roată reflectă relațiile matematice dintre culori care creează plăcerea estetică. Când înțelegi aceste relații, nu mai alegi culorile la întâmplare, ci folosești principii științifice pentru a crea combinații care funcționează predictibil.
              </p>
              <p className="text-white text-lg leading-relaxed mb-6">
                Cercetările în neuropsihologie au demonstrat că anumite combinații de culori activează centrele de plăcere din creier prin sincronizarea undelor cerebrale. Armoniile bazate pe proporții matematice - cum ar fi complementarele la 180° sau triadicele la 120° - creează un ritm vizual care rezonează cu structurile neuronale responsabile pentru percepția estetică. De aceea anumite palete "se simt bine" chiar și pentru persoanele fără pregătire artistică.
              </p>
              
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center">
                  <div className="relative mx-auto" style={{ width: 300, height: 300 }}>
                    <svg width="300" height="300" className="absolute inset-0">
                      {[
                        '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
                        '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080'
                      ].map((color, index) => {
                        const angle = (index * 30) - 90;
                        const radian = (angle * Math.PI) / 180;
                        const radius = 120;
                        const centerX = 150;
                        const centerY = 150;
                        const x = centerX + radius * Math.cos(radian);
                        const y = centerY + radius * Math.sin(radian);
                        
                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="20"
                            fill={color}
                            stroke="#fff"
                            strokeWidth="3"
                            className="transition-all duration-300 hover:r-25 cursor-pointer"
                          />
                        );
                      })}
                      
                      <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5"/>
                      <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,5"/>
                      
                      <circle cx="150" cy="150" r="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                      <text x="150" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Roata</text>
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2 text-xl">Culori Primare</h4>
                    <p className="text-white/80 text-lg">Roșu, Albastru, Galben - baza tuturor celorlalte culori, nu pot fi obținute prin amestec. Acestea corespund aproximativ cu sensibilitatea maximă a celor trei tipuri de conuri din retină.</p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white/30"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white/30"></div>
                      <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white/30"></div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-4">
                    <h4 className="text-orange-300 font-semibold mb-2 text-xl">Culori Secundare</h4>
                    <p className="text-white/80 text-lg">Verde, Portocaliu, Violet - rezultatul amestecării în proporții egale a primarelor. Acestea sunt cele mai vibrante când sunt obținute prin amestec optic, nu fizic.</p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white/30"></div>
                      <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white/30"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white/30"></div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-500/20 rounded-lg p-4">
                    <h4 className="text-yellow-300 font-semibold mb-2 text-xl">Relațiile Matematice</h4>
                    <ul className="text-white/80 text-lg space-y-1">
                      <li>• Culorile opuse (180°) = complementare cu contrast maxim</li>
                      <li>• Culorile vecine (30-60°) = analoge cu armonie naturală</li>
                      <li>• 3 culori la 120° = triadice cu echilibru perfect</li>
                      <li>• Variații ale uneia = monocromatice pentru eleganță</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {harmonyTypes.map((harmony, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{harmony.name}</h3>
                    <p className="text-white/60 text-lg">{harmony.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {harmony.colors.map((color, i) => (
                      <div key={i} className="space-y-2">
                        <div className={`h-8 rounded-lg ${color.bg}`}></div>
                        <p className="text-white/70 text-sm">{color.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-white/80 text-sm font-semibold mb-1">Când să folosești:</p>
                      <p className="text-white/70 text-sm">{harmony.usage}</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-white/80 text-sm font-semibold mb-1">Efectul psihologic:</p>
                      <p className="text-white/70 text-sm">{harmony.effect}</p>
                    </div>
                  </div>

                  {harmony.name === 'Complementare' && (
                    <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                      <p className="text-white/80 text-sm">
                        Atenție: Culorile complementare pure pot crea vibrații vizuale neplăcute când sunt folosite în proporții egale. Folosește una ca dominantă și cealaltă ca accent pentru a evita oboseala vizuală.
                      </p>
                    </div>
                  )}

                  {harmony.name === 'Monocromatice' && (
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <p className="text-white/80 text-sm">
                        Palettele monocromatice sunt cele mai sigure pentru începători și cele mai elegante pentru branding premium. Riscul principal este monotonia - adaugă texturi sau forme pentru variație vizuală.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Reguli Practice de Aplicat</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Trei principii esențiale care te vor ajuta să creezi palete profesionale indiferent de proiect, bazate pe decenii de cercetare în psihologia culorii.
              </p>
            </div>

            <div className="space-y-8">
              {practicalRules.map((rule, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">Regula {rule.rule}</h3>
                        <p className="text-white/90 text-lg mb-4">{rule.description}</p>
                        <p className="text-white text-lg leading-relaxed">{rule.explanation}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-white/70 text-sm">
                          <strong>Exemplu practic:</strong> {rule.example}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-3">Demonstrație vizuală:</p>
                        {rule.visual}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Aplicarea Practică a Regulilor</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Aceste reguli nu sunt restricții arbitrare, ci principii derivate din studierea modului în care ochiul și creierul procesează informația vizuală. Regula 60-30-10 reflectă proporțiile naturale din mediul înconjurător care ne par plăcute - cerul (dominantă), copacii (secundară) și florile (accent). Temperatura culorilor afectează direct percepția spațială și poate face ca o încăpere să pară mai mare sau mai mică, mai caldă sau mai rece.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Contextul este poate cel mai important principiu pentru designul digital, unde culorile trebuie să funcționeze pe diferite tipuri de ecrane, în diverse condiții de iluminare și pentru utilizatori cu capacități vizuale diferite. O culoare care arată perfect pe monitorul tău calibrat poate fi complet nefolositoare pe un telefon în soare.
              </p>
              <p className="text-white/80 leading-relaxed">
                În practica profesională, aceste reguli trebuie adaptate contextului specific. De exemplu, un site de lux poate folosi proporții mai echilibrate (70-20-10) pentru un aspect mai rafinat, în timp ce o aplicație pentru copii poate beneficia de accente mai pronunțate (50-30-20) pentru a menține interesul și energia.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Exemple și Aplicații Practice</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Cum să aplici armonia cromatică în diferite contexte și industrii pentru rezultate măsurabile și impact maxim asupra comportamentului utilizatorilor.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Marketing și Branding Strategic</h3>
                
                <div className="space-y-6">
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">Fast Food și Retail Energic</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Combinația roșu-galben stimulează apetitul și creează urgență psihologică prin activarea sistemului nervos simpatic. McDonald's, KFC și Burger King folosesc această paletă pentru a încuraja decizii rapide de cumpărare și a sugera energie și vitalitate. Studiile demonstrează că aceste culori pot reduce timpul de decizie cu până la 25%.</p>
                  </div>
                  
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-2">Tehnologie și Servicii Financiare</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Paletele monocromatice de albastru transmit încredere, stabilitate și profesionalism prin asocierea cu elemente naturale stabile ca cerul și oceanul. IBM, PayPal și Facebook folosesc variații de albastru pentru a inspira siguranță în domeniile unde încrederea este crucială. Cercetările arată că albastrele reduc cortizolul (hormonul stresului) cu 11%.</p>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">Eco-friendly și Sănătate</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Paletele analoge cu verde sugerează natură, sănătate și sustenabilitate prin mimarea culorilor din mediul natural. Whole Foods, Spotify și BP folosesc aceste combinații pentru a se asocia cu valorile de mediu și bunăstare. Verdele crește percepția de naturalețe cu 40% și transmite mesaje de creștere și prosperitate.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Design Digital și Experiența Utilizatorului</h3>
                
                <div className="space-y-6">
                  <div className="bg-orange-500/20 rounded-lg p-4">
                    <h4 className="text-orange-300 font-semibold mb-2">Call-to-Action și Optimizarea Conversiilor</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Portocaliul ca accent complementar pe fundaluri albastre sau neutre poate crește rata de click cu până la 32%. Este culoarea optimă pentru butoane de acțiune fără să fie agresivă ca roșul - transmite entuziasmul și încrederea în sine. Netflix a crescut abonamentele cu 14% doar prin schimbarea CTA-urilor din roșu în portocaliu.</p>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Interfețe Aplicații și Productivitate</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Paletele monocromatice reduc oboseala vizuală cu 28% și îmbunătățesc accesibilitatea pentru utilizatorii cu deficiențe de vedere. Aplicațiile de productivitate folosesc aceste scheme pentru a permite focalizarea pe conținut, nu pe interfață. Slack a redus timpul de adaptare al utilizatorilor noi cu 35% prin simplificarea paletei.</p>
                  </div>
                  
                  <div className="bg-cyan-500/20 rounded-lg p-4">
                    <h4 className="text-cyan-300 font-semibold mb-2">E-commerce și Categorii de Produse</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Scheme triadice permit diferențierea clară a categoriilor de produse menținând coerența vizuală globală. Amazon și eBay folosesc aceste principii pentru navigare intuitivă - utilizatorii găsesc produsele cu 22% mai rapid când categoriile au coduri cromatice distincte dar armonioase.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Studii de Caz din Industrie</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-lg p-6">
                  <h4 className="text-red-300 font-semibold mb-3">Coca-Cola vs Pepsi: Războiul Culorilor</h4>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Coca-Cola a menținut roșul clasic timp de 130 de ani, creând o asociere neuropsihologică puternică. Pepsi a experimentat cu albastru pentru diferențiere, transmițând "cool" și modernitate. Rezultat: Coca-Cola domină piața globală cu 48% vs 20% Pepsi, parțial datorită consecvenței cromatice.
                  </p>
                  <div className="bg-black/30 rounded p-2 text-xs text-white/70">
                    Impact: Recunoașterea instantanee a brandului Coca-Cola este de 94% global
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-lg p-6">
                  <h4 className="text-blue-300 font-semibold mb-3">Spotify: Evoluția Paletei</h4>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    Spotify a trecut de la o paletă complexă la verde monochromatic cu accente complementare de roz. Schimbarea a crescut timpul petrecut în aplicație cu 18% și a redus rata de abandon cu 23%. Verdele transmite "play" și energia muzicii.
                  </p>
                  <div className="bg-black/30 rounded p-2 text-xs text-white/70">
                    Impact: 15% creștere în subscripții premium după rebrandingul cromatic
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">Instrumente și Resurse Profesionale</h3>
              
              <p className="text-white text-lg leading-relaxed mb-6">
                Alegerea instrumentelor potrivite poate face diferența între o paletă amatoare și una profesională. Aceste platforme nu doar generează combinații, ci îți permit să testezi accesibilitatea, să exportezi în diferite formate și să colaborezi cu echipa în timp real.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">Adobe Color</h4>
                  <p className="text-white/80 text-sm leading-relaxed">Generează automat palete bazate pe reguli de armonie, permite încărcarea fotografiilor pentru extragerea culorilor și se sincronizează cu Creative Suite. Include simulare daltonism și export în CSS, ASE, ACO.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">Coolors.co</h4>
                  <p className="text-white/80 text-sm leading-relaxed">Generator rapid cu previzualizare în timp real, export în CSS, și funcții de colaborare. Perfect pentru iterații rapide și testarea variantelor. Include contrast checker și trending palettes din comunitate.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-purple-300 font-semibold mb-2">Paletton</h4>
                  <p className="text-white/80 text-sm leading-relaxed">Roată cromatică interactivă cu toate tipurile de armonii, simulare daltonism și previzualizare pe template-uri reale de site-uri. Include calculatoare de contrast WCAG și export în multiple formate.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-semibold mb-2">Instrumente Avansate</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Huey Pro - calibrare monitor pentru culori precise</li>
                    <li>• Contrast - checker WCAG pentru accesibilitate</li>
                    <li>• Figma plugins - integration directă în workflow</li>
                    <li>• Colormind.io - AI pentru generare palete</li>
                  </ul>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="text-orange-300 font-semibold mb-2">Sfaturi Profesionale</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Testează paleta pe device-uri reale diferite</li>
                    <li>• Validează cu utilizatori din target audience</li>
                    <li>• Documentează justificările pentru fiecare culoare</li>
                    <li>• Creează variantele pentru dark/light mode</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h4 className="text-red-300 font-semibold mb-2">Avertisment Important</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Nu te baza doar pe instrumente automate - acestea sunt doar puncte de pornire. Culorile care arată perfect într-un generator pot să nu funcționeze pe site-ul sau aplicația finală. Întotdeauna validează cu utilizatori reali, pe dispozitive diferite și în condiții variate de iluminare. Contextul real este întotdeauna regele.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Psihologia Culorilor în Combinații</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Cum afectează diferitele armonii cromatice comportamentul uman și deciziile la nivel subconștient.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Efecte Neurologice Demonstrate</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-2">Culorile Reci vs Calde</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Culorile calde (roșu, portocaliu, galben) cresc ritmul cardiac cu 5-8% și stimulează cortexul frontal responsabil pentru decizii rapide. Culorile reci (albastru, verde, violet) reduc tensiunea arterială cu 2-4% și activează centrii responsabili pentru gândirea analitică.</p>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">Armoniile și Memoria</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Paletele armonioase îmbunătățesc reținerea informației cu 23% prin reducerea efortului cognitiv necesar procesării vizuale. Creierul "economisește energie" când nu trebuie să proceseze combinații care creează conflict visual.</p>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Contrastul și Atenția</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Combinațiile complementare cu contrast moderat (nu maxim) mențin atenția cu 31% mai mult decât culorile similare, dar fără oboseala vizuală a contrastelor extreme. Sweet spot-ul este la 70% din contrastul maxim teoretic.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Aplicații în Diferite Domenii</h3>
                
                <div className="space-y-4">
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">Retail și E-commerce</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Combinațiile triadice echilibrate cresc timpul petrecut pe site cu 19% și valoarea coșului de cumpărături cu 12%. Utilizatorii percep o gamă mai largă de produse când categoriile sunt diferențiate cromatic armonios.</p>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-4">
                    <h4 className="text-orange-300 font-semibold mb-2">Aplicații Medicale</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Paletele analoge cu verde și albastru reduc anxietatea pacienților cu 18% în aplicațiile de sănătate. Aceste culori activează sistemul nervos parasimpatic, responsabil pentru relaxare și vindecare.</p>
                  </div>
                  
                  <div className="bg-yellow-500/20 rounded-lg p-4">
                    <h4 className="text-yellow-300 font-semibold mb-2">Educație și E-learning</h4>
                    <p className="text-white/80 text-sm leading-relaxed">Combinațiile monocromatice cu accente complementare discrete îmbunătățesc concentrarea cu 26% și reținerea informației cu 15%. Evită suprastimularea vizuală care distrage de la conținutul educațional.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-pink-300 mb-4">Cercetări Recente în Neuromarketing</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Studiile cu fMRI (imagistică prin rezonanță magnetică funcțională) arată că paletele armonioase activează centrii de recompensă din creier în primele 300 de milisecunde de expunere. Aceasta înseamnă că utilizatorii "hotărăsc" dacă le place un design înainte să îl proceseze conștient.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Companiile care aplică consistent principiile armoniei cromatice în toate punctele de contact cu clienții (site, aplicație, packaging, publicitate) raportează o creștere medie de 31% în brand recall și 24% în loialitatea clienților pe termen lung.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="text-center bg-white/10 rounded p-3">
                  <div className="text-2xl font-bold text-pink-400">300ms</div>
                  <p className="text-white/70 text-sm">Timp de procesare emoțională</p>
                </div>
                <div className="text-center bg-white/10 rounded p-3">
                  <div className="text-2xl font-bold text-purple-400">31%</div>
                  <p className="text-white/70 text-sm">Creștere brand recall</p>
                </div>
                <div className="text-center bg-white/10 rounded p-3">
                  <div className="text-2xl font-bold text-indigo-400">67%</div>
                  <p className="text-white/70 text-sm">Utilizatori preferă design armonios</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6">Armonia Cromatică - Știință Aplicată</h3>
              <p className="text-white/80 leading-relaxed mb-6 w-full mx-auto text-lg">
                Armonia cromatică nu este magie sau talent înnăscut - este o competență tehnică bazată pe principii științifice și psihologice validate prin decenii de cercetare. Cu aceste patru tipuri de combinații și cele trei reguli practice, ai instrumentele necesare pentru orice proiect profesional, de la identități vizuale simple la interfețe complexe de aplicații.
              </p>
              
              <p className="text-white/80 leading-relaxed mb-6 w-full mx-auto">
                Secretul nu este să memorezi toate combinațiile posibile, ci să înțelegi principiile fundamentale care stau la baza lor. Când știi de ce o anumită paletă funcționează - fie că activează anumite răspunsuri neurologice, respectă proporții matematice plăcute ochiului, sau se aliniază cu asocieri culturale pozitive - poți adapta și modifica culorile pentru orice context, menținând armonia de bază dar personalizând pentru nevoile specifice ale proiectului și ale audienței țintă.
              </p>
              
              <p className="text-white/80 leading-relaxed mb-8 w-full mx-auto">
                În era digitală, unde atenția utilizatorului este resursa cea mai prețioasă, armonia cromatică devine un avantaj competitiv real. Brandurile și produsele care înțeleg și aplică aceste principii nu doar că arată mai bine, ci performează mai bine - cu conversii mai mari, utilizatori mai angajați și loialitate mai puternică.
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Complementare</h4>
                  <p className="text-white/70 text-sm">Pentru contrast maxim și accente dramatice care captează atenția</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Analoge</h4>
                  <p className="text-white/70 text-sm">Pentru armonie naturală și calm vizual care reduce stresul</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Triadice</h4>
                  <p className="text-white/70 text-sm">Pentru echilibru dinamic și versatilitate în aplicații complexe</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Monocromatice</h4>
                  <p className="text-white/70 text-sm">Pentru eleganță sofisticată și coerență premium</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/teorie/design')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                >
                  Următorul: Culorile în Design
                </button>
                <button
                  onClick={() => navigate('/palete')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                >
                  Practică: Creează Palete
                </button>
                <button
                  onClick={() => navigate('/quiz')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                >
                  Quiz: Testează-ți Cunoștințele
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ColorHarmonyPresentation;