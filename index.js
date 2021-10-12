
var canvas = document.getElementById("cassebrique");
var ctx = canvas.getContext("2d");

  document.querySelector(".startbutton").onclick = function () {
  // masquer divgeneral
  document.querySelector(".divgeneral").style.display = "none";

  // reveler canvas quand j'appuie sur le boutton
  document.querySelector("#cassebrique").style.display = "block";
} 


const width = 110; // coordonnées largeur
const heigth = 30; // coordonnées de hauteur

let plateformX = 665

let briques = [
  [1, 0, 1, 1, 1, 1, 1, 0], // 1ere 
  [],
  [],
  []
]

function draw() {

  // effacer tout le canvas

  ctx.clearRect(0,0,1400,700)

  // tout redessiner: les briques + la plateforme + les balles toute les 16ms


  for(let i = 0; i< 8; i++) {
    ctx.beginPath();
    ctx.rect(110 + i*150, 50, width, heigth);
    ctx.createLinearGradient=(25, 25, 100, 25);
    ctx.fillStyle="#6C0277";
    ctx.fill();
    ctx.closePath();
  }

  for(let i = 0; i< 7; i++) {
    ctx.beginPath();
    ctx.rect(180 + i*150, 100, width, heigth);
    ctx.fillStyle = "#8B008B";
    ctx.fill();
    ctx.closePath();
  }

  for(let i = 0; i< 8; i++) {
    ctx.beginPath();
    ctx.rect(110 + i*150, 150, width, heigth);
    ctx.fillStyle = "#A10684";
    ctx.fill();
    ctx.closePath();
  }

  for(let i = 0; i< 7; i++) {
    ctx.beginPath();
    ctx.rect(180 + i*150, 200, width, heigth);
    ctx.fillStyle = "#BD33A4";
    ctx.fill();
    ctx.closePath();
  }

  // dessin de la plateforme 
  ctx.beginPath();
  ctx.rect(plateformX, 650, 130, 20);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();

}

setInterval(draw, 16);

// Par défaut faux puisque les touches ne sont pas enfoncées

//Lorsque l'événement keydown est déclenché par une touche de clavier enfoncée, la fonction keyDownTouch() est exécutée.

document.addEventListener("keydown", keyDownTouch, false);
document.addEventListener("keyup", keyUpTouch, false);


function keyDownTouch(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      plateformX += 30;

  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
  }
}

function keyUpTouch(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      plateformX = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

// Dessiner la balle

function drawBall() {

  ctx.beginPath();
  ctx.arc(700, 500, 13, 0, Math.PI*2);
  ctx.fillStyle = "#4120b2";
  ctx.fill();
  ctx.closePath();
  }

drawBall();


// Dessiner les briques à l'aide d'un tableau

/* const brickLine = 4; // Nombre de lignes
const brickColumn = 8; // Nombre de colonnes
const brickWidth = 110;
const brickHeight = 33;
const brickPadding = 15;
const brickOffsetTop = 70;
const brickOffsetLeft = 200;

// Création du tableau

const bricks = [];
  for(let c=0; c<brickColumn; c++) {
    bricks[c] = [];
  for(let l=0; l<brickLine; l++) {
      bricks[c][l] = { x: 0, y: 0 };
    }
}

function drawBricks() {
  for(let c=0; c<brickColumn; c++) {
      for(let l=0; l<brickLine; l++) {
          const brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          const brickY = (l*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][l].x = brickX;
          bricks[c][l].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "purple";
          ctx.fill();
          ctx.closePath();
      }
  }
}
*/






