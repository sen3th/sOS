function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    if (timeElement) {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeFormatted = now.toLocaleTimeString(undefined, options);
        timeElement.textContent = timeFormatted;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-menu');
    const startMenu = document.getElementById('startMenu');

    if (startButton && startMenu) {
        startButton.addEventListener('click', () => {
            startMenu.classList.toggle('hidden');
        });
    }
});

document.addEventListener('click', (event) => {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('start-menu');

    if (startMenu && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.add('hidden');
    }
});