import { Box, Container, Heading, Text, VStack, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  message: ""
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email address.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm(initialState);
    }
  };

  return (
    <Box as="section" py={20} bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="container.sm">
        <VStack gap={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h2" size="2xl" mb={4} color="gray.700" _dark={{ color: "white" }}>
              Contact Me
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
              Feel free to reach out for collaborations or just a friendly hello!
            </Text>
          </Box>
          <Box>
            <form onSubmit={handleSubmit} noValidate>
              <VStack gap={6} align="stretch">
                <Box>
                  <Text fontWeight="semibold" mb={1}>Name</Text>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    isRequired
                  />
                  {errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={1}>Email</Text>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    isRequired
                  />
                  {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={1}>Message</Text>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    isRequired
                  />
                  {errors.message && <Text color="red.500" fontSize="sm">{errors.message}</Text>}
                </Box>
                <Button type="submit" colorScheme="teal" size="lg" w="full">
                  Send Message
                </Button>
                {submitted && (
                  <Text color="teal.500" fontWeight="semibold" textAlign="center">
                    Thank you for reaching out! I'll get back to you soon.
                  </Text>
                )}
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactSection;
