import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaBug,
  FaCircleNodes,
  FaCloud,
  FaCode,
  FaDatabase,
  FaFlask,
  FaLaptopCode,
  FaNetworkWired,
  FaRobot,
  FaShieldHalved,
  FaToolbox,
} from 'react-icons/fa6';
import {
  SiAngular,
  SiBitbucket,
  SiCss3,
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiGitlab,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJupyter,
  SiKeras,
  SiKubernetes,
  SiMongodb,
  SiNestjs,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiRedux,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
  SiGooglecloud,
  SiAmazon,
} from 'react-icons/si';
import skills from '../../data/skills.json';

type SkillCategory = keyof typeof skills;

type SkillVisual = {
  icon: IconType;
  accent: string;
  glow: string;
};

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Agile',
  cloud: 'Cloud & DevOps',
  testing: 'Testing',
  ai_ml: 'AI / ML',
};

const categoryVisuals: Record<SkillCategory, SkillVisual> = {
  frontend: { icon: FaCode, accent: '#83ddb6', glow: 'rgba(131, 221, 182, 0.22)' },
  backend: { icon: FaLaptopCode, accent: '#f3b86a', glow: 'rgba(243, 184, 106, 0.2)' },
  database: { icon: FaDatabase, accent: '#9dd15f', glow: 'rgba(157, 209, 95, 0.2)' },
  tools: { icon: FaToolbox, accent: '#8ca6ff', glow: 'rgba(140, 166, 255, 0.2)' },
  cloud: { icon: FaCloud, accent: '#86c7ff', glow: 'rgba(134, 199, 255, 0.2)' },
  testing: { icon: FaBug, accent: '#f08bb5', glow: 'rgba(240, 139, 181, 0.2)' },
  ai_ml: { icon: FaRobot, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.2)' },
};

