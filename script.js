let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0; 

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score-display"); // Get the high score display element

//High Score
document.addEventListener("DOMContentLoaded", () => {
  // Get high score from localStorage when the page loads
  const storedHighScore = localStorage.getItem("simonHighScore");
  if (storedHighScore) {
    highScore = parseInt(storedHighScore); // Convert string back to number
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  } else {
    highScoreDisplay.innerText = `High Score: 0`; // Default if nothing is stored
  }
});


// document.addEventListener("keypress", function () {
//   if (started == false) {
//     console.log("game is started");
//     started = true;
//     levelUp();
//   }
// });
let startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function () {
  if (!started) {
    console.log("Game is started via button");
    started = true;
    startBtn.style.display = "none";
    document.querySelector("body").style.backgroundColor = "#2c5364"; // Reset to normal
    level = 0;
    gameSeq = [];
    userSeq = [];
    levelUp();
  }
});




function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

 //4 buttons
  let randIdx = Math.floor(Math.random() * 4); 
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
  //check high score
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore.toString());
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Start to play again.`;
   


    document.querySelector("body").style.background = "red";


    setTimeout(function () {
      reset(); // reset game variables
      document.querySelector("body").style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
      document.querySelector("body").style.animation = "gradientBG 15s ease infinite";
    }, 500);
  }
}



function btnPress() {
    
    if (!started) return;

    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) { 
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.style.display = "inline-block"; // show the Start button again 
// Rules 
let rulesBtn = document.getElementById("rules-btn");
let rulesPopup = document.getElementById("rules-popup");
let closeRulesBtn = document.getElementById("close-rules-btn");

rulesBtn.addEventListener("click", function() {
  rulesPopup.style.display = "block";
});

closeRulesBtn.addEventListener("click", function() {
  rulesPopup.style.display = "none";
});


