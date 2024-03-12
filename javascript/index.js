const video = document.getElementById('video');
const startStopBtn = document.getElementById('startStopBtn');
let stream;

startStopBtn.addEventListener('click', function() {
  if (stream) {
    // Stop the video stream and update button text
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    startStopBtn.textContent = 'Start Webcam';
  } else {
    // Request access to the webcam and update button text
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(s) {
        stream = s;
        video.srcObject = stream;
        startStopBtn.textContent = 'Stop Webcam';
      })
      .catch(function(err) {
        console.error("An error occurred: ", err);
      });
  }
});
