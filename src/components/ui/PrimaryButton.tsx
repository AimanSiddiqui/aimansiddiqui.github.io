import { Button, ButtonProps } from '@chakra-ui/react';

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <Button
      bg="blue.500"
      color="white"
      _hover={{ bg: 'blue.600' }}
      _active={{ bg: 'blue.700' }}
      borderRadius="full"
      px={8}
      {...props}
    >
      {children}
    </Button>
  );
};