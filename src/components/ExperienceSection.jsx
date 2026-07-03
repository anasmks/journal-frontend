import { motion } from 'framer-motion';
import { HiSun, HiBriefcase, HiMoon, HiTrendingUp } from 'react-icons/hi';

const timeline = [
  {
    icon: HiSun,
    title: 'Morning Thoughts',
    time: 'Start your day',
    description: 'Set intentions and capture the stillness of the morning. Record dreams, plan your day, or simply sit with your thoughts as the world wakes up.',
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
    delay: 0.1,
  },
  {
    icon: HiBriefcase,
    title: 'Daily Activities',
    time: 'Throughout the day',
    description: 'Jot down ideas, memorable conversations, and moments of inspiration as they happen. Keep a living record of your day in motion.',
    gradient: 'from-[#6c63ff] to-[#a78bfa]',
    delay: 0.25,
  },
  {
    icon: HiMoon,
    title: 'Evening Reflection',
    time: 'Wind down',
    description: 'Unwind by reviewing your day with gentle prompts. What went well? What did you learn? Let gratitude ground your evening routine.',
    gradient: 'from-[#06b6d4] to-[#22d3ee]',
    delay: 0.4,
  },
  {
    icon: HiTrendingUp,
    title: 'Personal Growth',
    time: 'Over time',
    description: 'Watch your story unfold with trends and insights. See how your mood evolves, what themes emerge, and how far you have come.',
    gradient: 'from-[#10b981] to-[#34d399]',
    delay: 0.55,
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/20 mb-5">
            Your Journaling Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            A day in the life of
            <br />
            <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#06b6d4] bg-clip-text text-transparent">
              your journal
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            From sunrise reflections to evening insights — watch your story unfold.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6c63ff]/40 via-[#a78bfa]/30 to-[#06b6d4]/20 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-20">
            {timeline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: item.delay }}
                className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500"
                  >
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Icon */}
                      <div
                        className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                      >
                        <item.icon className="text-white" size={20} />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                    <p className={`text-sm text-gray-400 leading-relaxed ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline dot (desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-[#0a0a0f] shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient.replace('from-', '').split(' ')[0]}, ${item.gradient.replace('to-', '').split(' ')[1]})`,
                      boxShadow: 'none',
                    }}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
