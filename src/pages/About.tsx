import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const About = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={6} textAlign="center">About Me</Heading>
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg">
        Hi, I'm Aiman Siddiqui, a passionate developer focused on building modern, user-centric web applications. I enjoy working with React, Chakra UI, and other cutting-edge technologies to deliver high-quality solutions.
      </Text>
      <Text>
        I love solving problems, learning new things, and collaborating with others. My goal is to create impactful software that makes a difference.
      </Text>
    </VStack>
  </Box>
);

export default About;
