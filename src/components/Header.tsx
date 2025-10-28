import { Box, Container, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box as="header" py={4} bg="gray.800" color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <RouterLink to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
            Aiman Siddiqui
          </RouterLink>
          <Flex gap={6}>
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</RouterLink>
            <RouterLink to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</RouterLink>
            <RouterLink to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</RouterLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;