//alert("game script imported")

let c = document.getElementById("countdown");
let countdownTimer = 3;
let myinterval;
let hiScore;

function opencountdown() {
  myinterval = setInterval(countdown, 1000);
  document.getElementById("box").style.visibility = "hidden";
  document.getElementById("box").style.display = "none";
  document.getElementById("countdown").style.visibility = "visible";
}

function countdown() {
  countdownTimer--;
  c.textContent = countdownTimer;
  if (countdownTimer === 0) {
    clearInterval(myinterval);
    opengame();
  }
}

function opengame() {
  makeblack();
  makeblack();
  makeblack();
  document.getElementById("mainpage").style.visibility = "hidden";
  document.getElementById("mainpage").style.display = "none";
  document.getElementById("countdown").style.visibility = "hidden";
  document.getElementById("game").style.visibility = "visible";
  document.getElementById("game").style.display = "flex";
  document.getElementById("tap").style.visibility = "visible";

  hiScore = localStorage.getItem("highScore");
  if (hiScore === null) {
    localStorage.setItem("highScore", 0);
    hiScore = localStorage.getItem("highScore");
  }
  document.getElementById("highsc").textContent = hiScore;
}

let score = 0;
let maxbar = 10;
let barInterval;
let bartime = maxbar;
let gameloop;
//-----------------------------------------------
function startGame() {
  let maxwidth = parseInt(document.getElementById("darkblue").offsetWidth);
  document.getElementById("tap").style.opacity = 0;
  gameloop = setInterval(timer, 1000);
  score = 0;

  barInterval = setInterval(function () {
    if (bartime === 0) bartime = 0;
    else bartime--;
    document.getElementById("lightblue").style.width =
      (bartime / maxbar) * maxwidth + "px";
  }, 100);
}

//-----------------------------------------------
const cells = document.querySelectorAll("#tb td");

function makeblack() {
  let randindx = Math.floor(Math.random() * cells.length);

  while (cells[randindx].classList.contains("clickable"))
    randindx = Math.floor(Math.random() * cells.length);

  cells[randindx].classList.add("clickable");
}
cells.forEach((el) => {
  el.addEventListener("click", function () {
    checkclickable(el);
  });
});

function checkclickable(cell) {
  if (cell.classList.contains("clickable")) {
    if (score == 0) startGame();
    makeblack();
    cell.classList.remove("clickable");
    addScore(cell);
  }
}

//-------------------------------------------------

function addScore(cell) {
  score += bartime;
  document.getElementById("score").textContent = score;
  cell.textContent = "+" + bartime;
  bartime = maxbar;
}

//-------------------------------------------------

let time = parseInt(document.getElementById("time").textContent);
function timer() {
  if (time !== 0) {
    time--;
    document.getElementById("time").textContent = time;
  }
  if (time === 0) {
    document.getElementById("f5").style.visibility = "visible";
    document.getElementById("f5").style.opacity = 1;

    if (parseInt(hiScore) < score) newHighScore();
    else timeisup();

    removeAllBlack();
    clearInterval(gameloop);
  }
  console.log(time);
}

//---------------------------------------------------------------
function timeisup() {
  document.getElementById("timeisup").style.visibility = "visible";
  document.getElementById("timeisup").textContent = "Time is up";
  document.getElementById("timeisup").style.opacity = 1;
}

function newHighScore() {
  hiScore = score;
  document.getElementById("highsc").textContent = hiScore;
  localStorage.setItem("highScore", hiScore);

  document.getElementById("timeisup").style.visibility = "visible";
  document.getElementById("timeisup").textContent = "New High Score!";
  document.getElementById("timeisup").style.opacity = 1;

  confetti();
  setTimeout(() => {
    confetti.reset();
  }, 3000);
}

function removeAllBlack() {
  cells.forEach((el) => {
    el.style.backgroundColor = "black";
    el.classList.remove("clickable");
  });
}
