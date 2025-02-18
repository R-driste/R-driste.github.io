const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let stream = null;
let isDetecting = false;

async function startDetection() {
    if (isDetecting) return;
    isDetecting = true;

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Initialize OpenCV and YOLO here
    // ...existing code...

    // Start the detection loop
    detectTrash();
}

function stopDetection() {
    if (!isDetecting) return;
    isDetecting = false;

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    // Clean up OpenCV and YOLO resources here
    // ...existing code...
}

async function detectTrash() {
    if (!isDetecting) return;

    // Perform detection using OpenCV and YOLO
    // ...existing code...

    // Call detectTrash() again to create a loop
    requestAnimationFrame(detectTrash);
}

startButton.addEventListener('click', startDetection);
stopButton.addEventListener('click', stopDetection);
