import { Menu, X } from 'lucide-react';

export default function MobileMenuButton({ isOpen, onToggle }) {
  return (
    <div className="md:hidden">
      <button 
        onClick={onToggle} 
        className="p-2 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
        aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}