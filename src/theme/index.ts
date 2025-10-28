import { extendTheme } from '@chakra-ui/react';
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#E5F2FF',
    100: '#B8D9FF',
    200: '#8ABFFF',
    300: '#5CA6FF',
    400: '#2E8CFF',
    500: '#0073FF', // Primary brand color
    600: '#005CCC',
    700: '#004499',
    800: '#002D66',
    900: '#001733',
  },
  accent: {
    50: '#FFE5F2',
    100: '#FFB8D9',
    200: '#FF8ABF',
    300: '#FF5CA6',
    400: '#FF2E8C',
    500: '#FF0073', // Accent color
    600: '#CC005C',
    700: '#990044',
    800: '#66002D',
    900: '#330017',
  },
};

const fonts = {
  heading: "'Inter', sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
        _active: {
          bg: 'brand.700',
        },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
      ghost: {
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      letterSpacing: '-0.02em',
    },
  },
  Text: {
    baseStyle: {
      color: 'gray.700',
      _dark: {
        color: 'gray.200',
      },
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.500',
      _hover: {
        textDecoration: 'none',
        color: 'brand.600',
      },
    },
  },
};

const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    body: {
      bg: props.colorMode === 'light' ? 'white' : 'gray.900',
      color: props.colorMode === 'light' ? 'gray.900' : 'white',
    },
  }),
};

// Use extendTheme from @chakra-ui/react to create a valid theme object for ChakraProvider
export const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
});