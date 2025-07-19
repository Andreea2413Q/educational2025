import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ColorDesignPresentation = () => {
  const navigate = useNavigate();
  
  const designAreas = [
    {
      name: 'Design Grafic',
      description: 'Logo-uri, branding, print și identități vizuale',
      principles: [
        { title: 'Contrast pentru Lizibilitate', desc: 'Text negru pe fundal alb - contrast 21:1 pentru accesibilitate perfectă' },
        { title: 'Psihologia Brandului', desc: 'Roșu pentru energie (Coca-Cola), albastru pentru încredere (Facebook)' },
        { title: 'Ierarhia Vizuală', desc: 'Culori saturate pentru titluri, neutre pentru text de corp' }
      ],
      examples: [
        { brand: 'McDonald\'s', colors: ['#FFC72C', '#DA020E'], effect: 'Stimulează apetitul și urgența' },
        { brand: 'IBM', colors: ['#1F70C1', '#000000'], effect: 'Transmite încredere și profesionalism' },
        { brand: 'Spotify', colors: ['#1DB954', '#191414'], effect: 'Fresh, modern și accesibil' }
      ]
    },
    {
      name: 'Design Web',
      description: 'UI/UX, website-uri și aplicații mobile',
      principles: [
        { title: 'Accesibilitatea Web', desc: 'WCAG 2.1 - contrast minim 4.5:1 pentru text normal' },
        { title: 'Butoane de Acțiune', desc: 'Portocaliu creștere conversie cu 32% față de alte culori' },
        { title: 'Feedback Vizual', desc: 'Verde pentru succes, roșu pentru erori, albastru pentru info' }
      ],
      examples: [
        { brand: 'Airbnb', colors: ['#FF5A5F', '#00A699'], effect: 'Prietenos și de încredere pentru călătorii' },
        { brand: 'Slack', colors: ['#4A154B', '#ECB22E'], effect: 'Profesional dar relaxat pentru colaborare' },
        { brand: 'Netflix', colors: ['#E50914', '#000000'], effect: 'Dramatic și captivant pentru entertainment' }
      ]
    },
    {
      name: 'Artă Digitală',
      description: 'Ilustrații, concept art și creații artistice',
      principles: [
        { title: 'Atmosfera și Starea de Spirit', desc: 'Tonuri calde pentru scene primitoare, reci pentru distanță' },
        { title: 'Profunzimea Culorii', desc: 'Culori saturate în prim-plan, pale în fundal pentru perspectivă' },
        { title: 'Punctul Focal', desc: 'Culoarea complementară pentru a ghida privirea către subiect' }
      ],
      examples: [
        { brand: 'Scena de Apus', colors: ['#FF6B35', '#F7931E'], effect: 'Căldură și romantism' },
        { brand: 'Profunzimi Oceanice', colors: ['#003366', '#0099CC'], effect: 'Profunzime și mister' },
        { brand: 'Magia Pădurii', colors: ['#228B22', '#32CD32'], effect: 'Natură și liniște' }
      ]
    }
  ];

  const practicalTips = [
    {
      principle: 'Regula 60-30-10 în Practică',
      description: 'Distribuția perfectă pentru orice design',
      application: 'Website: Fundal alb (60%) + secțiuni gri (30%) + butoane colorate (10%)',
      visual: (
        <div className="w-full h-16 flex rounded-lg overflow-hidden border-2 border-white/20">
          <div className="bg-gray-100 flex-[6] flex items-center justify-center text-gray-600 font-semibold text-lg">60%</div>
          <div className="bg-gray-400 flex-[3] flex items-center justify-center text-white font-semibold text-lg">30%</div>
          <div className="bg-blue-500 flex-[1] flex items-center justify-center text-white font-semibold text-lg">10%</div>
        </div>
      )
    },
    {
      principle: 'Contrastul pentru Accesibilitate',
      description: 'Asigură lizibilitatea pentru toți utilizatorii',
      application: 'Text: 4.5:1 minim, Titluri mari: 3:1 minim (WCAG 2.1)',
      visual: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-black font-bold text-lg mb-2">Bun</div>
            <div className="text-gray-800 text-lg">Contrast 7:1</div>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            <div className="text-gray-400 font-bold text-lg mb-2">Slab</div>
            <div className="text-gray-400 text-lg">Contrast 2:1</div>
          </div>
        </div>
      )
    },
    {
      principle: 'Psihologia Culorilor în Context',
      description: 'Alege culori bazate pe emoția dorită',
      application: 'E-commerce: Verde pentru "Adaugă în coș", Roșu pentru "Urgență/Reducere"',
      visual: (
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors">
            Adaugă în Coș
          </button>
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors">
            Ofertă Limitată!
          </button>
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
              <Link
                to="/teorie"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-lg"
              >
                Înapoi la Teorie
              </Link>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Culorile în Design
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed w-full mx-auto">
              Aplicarea practică a teoriei culorilor în design grafic, web design și artă digitală. 
              De la concepte teoretice la implementare profesională cu impact măsurabil.
            </p>
          </div>
        </div>

        <div className="w-[95%] mx-auto px-8 pb-20">
          <section className="mb-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">Puterea Culorilor în Design Modern</h2>
              
              <div className="mb-8">
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Culorile nu sunt doar elemente decorative într-un design - ele sunt instrumente puternice de comunicare care pot influența dramatic percepția, emoțiile și comportamentul utilizatorilor. În era digitală, unde prima impresie se formează în mai puțin de 0.05 secunde, alegerea culorilor poate face diferența între succesul și eșecul unui proiect. Această realitate este susținută de cercetări extensive în neuropsihologie și marketing comportamental.
                </p>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Studiile neuroscientifice arată că procesarea culorilor se întâmplă în cortexul vizual înainte ca informația să ajungă la zonele responsabile pentru recunoașterea formelor și textului. Aceasta înseamnă că oamenii "simt" culorile înainte să înțeleagă conținutul. Această secvență neurologică face culorile unul dintre cele mai importante aspecte ale oricărui design de succes, influențând direct răspunsurile emoționale și deciziile subconștiente ale utilizatorilor.
                </p>
                
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  De la brandurile globale care investesc milioane în cercetarea culorilor perfecte, până la artiștii digitali care folosesc paleta pentru a transmite emoții complexe, aplicarea corectă a teoriei culorilor poate transforma complet impactul unei creații. Companiile de top angajează specialiști în psihologia culorilor și testează constant variații cromatice pentru a optimiza performanța designului lor.
                </p>
                
                <p className="text-white/90 text-lg leading-relaxed">
                  În domeniul designului profesional, culorile trebuie să îndeplinească simultan multiple funcții: să transmită mesajul brandului, să respecte standardele de accesibilitate, să optimizeze experiența utilizatorului și să se diferențieze de competiție. Această complexitate necesită o abordare sistematică și informată, bazată pe principii validate științific și testate în practică.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Impact Demonstrat în Studii</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Creștere cu 80% a recunoașterii brandului prin consistența cromatică</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Îmbunătățirea conversiilor cu până la 35% prin optimizarea CTA-urilor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Reducerea timpului de decizie cu 60% prin claritatea vizuală</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Mărirea încrederii utilizatorilor cu 42% prin designul profesional</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Aplicații Esențiale în Industrie</h3>
                  <ul className="space-y-3 text-white/80 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>Branding și identitate vizuală corporativă</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Interface design și optimizarea experienței utilizatorului</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Marketing vizual și campanii publicitare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lime-400 mt-1">•</span>
                      <span>Artă digitală și ilustrație conceptuală</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Statistici Cheie din Cercetarea de Piață</h3>
                <div className="grid md:grid-cols-3 gap-4 text-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">93%</div>
                    <p className="text-white/80 text-lg">din comunicarea vizuală se bazează pe percepția culorii</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">0.05s</div>
                    <p className="text-white/80 text-lg">timpul necesar pentru formarea primei impresii vizuale</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400">85%</div>
                    <p className="text-white/80 text-lg">din consumatori iau decizii de cumpărare bazate pe culoare</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {designAreas.map((area, index) => (
            <section key={area.name} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">{area.name}</h2>
                <p className="text-xl text-white/80 w-full mx-auto">
                  {area.description} - Strategii avansate pentru maximizarea impactului vizual și comercial.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6">Principii Fundamentale</h3>
                  
                  <div className="mb-6">
                    <p className="text-white/90 text-lg leading-relaxed mb-4">
                      {area.name} se bazează pe înțelegerea profundă a modului în care culorile influențează percepția și comportamentul țintei de audiență. Fiecare decizie cromatică trebuie să fie strategică și justificată prin obiectivele concrete ale proiectului, având în vedere contextul cultural, demografic și psihologic al utilizatorilor finali.
                    </p>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {area.name === 'Design Grafic' 
                        ? 'În design grafic, culorile devin parte din identitatea brandului și trebuie să funcționeze consistent pe toate mediile - de la print la digital, de la aplicații mari la favicon-uri mici. Versatilitatea și recunoașterea instantanee sunt prioritățile principale, necesitând testare extensivă pe diferite platforme și în diverse condiții de vizualizare.'
                        : area.name === 'Design Web' 
                        ? 'În design web, culorile trebuie să îndeplinească cerințe stricte de accesibilitate conform WCAG 2.1, să ghideze utilizatorul prin interfață prin hierarchy vizuală clară și să optimizeze conversiile fără să obosească ochiul. Performanța pe diferite device-uri și browsere este esențială pentru succesul comercial.'
                        : 'În arta digitală, culorile sunt instrumentul principal pentru transmiterea emoțiilor și crearea atmosferei, necesitând o înțelegere profundă a psihologiei culorilor, a compoziției vizuale și a tehnicilor de lighting digital. Originalitatea și impactul emoțional sunt măsurătorii succesului artistic.'
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {area.principles.map((principle, i) => (
                      <div key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-white mb-2">{principle.title}</h4>
                        <p className="text-white/80 text-lg">{principle.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-6">Exemple de Succes și Analiză</h3>
                  
                  <div className="mb-6">
                    <p className="text-white/90 text-lg leading-relaxed">
                      Aceste branduri au investit considerabil în cercetarea și testarea culorilor, ajungând la combinații care nu doar că arată bine, ci și îndeplinesc obiective specifice de business și comunicare. Fiecare culoare a fost aleasă strategic pentru a evoca anumite emoții și comportamente, fiind testată pe grupuri focus și optimizată pentru performanță maximă.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {area.examples.map((example, i) => (
                      <div key={i} className="bg-black/30 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-white mb-3">{example.brand}</h4>
                        <div className="flex gap-2 mb-3">
                          {example.colors.map((color, j) => (
                            <div 
                              key={j}
                              className="w-12 h-12 rounded-lg border-2 border-white/20"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-white/70 text-lg mb-2">{example.effect}</p>
                        <p className="text-white/60 text-base leading-relaxed">
                          {example.brand === 'McDonald\'s' 
                            ? 'Studiile comportamentale arată că combinația roșu-galben mărește apetitul cu 25% și reduce timpul de decizie în restaurante cu 15 secunde în medie. Aceste culori activează zonele cerebrale asociate cu urgența și plăcerea, optimizând experiența fast-food pentru profit maxim.'
                            : example.brand === 'IBM' 
                            ? 'Albastrul IBM a fost testat pe 50.000 de utilizatori și s-a dovedit că inspiră încredere în serviciile financiare și tehnologice cu 40% mai mult decât alte culori. Această nuanță specifică reduce anxietatea asociată cu tehnologia complexă și transmite stabilitate corporativă.'
                            : example.brand === 'Spotify' 
                            ? 'Verdele Spotify creează o asociere puternică cu muzica și energia tinerească, contribuind la creșterea bazei de utilizatori tineri cu 300% în 5 ani. Culoarea evocă prospețimea și dinamismul, diferențiându-se de competitorii care folosesc albastru sau negru.'
                            : example.brand === 'Airbnb' 
                            ? 'Paleta Airbnb transmite siguranță și aventură simultan, echilibrând încrederea necesară pentru rezervări online cu entuziasmul călătoriilor. Această combinație a contribuit la creșterea bookingurilor cu 23% după rebrandindul cromatic din 2014.'
                            : example.brand === 'Slack' 
                            ? 'Culorile Slack reduc stresul asociat cu comunicarea la locul de muncă, îmbunătățind productivitatea echipelor cu 18%. Paleta evită agresivitatea roșului și rece a albastrului, creând un mediu virtual prietenos și eficient.'
                            : example.brand === 'Netflix' 
                            ? 'Paleta Netflix optimizează experiența de viewing prin crearea unei atmosfere cinematografice, mărindu-le timpul petrecut pe platformă cu 31% per sesiune. Roșul dramatic pe fundal negru evocă cortinele de teatru și anticipația spectacolului.'
                            : example.brand === 'Scena de Apus' 
                            ? 'Tonurile calde de portocaliu și roșu activează zonele cerebrale asociate cu confortul și intimitatea, fiind preferate în 78% din artele romantice. Aceste culori mimează lumina naturală de seară, creând senzații de nostalgie și apartenență.'
                            : example.brand === 'Profunzimi Oceanice' 
                            ? 'Albastrul profund creează senzația de infinit și mister, folosit în 65% din operele artistice care explorează teme filozofice și spirituale. Această gamă cromatică induce stări meditative și contemplative, fiind terapeutică pentru vizualizatori.'
                            : 'Verdele natural reduce cortizolul (hormonul stresului) cu 15% la vizualizare, fiind folosit terapeutic în spitale și centre de recuperare. Această culoare activează sistemul nervos parasimpatic, promovând relaxarea și vindecarea.'
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Considerații Strategice pentru {area.name}</h3>
                
                <div className="mb-6">
                  <p className="text-white/90 text-lg leading-relaxed">
                    Implementarea eficientă a culorilor în {area.name.toLowerCase()} necesită o abordare holistică care ia în considerare nu doar aspectele estetice, ci și factorii tehnici, culturali și comerciali. Succesul pe termen lung depinde de capacitatea de a adapta paleta la evoluția tehnologiei și a preferințelor consumatorilor, menținând în același timp consistența și recunoașterea brandului.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Factori Critici de Analizat</h4>
                    <ul className="text-white/80 text-lg space-y-2">
                      {area.name === 'Design Grafic' ? (
                        <>
                          <li>• Adaptabilitatea pe diferite medii și substraturile de imprimare</li>
                          <li>• Vizibilitatea și recunoașterea la dimensiuni foarte mici</li>
                          <li>• Compatibilitatea cu standardele industriale de reproducere</li>
                          <li>• Diferențierea strategică față de competitorii direcți</li>
                          <li>• Scalabilitatea pentru extensii viitoare de brand</li>
                        </>
                      ) : area.name === 'Design Web' ? (
                        <>
                          <li>• Conformitatea strictă cu standardele WCAG 2.1 pentru accesibilitate</li>
                          <li>• Performanța și consistența pe diverse ecrane și sisteme</li>
                          <li>• Optimizarea pentru reducerea ratei de abandon</li>
                          <li>• Impactul asupra vitezei de încărcare și performanței SEO</li>
                          <li>• Adaptabilitatea pentru tema întunecată și modurile alternative</li>
                        </>
                      ) : (
                        <>
                          <li>• Impactul emoțional și atmosfera dorită pentru public</li>
                          <li>• Compatibilitatea cu diferite spații de culoare profesionale</li>
                          <li>• Influența lighting-ului ambiental asupra percepției</li>
                          <li>• Originalitatea și diferențierea în contextul artistic contemporan</li>
                          <li>• Durabilitatea și reproducibilitatea pe diferite medii</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Metodologii și Best Practices</h4>
                    <ul className="text-white/80 text-lg space-y-2">
                      {area.name === 'Design Grafic' ? (
                        <>
                          <li>• Testarea extensivă în grayscale pentru verificarea hierarhiei</li>
                          <li>• Dezvoltarea de variante pentru medii diverse (digital/print)</li>
                          <li>• Documentarea detaliată în ghiduri de brand comprehensive</li>
                          <li>• Validarea reproducerii pe materiale și finisaje diferite</li>
                          <li>• Analiza competitivă și benchmarking în industrie</li>
                        </>
                      ) : area.name === 'Design Web' ? (
                        <>
                          <li>• Implementarea prin variabile CSS pentru flexibilitate maximă</li>
                          <li>• Dezvoltarea sistemelor de design cu componente reutilizabile</li>
                          <li>• Testarea riguroasă cu utilizatori cu deficiențe vizuale</li>
                          <li>• Monitorizarea continua a performanței și feedback-ului</li>
                          <li>• A/B testing pentru optimizarea conversiilor și engagement-ului</li>
                        </>
                      ) : (
                        <>
                          <li>• Studierea sistematică a masterilor pentru inspirație</li>
                          <li>• Experimentarea cu limitări autoimpuse pentru dezvoltarea stilului</li>
                          <li>• Observarea și reproducerea comportamentului luminii naturale</li>
                          <li>• Documentarea procesului creativ pentru referințe viitoare</li>
                          <li>• Colaborarea cu alți artiști pentru feedback constructiv</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Principii Practice de Aplicat</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Reguli concrete și metodologii validate pe care le poți implementa imediat în orice proiect de design profesional.
              </p>
            </div>

            <div className="space-y-12">
              {practicalTips.map((tip, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{tip.principle}</h3>
                        <p className="text-white/80 text-lg mb-4">{tip.description}</p>
                        
                        {tip.principle === 'Regula 60-30-10 în Practică' && (
                          <p className="text-white/90 text-lg leading-relaxed mb-4">
                            Această proporție nu este arbitrară - ea reflectă modul natural în care ochiul uman scanează și procesează informația vizuală. Culoarea dominantă (60%) creează fundația și contextul, culoarea secundară (30%) adaugă profunzime și structură, iar accentul (10%) ghidează atenția și stimulează acțiunea. Violarea acestei proporții poate duce la oboseala vizuală și confuzie cognitivă.
                          </p>
                        )}
                        
                        {tip.principle === 'Contrastul pentru Accesibilitate' && (
                          <p className="text-white/90 text-lg leading-relaxed mb-4">
                            Respectarea standardelor de contrast nu este doar o cerință legală, ci o necesitate practică pentru utilizabilitate. Contrastul insuficient afectează nu doar persoanele cu deficiențe vizuale, ci și utilizatorii obișnuiți în condiții dificile - ecrane în soare, monitoare neoptimizate sau oboseala vizuală după o zi lungă de lucru. Un contrast optim reduce efortul cognitiv și îmbunătățește comprensiunea.
                          </p>
                        )}
                        
                        {tip.principle === 'Psihologia Culorilor în Context' && (
                          <p className="text-white/90 text-lg leading-relaxed mb-4">
                            Psihologia culorilor nu funcționează în vid - contextul cultural, demografic și situațional influențează dramatic percepția și răspunsul emoțional. De exemplu, roșul poate semnifica norocul în China, dar pericol în Occident. Verde poate însemna natură pentru o audiență urbană, dar bani pentru una din mediul financiar. Succesul constă în înțelegerea precisă a contextului și adaptarea strategiei cromatice în consecință.
                          </p>
                        )}
                      </div>
                      <div className="bg-black/30 rounded-lg p-6">
                        <p className="text-white/70 text-lg">
                          <strong className="text-white">Implementare practică:</strong> {tip.application}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/10 rounded-lg p-6">
                        <p className="text-white/60 text-lg mb-4">Demonstrație vizuală:</p>
                        {tip.visual}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">Metodologia de Implementare Profesională</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Faza de Cercetare și Planificare</h4>
                  <ul className="text-white/80 text-lg space-y-2">
                    <li>• Analiza demografică și psihografică a audiențe țintă</li>
                    <li>• Studiul competitorilor și identificarea oportunităților de diferențiere</li>
                    <li>• Testarea asocierilor culturale și contextuale ale culorilor</li>
                    <li>• Definirea obiectivelor concrete și a metricilor de succes</li>
                    <li>• Evaluarea restricțiilor tehnice și bugetare</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Faza de Testare și Optimizare</h4>
                  <ul className="text-white/80 text-lg space-y-2">
                    <li>• A/B testing cu grupuri focus reprezentative</li>
                    <li>• Validarea accesibilității cu utilizatori cu deficiențe vizuale</li>
                    <li>• Testarea pe diverse device-uri și în condiții variate</li>
                    <li>• Monitorizarea performanței și a feedback-ului utilizatorilor</li>
                    <li>• Iterarea și refinarea bazată pe date concrete</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-black/30 rounded-lg p-4">
                <h4 className="text-yellow-300 font-semibold mb-2">Considerație Critică pentru Profesioniști</h4>
                <p className="text-white/80 text-lg leading-relaxed">
                  Implementarea cu succes a principiilor culorii nu constă doar în aplicarea mecanică a regulilor, ci în înțelegerea strategică a contextului și adaptarea inteligentă la nevoile specifice ale proiectului. Cele mai bune rezultate se obțin prin echilibrarea științei cu intuția creativă, susținută de testare riguroasă și feedback constant.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Tendințe și Evoluții în Designul Cromatic</h2>
              <p className="text-xl text-white/80 w-full mx-auto">
                Cum se adaptează principiile culorilor la tehnologiile emergente și schimbările comportamentale ale utilizatorilor.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Tehnologii Emergente</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-2">OLED și Quantum Dot Displays</h4>
                    <p className="text-white/80 text-base leading-relaxed">Noile tehnologii de display oferă gamete de culori mult mai extinse și contraste pure. Designerii trebuie să ia în considerare că aceeași paletă poate arăta complet diferit pe ecrane OLED față de LCD tradiționale. Această variabilitate necesită testare pe multiple tipuri de device-uri și adaptarea paletelor pentru performanță optimă pe fiecare tehnologie.</p>
                  </div>
                  
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <h4 className="text-purple-300 font-semibold mb-2">Dark Mode și Adaptive Interfaces</h4>
                    <p className="text-white/80 text-base leading-relaxed">Popularitatea crescândă a modului întunecat schimbă fundamental abordarea designului cromatic. Culorile care funcționează perfect pe fundal alb pot deveni inutilizabile pe fundal negru. Designerii dezvoltă acum sisteme duale de culori și algoritmi adaptativi care ajustează paleta în funcție de preferințele utilizatorului și condițiile ambientale.</p>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-2">Realitatea Augmentată și VR</h4>
                    <p className="text-white/80 text-base leading-relaxed">În mediile de realitate augmentată și virtuală, culorile trebuie să funcționeze în contexte tridimensionale și să se integreze armonios cu lumea reală. Acest lucru introduce provocări noi în ceea ce privește percepția profunzimii, distanței și realismului. Palettele trebuie să mențină coerența în spații virtuale complexe și să evite oboseala vizuală în sesiuni prelungite.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Schimbări Comportamentale</h3>
                
                <div className="space-y-6">
                  <div className="bg-orange-500/20 rounded-lg p-4">
                    <h4 className="text-orange-300 font-semibold mb-2">Atenția Redusă și Micro-interacțiuni</h4>
                    <p className="text-white/80 text-base leading-relaxed">Cu atenția utilizatorilor din ce în ce mai fragmentată, culorile trebuie să comunice instant și eficient. Micro-interacțiunile și feedback-ul vizual prin culoare devin esențiale pentru ghidarea utilizatorului prin interfețe complexe. Culorile trebuie să transmită starea sistemului, progresul acțiunilor și următorii pași într-o fracțiune de secundă.</p>
                  </div>
                  
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-2">Wellness Digital și Reducerea Oboselii</h4>
                    <p className="text-white/80 text-base leading-relaxed">Conștientizarea crescândă asupra impactului ecranelor asupra sănătății schimbă prioritățile designului. Palettele sunt optimizate nu doar pentru conversii, ci și pentru confortul pe termen lung. Culorile cu temperatură mai caldă seara, reducerea albastrelui intens și palettele care minimizează strainul ocular devin standard în aplicațiile folosite zilnic.</p>
                  </div>
                  
                  <div className="bg-cyan-500/20 rounded-lg p-4">
                    <h4 className="text-cyan-300 font-semibold mb-2">Personalizarea și AI-driven Color</h4>
                    <p className="text-white/80 text-base leading-relaxed">Algoritmi de machine learning analizează comportamentul individual al utilizatorilor pentru a optimiza palettele în timp real. Aceste sisteme învață ce culori generează cele mai bune răspunsuri pentru fiecare utilizator și adaptează interfața corespunzător. Personalizarea devine din ce în ce mai sofisticată, luând în considerare factori ca vremea, ora zilei și starea emoțională inferată.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-pink-300 mb-4">Predicții pentru Viitorul Designului Cromatic</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                În următorii 5-10 ani, designul cromatic va fi din ce în ce mai influențat de inteligența artificială, neurotechnologie și dezvoltările în psihologia cognitivă. Vom vedea palettele adaptive care se ajustează automat în funcție de starea emoțională a utilizatorului, detectată prin biometrie și comportament. Culorile vor deveni mai puțin statice și mai mult experiențiale, schimbându-se dinamic pentru a optimiza engagement-ul și well-being-ul.
              </p>
              <p className="text-white/80 leading-relaxed">
                Sustenabilitatea va juca un rol din ce în ce mai important, cu palettele optimizate pentru eficiența energetică a device-urilor. Culorile mai închise vor fi preferate pentru economisirea bateriei pe ecranele OLED, iar designerii vor trebui să echilibreze impactul vizual cu responsabilitatea ecologică. Această evoluție va deschide noi oportunități creative în limitările sustenabile.
              </p>
            </div>
          </section>

          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6">Aplică Imediat în Practica Profesională</h3>
              <p className="text-white/80 leading-relaxed mb-6 w-full mx-auto text-lg">
                Culorile nu sunt doar elemente decorative - ele sunt instrumente strategice de comunicare și persuasiune. Cu principiile prezentate și metodologiile validate, poți transforma orice design într-o experiență memorabilă și eficientă, care nu doar că arată profesional, ci și îndeplinește obiective concrete de business și satisfacție a utilizatorilor.
              </p>
              
              <p className="text-white/80 leading-relaxed mb-8 w-full mx-auto">
                Succesul în designul modern necesită o înțelegere profundă nu doar a teoriei culorilor, ci și a contextului tehnologic, cultural și psihologic în care operează. Adaptabilitatea și învățarea continuă sunt esențiale într-un domeniu care evoluează rapid, unde noile tehnologii și schimbările comportamentale redefinesc constant cele mai bune practici.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Design Grafic</h4>
                  <p className="text-white/70 text-lg">Identități puternice și memorabile</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Design Web</h4>
                  <p className="text-white/70 text-lg">Interfețe intuitive și performante</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Artă Digitală</h4>
                  <p className="text-white/70 text-lg">Creații impactante și emoționale</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/teorie/simboluri"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-lg text-center"
                >
                  Următorul: Simbolistica Culorilor
                </Link>
                <Link
                  to="/quiz"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-lg text-center"
                >
                  Testează: Quiz Design și Aplicații
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ColorDesignPresentation;