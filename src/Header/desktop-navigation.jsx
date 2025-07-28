import NavigationItem from './navigation-item';
import { navigationItems, getProfileContent } from './navigation-configuration';
import { useAuth } from '../Cont/authContext';
import Sunset from '../Imagini/susnet.webp';

export default function DesktopNavigation() {
  const { currentUser } = useAuth();

  return (
    <nav className="hidden md:flex space-x-6 lg:space-x-8 ">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          color={item.color}
          end={item.end}
          customContent={item.isProfile ? 
            (isActive) => getProfileContent(currentUser, isActive, Sunset, false) : 
            null
          }
        />
      ))}
    </nav>
  );
}