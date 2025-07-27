export const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  ...props 
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-cyan-300 text-sm sm:text-base ${className}`}
      {...props}
    />
  );
};
