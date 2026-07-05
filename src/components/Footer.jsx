import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 lg:col-span-2 text-center sm:text-left"
          >
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto sm:mx-0">
              Your private digital journal for capturing memories, tracking emotions, and reflecting on life's journey.
            </p>

            {/* Social links */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>


        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-gray-600 text-center">
              &copy; {new Date().getFullYear()} JournalApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
