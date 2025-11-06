import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiGithub, FiChevronUp } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';
import { useMediaQuery } from 'react-responsive';
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

  return (<div className={`border ${darkMode ? 'border-neutral-700 bg-black' : 'border-gray-300 bg-white'} ${scrolled ? 'shadow-sm' : ''}`}>
    <div className="max-w-6xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8">
      <nav className={`w-full transition-colors border-l border-r ${darkMode ? 'border-neutral-700' : 'border-gray-300'} p-2 sm:p-3 md:p-2 duration-300`}>
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          <div className="overflow-hidden min-w-0">
            <AnimatePresence mode="wait">
              {scrolled && (
                <motion.div
                  initial={{ y: -30 }}
                  animate={{ y: 0 }}
                  exit={{ y: -30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <span className={`font-bold text-2xl sm:text-3xl md:text-4xl tracking-widest pixelText ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    AR
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href={`https://github.com/${resumeData.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`border p-2 rounded-lg font-extrabold ${darkMode ? 'border-neutral-600 text-zinc-300 hover:text-white' : 'border-gray-300 text-gray-700 hover:text-gray-900'}`}
              aria-label="GitHub"
            >
              <FiGithub size={18} className='sm:w-5' />
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full border transition-colors ${darkMode ? 'border-neutral-600 bg-neutral-900 text-gray-400 hover:bg-neutral-800' : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              aria-label="Toggle theme"
            >
              {!darkMode ? <FiSun size={18} className='sm:w-5' /> : <FiMoon size={18} className='sm:w-5' />}
            </button>
          </div>
        </div>
      </nav>
    </div>

    {/* Scroll-to-top button */}
    <AnimatePresence>
      {scrolled && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-999
            border rounded-full shadow-lg backdrop-blur
            ${darkMode ? 'bg-neutral-900/90 border-neutral-600 text-zinc-200 hover:bg-neutral-800' : 'bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-100'}
            h-13 w-13 sm:h-18 sm:w-18 flex items-center justify-center`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <FiChevronUp size={isMobile ? 20 : 25} />
        </motion.button>
      )}
    </AnimatePresence>
  </div>
  );
};

export default Navbar;
