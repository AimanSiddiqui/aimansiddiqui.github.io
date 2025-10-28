import { Box, Container, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import ProjectCard from "../ProjectCard";
import type { ProjectCardProps } from "../ProjectCard";

// Sample project data - replace with your actual projects
const projects: ProjectCardProps[] = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React, TypeScript, and Chakra UI. Features responsive design and dark mode support.",
    imageUrl: "/project-1.jpg",
    technologies: [
      { name: "React", color: "blue" },
      { name: "TypeScript", color: "blue" },
      { name: "Chakra UI", color: "teal" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/portfolio"
  },
  {
    title: "Task Management App",
    description: "A modern task management application with real-time collaboration features and intuitive UI.",
    imageUrl: "/project-2.jpg",
    technologies: [
      { name: "Next.js", color: "gray" },
      { name: "Prisma", color: "purple" },
      { name: "tRPC", color: "pink" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/task-manager"
  },
  {
    title: "E-commerce Dashboard",
    description: "Admin dashboard for e-commerce platforms with analytics, inventory management, and order processing.",
    imageUrl: "/project-3.jpg",
    technologies: [
      { name: "Vue.js", color: "green" },
      { name: "Node.js", color: "green" },
      { name: "MongoDB", color: "green" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/ecommerce-dashboard"
  },
  {
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts and interactive weather maps.",
    imageUrl: "/project-4.jpg",
    technologies: [
      { name: "React", color: "blue" },
      { name: "Redux", color: "purple" },
      { name: "OpenWeather API", color: "orange" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/weather-app"
  },
  {
    title: "Social Media Analytics",
    description: "Analytics platform for social media managers with AI-powered insights and automated reporting.",
    imageUrl: "/project-5.jpg",
    technologies: [
      { name: "Python", color: "yellow" },
      { name: "FastAPI", color: "green" },
      { name: "TensorFlow", color: "orange" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/social-analytics"
  },
  {
    title: "Code Snippet Manager",
    description: "Developer tool for organizing and sharing code snippets with syntax highlighting and tags.",
    imageUrl: "/project-6.jpg",
    technologies: [
      { name: "React", color: "blue" },
      { name: "GraphQL", color: "pink" },
      { name: "PostgreSQL", color: "blue" }
    ],
    projectUrl: "https://github.com/aimansiddiqui/snippet-manager"
  }
];

const ProjectsSection = () => {
  return (
    <Box
      as="section"
      py={20}
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Container maxW="container.xl">
        <Box mb={12} textAlign="center">
          <Heading
            as="h2"
            size="2xl"
            mb={4}
            color="gray.700"
            _dark={{ color: "white" }}
          >
            Featured Projects
          </Heading>
          <Text
            fontSize="lg"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="container.md"
            mx="auto"
          >
            Here are some of the projects I've worked on. Each project represents
            a unique challenge and showcases different aspects of my skills.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={8}
          marginTop={8}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProjectsSection;