async function stopBrowserCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    console.log("Browser camera stopped");
}

stopBrowserCamera();
