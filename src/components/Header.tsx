import { Box, Container, Flex, IconButton, useColorMode, HStack, Link } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="header" py={4} bg={colorMode === 'light' ? 'gray.800' : 'gray.900'} color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <RouterLink to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
            Aiman Siddiqui
          </RouterLink>
          <HStack gap={4} align="center">
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</RouterLink>
            <RouterLink to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</RouterLink>
            <RouterLink to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</RouterLink>
            <RouterLink to="/skills-tools" style={{ color: 'white', textDecoration: 'none' }}>Skills &amp; Tools</RouterLink>
            <RouterLink to="/experience" style={{ color: 'white', textDecoration: 'none' }}>Experience</RouterLink>
            <RouterLink to="/education" style={{ color: 'white', textDecoration: 'none' }}>Education</RouterLink>
            <RouterLink to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</RouterLink>
            <RouterLink to="/stats" style={{ color: 'white', textDecoration: 'none' }}>Stats</RouterLink>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Resume</a>
            <Link href="https://github.com/aimansiddiqui" isExternal color="white" aria-label="GitHub"><FaGithub size={20} /></Link>
            <Link href="https://www.linkedin.com/in/aimansiddiqui" isExternal color="white" aria-label="LinkedIn"><FaLinkedin size={20} /></Link>
            <IconButton
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="whiteAlpha"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;