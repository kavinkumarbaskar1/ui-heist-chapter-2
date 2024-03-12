// var totalTime = ;
// var interval = ;
/**
 * Functions to handle car fuel
 */
const reduceFuel = () => {
  timerFn = setInterval(() => {
    carRunTime += FUEL_DECREASE_INTERVAL;
    const progress = (1 - carRunTime / FUEL_RUN_TIME) * 100;
    let progressColor;
    if (progress > 60) {
      progressColor = "#4caf50";
    } else if (progress > 20) {
      progressColor = "#f59639";
    } else {
      progressColor = "#ff0000";
    }
    fuelBar.css({ "background-color": progressColor, width: `${progress}%` });

    if (carRunTime == FUEL_RUN_TIME) {
      clearInterval(timerFn);
      fuelBar.css("width", "0%");
    }
  }, FUEL_DECREASE_INTERVAL);
};

const refillFuel = () => {
  clearInterval(timerFn);
  carRunTime = 0;
  fuelBar.css({ "background-color": "#4caf50", width: `100%` });
  reduceFuel();
};
