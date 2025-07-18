import { useTheme } from './themeContext';

const ThemeSelector = () => {
  const { theme, changeTheme } = useTheme();

  const themes = [
    { id: 'original', name: 'Original', icon: '🎨' },
    { id: 'luminos', name: 'Luminos', icon: '☀️' },
    { id: 'intunecat', name: 'Întunecat', icon: '🌙' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text">Selectează tema</h3>
      <div className="grid grid-cols-1 gap-3 ">
        {themes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => changeTheme(themeOption.id)}
            className={`
              flex items-center justify-between p-4 rounded-lg border-2 transition-all 
              ${theme === themeOption.id 
                ? 'border-primary bg-primary bg-opacity-10' 
                : 'border-border bg-surface hover:border-primary hover:bg-primary hover:bg-opacity-5'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{themeOption.icon}</span>
              <span className="font-medium text-text">{themeOption.name}</span>
            </div>
            {theme === themeOption.id && (
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      
 
      
    </div>
  );
};

export default ThemeSelector;