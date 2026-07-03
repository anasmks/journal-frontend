import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPencil, HiViewList, HiCalendar, HiChartBar, HiSparkles, HiFire, HiPencilAlt } from 'react-icons/hi';
import journalService from '../services/journalService';
import userService from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import WeatherWidget from '../components/WeatherWidget';
import { formatDate, getSentimentColor } from '../utils/helpers';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    recent: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journalData = await journalService.getAll();
        const list = Array.isArray(journalData) ? journalData : [];
        setJournals(list);

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        setStats({
          total: list.length,
          recent: list.filter((j) => j.date && new Date(j.date) > weekAgo).length,
          thisWeek: list.filter((j) => j.date && new Date(j.date) > weekAgo).length,
        });
      } catch (err) {
        console.error('Failed to fetch journals:', err);
      }

      try {
        const greetingData = await userService.getProfile();
        setGreeting(typeof greetingData === 'string' ? greetingData : `Hi ${user?.userName}`);
      } catch (err) {
        setGreeting(`Hi ${user?.userName}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.userName]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal entry?')) return;
    try {
      await journalService.delete(id);
      const updated = journals.filter((j) => j.id !== id);
      setJournals(updated);
      setStats((prev) => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const recentJournals = useMemo(() => journals.slice(-3).reverse(), [journals]);

  const calculateStreak = useCallback((entries) => {
    if (!entries.length) return 0;
    const dates = [...new Set(entries.map(j => j.date?.split('T')[0]))].sort((a, b) => b.localeCompare(a));
    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const curr = new Date(dates[i - 1]);
      const prev = new Date(dates[i]);
      const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diff === 1) streak++;
      else break;
    }
    const mostRecent = new Date(dates[0]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    mostRecent.setHours(0, 0, 0, 0);
    const gap = Math.round((today - mostRecent) / (1000 * 60 * 60 * 24));
    return gap <= 1 ? streak : 0;
  }, []);

  const totalWords = useMemo(() =>
    journals.reduce((sum, j) => sum + (j.content ? j.content.split(/\s+/).filter(Boolean).length : 0), 0),
    [journals]
  );

  const topMood = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recent = journals.filter(j => j.date && new Date(j.date) > weekAgo && j.sentiment);
    if (!recent.length) return null;
    const counts = {};
    recent.forEach(j => { counts[j.sentiment] = (counts[j.sentiment] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [journals]);

  const streak = useMemo(() => calculateStreak(journals), [journals, calculateStreak]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const namePart = greeting.includes(',') ? greeting.split(',')[0] : greeting;
  const rawName = namePart.replace('Hi ', '').trim();
  const capitalizedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const weatherPart = greeting.includes(',') ? greeting.substring(greeting.indexOf(',')) : '';

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Hi, {capitalizedName}
                  {weatherPart && (
                    <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                      {weatherPart}
                    </span>
                  )}
                </h1>
                <p className="text-gray-500 mt-2">Here's your journal overview</p>
              </div>
              {topMood && (
                <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                  <span className="text-xs text-gray-400">Top mood</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${getSentimentColor(topMood)}20`,
                      color: getSentimentColor(topMood),
                    }}
                  >
                    {topMood}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Weather */}
          <motion.div variants={itemVariants} className="mb-8">
            <WeatherWidget />
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="group p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Total Entries</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#6c63ff]/20 to-[#a78bfa]/10 flex items-center justify-center">
                  <HiCalendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#6c63ff]" />
                </div>
              </div>
            </div>

            <div className="group p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stats.thisWeek}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">This Week</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#34d399]/10 flex items-center justify-center">
                  <HiChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-[#10b981]" />
                </div>
              </div>
            </div>

            <div className="group p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{streak}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Day Streak</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#fbbf24]/10 flex items-center justify-center">
                  <HiFire className="w-5 h-5 sm:w-6 sm:h-6 text-[#f59e0b]" />
                </div>
              </div>
            </div>

            <div className="group p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{totalWords.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Words Written</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#22d3ee]/10 flex items-center justify-center">
                  <HiPencilAlt className="w-5 h-5 sm:w-6 sm:h-6 text-[#06b6d4]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/create"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6c63ff] to-[#5a52d5] hover:from-[#7b73ff] hover:to-[#6c63ff] transition-all duration-300 shadow-lg shadow-[#6c63ff]/20 w-full sm:w-auto"
            >
              <HiPencil className="w-5 h-5" />
              New Entry
            </Link>
            <Link
              to="/journals"
              className="px-6 py-3 rounded-xl text-sm font-medium text-gray-300 border border-white/[0.08] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.15] transition-all duration-300 w-full sm:w-auto text-center"
            >
              <HiViewList className="w-5 h-5 inline mr-1.5 -mt-0.5" />
              View All
            </Link>
          </motion.div>

          {/* Recent journals */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-[#6c63ff] bg-[#6c63ff]/10 border border-[#6c63ff]/20">
                Recent
              </span>
              <h2 className="text-xl font-semibold text-white">Entries</h2>
            </div>

            {recentJournals.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="p-12 sm:p-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6c63ff]/20 to-[#a78bfa]/10 flex items-center justify-center mx-auto mb-4">
                  <HiSparkles className="w-8 h-8 text-[#6c63ff]" />
                </div>
                <p className="text-gray-400 text-lg font-medium">No journal entries yet</p>
                <p className="text-gray-600 mt-1 text-sm">Start writing to see your entries here</p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6c63ff] to-[#5a52d5] hover:from-[#7b73ff] hover:to-[#6c63ff] transition-all duration-300 shadow-lg shadow-[#6c63ff]/20"
                >
                  <HiPencil className="w-4 h-4" />
                  Write Your First Entry
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentJournals.map((journal, idx) => (
                  <motion.div
                    key={journal.id}
                    variants={itemVariants}
                    custom={idx}
                    className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500"
                  >
                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                      {journal.title}
                    </h3>
                    {journal.date && (
                      <p className="text-xs text-gray-500 mt-2">{formatDate(journal.date)}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                      {journal.content}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                      <Link
                        to={`/edit/${journal.id}`}
                        className="text-sm font-medium text-[#6c63ff] hover:text-[#a78bfa] transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(journal.id)}
                        className="text-sm text-gray-500 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
