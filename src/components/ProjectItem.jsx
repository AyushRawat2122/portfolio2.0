import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HoverDetail from './HoverDetail';
import { FiLink } from 'react-icons/fi';
import { BsChevronExpand, BsChevronContract } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa6';

const normalizeUrl = (url) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

const ProjectItem = ({ project, darkMode, idx }) => {
  const [open, setOpen] = useState(idx === 0);

  const liveUrl = useMemo(() => normalizeUrl(project.link), [project.link]);
  const codeUrl = useMemo(() => normalizeUrl(project.github), [project.github]);

  return (
    <div className='w-full'>
      {/* Header */}
      <div
        className={`cursor-pointer flex border-t w-full ${darkMode ? 'border-neutral-700' : 'border-gray-300'} select-none`}
        onClick={() => setOpen((v) => !v)}
        role="button"
        aria-expanded={open}
      >
        <div className={`border-r ${darkMode ? 'border-neutral-700' : 'border-gray-300'} p-3`}>
          <img src={project.image} alt={project.name} className={`h-10 object-contain contain aspect-square ${project.name === "Todoshi" ? "scale-150" : ""}`} />
        </div>
        <div className='flex p-4 items-center grow justify-between'>
          <div className="flex-1 min-w-0">
            <div className="font-semibold plainText text-base md:text-lg truncate">
              {project.name}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {liveUrl && (
              <HoverDetail detail="open project link">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition ${darkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open live project"
                >
                  <FiLink />
                </a>
              </HoverDetail>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              aria-label={open ? 'Collapse details' : 'Expand details'}
              className={`transition ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {open ? <BsChevronContract /> : <BsChevronExpand />}
            </button>
          </div>
        </div>

      </div>

      {/* Details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`overflow-hidden border-t ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}
          >
            <div className="px-4 pb-4">
              {project.description && (
                <p className={`text-sm border-b ${darkMode ? 'border-neutral-700' : 'border-gray-200'} py-3 mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {project.description}
                </p>
              )}

              {Array.isArray(project.features) && project.features.length > 0 && (
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {Array.isArray(project.tech) && project.tech.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 text-xs rounded-md flex  border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700 bg-gray-100'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1 rounded-md text-sm border inline-flex items-center gap-1 ${darkMode ? 'border-gray-700 text-gray-200' : 'border-gray-300 text-gray-800'}`}
                  >
                    <FaGithub /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectItem;
