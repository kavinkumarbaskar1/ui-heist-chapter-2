//API KEY FOR TEMPERATURE CHECK
const apiKey = "482514842de2a52a6aa2fa8c6ec8aee9";
const CITY = "Chennai";

//LAYOUTS
const startScreen = $(".game-start-content");
const gameScreen = $(".game-on-content");

//ELEMENTS
const video = $("#backCamera");
const speedWarning = $("#speedWarning");
const dashboardTime = $("#dashboardTime");
const dashboardTemperature = $("#dashboardTemrature");

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

/**
 * Functions to handle car speed
 */
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

/**
 * Function to handle button actions
 */
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

/**
 * Function to handle button keydown actions
 */
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

/**
 * Function to handle button keyup actions
 */
const btnKeyUpActions = {
  a: () => {
    decreaseFn = setInterval(() => {
      decreaseSpeed();
    }, 100);
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
  if (btnKeyDownActions[KEY]) btnKeyDownActions[KEY]();
});

//functions to handle keyup events
$(document).on("keyup", function (event) {
  const KEY = event.key.toLowerCase();
  if (KEY in getButtons) getButtons[KEY].removeClass("active-icon");
  if (btnKeyUpActions[KEY]) btnKeyUpActions[KEY]();
});

/**
 * Function to fetch and update time for each minute
 */
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours() % 12 || 12; // 12-hour format with leading zero
  const minutes = now.getMinutes().toString().padStart(2, "0"); // 2-digit minutes with leading zero
  const period = now.getHours() >= 12 ? "PM" : "AM";
  dashboardTime.text(`${hours}:${minutes} ${period}`);
};

/**
 * Function to fetch and update temperature for each minute
 */
const fetchTemperature = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status}`);
    }
    const weatherData = await response.json();
    const tempInKelvin = weatherData.main.temp;
    const tempInCelsius = tempInKelvin - 273.15;

    dashboardTemperature.text(`${tempInCelsius.toFixed(1)} °C`)
  } catch (error) {
    console.error("Error:", error);
  }finally{
    // Schedule the next update after 1 minute (60 seconds)
    setTimeout(fetchTemperature, ONE_MINUTE);
  }
};

// Initial call
updateTime();
fetchTemperature();

// Update every minute for time to update in dashboard
setInterval(updateTime, ONE_MINUTE);
