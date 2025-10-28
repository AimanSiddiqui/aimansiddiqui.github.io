import { 
  Box,
  Heading,
  Text,
  Image,
  Badge,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

interface Technology {
  name: string;
  color: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: Technology[];
  projectUrl: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  technologies,
  projectUrl,
}: ProjectCardProps) => {
  return (
    <LinkBox 
      as="article"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      _dark={{ bg: "gray.800" }}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "lg",
      }}
    >
      <Box position="relative" h="200px">
        <Image
          src={imageUrl}
          alt={title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      <Box p={6}>
        <LinkOverlay href={projectUrl} target="_blank">
          <Heading
            size="md"
            mb={2}
            color="gray.700"
            _dark={{ color: "white" }}
          >
            {title}
          </Heading>
        </LinkOverlay>
        <Text
          color="gray.600"
          _dark={{ color: "gray.400" }}
          mb={4}
          height="3em"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {description}
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              colorScheme={tech.color}
              variant="subtle"
            >
              {tech.name}
            </Badge>
          ))}
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default ProjectCard;