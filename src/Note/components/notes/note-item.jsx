import { getStyleForNote, formatDate } from '../../utils/note-styles';

export const NoteItem = ({ note, index, onEdit, onDelete }) => {
  return (
    <div
      className={`${getStyleForNote(index)} rounded-lg transition-all duration-300 p-4 sm:p-5 cursor-pointer hover:border-r-4 hover:border-r-white transform hover:scale-105 note-animation`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onEdit(note)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2">
          {note.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="text-red-400 hover:text-red-300 transition-all duration-300 text-lg sm:text-xl ml-2"
          title="Șterge notiță"
        >
          🗑️
        </button>
      </div>
      
      {note.subtitle && (
        <p className="text-sm sm:text-base font-medium text-gray-200 mb-3 line-clamp-1">
          {note.subtitle}
        </p>
      )}
      
      <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3">
        {note.content || 'Fără conținut...'}
      </p>
      
      <div className="text-xs text-gray-400">
        <p>Creat: {formatDate(note.createdAt)}</p>
        {note.updatedAt !== note.createdAt && (
          <p>Modificat: {formatDate(note.updatedAt)}</p>
        )}
      </div>
    </div>
  );
};