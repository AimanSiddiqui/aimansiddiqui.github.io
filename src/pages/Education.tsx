import { Box, Heading, VStack, Text } from '@chakra-ui/react';

const education = [
  {
    degree: 'B.Sc. Computer Science',
    school: 'University of Tech',
    period: '2019 - 2023',
    description: 'Focused on software engineering and web development.'
  }
];

const Education = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={6} textAlign="center">Education</Heading>
    <VStack spacing={6} align="stretch">
      {education.map((edu, idx) => (
        <Box key={idx} p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="gray.50" _dark={{ bg: 'gray.800' }}>
          <Heading as="h2" size="md" mb={2}>{edu.degree}</Heading>
          <Text fontWeight="bold" mb={2}>{edu.school} ({edu.period})</Text>
          <Text>{edu.description}</Text>
        </Box>
      ))}
    </VStack>
  </Box>
);

export default Education;
