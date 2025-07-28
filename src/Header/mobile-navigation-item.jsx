import { NavLink } from 'react-router-dom';

export default function MobileNavigationItem({ 
  to, 
  icon: Icon, 
  label, 
  color = 'cyan', 
  end = false, 
  onClick = null,
  customContent = null 
}) {
  const activeStyle = "text-cyan-300 font-medium";
  const activeStyle2 = "text-cyan-200 font-bold";
  
  const colorVariants = {
    cyan: {
      hover: 'hover:bg-cyan-500/10 hover:shadow-cyan-500/25 hover:border-cyan-400/30 hover:text-cyan-300',
      active: 'bg-cyan-500/20 border-cyan-400/50'
    },
    pink: {
      hover: 'hover:bg-pink-500/10 hover:shadow-pink-500/25 hover:border-pink-400/30 hover:text-pink-300',
      active: 'bg-pink-500/20 border-pink-400/50'
    },
    purple: {
      hover: 'hover:bg-purple-500/10 hover:shadow-purple-500/25 hover:border-purple-400/30 hover:text-purple-300',
      active: 'bg-purple-500/20 border-purple-400/50'
    },
    blue: {
      hover: 'hover:bg-blue-500/10 hover:shadow-blue-500/25 hover:border-blue-400/30 hover:text-blue-300',
      active: 'bg-blue-500/20 border-blue-400/50'
    },
    green: {
      hover: 'hover:bg-green-500/10 hover:shadow-green-500/25 hover:border-green-400/30 hover:text-green-300',
      active: 'bg-green-500/20 border-green-400/50'
    },
    yellow: {
      hover: 'hover:bg-yellow-500/10 hover:shadow-yellow-500/25 hover:border-yellow-400/30 hover:text-yellow-300',
      active: 'bg-yellow-500/20 border-yellow-400/50'
    },
    indigo: {
      hover: 'hover:bg-indigo-500/10 hover:shadow-indigo-500/25 hover:border-indigo-400/30 hover:text-indigo-300',
      active: 'bg-indigo-500/20 border-indigo-400/50'
    },
    orange: {
      hover: 'hover:bg-orange-500/10 hover:shadow-orange-500/25 hover:border-orange-400/30 hover:text-orange-300',
      active: 'bg-orange-500/20 border-orange-400/50'
    },
    red: {
      hover: 'hover:bg-red-500/10 hover:shadow-red-500/25 hover:border-red-400/30 hover:text-red-300',
      active: 'bg-red-500/20 border-red-400/50'
    }
  };

  const colorClasses = colorVariants[color] || colorVariants.cyan;

  return (
    
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex items-center p-3 rounded-lg transition-all duration-300 hover:shadow-lg border border-transparent ${colorClasses.hover} ${
          isActive ? activeStyle + ' ' + colorClasses.active : 'text-gray-300'
        }`
      }
      onClick={onClick}
      end={end}
    >
      {({ isActive }) => (
        <>
          {customContent ? (
            customContent(isActive)
          ) : (
            <>
              <Icon className="mr-3 w-5 h-5" />
              <span className={isActive ? activeStyle2 : ''}>{label}</span>
            </>
          )}
        </>
      )}
    </NavLink>
  );
}