//LAYOUTS
const startScreen = $(".game-start-content");
const gameScreen = $(".game-on-content");

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

let keyPressed = "";
let isGameOn = false;
let isCameraOn = false;

const gameModifier = () => {
  startScreen.toggleClass("d-none");
  gameScreen.toggleClass("d-none");
};

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
  },
};

const getButtons = {
  a: acceleratorBtn,
  b: brakeBtn,
  r: fuelBtn,
  m: volumeBtn,
  arrowleft: leftBtn,
  arrowright: rightBtn,
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
});

$(document).on("keyup", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].removeClass("active-icon");
});
