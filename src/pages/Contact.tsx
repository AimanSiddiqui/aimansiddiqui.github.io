import { Box, Heading, Text, VStack, Input, Textarea, Button } from '@chakra-ui/react';

const Contact = () => (
  <Box py={10} px={4} maxW="container.sm" mx="auto">
    <Heading as="h1" mb={8} textAlign="center">Contact</Heading>
    <VStack spacing={4} align="stretch">
      <Input placeholder="Your Name" />
      <Input placeholder="Your Email" type="email" />
      <Textarea placeholder="Your Message" rows={5} />
      <Button colorScheme="blue">Send Message</Button>
    </VStack>
    <Text mt={8} textAlign="center">Or email: <a href="mailto:aiman.siddiqui@email.com">aiman.siddiqui@email.com</a></Text>
  </Box>
);

export default Contact;
