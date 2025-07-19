import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Settings, Home, Palette, BookOpen, Gamepad2, Mail, FileText, Brain } from 'lucide-react';
import { useAuth } from '../Cont/authContext';
import Sunset from '../Imagini/susnet.webp'
import './header.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const activeStyle = "text-cyan-300 font-medium";
  const activeStyle2 = "text-cyan-200 font-bold";
  
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-black backdrop-blur-lg border-b border-cyan-400/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 to-pink-900/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
         
          <NavLink to="/" className=" titlu-fleur  text-2xl sm:text-xl bg-gradient-to-r from-cyan-400 via-pink-400
           to-white bg-clip-text text-transparent ">
            Col View
          </NavLink>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 border border-transparent hover:border-cyan-400/30 ${isActive ? activeStyle + ' bg-cyan-500/20 border-cyan-400/50 shadow-cyan-500/25' : 'text-gray-300 hover:text-cyan-300'}`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <Home className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Home</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/palete" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-pink-500/10 hover:shadow-lg hover:shadow-pink-500/25 border border-transparent hover:border-pink-400/30 ${isActive ? activeStyle + ' bg-pink-500/20 border-pink-400/50 shadow-pink-500/25' : 'text-gray-300 hover:text-pink-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Palette className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Palete</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/teorie" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25 border border-transparent hover:border-purple-400/30 ${isActive ? activeStyle + ' bg-purple-500/20 border-purple-400/50 shadow-purple-500/25' : 'text-gray-300 hover:text-purple-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <BookOpen className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Teorie</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/quiz" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 border border-transparent hover:border-blue-400/30 ${isActive ? activeStyle + ' bg-blue-500/20 border-blue-400/50 shadow-blue-500/25' : 'text-gray-300 hover:text-blue-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Brain className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Quiz</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/joc" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/25 border border-transparent hover:border-green-400/30 ${isActive ? activeStyle + ' bg-green-500/20 border-green-400/50 shadow-green-500/25' : 'text-gray-300 hover:text-green-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Gamepad2 className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Joc</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/note" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-yellow-500/10 hover:shadow-lg hover:shadow-yellow-500/25 border border-transparent hover:border-yellow-400/30 ${isActive ? activeStyle + ' bg-yellow-500/20 border-yellow-400/50 shadow-yellow-500/25' : 'text-gray-300 hover:text-yellow-300'}`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <FileText className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Notițe</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/cont" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/25 border border-transparent hover:border-indigo-400/30 ${isActive ? activeStyle + ' bg-indigo-500/20 border-indigo-400/50 shadow-indigo-500/25' : 'text-gray-300 hover:text-indigo-300'}`
              }
            >
              {({ isActive }) => (
                currentUser ? (
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={currentUser.photoURL} 
                        alt={Sunset} 
                        className="w-6 h-6 rounded-full mr-2 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20"></div>
                    </div>
                    <span className={isActive ? activeStyle2 : ''}>Cont</span>
                  </div>
                ) : (
                  <>
                    <User className="mr-2 w-4 h-4" />
                    <span className={isActive ? activeStyle2 : ''}>Cont</span>
                  </>
                )
              )}
            </NavLink>

            <NavLink 
              to="/ai" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/25 border border-transparent hover:border-orange-400/30 ${isActive ? activeStyle + ' bg-orange-500/20 border-orange-400/50 shadow-orange-500/25' : 'text-gray-300 hover:text-orange-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Settings className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Ai</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/25 border border-transparent hover:border-red-400/30 ${isActive ? activeStyle + ' bg-red-500/20 border-red-400/50 shadow-red-500/25' : 'text-gray-300 hover:text-red-300'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Mail className="mr-2 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Contact</span>
                </>
              )}
            </NavLink>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
       
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 bg-gray-900/60 backdrop-blur-lg rounded-lg border border-cyan-400/20 mt-2 shadow-xl">
            <div className="flex flex-col space-y-2 px-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 border border-transparent hover:border-cyan-400/30 ${isActive ? activeStyle + ' bg-cyan-500/20 border-cyan-400/50' : 'text-gray-300 hover:text-cyan-300'}`
                }
                onClick={closeMenu}
                end
              >
                {({ isActive }) => (
                  <>
                    <Home className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Home</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/palete" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-pink-500/10 hover:shadow-lg hover:shadow-pink-500/25 border border-transparent hover:border-pink-400/30 ${isActive ? activeStyle + ' bg-pink-500/20 border-pink-400/50' : 'text-gray-300 hover:text-pink-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Palette className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Palete</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/teorie" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25 border border-transparent hover:border-purple-400/30 ${isActive ? activeStyle + ' bg-purple-500/20 border-purple-400/50' : 'text-gray-300 hover:text-purple-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <BookOpen className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Teorie</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/quiz" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 border border-transparent hover:border-blue-400/30 ${isActive ? activeStyle + ' bg-blue-500/20 border-blue-400/50' : 'text-gray-300 hover:text-blue-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Brain className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Quiz</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/joc" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/25 border border-transparent hover:border-green-400/30 ${isActive ? activeStyle + ' bg-green-500/20 border-green-400/50' : 'text-gray-300 hover:text-green-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Gamepad2 className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Joc</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/note" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-yellow-500/10 hover:shadow-lg hover:shadow-yellow-500/25 border border-transparent hover:border-yellow-400/30 ${isActive ? activeStyle + ' bg-yellow-500/20 border-yellow-400/50' : 'text-gray-300 hover:text-yellow-300'}`
                }
                onClick={closeMenu}
                end
              >
                {({ isActive }) => (
                  <>
                    <FileText className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Notițe</span>
                  </>
                )}
              </NavLink>
              
              <NavLink 
                to="/cont" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/25 border border-transparent hover:border-indigo-400/30 ${isActive ? activeStyle + ' bg-indigo-500/20 border-indigo-400/50' : 'text-gray-300 hover:text-indigo-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  currentUser ? (
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={Sunset} 
                          alt="Profil" 
                          className="w-6 h-6 rounded-full mr-3 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20"></div>
                      </div>
                      <span className={isActive ? activeStyle2 : ''}>Cont</span>
                    </div>
                  ) : (
                    <>
                      <User className="mr-3 w-5 h-5" />
                      <span className={isActive ? activeStyle2 : ''}>Cont</span>
                    </>
                  )
                )}
              </NavLink>

              <NavLink 
                to="/ai" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/25 border border-transparent hover:border-orange-400/30 ${isActive ? activeStyle + ' bg-orange-500/20 border-orange-400/50' : 'text-gray-300 hover:text-orange-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Settings className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Ai</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/25 border border-transparent hover:border-red-400/30 ${isActive ? activeStyle + ' bg-red-500/20 border-red-400/50' : 'text-gray-300 hover:text-red-300'}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Mail className="mr-3 w-5 h-5" />
                    <span className={isActive ? activeStyle2 : ''}>Contact</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </header>
  );
}