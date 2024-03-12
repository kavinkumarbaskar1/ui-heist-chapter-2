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