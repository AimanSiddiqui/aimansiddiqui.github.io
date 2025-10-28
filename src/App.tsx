import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import SkillsTools from './pages/SkillsTools';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Stats from './pages/Stats';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills-tools" element={<SkillsTools />} />
            <Route path="experience" element={<Experience />} />
            <Route path="education" element={<Education />} />
            <Route path="contact" element={<Contact />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
