import { Container, Heading, Text, Stack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Stack direction="column" gap={6} alignItems="flex-start">
        <Heading as="h1" size="2xl">
          Hi, I'm Aiman Siddiqui
        </Heading>
        <Text fontSize="xl">
          Welcome to my portfolio website. I'm a passionate developer focused on building amazing web experiences.
        </Text>
      </Stack>
    </Container>
  );
};

export default Home;