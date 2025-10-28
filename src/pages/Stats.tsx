import { Box, Heading, Text } from '@chakra-ui/react';

const Stats = () => (
  <Box py={10} px={4} maxW="container.md" mx="auto">
    <Heading as="h1" mb={6} textAlign="center">Stats</Heading>
    <Text textAlign="center">GitHub stats and other activity can be shown here.</Text>
  </Box>
);

export default Stats;
