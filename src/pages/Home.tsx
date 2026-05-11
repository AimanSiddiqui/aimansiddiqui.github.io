import HeroSection from '../components/journey/HeroSection';
import ExperienceSection from '../components/journey/ExperienceSection';
import ExpertiseCarousel from '../components/journey/ExpertiseCarousel';
import EducationSection from '../components/journey/EducationSection';
import ProjectsSection from '../components/journey/ProjectsSection';
import ContactSection from '../components/journey/ContactSection';
import ProgressRoad from '../components/journey/ProgressRoad';
import SkillsSection from '../components/journey/SkillsSection';

const Home = () => {
  return (
    <div className="relative isolate overflow-x-hidden">
      <ProgressRoad />

      <main className="relative z-20 max-w-6xl mx-auto px-6">
        <HeroSection />
        <ExpertiseCarousel />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

    </div>
  );
};

export default Home;