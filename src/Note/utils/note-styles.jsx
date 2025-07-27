
export const noteStyles = [
  "bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 border-l-4 border-purple-400",
  "bg-gradient-to-br from-yellow-600 via-orange-700 to-amber-800 border-l-4 border-yellow-400",
  "bg-gradient-to-br from-red-700 via-red-800 to-pink-900 border-l-4 border-red-400",
  "bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 border-l-4 border-green-400",
  "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 border-l-4 border-blue-400",
  "bg-gradient-to-br from-cyan-600 via-teal-700 to-blue-800 border-l-4 border-cyan-400",
  "bg-gradient-to-br from-pink-600 via-purple-700 to-violet-800 border-l-4 border-pink-400",
  "bg-gradient-to-br from-orange-600 via-red-700 to-pink-800 border-l-4 border-orange-400",
  "bg-gradient-to-br from-gray-700 via-slate-800 to-gray-900 border-l-4 border-gray-400"
];

export const getStyleForNote = (index) => noteStyles[index % 9];

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};