const skillVisuals: Record<string, SkillVisual> = {
  React: { icon: SiReact, accent: '#61dafb', glow: 'rgba(97, 218, 251, 0.25)' },
  'React Native': { icon: SiReact, accent: '#61dafb', glow: 'rgba(97, 218, 251, 0.25)' },
  JavaScript: { icon: SiJavascript, accent: '#f7df1e', glow: 'rgba(247, 223, 30, 0.22)' },
  TypeScript: { icon: SiTypescript, accent: '#3178c6', glow: 'rgba(49, 120, 198, 0.24)' },
  HTML: { icon: SiHtml5, accent: '#e34f26', glow: 'rgba(227, 79, 38, 0.22)' },
  CSS: { icon: SiCss3, accent: '#264de4', glow: 'rgba(38, 77, 228, 0.22)' },
  Angular: { icon: SiAngular, accent: '#dd0031', glow: 'rgba(221, 0, 49, 0.22)' },
  Redux: { icon: SiRedux, accent: '#764abc', glow: 'rgba(118, 74, 188, 0.22)' },
  'React Query': { icon: FaCircleNodes, accent: '#ff6b81', glow: 'rgba(255, 107, 129, 0.18)' },
  'Context API': { icon: FaCircleNodes, accent: '#83ddb6', glow: 'rgba(131, 221, 182, 0.18)' },
  'Node.js': { icon: SiNodedotjs, accent: '#339933', glow: 'rgba(51, 153, 51, 0.22)' },
  NestJS: { icon: SiNestjs, accent: '#ea2857', glow: 'rgba(234, 40, 87, 0.22)' },
  FastAPI: { icon: SiFastapi, accent: '#009688', glow: 'rgba(0, 150, 136, 0.2)' },
  'REST APIs': { icon: FaNetworkWired, accent: '#81c784', glow: 'rgba(129, 199, 132, 0.18)' },
  GraphQL: { icon: SiGraphql, accent: '#e535ab', glow: 'rgba(229, 53, 171, 0.22)' },
  RabbitMQ: { icon: SiRabbitmq, accent: '#f60', glow: 'rgba(255, 102, 0, 0.2)' },
  'AWS Lambdas': { icon: SiAmazon, accent: '#ff9900', glow: 'rgba(255, 153, 0, 0.22)' },
  'Google Cloud Functions': { icon: SiGooglecloud, accent: '#4285f4', glow: 'rgba(66, 133, 244, 0.22)' },
  WebSockets: { icon: FaNetworkWired, accent: '#6fd3ff', glow: 'rgba(111, 211, 255, 0.2)' },
  OAuth: { icon: FaShieldHalved, accent: '#9f7aea', glow: 'rgba(159, 122, 234, 0.2)' },
  JWT: { icon: FaShieldHalved, accent: '#9f7aea', glow: 'rgba(159, 122, 234, 0.2)' },
  'Microservices Architecture': { icon: FaCircleNodes, accent: '#f3b86a', glow: 'rgba(243, 184, 106, 0.18)' },
  SQL: { icon: FaDatabase, accent: '#4db6ac', glow: 'rgba(77, 182, 172, 0.18)' },
  MongoDB: { icon: SiMongodb, accent: '#47a248', glow: 'rgba(71, 162, 72, 0.22)' },
  PostgreSQL: { icon: SiPostgresql, accent: '#336791', glow: 'rgba(51, 103, 145, 0.22)' },
  Redis: { icon: SiRedis, accent: '#dc382d', glow: 'rgba(220, 56, 45, 0.22)' },
  GitLab: { icon: SiGitlab, accent: '#fc6d26', glow: 'rgba(252, 109, 38, 0.22)' },
  Bitbucket: { icon: SiBitbucket, accent: '#2684ff', glow: 'rgba(38, 132, 255, 0.22)' },
  'Agile Development': { icon: FaCircleNodes, accent: '#c6a0f6', glow: 'rgba(198, 160, 246, 0.18)' },
  Debugging: { icon: FaBug, accent: '#f08bb5', glow: 'rgba(240, 139, 181, 0.2)' },
  'Jupyter Notebook': { icon: SiJupyter, accent: '#f37626', glow: 'rgba(243, 118, 38, 0.22)' },
  AWS: { icon: SiAmazon, accent: '#ff9900', glow: 'rgba(255, 153, 0, 0.22)' },
  'Google Cloud': { icon: SiGooglecloud, accent: '#4285f4', glow: 'rgba(66, 133, 244, 0.22)' },
  Kubernetes: { icon: SiKubernetes, accent: '#326ce5', glow: 'rgba(50, 108, 229, 0.22)' },
  'Serverless Architecture': { icon: FaCloud, accent: '#86c7ff', glow: 'rgba(134, 199, 255, 0.2)' },
  'CI/CD Pipelines': { icon: FaCircleNodes, accent: '#8ca6ff', glow: 'rgba(140, 166, 255, 0.2)' },
  Jenkins: { icon: SiJenkins, accent: '#d24939', glow: 'rgba(210, 73, 57, 0.22)' },
  'Github Actions': { icon: SiGithubactions, accent: '#2088ff', glow: 'rgba(32, 136, 255, 0.22)' },
  Docker: { icon: SiDocker, accent: '#2496ed', glow: 'rgba(36, 150, 237, 0.22)' },
  Jest: { icon: SiJest, accent: '#c21325', glow: 'rgba(194, 19, 37, 0.22)' },
  'integration testing': { icon: FaFlask, accent: '#f08bb5', glow: 'rgba(240, 139, 181, 0.2)' },
  'AI Models': { icon: FaRobot, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.2)' },
  'Deep Learning': { icon: FaRobot, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.2)' },
  'Generative Adversarial Networks (GAN)': { icon: FaCircleNodes, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.18)' },
  'Computer Vision': { icon: SiOpencv, accent: '#5fc3ff', glow: 'rgba(95, 195, 255, 0.22)' },
  'Feature Extraction': { icon: FaCircleNodes, accent: '#9dd15f', glow: 'rgba(157, 209, 95, 0.18)' },
  OpenCV: { icon: SiOpencv, accent: '#5fc3ff', glow: 'rgba(95, 195, 255, 0.22)' },
  TensorFlow: { icon: SiTensorflow, accent: '#ff8a00', glow: 'rgba(255, 138, 0, 0.22)' },
  Pytorch: { icon: SiPytorch, accent: '#ee4c2c', glow: 'rgba(238, 76, 44, 0.22)' },
  Keras: { icon: SiKeras, accent: '#d00000', glow: 'rgba(208, 0, 0, 0.2)' },
  'Scikit-learn': { icon: SiScikitlearn, accent: '#f7931e', glow: 'rgba(247, 147, 30, 0.22)' },
  NumPy: { icon: SiNumpy, accent: '#4dabcf', glow: 'rgba(77, 171, 207, 0.22)' },
  Pandas: { icon: SiPandas, accent: '#150458', glow: 'rgba(21, 4, 88, 0.22)' },
  Python: { icon: SiPython, accent: '#3776ab', glow: 'rgba(55, 118, 171, 0.22)' },
  'Mask R-CNN': { icon: FaCircleNodes, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.18)' },
  'Transfer Learning': { icon: FaCircleNodes, accent: '#8ca6ff', glow: 'rgba(140, 166, 255, 0.18)' },
  CNNs: { icon: FaCircleNodes, accent: '#d497ff', glow: 'rgba(212, 151, 255, 0.18)' },
};

