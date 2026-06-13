import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import journalService from '../services/journalService';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';
import JournalCard from '../components/JournalCard';

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await journalService.getAll();
        setJournals(Array.isArray(data) ? data : []);
      } catch (err) {
        showToast('Failed to load journals', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, [showToast]);

  const filteredJournals = useMemo(() => {
    if (!searchQuery.trim()) return journals;
    const q = searchQuery.toLowerCase();
    return journals.filter(
      (j) =>
        j.title?.toLowerCase().includes(q) ||
        j.content?.toLowerCase().includes(q)
    );
  }, [searchQuery, journals]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal entry permanently?')) return;
    try {
      await journalService.delete(id);
      setJournals((prev) => prev.filter((j) => j.id !== id));
      showToast('Entry deleted', 'success');
    } catch (err) {
      showToast('Failed to delete entry', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 animate-slideUp">
          <div>
            <h1 className="text-3xl font-bold text-white">My Journals</h1>
            <p className="text-gray-500 mt-2">
              {journals.length} {journals.length === 1 ? 'entry' : 'entries'} total
            </p>
          </div>
          <Link
            to="/create"
            className="glass-btn flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Entry
          </Link>
        </div>

        {journals.length > 0 && (
          <div className="relative mb-6 animate-slideUp">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your entries..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
        )}

        {journals.length === 0 ? (
          <div className="glass-card p-12 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No journal entries yet</p>
            <p className="text-gray-600 mt-2">Start writing to see your entries here</p>
            <Link
              to="/create"
              className="inline-block mt-6 glass-btn"
            >
              Write Your First Entry
            </Link>
          </div>
        ) : filteredJournals.length === 0 ? (
          <div className="glass-card p-12 text-center animate-fadeIn">
            <p className="text-gray-400 text-lg">No entries match "{searchQuery}"</p>
            <p className="text-gray-600 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJournals.map((journal, idx) => (
              <div key={journal.id} style={{ animationDelay: `${0.05 * idx}s` }}>
                <JournalCard journal={journal} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalList;
