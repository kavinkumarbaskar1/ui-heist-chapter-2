/**
 * Function to handle button actions
 */
const btnActions = {
  s: () => {
    if (!isGameOn) {
      // Add keyPressed == "s" && after completing code
      gameModifier();
      reduceFuel();
      isGameOn = true;
    }
  },
  e: () => {
    if (isGameOn) {
      gameModifier();
      clearInterval(timerFn);
      isGameOn = false;
    }
  },
  m: () => {
    if (isGameOn) {
      volumeBtn.find("i").toggleClass("d-none");
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
    if (fuel > 0) {
      clearInterval(decreaseFn);
      increaseSpeed();
    }
  },
  b: () => {
    decreaseSpeed();
  },
  r: () => {
    refillFuel();
  },
  arrowleft: () => {
    clockwiseRotate();
  },
  arrowright: () => {
    anticlockwiseRotate();
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
    }, 100);
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
