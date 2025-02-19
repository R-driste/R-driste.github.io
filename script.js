const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const independentButton = document.getElementById('independentButton');
const resultDiv = document.getElementById('result');
const processedImage = document.getElementById('processedImage');

let stream = null;
let isDetecting = false;

async function startDetection() {
    if (isDetecting) return;
    isDetecting = true;

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        console.log('Video stream started');
    } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('Error accessing the camera. Please check your permissions.');
        return;
    }

    // Start the detection loop
    detectTrash();
}

function stopDetection() {
    if (!isDetecting) return;
    isDetecting = false;

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        console.log('Video stream stopped');
    } else {
        console.log('No video stream to stop');
    }
}

async function detectTrash() {
    if (!isDetecting) return;

    // Capture a frame from the video
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    const base64Image = imageData.split(',')[1];

    // Make an AJAX request to the server to run the Python script
    try {
        const response = await fetch('/run-python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64Image })
        });
        const data = await response.json();
        processedImage.src = `data:image/jpeg;base64,${data.image}`;
    } catch (error) {
        console.error('Error processing the frame:', error);
    }

    // Call detectTrash() again to create a loop
    if (isDetecting) {
        requestAnimationFrame(detectTrash);
    } else {
        console.log('Detection loop stopped');
    }
}

async function startIndependentProcessing() {
    try {
        const response = await fetch('/start-independent');
        const message = await response.text();
        alert(message);
    } catch (error) {
        console.error('Error starting independent processing:', error);
        alert('Error starting independent processing.');
    }
}

startButton.addEventListener('click', startDetection);
stopButton.addEventListener('click', stopDetection);
independentButton.addEventListener('click', startIndependentProcessing);
