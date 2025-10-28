import { Box, Container, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box as="header" py={4} bg="gray.800" color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
            Aiman Siddiqui
          </Link>
          <Flex gap={6}>
            <Link as={RouterLink} to="/">Home</Link>
            <Link as={RouterLink} to="/projects">Projects</Link>
            <Link as={RouterLink} to="/contact">Contact</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;