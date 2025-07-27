const NotesHelp = ({ showHelp, setShowHelp }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-600 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
      
        <div className="sticky top-0 bg-z3 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-white"> Cum folosim Notițele</h2>
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
              <h3 className="text-xl font-bold text-blue-900 mb-4"> 1 Crearea Notițelor 📝</h3>
              <div className="space-y-3 text-black">
                <p><strong> Click "Notiță Nouă":</strong> deschide formularul pentru o notiță nouă</p>
                <p><strong> Completează titlul:</strong> obligatoriu  </p>
                <p><strong> Adaugă subtitlu:</strong> opțional, descriere scurtă sau categorie</p>
                <p><strong> Scrie conținutul:</strong> textul  notiței</p>
                <p><strong> Salvează:</strong> notița se salvează automat local sau în cont</p>
              </div>
            </div>
          </div>

         
          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2 Gestionarea Notițelor 🗂️</h3>
              <div className="space-y-3 text-black">
                <p><strong> Citește:</strong> click pe orice notiță pentru a se deschide</p>
                <p><strong> Editează:</strong> click pe o notiță și modifică conținutul</p>
                <p><strong> Șterge:</strong> click pe iconița de coș de pe notița pe care doriți să o ștergeți (dreapta sus)</p>
                <p><strong> Caută:</strong> întrodu ce îti amintești pentru a filtra rezultatele</p>
                <p><strong> Monitorizează:</strong>  statistici despre notițe</p>
              </div>
            </div>
          </div>

         
          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">3 Căutare Avansată 🔍</h3>
              <div className="space-y-3 text-black">
                <p><strong> Caută în toate:</strong> titlu, subtitlu și conținutul notițelor</p>
                <p><strong> Timp real:</strong> rezultatele se actualizează pe măsură ce scrii</p>
                <p><strong> Verifică ortografia:</strong> <strong className="text-red-600">folosește diacritice</strong></p>
                <p><strong> Introdu cuvinte cheie:</strong> </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-z3 via-red-500 to-z1 p-1 rounded-xl">
            <div className="bg-z4 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">4 Sincronizare Date ☁️</h3>
              <div className="space-y-3 text-black">
                <p><strong> Conectat în cont:</strong>  salvare în cloud  sincronizată</p>
                <p><strong> Fără cont:</strong> salvare locală în browser</p>
                <p><strong>Beneficii Cont</strong></p>
                <p><strong> Acces multi-device:</strong> acces la toate salvările de pe platformă</p>
                <p><strong> Backup automat:</strong> nu se pierd niciodată datele cu sincronizarea cloud</p>
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

export default NotesHelp;