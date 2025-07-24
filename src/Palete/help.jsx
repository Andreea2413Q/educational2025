const PaleteHelp = ({ showHelp, setShowHelp }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-600 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
      
        <div className="sticky top-0 bg-z3 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-black"> Cum folosim Paletele de Culori</h2>
          <button 
            onClick={() => setShowHelp(false)}
            className="text-z4 hover:text-z1 text-4xl font-bold leading-none transition-colors duration-300"
            title="Închide"
          >
            ×
          </button>
        </div>

       
        <div className="p-6 space-y-8 bg-gradient-to-b from-gray-900 to-black">
          
        
          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4"> 1 Crearea Paletelor 🎨</h3>
              <div className="space-y-3 text-black">
                <p><strong> Selectează culoare:</strong> folosește picker-ul pentru a alege culoarea dorită</p>
                <p><strong> Completează numele paletei:</strong> obligatoriu pentru salvare</p>
                <p><strong> Adaugă culoare:</strong> click pe "Adaugați Culoare" pentru a o include în paletă</p>
                <p><strong> Generează culori asemănătoare:</strong> obține automat 5 culori similare</p>
                <p><strong> Salvează paleta:</strong> se salvează automat local sau în cont</p>
              </div>
            </div>
          </div>

         
          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2 Gestionarea Paletelor 🗂️</h3>
              <div className="space-y-3 text-black">
                <p><strong> Afișează:</strong> click pe "Afișează" pentru a vedea toate culorile din paletă</p>
                <p><strong> Editează:</strong> click pe "Editează" pentru a modifica paleta existentă</p>
                <p><strong> Șterge:</strong> click pe "Șterge" pentru a elimina definitiv paleta</p>
                <p><strong> Copiază culori:</strong> click pe orice culoare pentru a o copia în clipboard</p>
                <p><strong> Reîncarcă:</strong> actualizează lista de palete salvate</p>
              </div>
            </div>
          </div>

         
          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">3 Funcții Avansate 🔧</h3>
              <div className="space-y-3 text-black">
                <p><strong> Format culori:</strong> alege între HEX, RGB sau HSL pentru afișare</p>
                <p><strong> Preview la hover:</strong> treci cu mouse-ul peste culori pentru a vedea codul</p>
                <p><strong> Elimină din paletă:</strong> hover pe culoare în editare și click "Elimină"</p>
                <p><strong> Culori generate:</strong> click pe culorile generate pentru a le adăuga în paletă</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">4 Sincronizare Date ☁️</h3>
              <div className="space-y-3 text-black">
                <p><strong> Conectat în cont:</strong> salvare în cloud sincronizată</p>
                <p><strong> Fără cont:</strong> salvare locală în browser</p>
                <p><strong className="text-blue-900 ">Beneficii Cont:</strong></p>
                <p><strong> Acces multi-device:</strong> acces la toate paletele de pe orice dispozitiv</p>
                <p><strong> Backup automat:</strong> paletele tale sunt mereu în siguranță</p>
              </div>
            </div>
          </div>

</div>
   
        <div className="sticky bottom-0 bg-z3 p-6 text-center border-t border-gray-200 rounded-b-2xl">
          <button 
            onClick={() => setShowHelp(false)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Am înțeles! 
          </button>
        </div>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
      `}</style>
    </div>
  );
};

export default PaleteHelp;