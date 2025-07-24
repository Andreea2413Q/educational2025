import { Home, Palette, BookOpen, Gamepad2, Mail, FileText, Brain, User, Settings } from 'lucide-react';

export const navigationItems = [
  {
    to: "/",
    icon: Home,
    label: "Introducere",
    color: "cyan",
    end: true
  },
 
  {
    to: "/teorie",
    icon: BookOpen,
    label: "Teorie",
    color: "purple"
  },
  {
    to: "/quiz",
    icon: Brain,
    label: "Quiz",
    color: "blue"
  },
   {
    to: "/palete",
    icon: Palette,
    label: "Palete",
    color: "pink"
  },
  {
    to: "/joc",
    icon: Gamepad2,
    label: "Joc",
    color: "green"
  },
  {
    to: "/note",
    icon: FileText,
    label: "Notițe",
    color: "yellow",
    end: true
  },
  {
    to: "/ai",
    icon: Settings,
    label: "Ai",
    color: "orange"
  },
  {
    to: "/cont",
    icon: User,
    label: "Cont",
    color: "indigo",
    isProfile: true
  },
  
  {
    to: "/contact",
    icon: Mail,
    label: "Contact",
    color: "red"
  }
];


export const getProfileContent = (currentUser, isActive, Sunset, isMobile = false) => {
  const activeStyle2 = "text-cyan-200 font-bold";
  const iconSize = isMobile ? "w-6 h-6 mr-3" : "w-6 h-6 mr-2";
  
  if (currentUser) {
    return (
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={isMobile ? Sunset : currentUser.photoURL} 
            alt={isMobile ? "Profil" : Sunset} 
            className={`${iconSize} rounded-full border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/25`}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20"></div>
        </div>
        <span className={isActive ? activeStyle2 : ''}>Cont</span>
      </div>
    );
  } else {
    return (
      <>
        <User className={iconSize} />
        <span className={isActive ? activeStyle2 : ''}>Cont</span>
      </>
    );
  }
};