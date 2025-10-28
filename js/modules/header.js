export function initHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
        <nav>
            <h1>Aiman Siddiqui</h1>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    `;
}