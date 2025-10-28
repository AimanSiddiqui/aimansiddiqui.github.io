import { 
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Icon,
  useBreakpointValue
} from "@chakra-ui/react";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"]
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "Docker", "AWS", "CI/CD", "RESTful APIs", "GraphQL"]
  },
  {
    category: "UI/UX",
    items: ["Figma", "Adobe XD", "Responsive Design", "Material-UI", "Chakra UI"]
  }
];

const AboutSection = () => {
  const columnCount = useBreakpointValue({ base: 1, md: 2 });

  return (
    <Box
      as="section"
      py={20}
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <Container maxW="container.xl">
        <VStack gap={16} align="stretch">
          {/* Introduction */}
          <Box>
            <Heading
              as="h2"
              size="2xl"
              mb={6}
              color="gray.700"
              _dark={{ color: "white" }}
            >
              About Me
            </Heading>
            <Text
              fontSize="xl"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              lineHeight="tall"
            >
              I'm a passionate Full Stack Developer with a strong focus on creating
              intuitive and performant web applications. With several years of
              experience in both frontend and backend development, I enjoy tackling
              complex problems and turning them into simple, beautiful solutions.
            </Text>
          </Box>

          {/* Experience */}
          <Box>
            <Heading
              as="h3"
              size="lg"
              mb={6}
              color="gray.700"
              _dark={{ color: "white" }}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaLaptopCode} mr={4} />
              Experience
            </Heading>
            <VStack gap={4} align="stretch">
              <Box p={6} bg="gray.50" _dark={{ bg: "gray.700" }} borderRadius="lg">
                <Heading size="md" mb={2}>Senior Full Stack Developer</Heading>
                <Text color="gray.600" _dark={{ color: "gray.400" }}>2020 - Present</Text>
                <Text mt={2}>
                  Leading development of enterprise web applications, mentoring junior
                  developers, and implementing best practices for scalable architecture.
                </Text>
              </Box>
              <Box p={6} bg="gray.50" _dark={{ bg: "gray.700" }} borderRadius="lg">
                <Heading size="md" mb={2}>Frontend Developer</Heading>
                <Text color="gray.600" _dark={{ color: "gray.400" }}>2018 - 2020</Text>
                <Text mt={2}>
                  Developed responsive web applications using React and Vue.js,
                  collaborating with design teams to create engaging user experiences.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Education */}
          <Box>
            <Heading
              as="h3"
              size="lg"
              mb={6}
              color="gray.700"
              _dark={{ color: "white" }}
              display="flex"
              alignItems="center"
            >
              <Icon as={FaGraduationCap} mr={4} />
              Education
            </Heading>
            <Box p={6} bg="gray.50" _dark={{ bg: "gray.700" }} borderRadius="lg">
              <Heading size="md" mb={2}>Bachelor of Science in Computer Science</Heading>
              <Text color="gray.600" _dark={{ color: "gray.400" }}>2014 - 2018</Text>
              <Text mt={2}>
                University Name
              </Text>
            </Box>
          </Box>

          {/* Skills */}
          <Box>
            <Heading
              as="h3"
              size="lg"
              mb={6}
              color="gray.700"
              _dark={{ color: "white" }}
            >
              Skills & Technologies
            </Heading>
            <SimpleGrid columns={columnCount} gap={8}>
              {skills.map((skillGroup, index) => (
                <Box key={index}>
                  <Heading
                    size="md"
                    mb={4}
                    color="gray.600"
                    _dark={{ color: "gray.300" }}
                  >
                    {skillGroup.category}
                  </Heading>
                  <HStack flexWrap="wrap" gap={2}>
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        colorScheme="teal"
                        variant="subtle"
                        p={2}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutSection;