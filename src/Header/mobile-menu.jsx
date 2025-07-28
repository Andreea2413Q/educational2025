import MobileNavigationItem from './mobile-navigation-item';
import { navigationItems, getProfileContent } from './navigation-configuration';
import { useAuth } from '../Cont/authContext';
import Sunset from '../Imagini/susnet.webp';

export default function MobileMenu({ isOpen, closeMenu }) {
  const { currentUser } = useAuth();

  return (
    <div className={`md:hidden mb-8 overflow-hidden transition-all duration-500 ease-in-out ${
      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0  opacity-0'
    }`}>
      <div className="py-4 bg-gray-900/60 backdrop-blur-lg rounded-lg border border-cyan-400/20 mt-2 shadow-xl">
        <div className="flex flex-col space-y-2 px-4">
          {navigationItems.map((item) => (
            <MobileNavigationItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              color={item.color}
              end={item.end}
              onClick={closeMenu}
              customContent={item.isProfile ? 
                (isActive) => getProfileContent(currentUser, isActive, Sunset, true) : 
                null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}