import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const sentimentColors = {
  HAPPY: '#10b981',
  SAD: '#6b7280',
  ANGRY: '#ef4444',
  EXCITED: '#f59e0b',
  NEUTRAL: '#6c63ff',
  ANXIOUS: '#8b5cf6',
  GRATEFUL: '#ec4899',
  HOPEFUL: '#06b6d4',
};

const journalPreviewCards = [
  { title: 'Morning Reflections', content: 'Today I woke up feeling grateful for...', mood: 'GRATEFUL', color: sentimentColors.GRATEFUL, time: '8:30 AM' },
  { title: 'Work Notes', content: 'Had a productive meeting about the new...', mood: 'EXCITED', color: sentimentColors.EXCITED, time: '1:15 PM' },
  { title: 'Evening Thoughts', content: 'Taking a moment to reflect on the day...', mood: 'HOPEFUL', color: sentimentColors.HOPEFUL, time: '9:00 PM' },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-24 lg:pt-28 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:min-h-[calc(100vh-8rem)]">
          {/* Left - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-8 lg:pt-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight text-center lg:text-left"
            >
              Your Thoughts
              <br />
              <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                Deserve a Home
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-lg text-center lg:text-left"
            >
              Capture memories, track your journey, and reflect on life through a beautifully designed digital journal.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#6c63ff] to-[#5a52d5] hover:from-[#7b73ff] hover:to-[#6c63ff] transition-all duration-300"
              >
                Start Journaling
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </Link>
              <button
                onClick={() => {
                  const el = document.querySelector('#features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl text-base font-medium text-gray-300 border border-white/[0.08] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.15] transition-all duration-300"
              >
                Explore Features
              </button>
            </motion.div>

          </motion.div>

          {/* Right - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="relative block"
          >
            {/* Main mockup card */}
            <div className="relative w-full lg:aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#12121a] to-[#0d0d14] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Mockup header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg overflow-hidden">
                    <img src="/mini-dash.png" alt="Dashboard" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-white/80">Your Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiCalendar className="text-gray-500" size={16} />
                  <span className="text-xs text-gray-500">Today</span>
                </div>
              </div>

              {/* Mockup body */}
              <div className="p-5 space-y-3">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <p className="text-xs text-gray-500">Entries</p>
                    <p className="text-lg font-bold text-white mt-0.5">24</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <p className="text-xs text-gray-500">Streak</p>
                    <p className="text-lg font-bold text-white mt-0.5">7</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <p className="text-xs text-gray-500">Mood</p>
                    <p className="text-lg font-bold text-[#10b981] mt-0.5">HAPPY</p>
                  </div>
                </div>

                {/* Journal preview cards */}
                {journalPreviewCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors cursor-default"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.color }} />
                          <p className="text-sm font-medium text-white truncate">{card.title}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{card.content}</p>
                      </div>
                      <div className="flex flex-col items-end ml-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor: `${card.color}20`,
                            color: card.color,
                          }}
                        >
                          {card.mood}
                        </span>
                        <span className="text-[10px] text-gray-600 mt-1">{card.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
