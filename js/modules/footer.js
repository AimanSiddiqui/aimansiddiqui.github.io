export function initFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} Aiman Siddiqui. All rights reserved.</p>
        <div class="social-links">
            <a href="https://github.com/AimanSiddiqui" target="_blank">GitHub</a>
        </div>
    `;
}