
click = 0;
loop = false;
body = document.getElementsByTagName("body")[0];
createScoreBoard();
slevel = document.getElementById("scoreLevel");
slevel.innerText= 'Level: '+localStorage.getItem('level');

show_score = document.getElementById("score");
bullets = document.getElementById("bullets");
n_bullets = 20;
bullets.innerText = n_bullets;
e_audio = document.createElement("div");
body.appendChild(e_audio);
bala0 = document.querySelector(".bala0");
bala = document.querySelector(".bala");
size = 0;
t = localStorage.getItem("t");

function init(t) {
  // set configuration values
  var time = t;
  var winner = 15;
  bullets.innerText = 20;
  // change the background color

  body.style = "background-color:white;";
  // create and resize the target
  var img = new Image();
  // img.src = "http://aws.canequity.com/assets/images/target.png";
  img.src = "img/target.png";
  img.style.position = "absolute";
  body.appendChild(img);
  // move the target for the first time
  moveTarget();
  // move the target for the first time
  loop = setInterval(moveTarget, time);
  // crete the score board
  var score = 0;
  //var board = document.createTextNode(score + "/" + winner);
  // body.appendChild(board);
  // add click event to the target
  img.onclick = function() {
    // make a inpact sound
    img.src = "img/target.png";
    makeSound("audio/fire_bow");

    bala.style.left = "50%";
    bala.style.top = "50%";
    //  setTimeout(()=>bala.style.display="block",1500);
    bala0.style.display = "none";
    bala.style.display = "block";
    setTimeout(() => {
      bala.style.display = "none";
      bala0.style.display = "none";
    }, 1000);

    if (size < 50) {
      score = score + 2;
    } else {
      // add one to the score
      score = score + 1;
    }

    //board.nodeValue = score + "/" + winner;
    show_score.innerText = score;
    body.className = "animated shake";
    bala.style.display = "block";
    // check winning condition
    var victory = checkVictory();
    if (victory) return true;
    // move the target
    moveTarget();
    // make target go faster
    time = time - 100;
    clearInterval(loop);
    loop = setInterval(moveTarget, time);
  };

  //move the target to a random place
  function moveTarget() {
    // change the size of the target
    size = Math.floor(Math.random() * 100) + 20;
    size2 = Math.floor(Math.random() * 10) + 50;
    size3 = Math.floor(Math.random() * 5) + 70;
    // calculate the new position, do not let the image go offscreen on the right
    var posH = Math.random() * window.innerWidth - size;
    var posV = Math.random() * window.innerHeight - size;
    // do not let the image go offscreen on the left
    if (posH < 0) posH = 0;
    if (posV < 0) posV = 0;
    //bala.style.display = 'block';
    bala.style.top = 15 + posV + "px";
    bala.style.left = 15 + posH + "px";
    // position the image on screen
    img.style.width = size + "px";
    img.style.top = posV + "px";
    img.style.left = posH + "px";

  
  }
  // check if you won the game and display the message
  function checkVictory() {
    if (score >= winner) {
      // stop the game
      clearInterval(loop);
      // clear the image click event
      img.onclick = null;
      createMsj("Congratulation. You Won!");
      return true;
    }
  }
}
document.addEventListener(
  "click",
  () => {
    if (click > 20 || n_bullets == 0) {
      clearInterval(loop);
      createMsj("You has lost! Try Again");
      click = 0;
      return;
    }
    // Make a fly sound andd increment click
    makeSound("./audio/flyby");
    n_bullets--;
    bullets.innerText = n_bullets;
    click++;
    body.className = "fail";
    bala.style.display = "none";
  },
  true
);
function createMsj(msj) {
  var victoryMessage = document.createElement("div");
  /*  Better Window Victory */
  let newWindowVictory = `<div class="w-victory" id="n-w-v">
                           <h1> ${msj}</h1>
                           <br><br>
                           <button id="try-again">Play Again </button>
                          </div>`;
  //victoryMessage.appendChild(document.createTextNode("Congratulations. You Won!"));
  victoryMessage.innerHTML = newWindowVictory;
  victoryMessage.style.marginTop = "200px";
  victoryMessage.style.textAlign = "center";
  body.appendChild(victoryMessage);
  let trayAgain = document.querySelector("#try-again");
  trayAgain.addEventListener("click", () => {
    body.innerHTML = "";
    createScoreBoard();
    show_score = document.getElementById("score");
    bullets = document.getElementById("bullets");
    n_bullets = 20;
    bullets.innerText = n_bullets;
    bala0 = document.querySelector(".bala0");
    bala = document.querySelector(".bala");

    e_audio = document.createElement("div");
body.appendChild(e_audio);
    location.href="index.html";
  });
}
function makeSound(sound) {
  console.log ('Estoy sonando'+sound);
  e_audio.innerHTML = "";
  var audio = `<audio controls autoplay>
                        <source src="${sound}.waw" type="audio/waw">
                        <source src="${sound}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>`;
  e_audio.innerHTML = audio;
}
function createScoreBoard() {
  let scoreboard = `       
        <div class="table-score">
          <p id="scoreLevel" style="text-align: center; color: Black; font-size: 18px">Score <br><span style="color: white; font-size:12px;">Level</span></p>
          <div class="row score">
          <div class="col-2 item">Bullets</div>
          <div class="col-2 item" id="bullets"></div>
          </div>
          <div class="row score">
        <div class="col-2 item">Winner</div>
        <div class="col-2 item" id="score-fish">15</div>
        </div>
        <div class="row score">
        <div class="col-2 item">Score  </div>
        <div class="col-2 item" id="score">0</div>
        </div>
       
        </div>
        <div class="bala0"></div>
        <div class="bala"></div>
        </div>`;
  body.innerHTML = scoreboard;
}

if (t<2000){
    let i = 0;
    do {
        init(t);
     i++;
    }while (i>3);
}


window.addEventListener("load", init(t), true);
