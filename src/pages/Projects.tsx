import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const projects = [
  { title: 'Portfolio Website', description: 'Personal portfolio built with React and Chakra UI.' },
  { title: 'Blog Platform', description: 'A simple blog platform with markdown support.' },
  // Add more projects here
];

const Projects = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={8} textAlign="center">Projects</Heading>
    <VStack spacing={6} align="stretch">
      {projects.map((project, idx) => (
        <Box key={idx} p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="gray.50" _dark={{ bg: 'gray.800' }}>
          <Heading as="h2" size="md" mb={2}>{project.title}</Heading>
          <Text>{project.description}</Text>
        </Box>
      ))}
    </VStack>
  </Box>
);

export default Projects;