const fallbackSkillVisual: SkillVisual = {
  icon: FaCircleNodes,
  accent: '#84cca4',
  glow: 'rgba(132, 204, 164, 0.18)',
};

const getSkillVisual = (skill: string, category: SkillCategory): SkillVisual => {
  return skillVisuals[skill] ?? categoryVisuals[category] ?? fallbackSkillVisual;
};

const SkillsSection: React.FC = () => {
  const categories = Object.keys(skills) as SkillCategory[];
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(categories[0]);

  const activeSkills = useMemo(() => skills[activeCategory] ?? [], [activeCategory]);
  const displayedSkills = useMemo(
    () => activeSkills.map((skill) => ({ skill, visual: getSkillVisual(skill, activeCategory) })),
    [activeCategory, activeSkills],
  );

  return (
    <section id="skills" className="py-24 text-center">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-[#d96b9d]">Checkpoint</p>
        <h2 className="mt-2 text-4xl font-extrabold text-[#483b5a]">Skills</h2>
       
      </div>

      <div className="grid gap-8 lg:grid-cols-1">
        

        <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-5 sm:p-6 text-left shadow-[0_10px_30px_rgba(234,180,200,0.06)]">

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              const visual = categoryVisuals[category];
              const CategoryIcon = visual.icon;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'border-transparent bg-[#fff2f7] text-[#483b5a] shadow-[0_0_20px_rgba(132,204,170,0.12)]'
                      : 'border-white/70 bg-white/60 text-[#6b5b72] hover:border-panda-bamboo/40 hover:bg-white/70'
                  }`}
                  style={isActive ? { boxShadow: `0 0 0 1px ${visual.glow}` } : undefined}
                >
                  <CategoryIcon style={{ color: isActive ? visual.accent : '#9ca3af' }} />
                  {categoryLabels[category]}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayedSkills.map(({ skill, visual }) => {
              const SkillIcon = visual.icon;

              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] px-4 py-3 shadow-[0_10px_30px_rgba(234,180,200,0.06)]"
                  style={{ boxShadow: `0 0 0 1px ${visual.glow}` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                      style={{ color: visual.accent, boxShadow: `inset 0 0 0 1px ${visual.glow}` }}
                    >
                      <SkillIcon className="text-[1.25rem]" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="truncate text-[0.95rem] font-bold text-[#483b5a] group-hover:text-[#5f4d7d]">{skill}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
