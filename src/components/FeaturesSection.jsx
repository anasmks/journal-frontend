import { motion } from 'framer-motion';
import { HiPencil, HiHeart, HiEmojiHappy, HiSearch, HiShieldCheck, HiDeviceMobile } from 'react-icons/hi';

const features = [
  {
    icon: HiPencil,
    title: 'Daily Journaling',
    description: 'Write effortlessly with a distraction-free editor designed to capture your thoughts in the moment.',
    gradient: 'from-[#6c63ff] to-[#a78bfa]',
    delay: 0.1,
  },
  {
    icon: HiHeart,
    title: 'Personal Reflection',
    description: 'Look back on your journey with insights that help you understand your growth over time.',
    gradient: 'from-[#ec4899] to-[#f472b6]',
    delay: 0.2,
  },
  {
    icon: HiEmojiHappy,
    title: 'Mood Tracking',
    description: 'Log your emotions and discover patterns in your emotional wellbeing across days and weeks.',
    gradient: 'from-[#10b981] to-[#34d399]',
    delay: 0.3,
  },
  {
    icon: HiSearch,
    title: 'Fast Search',
    description: 'Find any entry instantly with powerful full-text search across your entire journal history.',
    gradient: 'from-[#06b6d4] to-[#22d3ee]',
    delay: 0.4,
  },
  {
    icon: HiShieldCheck,
    title: 'Private & Secure',
    description: 'End-to-end encrypted with JWT authentication — your thoughts belong only to you.',
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
    delay: 0.5,
  },
  {
    icon: HiDeviceMobile,
    title: 'Anywhere Access',
    description: 'Responsive design that works beautifully on your phone, tablet, or desktop.',
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
    delay: 0.6,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#6c63ff]/5 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-[#6c63ff] bg-[#6c63ff]/10 border border-[#6c63ff]/20 mb-5">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Beautiful features for
            <br />
            <span className="bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] bg-clip-text text-transparent">
              meaningful journaling
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Every tool thoughtfully designed to make journaling a daily habit you'll love.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500 cursor-default"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 shadow-lg mb-5`}
                style={{ backgroundColor: 'rgba(108,99,255,0.1)' }}
              >
                <feature.icon className="text-white" size={22} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.02] to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
