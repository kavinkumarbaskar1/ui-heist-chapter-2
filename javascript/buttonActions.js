/**
 * Function to handle button actions
 */
const btnActions = {
  s: () => {
    if (fuel !== 0 && !engineStart) {
      engineStart = true;
      carEngineStartAudio.play();
      setTimeout(() => {
        carEngineRunningAudio.play();
      }, 5000);
      reduceFuel();
    }
    if (!isGameOn) {
      // Add keyPressed == "s" && after completing code
      gameModifier();
      isGameOn = true;
    }
  },
  e: () => {
    if (isGameOn) {
      gameModifier();
      clearInterval(timerFn);
      isGameOn = false;
      engineStart = false;
      carEngineStartAudio.currentTime = carEngineStartAudio.duration;
      carEngineRunningAudio.pause();
    }
  },
  c: () => {
    isCameraOn = !isCameraOn;
    cameraBtn.toggleClass("active-icon");
    if (stream) {
      // Stop the video stream and update button text
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    } else {
      // Request access to the webcam and update button text
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (s) {
          stream = s;
          video.srcObject = stream;
        })
        .catch(function (err) {
          console.error("An error occurred: ", err);
        });
    }
  },
};

/**
 * Function to handle button keydown actions
 */
const btnKeyDownActions = {
  a: () => {
    if (fuel > 0 && engineStart) {
      clearInterval(decreaseFn);
      increaseSpeed();
      if (engineStart) {
        carEngineGearShitAudio.play();
      }
    }
  },
  b: () => {
    decreaseSpeed();
    if (speed > 0) {
      carEngineBrakeAudio.play();
    } else {
      carEngineBrakeAudio.currentTime = carEngineBrakeAudio.duration;
    }
  },
  r: () => {
    refillFuel();
  },
  h: () => {
    if (isGameOn) {
      carHornAudio.play();
    }
  },
  arrowleft: () => {
    clockwiseRotate();
    videoPositionHandler("left");
  },
  arrowright: () => {
    anticlockwiseRotate();
    videoPositionHandler("right");
  },
};

/**
 * Function to handle button keyup actions
 */
const btnKeyUpActions = {
  a: () => {
    clearInterval(decreaseFn);
    decreaseFn = setInterval(() => {
      decreaseSpeed();
      if (speed == 0) {
        clearInterval(decreaseFn);
      }
    }, 100);
    carEngineGearShitAudio.pause();
  },
  b: () => {
    carEngineBrakeAudio.currentTime = carEngineBrakeAudio.duration;
  },
  h: () => {
    if (isGameOn) {
      carHornAudio.pause();
    }
  },
  arrowleft: () => {
    anticlockwiseRotate();
  },
  arrowright: () => {
    clockwiseRotate();
  },
};

//function to handle keypress events
$(document).on("keypress", function (event) {
  const KEY = event.key.toLowerCase();
  console.log(event.key);
  if (btnActions[KEY]) btnActions[KEY]();
  keyPressed = KEY;
});

//function to handle keydown events
$(document).on("keydown", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].addClass("active-icon");
  if (isGameOn && btnKeyDownActions[KEY]) btnKeyDownActions[KEY]();
});

//functions to handle keyup events
$(document).on("keyup", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].removeClass("active-icon");
  if (isGameOn && btnKeyUpActions[KEY]) btnKeyUpActions[KEY]();
});
