import { Link } from 'react-router-dom';
import { formatDate, getSentimentColor } from '../utils/helpers';

const JournalCard = ({ journal, onDelete }) => {
  const sentimentColor = getSentimentColor(journal.sentiment);

  return (
    <div className="glass-card p-4 sm:p-6 animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {journal.title}
          </h3>
          {journal.date && (
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(journal.date)}
            </p>
          )}
        </div>
        {journal.sentiment && (
          <span
            className="px-3 py-1 rounded-full text-xs font-medium ml-3 whitespace-nowrap"
            style={{
              backgroundColor: `${sentimentColor}20`,
              color: sentimentColor,
              border: `1px solid ${sentimentColor}30`,
            }}
          >
            {journal.sentiment}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 line-clamp-3 mb-4">
        {journal.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <Link
          to={`/edit/${journal.id}`}
          className="text-sm text-[#6c63ff] hover:text-[#a78bfa] transition-colors"
        >
          Edit
        </Link>
        <div className="flex gap-2">
          <Link
            to={`/edit/${journal.id}`}
            className="glass-btn-outline !py-2 !px-4 !text-xs"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(journal.id)}
            className="glass-btn-danger !py-2 !px-4 !text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
