import React from 'react';
import {
  FaAngular,
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPhp,
  FaJava,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaDocker,
  FaNodeJs,
  FaServer,
  FaLayerGroup,
  FaCode,
  FaDatabase,
  FaLaravel,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiJquery,
  SiNextdotjs,
  SiExpress,
} from 'react-icons/si';

export interface SkillBadgeConfig {
  icon: React.ReactNode;
  color: string;
  label?: string;
}

export const getSkillBadgeConfig = (tag: string, iconClass = 'w-4 h-4'): SkillBadgeConfig => {
  const normalized = tag.trim();
  const map: Record<string, SkillBadgeConfig> = {
    'Angular': { icon: <FaAngular className={iconClass} />, color: '#DD0031' },
    'React': { icon: <FaReact className={iconClass} />, color: '#0284C7' },
    'Wordpress': { icon: <FaWordpress className={iconClass} />, color: '#21759B' },
    'WordPress': { icon: <FaWordpress className={iconClass} />, color: '#21759B' },
    'HTML': { icon: <FaHtml5 className={iconClass} />, color: '#E34F26' },
    'CSS': { icon: <FaCss3Alt className={iconClass} />, color: '#1572B6' },
    'JavaScript': { icon: <FaJs className={iconClass} />, color: '#CA9E00' },
    'TypeScript': { icon: <SiTypescript className={iconClass} />, color: '#3178C6' },
    'PHP': { icon: <FaPhp className={iconClass} />, color: '#777BB4' },
    'Java': { icon: <FaJava className={iconClass} />, color: '#E76F00' },
    'SQL/MYSQL': { icon: <SiMysql className={iconClass} />, color: '#4479A1' },
    'MySQL': { icon: <SiMysql className={iconClass} />, color: '#4479A1', label: 'MySQL' },
    'Firebase': { icon: <SiFirebase className={iconClass} />, color: '#F57C00' },
    'Bootstrap': { icon: <FaBootstrap className={iconClass} />, color: '#7952B3' },
    'Tailwind': { icon: <SiTailwindcss className={iconClass} />, color: '#06B6D4' },
    'Tailwind CSS': { icon: <SiTailwindcss className={iconClass} />, color: '#06B6D4', label: 'Tailwind CSS' },
    'jQuery': { icon: <SiJquery className={iconClass} />, color: '#0769AD' },
    'Git': { icon: <FaGitAlt className={iconClass} />, color: '#F05032' },
    'Github': { icon: <FaGithub className={iconClass} />, color: '#24292E' },
    'GitHub': { icon: <FaGithub className={iconClass} />, color: '#24292E' },
    'Figma': { icon: <FaFigma className={iconClass} />, color: '#F24E1E' },
    'UI/UX': { icon: <FaFigma className={iconClass} />, color: '#F24E1E' },
    'Docker': { icon: <FaDocker className={iconClass} />, color: '#2496ED' },
    'Next.js': { icon: <SiNextdotjs className={iconClass} />, color: '#111111' },
    'Node.js': { icon: <FaNodeJs className={iconClass} />, color: '#339933' },
    'Express': { icon: <SiExpress className={iconClass} />, color: '#353B48' },
    'API REST': { icon: <FaServer className={iconClass} />, color: '#0092CA' },
    'Backend': { icon: <FaDatabase className={iconClass} />, color: '#475569' },
    'Frontend': { icon: <FaCode className={iconClass} />, color: '#2563EB' },
    'Full-Stack': { icon: <FaLayerGroup className={iconClass} />, color: '#6D28D9' },
    'Laravel': { icon: <FaLaravel className={iconClass} />, color: '#FF2D20' },
  };

  return (
    map[normalized] || {
      icon: <FaCode className={iconClass} />,
      color: '#0092CA',
    }
  );
};
