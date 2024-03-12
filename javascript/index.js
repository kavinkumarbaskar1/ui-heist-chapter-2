//LAYOUTS
const startScreen = $(".game-start-content");
const gameScreen = $(".game-on-content");
const video = document.getElementById("backCameraPanel");
const speedWarning = $("#speedWarning");

//BUTTONS
const startBtn = $("#startBtn");
const stopBtn = $("#stopBtn");
const acceleratorBtn = $("#acceleratorBtn");
const brakeBtn = $("#brakeBtn");
const volumeBtn = $("#volumeBtn");
const fuelBtn = $("#fuelBtn");
const leftBtn = $("#leftBtn");
const rightBtn = $("#rightBtn");
const cameraBtn = $("#cameraBtn");
const getButtons = {
  a: acceleratorBtn,
  b: brakeBtn,
  r: fuelBtn,
  m: volumeBtn,
  arrowleft: leftBtn,
  arrowright: rightBtn,
};

//DYNAMIC VALUES
const speedValue = $("#speed");
const fuelValue = $("#fuel");

let stream;
let keyPressed = "";
let isGameOn = false;
let isCameraOn = false;
let fuel = 60;
let speed = 0;
let decreaseFn;

//panel functions
const gameModifier = () => {
  startScreen.toggleClass("d-none");
  gameScreen.toggleClass("d-none");
};

//speed functions
const increaseSpeed = () => {
  if (speed <= 40) {
    speed += 1;
  } else if (speed < 140) {
    speed += 3;
  } else if (speed < 280) {
    speed += 5;
  } else {
    speed = 280;
  }
  if (speed >= 80) {
    speedWarning.removeClass("d-none");
  }
  speedValue.text(speed);
};

const decreaseSpeed = () => {
  if (speed >= 100) {
    speed -= 5;
  } else if (speed >= 30) {
    speed -= 3;
  } else if (speed > 1) {
    speed -= 1;
  } else {
    speed = 0;
  }
  if (speed < 80) {
    speedWarning.addClass("d-none");
  }
  speedValue.text(speed);
};

//button actions on keypress
const btnActions = {
  s: () => {
    if (!isGameOn) {
      // Add keyPressed == "s" && after completing code
      gameModifier();
      isGameOn = true;
    }
  },
  e: () => {
    if (isGameOn) {
      gameModifier();
      isGameOn = false;
    }
  },
  m: () => {
    volumeBtn.find("i").toggleClass("d-none");
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

//button actions on keydown
const btnKeyDownActions = {
  a: () => {
    clearInterval(decreaseFn);
    increaseSpeed();
    isDecreasing = false;
  },
  b: () => {
    decreaseSpeed();
  },
};

// button actions on keyup
const btnKeyUpActions = {
  a: () => {
    decreaseFn = setInterval(() => {
      decreaseSpeed();
    }, 100);
  },
};

$(document).on("keypress", function (event) {
  const KEY = event.key.toLowerCase();
  console.log(event.key);
  if (btnActions[KEY]) btnActions[KEY]();
  keyPressed = KEY;
});

$(document).on("keydown", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].addClass("active-icon");
  if (btnKeyDownActions[KEY]) btnKeyDownActions[KEY]();
});

$(document).on("keyup", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].removeClass("active-icon");
  if (btnKeyUpActions[KEY]) btnKeyUpActions[KEY]();
});
