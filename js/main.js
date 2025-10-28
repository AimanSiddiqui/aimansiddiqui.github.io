// Module imports
import { initHeader } from './modules/header.js';
import { initMain } from './modules/main.js';
import { initFooter } from './modules/footer.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMain();
    initFooter();
});