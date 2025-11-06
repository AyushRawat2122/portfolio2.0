import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';
import { resumeData } from '../data/resumeData';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <FiGithub size={18} fill={darkMode ? 'gray' : 'white' } className='sm:w-5' />
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
  </div>
  );
};

export default Navbar;
