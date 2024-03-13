/**
 * Function to control the speed of video
 */
const videoSpeedHandler = (speed) => {
  if (speed == 0) {
    backgroundVideo[0].pause();
  } else {
    backgroundVideo[0].play();
  }
  let playBackSpeed;
  if (speed <= 40) {
    playBackSpeed = 0.5;
  } else if (speed <= 100) {
    playBackSpeed = 1;
  } else if (speed <= 150) {
    playBackSpeed = 2;
  } else if (speed <= 200) {
    playBackSpeed = 3;
  } else if (speed <= 280) {
    playBackSpeed = 4;
  }
  backgroundVideo[0].playbackRate = playBackSpeed;
};

/**
 * Function to handle position of video
 */
const videoPositionHandler = (direction) => {
  const POSITION = parseInt(backgroundVideo.css("left")) || 0;
  if (speed == 0) return;
  if (direction == "left" && POSITION < -250) {
    backgroundVideo.css("left", `${POSITION + 50}px`);
  } else if (direction == "right" && POSITION > -1250) {
    backgroundVideo.css("left", `${POSITION - 50}px`);
  }
};
