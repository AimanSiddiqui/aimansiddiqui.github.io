import { Box, Container, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
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
          <Flex gap={6} align="center">
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</RouterLink>
            <RouterLink to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</RouterLink>
            <RouterLink to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</RouterLink>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Resume</a>
            <IconButton
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="whiteAlpha"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;