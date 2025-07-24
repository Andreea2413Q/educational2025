import { NavLink } from 'react-router-dom';

export default function Logo({ title = "Col View", className = "" }) {
  return (
    <NavLink 
      to="/" 
      className={`titlu-fleur text-3xl sm:text-xl bg-gradient-to-r  font-bold from-cyan-400  to-pink-500 bg-clip-text text-transparent ${className}`}
    >
      {title}
    </NavLink>
  );
}