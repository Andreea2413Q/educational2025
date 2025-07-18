import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Settings, Home, Palette, BookOpen, Gamepad2, Mail, FileText,Brain } from 'lucide-react';
import { useAuth } from '../Cont/authContext';
import Sunset from '../Imagini/susnet.webp'
import './header.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const activeStyle = "text-d1 font-medium";
  const activeStyle2 = "text-d2 font-bold";
  
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className="bg-b1 text-b4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="font-bold text-xl text-green-200 titlu-fleur">
            Col View
          </NavLink>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <Home className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Home</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/palete" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Palette className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Palete</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/teorie" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <BookOpen className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Teorie</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/quiz" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Brain className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Quiz</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/joc" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Gamepad2 className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Joc</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/note" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <FileText className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Notițe</span>
                </>
              )}
            </NavLink>
            
            <NavLink 
              to="/cont" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                currentUser ? (
                  <div className="flex items-center">
                    <img 
                      src={currentUser.photoURL} 
                      alt={Sunset} 
                      className="w-6 h-6 rounded-full mr-2 border border-white"
                    />
                    <span className={isActive ? activeStyle2 : ''}>Cont</span>
                  </div>
                ) : (
                  <>
                    <User className="mr-1 w-4 h-4" />
                    <span className={isActive ? activeStyle2 : ''}>Cont</span>
                  </>
                )
              )}
            </NavLink>

            <NavLink 
              to="/setari" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Settings className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Setări</span>
                </>
              )}
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Mail className="mr-1 w-4 h-4" />
                  <span className={isActive ? activeStyle2 : ''}>Contact</span>
                </>
              )}
            </NavLink>
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <div className={`md:hidden overflow-hidden transition-all duration-1000 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 da">
            <div className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
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
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  currentUser ? (
                    <div className="flex items-center">
                      <img 
                        src={Sunset} 
                        alt="Profil" 
                        className="w-6 h-6 rounded-full mr-2 border border-white"
                      />
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
                to="/setari" 
                className={({ isActive }) => 
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Settings className="mr-2 w-4 h-4" />
                    <span className={isActive ? activeStyle2 : ''}>Setări</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `flex items-center hover:text-d3 transition-colors ${isActive ? activeStyle : ''}`
                }
                onClick={closeMenu}
              >
                {({ isActive }) => (
                  <>
                    <Mail className="mr-2 w-4 h-4" />
                    <span className={isActive ? activeStyle2 : ''}>Contact</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}