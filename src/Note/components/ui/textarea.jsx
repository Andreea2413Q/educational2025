export const Textarea = ({ 
  value, 
  onChange, 
  placeholder, 
  rows = 8,
  className = '',
  ...props 
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-white placeholder-gray-400 text-sm sm:text-base ${className}`}
      {...props}
    />
  );
};