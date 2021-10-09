
var canvas = document.getElementById("cassebrique");
var ctx = canvas.getContext("2d");

  document.querySelector(".startbutton").onclick = function () {
  // masquer divgeneral
  document.querySelector(".divgeneral").style.display = "none";

  // reveler canvas
  document.querySelector("#cassebrique").style.display = "block";
} 

// Dessiner les briques 

ctx.beginPath();
ctx.rect(30, 50, 110, 30);
ctx.fillStyle = "purple";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(100, 100, 110, 30);
ctx.fillStyle = "purple";
ctx.fill();
ctx.closePath();


// Dessiner la balle

function draw() {

    ctx.beginPath();
    ctx.arc(500, 200, 18, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    }

draw();

// Animer la balle 

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;

function clearBall() {
    ctx.clearRect(0, 0, 500, 200); 
  }