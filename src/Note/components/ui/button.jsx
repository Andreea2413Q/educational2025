export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 rounded-lg border flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white border-cyan-400',
    secondary: 'border-gray-500 text-gray-300 hover:bg-gray-800',
    danger: 'bg-gradient-to-r from-purple-600 to-red-600 text-white hover:from-purple-700 hover:to-red-700 border-cyan-400',
    help: 'bg-gradient-to-r from-purple-600 to-red-600 border-cyan-400 text-white hover:from-purple-700 hover:to-red-700'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};