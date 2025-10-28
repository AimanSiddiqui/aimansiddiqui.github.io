import type { SocialLink, Skill, Experience, Education } from '../types';

export const siteConfig = {
  title: 'Aiman Siddiqui - Portfolio',
  description: 'Full-stack developer specialized in building modern web applications',
  author: 'Aiman Siddiqui',
  siteUrl: 'https://aimansiddiqui.github.io',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/AimanSiddiqui',
      icon: 'github'
    },
    // Add other social links
  ] as SocialLink[],
  
  skills: [
    {
      name: 'React',
      category: 'frontend',
      proficiency: 90
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      proficiency: 85
    },
    // Add more skills
  ] as Skill[],

  experiences: [
    // Add your experiences
  ] as Experience[],

  education: [
    // Add your education
  ] as Education[],

  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]
};