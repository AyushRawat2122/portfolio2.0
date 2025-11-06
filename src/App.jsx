import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import PatternDivider from "./components/PatternDivider";
import PatternLineContainer from "./components/PatternLineContainer";
import PatternDottedContainer from "./components/PatternDottedContainer";
import HoverDetail from "./components/HoverDetail";
import { resumeData } from './data/resumeData';
import { motion } from 'framer-motion';
import ChangingText from './components/ChangingText';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbCode, TbBulb, TbMapPin, TbPhone, TbMail, TbWorld, TbGenderMale } from "react-icons/tb";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
// NEW: only the icons needed for your skills
import {
  SiJavascript, SiCplusplus, SiHtml5, SiCss3,
  SiNodedotjs, SiReact, SiTailwindcss, SiRedux, SiReactrouter,
  SiExpress, SiSocketdotio, SiJsonwebtokens,
  SiMongodb, SiMysql, SiPostman, SiGit,
  SiGithub as SiGithubIcon, SiVercel,
  SiTypescript, SiPython, SiReactquery,
  SiHackerrank
} from "react-icons/si";
import InfoItem from './components/InfoItem';
import GitHubContributionGrid from './components/GitHubContributionGrid';
import { expData } from './data/resumeData';
import ProjectItem from './components/ProjectItem';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const speakerRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Profiles data (solid colored icons)
  const profiles = [
    {
      name: 'LinkedIn',
      handle: resumeData?.personal?.linkedin ? `@${resumeData.personal.linkedin}` : '',
      href: `https://linkedin.com/in/ayushrawat21`,
      icon: FaLinkedin,
      color: '#0A66C2',
    },
    {
      name: 'GitHub',
      handle: resumeData?.personal?.github ? `@${resumeData.personal.github}` : '',
      href: `https://github.com/${resumeData?.personal?.github ?? ''}`,
      icon: FaGithub,
      // color computed at render for contrast
    },
    {
      name: 'LeetCode',
      handle: resumeData?.personal?.leetcode ? `@${resumeData.personal.leetcode}` : '',
      href: resumeData?.personal?.leetcode ? `https://leetcode.com/${resumeData.personal.leetcode}` : '#',
      icon: SiLeetcode,
      color: '#FFA116',
    },
    {
      name: 'GeeksforGeeks',
      handle: '@balbeershyb35',
      href: "https://www.geeksforgeeks.org/user/balbeershyb35/",
      icon: SiGeeksforgeeks,
      color: '#2F8D46',
    },
  ];

  // Map skills -> icon, docs, color (only those present in resumeData.skills)
  const STACK_MAP = {
    "JavaScript": { name: "JavaScript", icon: SiJavascript, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
    "C/C++": { name: "C/C++", icon: SiCplusplus, href: "https://cplusplus.com/reference/", color: "#00599C" },
    "HTML": { name: "HTML", icon: SiHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34F26" },
    "CSS": { name: "CSS", icon: SiCss3, href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6" },

    "React": { name: "React", icon: SiReact, href: "https://react.dev/", color: "#61DAFB" },
    "Redux": { name: "Redux", icon: SiRedux, href: "https://redux.js.org/", color: "#764ABC" },
    "Zustand": { name: "Zustand", img: "https://docs.pmnd.rs/zustand.ico", href: "https://docs.pmnd.rs/zustand/getting-started/introduction" },
    "Tailwind CSS": { name: "Tailwind CSS", icon: SiTailwindcss, href: "https://tailwindcss.com/docs", color: "#06B6D4" },
    "React Router": { name: "React Router", icon: SiReactrouter, href: "https://reactrouter.com/", color: "#CA4245" },

    "Node.js": { name: "Node.js", icon: SiNodedotjs, href: "https://nodejs.org/en/docs", color: "#5FA04E" },
    "Express": { name: "Express", icon: SiExpress, href: "https://expressjs.com/", color: "#111827" },
    "Socket.io": { name: "Socket.io", icon: SiSocketdotio, href: "https://socket.io/docs/v4", color: "#111827" },
    "JWT": { name: "JWT", icon: SiJsonwebtokens, href: "https://jwt.io/introduction", color: "#000000" },

    "MongoDB": { name: "MongoDB", icon: SiMongodb, href: "https://www.mongodb.com/docs/", color: "#47A248" },
    "SQL": { name: "SQL (MySQL)", icon: SiMysql, href: "https://dev.mysql.com/doc/", color: "#4479A1" },

    "Git": { name: "Git", icon: SiGit, href: "https://git-scm.com/doc", color: "#F05032" },
    "GitHub": { name: "GitHub", icon: SiGithubIcon, href: "https://docs.github.com/", color: "#181717" },
    "Postman": { name: "Postman", icon: SiPostman, href: "https://learning.postman.com/docs/", color: "#FF6C37" },
    "Vercel": { name: "Vercel", icon: SiVercel, href: "https://vercel.com/docs", color: "#111827" },
    TypeScript: { name: "TypeScript", icon: SiTypescript, href: "https://www.typescriptlang.org/docs/", color: "#3178C6" },
    Python: { name: "Python", icon: SiPython, href: "https://docs.python.org/3/", color: "#3776AB" },
    "React Query": { name: "React Query", icon: SiReactquery, href: "https://tanstack.com/query/latest/docs/react/overview", color: "#FF4154" },
    // Use Vite official SVG to show yellow lightning
    "Vite": { name: "Vite", img: "https://vitejs.dev/logo.svg", href: "https://vitejs.dev/guide/" },
  };

  // Turn resumeData.about into paragraphs
  const aboutParagraphs = (resumeData?.about || '')
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean);

  // Linkify project names inside about text
  const linkifyProjects = (text) => {
    const projects = resumeData?.projects || [];
    let nodes = [text];
    projects.forEach((proj) => {
      const name = proj.name;
      nodes = nodes.flatMap((seg) => {
        if (typeof seg !== 'string') return [seg];
        const parts = seg.split(new RegExp(`(${name})`, 'gi'));
        return parts.map((part, idx) =>
          part.toLowerCase() === name.toLowerCase() ? (
            <a
              key={`${name}-${idx}`}
              href={`https://${proj.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} underline`}
            >
              {part}
            </a>
          ) : (
            part
          )
        );
      });
    });
    return nodes;
  };

  // Flatten skills from resumeData and keep only mapped items
  const skillGroups = resumeData?.skills ?? {};
  const skillsFlat = [
    ...(skillGroups.languages || []),
    ...(skillGroups.frontend || []),
    ...(skillGroups.backend || []),
    ...(skillGroups.databases || []),
    ...(skillGroups.tools || []),
  ];
  const stackItems = [...new Set(skillsFlat)]
    .map((name) => STACK_MAP[name])
    .filter(Boolean);

  // Build a single vertical timeline: Experience (top) -> Education (bottom)
  const timeline = [
    { kind: 'label', text: 'Experience' },
    ...expData.experience.map((i) => ({
      kind: 'item',
      title: i.company,
      subtitle: i.role,
      start: i.start,
      end: i.end,
      location: i.location,
      duration: i.duration,
      imageUrl: i.imageUrl,
    })),
    { kind: 'label', text: 'Education' },
    ...expData.education.map((i) => ({
      kind: 'item',
      title: i.institution,
      subtitle: i.degree,
      start: i.start,
      end: i.end,
      imageUrl: i.imageUrl,
    })),
  ];

  // react-icon map for certifications
  const CERT_ICON_MAP = {
    SiHackerrank: SiHackerrank,
  };

  // Lighten near-black brand icon colors in dark mode (no design change, just accessibility)
  const adjustIconColor = (color) => {
    if (!darkMode || !color) return color;
    const c = String(color).toLowerCase();
    const tooDark = ['#000000', '#111827', '#181717'];
    return tooDark.includes(c) ? '#e5e7eb' : color;
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-black text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`sm:pt-3 sticky top-0 z-50 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>

      <div className="overflow-x-hidden">
        <main className="max-w-6xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="hero">
            <motion.div className={`border border-t-0 ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <PatternDottedContainer dark={darkMode} className={"flex justify-center items-center"}>
                <h1 className='pixelText text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px]'>AR</h1>
              </PatternDottedContainer>
            </motion.div>
            <motion.div className='flex w-full'>
              {/* Hidden audio element (place a small click/ beep at public/audio/click.mp3) */}
              <audio ref={speakerRef} src="/name.mp3" preload="auto" className="hidden" playsInline />
              <div className={`relative border ${darkMode ? 'border-neutral-700 bg-neutral-900' : 'border-gray-300 bg-white'} mx-auto sm:mx-0 w-30 sm:w-52`}>
                <img
                  src="/profile.jpg"
                  alt="profile"
                  className={`w-full aspect-square object-center object-cover p-1 rounded-full border ${darkMode ? 'border-neutral-700 bg-neutral-900' : 'border-gray-300 bg-white'}`}
                />
                <div className='absolute top-0 left-0'>
                  <HoverDetail detail="I'm from India">
                    <img src="/In.jpg" alt="India" className='w-12 sm:w-16' />
                  </HoverDetail>
                </div>
              </div>
              <div className={`border border-t-0 sm:border-t sm:border-l-0 ${darkMode ? 'border-neutral-700' : 'border-gray-300'} grow flex flex-col justify-center`}>
                <PatternLineContainer dark={darkMode} className={`p-2 sm:p-4 border-b ${darkMode ? 'border-neutral-700' : 'border-gray-300'} grow-2`}>
                  <div className='h-full'>
                    <p className='absolute bottom-0.5 left-2 sm:left-4 text-gray-400 text-[8px] sm:text-sm'> text-3xl text-zinc-950 font-medium</p>
                  </div>
                </PatternLineContainer>
                <div className={`flex items-center gap-2 sm:gap-1 border-b ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
                  <h1
                    className={`text-4xl sm:text-3xl md:text-4xl -translate-y-1 plainText font-bold pl-2 sm:pl-4 py-2 ${darkMode ? 'text-zinc-100' : 'text-zinc-950'}`}
                  >
                    {resumeData.personal.name}
                  </h1>
                  <HoverDetail detail="Verified"><RiVerifiedBadgeFill fill='#00c2ff' size={20} className='sm:w-[25px]' /></HoverDetail>
                  <button
                    onClick={() => {
                      try {
                        if (speakerRef.current) {
                          speakerRef.current.currentTime = 0;
                          speakerRef.current.play();
                        }
                      } catch {}
                    }}
                    aria-label="Play name pronunciation"
                  >
                    <HiSpeakerWave fill='#dcdcdc' size={20} className='sm:w-[25px]' />
                  </button>
                </div>
                <ChangingText className={"px-2 sm:px-4 py-2 text-gray-500 text-xs sm:text-lg truncate"} />
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Quick-info Section */}
          <section id="quick-info">
            <motion.div className={`px-2 sm:px-4 py-4 border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <InfoItem icon={TbMapPin} darkMode={darkMode} iconSize={20} />
                  <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Jaipur Rajasthan, India</span>
                </div>

                <div className="flex items-center gap-3">
                  <InfoItem icon={TbMail} darkMode={darkMode} iconSize={20} />
                  <span className={`text-sm sm:text-base break-all ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>AyushRajputana2122@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <InfoItem icon={TbWorld} darkMode={darkMode} iconSize={20} />
                  <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>ayushcodes.tech</span>
                </div>

                <div className="flex items-center gap-3">
                  <InfoItem icon={TbGenderMale} darkMode={darkMode} iconSize={20} />
                  <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>he/him</span>
                </div>
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Profiles Section */}
          <section id="profiles">
            <div className={`p-2 sm:p-4 border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-4">
                {profiles.map((p) => {
                  const Icon = p.icon;
                  const iconColor = p.name === 'GitHub' ? (darkMode ? '#F5F5F5' : '#181717') : p.color;
                  return (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`border p-3 sm:p-4 hover:opacity-90 transition ${darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={28} className='sm:w-9' color={iconColor} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold plainText text-sm sm:text-base truncate">{p.name}</div>
                          {p.handle && <div className={`text-xs sm:text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.handle}</div>}
                        </div>
                        <FaArrowUpRightFromSquare size={16} className={`flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <PatternDivider dark={darkMode} />
          {/* About Section */}
          <section id="about">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <h2 className={`text-2xl sm:text-3xl p-2 border-b font-bold plainText ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>About</h2>
              <div className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} p-2 sm:p-4 space-y-4`}>
                {aboutParagraphs.map((para, idx) => (
                  <p key={idx} className="leading-6 sm:leading-7 text-sm sm:text-base">
                    {linkifyProjects(para)}
                  </p>
                ))}
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />
          {/* GitHub Commits Section */}
          <section id="github-commits">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'} p-2 sm:p-4`}>
              <div className="p-0 sm:p-2 overflow-x-auto">
                <GitHubContributionGrid
                  username={resumeData.personal.github}
                  darkMode={darkMode}
                  showTotal={true}
                />
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Stack Section */}
          <section id="stack">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <h2 className={`text-2xl sm:text-3xl p-2 border-b font-bold plainText ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>Stack</h2>
              <div className='p-2 sm:p-4'>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  {stackItems.map((item) => {
                    const Icon = item.icon;
                    const isImg = !!item.img;
                    return (
                      <HoverDetail key={item.name} detail={`${item.name}`}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.name} documentation`}
                          className={`inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl hover:opacity-90 transition ${darkMode ? 'bg-neutral-900' : 'bg-white'} border ${darkMode ? 'border-neutral-700' : 'border-gray-200'} overflow-visible flex-shrink-0`}
                        >
                          {isImg ? (
                            <img src={item.img} alt={item.name} className="h-6 w-6 sm:h-8 sm:w-8" />
                          ) : (
                            <Icon size={24} className='sm:w-7' color={adjustIconColor(item.color)} />
                          )}
                        </a>
                      </HoverDetail>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Exp & Education Section */}
          <section id="exp-edu">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <h2 className={`text-2xl sm:text-3xl p-2 border-b font-bold plainText ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>Experience</h2>
              <div className="p-2 sm:p-4">
                <div className="relative">
                  {/* Vertical rail (behind dots) */}
                  <div className={`absolute left-3 sm:left-6 top-0 bottom-0 w-px ${darkMode ? 'bg-neutral-700' : 'bg-gray-300'} z-0`} />
                  <ul className="space-y-4 sm:space-y-6">
                    {timeline.map((node, idx) => {
                      if (node.kind === 'label') {
                        return (
                          <li key={`lbl-${idx}`} className="relative pl-10 sm:pl-16">
                            <span className={`inline-block px-2 sm:px-3 py-1 border text-xs plainText ${darkMode ? 'bg-neutral-900 border-neutral-700 text-zinc-200' : 'bg-gray-100 border-gray-300 text-gray-800'}`}>
                              {node.text}
                            </span>
                          </li>
                        );
                      }

                      return (
                        <li key={`itm-${idx}`} className="relative pl-10 sm:pl-16">
                          <span className={`absolute left-2 sm:left-6 -translate-x-1/2 top-5 h-2.5 w-2.5 rounded-full z-10 ${darkMode ? 'bg-zinc-400 ring-2 ring-neutral-700' : 'bg-gray-500 ring-2 ring-gray-300'}`} />
                          <div className="flex items-start gap-3 sm:gap-4">
                            {node.imageUrl && (
                              <div className={`${darkMode ? 'border border-neutral-700' : 'border border-gray-200'} h-8 w-8 sm:h-10 sm:w-10 aspect-square rounded-full overflow-hidden flex-shrink-0`}>
                                <img
                                  src={node.imageUrl}
                                  alt={node.title}
                                  className="h-full w-full object-cover aspect-square"
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold plainText text-sm sm:text-base md:text-lg leading-tight">
                                {node.title}
                              </div>
                              <div className={`text-xs sm:text-sm leading-snug ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                {node.subtitle}
                              </div>
                              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {node.start} – {node.end}
                                {node.location ? ` • ${node.location}` : ''}
                                {node.duration ? ` • ${node.duration}` : ''}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Projects Section */}
          <section id="projects">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <h2 className="text-2xl sm:text-3xl p-2 font-bold plainText">Projects</h2>
              <div>
                {resumeData.projects.map((p, i) => (
                  <ProjectItem key={`${p.name}-${i}`} project={p} darkMode={darkMode} idx={i} />
                ))}
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />

          {/* Certifications Section */}
          <section id="certifications">
            <motion.div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <h2 className={`text-2xl sm:text-3xl p-2 font-bold plainText border-b ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>Certifications</h2>
              <div className={`${darkMode ? 'divide-neutral-700' : 'divide-gray-300'} divide-y`}>
                {resumeData.certifications.map((c, i) => {
                  const Icon = CERT_ICON_MAP[c.icon];
                  const isImg = typeof c.icon === 'string' && /^https?:\/\//.test(c.icon);
                  const hasLink = !!c.link;
                  const Row = hasLink ? 'a' : 'div';
                  const rowProps = hasLink
                    ? { href: c.link, target: "_blank", rel: "noopener noreferrer" }
                    : {};

                  return (
                    <Row
                      key={`${c.title}-${i}`}
                      {...rowProps}
                      className={`flex gap-3 sm:gap-0 ${darkMode ? 'hover:bg-neutral-900/60' : 'hover:bg-gray-50'} transition`}
                    >
                      <div className={`flex sm:border-r p-3 sm:p-4 items-center justify-center flex-shrink-0 ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
                        {Icon ? (
                          <Icon size={25} className="h-8 w-8 sm:h-10 sm:w-10" color={darkMode ? '#22c55e' : '#22c55e'} />
                        ) : isImg ? (
                          <img src={c.icon} alt="" className="h-8 w-8 sm:h-10 sm:w-10 object-contain aspect-square rounded" />
                        ) : (
                          <div className={`h-8 w-8 sm:h-10 sm:w-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        )}
                      </div>

                      <div className='flex items-center justify-between grow p-3 sm:p-4 gap-2'>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold plainText text-sm sm:text-base truncate">{c.title}</div>
                          {c.year && (
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {c.year}
                            </div>
                          )}
                        </div>

                        {hasLink && (
                          <HoverDetail detail="Open certificate">
                            <FaArrowUpRightFromSquare size={16} className={`flex-shrink-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                          </HoverDetail>
                        )}
                      </div>
                    </Row>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <PatternDivider dark={darkMode} />
        </main>

        {/* Footer */}
        <footer className={`${darkMode ? 'bg-black text-zinc-300' : 'bg-gray-50 text-gray-700'} border-t ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
          <div className="max-w-6xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8">
            <div className={`border ${darkMode ? 'border-neutral-700' : 'border-gray-300'} border-t-0`}>
              <h2 className={`text-xl sm:text-2xl px-2 border-b font-semibold plainText ${darkMode ? 'border-neutral-700' : 'border-gray-300'}`}>Brand</h2>

              {/* Give rows a subtle surface in dark mode so content appears centered on a clear plane */}
              <div className={`w-full border-b ${darkMode ? 'border-neutral-700 bg-neutral-900' : 'border-gray-300'}`}>
                {/* Mark Row */}
                <div className={`flex border-b ${darkMode ? 'border-neutral-700 bg-neutral-900' : 'border-gray-300'}`}>
                  <div className={`p-2 text-xs sm:text-sm border-r uppercase tracking-widest ${darkMode ? 'bg-neutral-900 text-zinc-400 border-neutral-700' : 'bg-gray-200 text-gray-600 border-gray-300'} flex items-center justify-center`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    MARK
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                    <span className="text-5xl sm:text-7xl md:text-9xl pixelText font-black tracking-widest">AR</span>
                  </div>
                </div>

                {/* Logotype Row */}
                <div className={`flex ${darkMode ? 'bg-neutral-900' : ''}`}>
                  <div className={`p-2 text-xs sm:text-sm border-r uppercase tracking-widest ${darkMode ? 'bg-neutral-900 text-zinc-400 border-neutral-700' : 'bg-gray-200 text-gray-600 border-gray-300'} flex items-center justify-center`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    LOGOTYPE
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
                    <div className="text-center">
                      <span className="text-xl sm:text-2xl md:text-3xl pixelText font-black tracking-widest">AR</span>
                      <div className="pixelText tracking-wide text-sm sm:text-base md:text-lg font-normal mt-1">AYUSH RAWAT</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-4 sm:mt-8 text-center text-xs sm:text-sm px-2 pb-4 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                <p className="break-words">Inspired by <a href="https://tailwindcss.com" className="underline">tailwindcss.com</a> & <a href="https://chanhdai.com/" className="underline">chanhdai.com</a></p>
                <p className="mt-2">Built by <a href="#" className="underline font-medium">Ayush Rawat</a></p>
              </div>
            </div>
            <PatternDivider dark={darkMode} />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
