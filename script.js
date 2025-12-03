window.onload = function() {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.pause();
}

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

interact('#notepad')
    .draggable({
        allowFrom: '.window-header',
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '#desktop',
                endOnly: false,
            }),
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
        },
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            move(event) {
                const target = event.target;
                let x = parseFloat(target.getAttribute('data-x')) || 0;
                let y = parseFloat(target.getAttribute('data-y')) || 0;

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrictSize({
                min: { width: 300, height: 200 }
            })
        ]
    });

    //shortcuts
const shortcuts = document.querySelectorAll('.shortcut');
shortcuts.forEach(shortcut => {
    shortcut.addEventListener('click', () => {
        const appId = shortcut.getAttribute('data-app');
        if (appId === 'notepad') {
            const notepad = document.getElementById('notepad');
            notepad.classList.remove('hidden');
        }
        if (appId === 'camera') {
            const camera = document.getElementById('camera');
            camera.classList.remove('hidden');
            startCamera();
        }
        if (appId === 'music') {
            const music = document.getElementById('music');
            music.classList.remove('hidden');
            if (plyrInstance) {
                plyrInstance.play();
            }
        }
        if (appId === 'calculator') {
            const calculator = document.getElementById('calculator');
            calculator.classList.remove('hidden');
        }
    });
});

const contextmenuItems = document.querySelectorAll('#rightClickMenu li');
contextmenuItems.forEach(item => {
    item.addEventListener('click', () => {
        const appId = item.getAttribute('data-app');
        if (appId === 'notepad') {
            const notepad = document.getElementById('notepad');
            notepad.classList.remove('hidden');
            document.getElementById('rightClickMenu').classList.add('hidden');
        } else if (appId === 'camera') {
            const camera = document.getElementById('camera');
            camera.classList.remove('hidden');
            document.getElementById('rightClickMenu').classList.add('hidden');
            startCamera();
        }
        else if (appId === 'music') {
            const music = document.getElementById('music');
            music.classList.remove('hidden');
            document.getElementById('rightClickMenu').classList.add('hidden');
            if (plyrInstance) {
                plyrInstance.play();
            }
        }
        else if (appId === 'calculator') {
            const calculator = document.getElementById('calculator');
            calculator.classList.remove('hidden');
            document.getElementById('rightClickMenu').classList.add('hidden');
        }
    });
});

const startMenuItems = document.querySelectorAll('#startMenu li');
startMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        const appId = item.getAttribute('data-app');
        if (appId === 'notepad') {
            const notepad = document.getElementById('notepad');
            notepad.classList.remove('hidden');
            document.getElementById('startMenu').classList.add('hidden');
        } else if (appId === 'camera') {
            const camera = document.getElementById('camera');
            camera.classList.remove('hidden');
            document.getElementById('startMenu').classList.add('hidden');
            startCamera();
        } else if (appId === 'music') {
            const music = document.getElementById('music');
            music.classList.remove('hidden');
            document.getElementById('startMenu').classList.add('hidden');
            if (plyrInstance) {
                plyrInstance.play();
            }
        } else if (appId === 'calculator') {
            const calculator = document.getElementById('calculator');
            calculator.classList.remove('hidden');
            document.getElementById('startMenu').classList.add('hidden');
        }
    });
});

const cameraVideoStream = document.getElementById('camera-stream');
function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            cameraVideoStream.srcObject = stream;
            cameraVideoStream.play();
        })
        .catch(function(err) {
            console.log("Camera error: " + err);
            Swal.fire({
                icon: 'error',
                title: 'Camera Access Denied',
                text: 'Unable to access camera. Please allow camera permissions.'
            });
        });
    }
}

function stopCamera() {
    const stream = cameraVideoStream.srcObject;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        cameraVideoStream.srcObject = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const camera = document.getElementById('camera');
    const closeButton = camera.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        camera.classList.add('hidden');
        stopCamera();
    });
});

interact('#camera')
    .draggable({
        allowFrom: '.window-header',
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '#desktop',
                endOnly: false,
            }),
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
        },
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            move(event) {
                const target = event.target;
                let x = parseFloat(target.getAttribute('data-x')) || 0;
                let y = parseFloat(target.getAttribute('data-y')) || 0;

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrictSize({
                min: { width: 300, height: 200 }
            })
        ]
    });

    document.addEventListener('DOMContentLoaded', () => {
    const camera = document.getElementById('camera');
    const closeButton = camera.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        camera.classList.add('hidden');
        stopCamera();
    });
});

let plyrInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        plyrInstance = new Plyr(audioPlayer, {
            controls: ['play', 'mute', 'volume'],
        });
    }

    const music = document.getElementById('music');
    const closeButton = music.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        music.classList.add('hidden');
        if (plyrInstance) {
            plyrInstance.pause();
        }
    });
});

interact('#music')
    .draggable({
        allowFrom: '.window-header',
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '#desktop',
                endOnly: false,
            }),
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
        },
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            move(event) {
                const target = event.target;
                let x = parseFloat(target.getAttribute('data-x')) || 0;
                let y = parseFloat(target.getAttribute('data-y')) || 0;

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrictSize({
                min: { width: 300, height: 200 }
            })
        ]
    });

// managing the top window

let topZindex = 10;
document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('#notepad, #camera, #music, #calculator');
    windows.forEach(windows => {
        windows.addEventListener('mousedown', () => {
            topZindex++;
            windows.style.zIndex = topZindex;
        });
    }
    )
});

interact('#calculator')
    .draggable({
        allowFrom: '.window-header',
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '#desktop',
                endOnly: false,
            }),
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
        },
    })
    .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            move(event) {
                const target = event.target;
                let x = parseFloat(target.getAttribute('data-x')) || 0;
                let y = parseFloat(target.getAttribute('data-y')) || 0;

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrictSize({
                min: { width: 300, height: 200 }
            })
        ]
    });

    document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.getElementById('calculator');
    const closeButton = calculator.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        calculator.classList.add('hidden');
    }); 
});

//calculator

let display = document.getElementById('display');
let buttons = Array.from(document.querySelectorAll('.calc-btn'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '←':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case '=':
                try {
                    display.innerText = Function('"use strict"; return (' + display.innerText + ')')();
                } catch {
                    display.innerText = "Error";
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});