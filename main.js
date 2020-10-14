/* Get random words and put inside an array */
const wordArr = [
  "concentrate",
  "private",
  "view",
  "news",
  "username",
  "algorithm",
  "employee",
  "worth",
  "cache",
  "email",
  "threshold",
  "fork",
  "captcha",
  "client",
  "systematic",
  "user",
  "virus",
  "help",
  "manage",
  "routine",
  "tradition",
  "dashboard",
  "host",
  "data",
  "application",
  "enter",
  "debug",
  "landscape",
  "file",
  "program",
  "graphics",
  "casualty",
  "install",
  "disappointment",
  "hacker",
  "publisher",
  "encrypt",
  "bandwidth",
  "firmware",
  "curtain",
  "picture",
  "apple",
  "single",
  "array",
  "javascript",
  "keyboard",
  "laptop",
  "contempt",
  "website",
  "programmer"
];

/* When start game, load all functions
Make sure to start with creating a canvas, .getContext 2d - MDN
And everything else that will be the start when load */

window.onload = (e) => {
  const canvas = document.getElementById("test-canvas");
  const ctx = canvas.getContext("2d");
  let innerWidth = 700,
  innerHeight = 600;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  let playBG = document.getElementById("audioBG").play();
  playBG.volume = 0.6;
  // let hitSound = new Audio ("./audio/misc/button-3.mp3") // pew pew

  // TODO Add background image? = done for now
  
  const gradient = document.querySelector("#test-canvas");
  const interval = window.setInterval(gradientShift, 20);

  class colourObj {
    constructor(red, green, blue, alpha) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
    }
  }

  let colour1 = new colourObj(145, 100, 130, 1);
  let colour2 = new colourObj(40, 90, 20, 1);
  let degree = 0;

  function gradientShift() {
    gradient.setAttribute(
      "style",
      `background: linear-gradient(${degree}deg, 
        rgba(${colour1.red}, 
          ${colour1.blue}, 
          ${colour1.green}, 
          ${colour1.alpha}), 
          rgba(${colour2.red}, 
            ${colour2.blue}, 
            ${colour2.green}, 
            ${colour2.alpha}))`
    );
    degree++;
    if (degree >= 360) {
      degree = 0;
    }
  }

  const position = canvas.width / 2;
  const container = document.querySelector(".container");

  // TODO Add reset button?

  let difficulty = 1;
  let y_value = -50;
  let projPost = canvas.height + 10; // aka missile
  let fall = 1;
  let fontSize = 30;
  let points = 0;
  let lives = 3;
  let projHit = false;

  /* Output random words section 
  using Math.random and Math.floor */

  function randomNumber() {
    const number = Math.floor(Math.random() * wordArr.length);
    return number;
  }
  /* Generates random words from array */

  let randomIndex = randomNumber();
  const wordInput = document.getElementById("word-input"); // type here

  /* Difficulty of levels when clicked 
  If there are more than one level, use loop function */

  document.querySelector(".button-container").addEventListener("click", (e) => {
     if (e.target.className === "difficulty-button" && "dafuq") {
      switch (e.target.id) {
        case "easy":
          difficulty = 1.5;
          break;
          // TODO add more diff level later
        case "medium":
          difficulty = 3;
          break;
        case "hard":
          difficulty = 6; // would this be difficult enough?
          break;
          case "dafuq":
          difficulty = 100; // THEY DED
          break;
          // TODO maybe add extreme level 
        default:
      }

      /* Removes the buttons after choosing a difficulty */

      container.removeChild(container.firstElementChild);
      draw();
      wordInput.focus(); //MDN
    }
  });


  /* Start with a function that loops a statement of lives
  when it is less to or equal to the value that has been set as default 
  After that fill the screen when set to 0; */

  function draw() {
    if (lives <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "60px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("Game Over", position, canvas.height / 2);
      return;
    }

    /* Add sound when correct here! */

    // function playHit(audio) {
    //   audio.play();
    // }
    /* user type in the word that is being display */

    let typeWord = wordInput.value.toLowerCase();
    ctx.clearRect(0, 0, 400, 400);
    movingBackground();
    wordFalls();
    score();
    lifeLine();
    if (typeWord === wordArr[randomIndex]) {
      projectile();
    }
    window.requestAnimationFrame(draw); // request animation frame mdn
  }

  /* SCORE POINTS */

  function score() {
    ctx.font = "40px Helvetica";
    ctx.fillStyle = "#FFC49B"; // change color?
    ctx.fillText(points, 30, 40);
  }

  /*  LIFE LINES
  Max amount is 3. Need to loop down to decrease health when "hit" */

  function lifeLine() {
    let rightMargin = 30;
    for (let i = lives; i > 0; i--) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("♥", canvas.width - rightMargin, canvas.height - 30);
      rightMargin = rightMargin + 30;
    }
  }

  // TODO Add timer?


  /* randomize words that would "fall down" */

  function wordFalls() {
    ctx.font = `${fontSize}px Arial`;
    // TODO ctx.shadowOffsetX - w3sch research
    ctx.shadowOffsetX = 2; // MDN - W3
    ctx.shadowOffsetY = 2; // MDN - W3
    ctx.shadowColor = "rgb(50, 50, 50, 1)";
    ctx.fillStyle = `rgba(255, 239, 211, ${fall}`;
    ctx.fillText(wordArr[randomIndex], position, y_value);
    ctx.textAlign = "center";
    y_value = y_value + difficulty;
    fontSize = fontSize + difficulty / 7;

    /* ... if did not "hit" words */
    if (fall <= 0) {
      projHit = false;
      fall = 1;
      y_value = -50;
      fontSize = 40;
      rgbValue = 150;
      randomIndex = randomNumber();

      /* ... if did hit "words" */
    } else if (projHit === true) {
      fontSize = fontSize + 0.9;
      fall = fall - 0.05;
      

      /* ... else keep generating words */
    } else if (y_value > canvas.height + fontSize) {
      randomIndex = randomNumber();
      y_value = -50;
      fontSize = 40;
      rgbValue = 150;
      lives--;
      wordInput.value = "";
    }
    return;
  }
  // TODO The missile - to research more
  function projectile() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(position, projPost);
    ctx.lineTo(position + 15, projPost + 35);
    ctx.lineTo(position - 15, projPost + 35);
    ctx.closePath();
    ctx.fill();
    projPost = projPost - 10;

    if (projPost < y_value) {
      projHit = true;
      projPost = 500;
      wordInput.value = "";
      points++;
      return;
    }
  }

  function movingBackground() {
    ctx.fillStyle = "#362e6b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

};





//   function myDarkMode() {
//   let element = document.body;
//   element.classList.toggle("dark-mode");
// }

// "#adb6c4"