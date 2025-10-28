import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      bg="white"
      _dark={{ bg: "gray.800" }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Flex direction="column" gap={6}>
          <Text
            color="primary.500"
            fontWeight="semibold"
            fontSize="lg"
          >
            Hi, I'm
          </Text>
          <Heading
            size="2xl"
            fontWeight="bold"
            color="gray.700"
            _dark={{ color: "gray.100" }}
          >
            Aiman Siddiqui
          </Heading>
          <Heading
            size="xl"
            color="gray.500"
            _dark={{ color: "gray.400" }}
          >
            Full Stack Developer
          </Heading>
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.300" }}
            maxW="600px"
          >
            I build exceptional and accessible digital experiences for the web.
            Focused on creating intuitive and performant applications that solve
            real-world problems.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
