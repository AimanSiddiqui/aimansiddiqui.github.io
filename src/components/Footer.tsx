import { Box, Container, Text, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" py={4} bg="gray.800" color="white">
      <Container maxW="container.xl">
        <VStack>
          <Text>&copy; {new Date().getFullYear()} Aiman Siddiqui. All rights reserved.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;