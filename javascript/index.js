//API KEY FOR TEMPERATURE CHECK
const apiKey = "482514842de2a52a6aa2fa8c6ec8aee9";
const CITY = "Chennai";

//LAYOUTS
const startScreen = $(".game-start-content");
const gameScreen = $(".game-on-content");

//ELEMENTS
const video = document.getElementById("backCamera");
const speedWarning = $("#speedWarning");
const dashboardTime = $("#dashboardTime");
const dashboardTemperature = $("#dashboardTemrature");
const carSteeringWheel = $("#carSteeringWheel");

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

//CONSTANTS
const ONE_MINUTE = 60000;

let stream;
let keyPressed = "";
let isGameOn = false;
let isCameraOn = false;
let fuel = 60;
let speed = 0;
let decreaseFn;

/**
 * Function to toggle startscreen and gamescreen
 */
const gameModifier = () => {
  startScreen.toggleClass("d-none");
  gameScreen.toggleClass("d-none");
};

// Initial call
updateTime();
// fetchTemperature();

// Update every minute for time to update in dashboard
setInterval(updateTime, ONE_MINUTE);
