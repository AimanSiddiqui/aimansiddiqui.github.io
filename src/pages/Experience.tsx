import { Box, Heading, VStack, Text } from '@chakra-ui/react';

const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Tech Solutions',
    period: '2023 - Present',
    description: 'Building responsive web apps with React and Chakra UI.'
  },
  {
    role: 'Intern',
    company: 'Startup Inc.',
    period: '2022',
    description: 'Worked on backend APIs and learned DevOps basics.'
  }
];

const Experience = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={6} textAlign="center">Experience</Heading>
    <VStack spacing={6} align="stretch">
      {experiences.map((exp, idx) => (
        <Box key={idx} p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="gray.50" _dark={{ bg: 'gray.800' }}>
          <Heading as="h2" size="md" mb={2}>{exp.role} @ {exp.company}</Heading>
          <Text fontWeight="bold" mb={2}>{exp.period}</Text>
          <Text>{exp.description}</Text>
        </Box>
      ))}
    </VStack>
  </Box>
);

export default Experience;
