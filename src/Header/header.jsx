import { useState } from 'react';
import HeaderBackground from './header-background';
import Logo from './logo';
import DesktopNavigation from './desktop-navigation';
import MobileMenuButton from './mobile-menu-button';
import MobileMenu from './mobile-menu';
import './header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r backdrop-blur-lg border-b relative overflow-hidden">
      <HeaderBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <DesktopNavigation />
          <MobileMenuButton isOpen={isOpen} onToggle={toggleMenu} />
        </div>
        
        <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />
      </div>
    </header>
  );
}