# Portfolio React Project (Vite)

This workspace contains a modular React project scaffolded with Vite that includes:

- React 18 with Vite build system
- Redux Toolkit for state management
- Light/Dark theme toggle (persisted to localStorage)
- Modular project structure:
  - `/src/app` - Redux store setup
  - `/src/components` - Reusable UI components
  - `/src/features` - Feature-specific components and logic
  - `/src/pages` - Page components

## Development

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── app/
│   │   └── store.js           # Redux store configuration
│   ├── components/
│   │   └── Layout.jsx         # Common layout wrapper
│   ├── features/
│   │   └── theme/
│   │       ├── ThemeToggle.jsx
│   │       └── themeSlice.js  # Theme state management
│   ├── pages/
│   │   └── Home.jsx          # Home page component
│   ├── App.jsx               # Root App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & theme vars
├── index.html
└── package.json
```

## Customization

The theme colors are defined in `src/index.css` using CSS variables. You can modify the colors for both light and dark themes by updating the `:root` and `:root[data-theme='dark']` variable sets.