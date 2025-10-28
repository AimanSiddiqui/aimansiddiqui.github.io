import { Box, Container, Heading } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import { useRef } from 'react';
import { useAnimateOnScroll } from '../../hooks';

interface SectionProps extends BoxProps {
  title?: string;
  children: React.ReactNode;
  id?: string;
}

export const Section = ({ title, children, id, ...props }: SectionProps) => {
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  useAnimateOnScroll(sectionRef);

  return (
    <Box
      as="section"
      py={{ base: 8, md: 16 }}
      ref={sectionRef}
      opacity={0}
      transform="translateY(20px)"
      transition="all 0.6s ease-out"
      className="animate-fade-in"
      id={id}
      {...props}
    >
      <Container maxW="container.xl">
        {title && (
          <Heading
            as="h2"
            size="2xl"
            mb={{ base: 6, md: 10 }}
            textAlign="center"
          >
            {title}
          </Heading>
        )}
        {children}
      </Container>
    </Box>
  );
};