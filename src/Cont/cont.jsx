import { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import Sunset from '../Imagini/susnet.webp'
import StarDotsAnimation from './Bk/bk';


const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const Cont = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showControls, setShowControls] = useState(false);
  const [animationParams, setAnimationParams] = useState({
    maxDistFromCursor: 50,
    dotsSpeed: 30,
    backgroundSpeed: 20
  });
  
  const { width } = useWindowDimensions(); 
  
  const authContext = useAuth();
  const circleSize = width * 0.9;
  
  if (!authContext) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p>Eroare la încărcarea contextului de autentificare</p>
        </div>
      </div>
    );
  }

  const { currentUser, signInWithGoogle, signOut, loading: authLoading } = authContext;

  if (authLoading) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p>Se încarcă...</p>
        </div>
      </div>
    );
  }

  const handleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setError("Eroare la conectare. Încercați din nou mai târziu.");
      console.error("Eroare la conectare:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setError("");
      setLoading(true);
      await signOut();
    } catch (error) {
      setError("Eroare la deconectare. Încercați din nou mai târziu.");
      console.error("Eroare la deconectare:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
       <div className="absolute inset-0 z-0">
        <StarDotsAnimation params={animationParams} />
      </div>
    <div className="max-w-md mx-auto relative z-40 pt-8 px-4">
        <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-6 relative">
          <h1 className="text-2xl font-bold mb-6 text-white text-center drop-shadow-lg">Contul meu</h1>

          <div className="relative z-10">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
 
            {currentUser ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profil"
                      className="w-full h-full object-cover rounded-full shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <img src={Sunset} alt="Default" className="w-full h-full object-cover rounded-full shadow-lg"/>
                  )}
                  
                  <div
                    className="w-full h-full flex items-center justify-center bg-slate-400 rounded-full"
                    style={{ display: currentUser.photoURL ? 'none' : 'flex' }}
                  >
                    <span className="text-white text-xl font-bold">
                      {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "?"}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-1 text-center text-white">{currentUser.displayName || "Utilizator"}</h2>
                <p className="text-gray-300 mb-6 text-center font-medium">{currentUser.email}</p>
                        
                <div className="border-t border-gray-600 w-full pt-6">
                  <h3 className="font-semibold mb-4 text-white">Informații cont</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-white text-sm mb-1 font-medium">ID utilizator:</p>
                      <p className="text-gray-100 break-all text-sm bg-gray-800 bg-opacity-80 p-2 rounded border">{currentUser.uid}</p>
                    </div>
                    
                    <div className='w-full flex'>
                      <p className="text-white text-sm mb-1 font-medium w-1/2">Email verificat:</p>
                      <p className="text-gray-100">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${currentUser.emailVerified ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                          {currentUser.emailVerified ? "✓ Verificat" : "⚠ Neverificat"}
                        </span>
                      </p>
                    </div>
                    
                    <div className='w-full flex'> 
                      <p className="text-white text-sm mb-1 font-medium w-1/2">Data creării contului:</p>
                      <p className="text-gray-100 text-sm">
                        {currentUser.metadata?.creationTime ? 
                          new Date(currentUser.metadata.creationTime).toLocaleDateString('ro-RO') : 
                          'Necunoscută'
                        }
                      </p>
                    </div>
                    
                    <div className='w-full flex'>
                      <p className="text-white text-sm mb-1 font-medium w-1/2">Ultima conectare:</p>
                      <p className="text-gray-100 text-sm">
                        {currentUser.metadata?.lastSignInTime ? 
                          new Date(currentUser.metadata.lastSignInTime).toLocaleDateString('ro-RO') : 
                          'Necunoscută'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Butonul de deconectare cu z-index și pointer-events explicit */}
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 shadow-lg font-medium relative z-50 pointer-events-auto"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {loading ? "Se procesează..." : "Deconectare"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Nu sunteți conectat</h2>
                <p className="text-gray-300 mb-8 font-medium">
                  Conectați-vă cu contul Google pentru a accesa funcționalitățile aplicației și pentru a vă salva preferințele.
                </p>
                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="flex items-center justify-center w-full bg-white border-2 border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors shadow-lg disabled:opacity-50 font-medium relative z-50 pointer-events-auto"
                  style={{ pointerEvents: 'auto' }}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5 mr-3"
                  />
                  {loading ? "Se procesează..." : "Conectare cu Google"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cont;