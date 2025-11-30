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

document.getElementById('desktop').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    const startMenu = document.getElementById('rightClickMenu');
    if (startMenu) {
        startMenu.classList.add('hidden');
    }

    startMenu.style.top = `${e.clientY}px`;
    startMenu.style.left = `${e.clientX}px`;
    startMenu.classList.remove('hidden');
})

document.addEventListener('click', (event) => {
    const startMenu = document.getElementById('rightClickMenu');
    const startButton = document.getElementById('rightClickMenu');

    if (startMenu && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const closeButton = notepad.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        notepad.classList.add('hidden');
    });
});

interact('#notepad').draggable({
    allowFrom: '.window-header',
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: '#desktop',
            endOnly: false
        })
    ],
    listeners: {
        move(event) {
            const target = event.target;
            const X = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const Y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            target.style.transform = `translate(${X}px, ${Y}px)`;
            target.setAttribute('data-x', X);
            target.setAttribute('data-y', Y);
        }
    }
});

const shortcuts = document.querySelectorAll('.shortcut');
shortcuts.forEach(shortcut => {
    shortcut.addEventListener('click', () => {
        const appId = shortcut.getAttribute('data-app');
        if (appId === 'notepad') {
            const notepad = document.getElementById('notepad');
            notepad.classList.remove('hidden');
        }
    });
});