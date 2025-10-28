import { Box, Heading, SimpleGrid, Tag } from '@chakra-ui/react';

const skills = [
  'React', 'TypeScript', 'Chakra UI', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Git', 'Docker', 'CI/CD', 'Jest', 'HTML', 'CSS', 'JavaScript'
];

const SkillsTools = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={6} textAlign="center">Skills &amp; Tools</Heading>
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      {skills.map((skill) => (
        <Tag key={skill} size="lg" colorScheme="blue" variant="subtle" justifyContent="center">{skill}</Tag>
      ))}
    </SimpleGrid>
  </Box>
);

export default SkillsTools;
