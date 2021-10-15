
var canvas = document.getElementById("cassebrique");
var ctx = canvas.getContext("2d");

const projectiles = [];

document.querySelector(".startbutton").onclick = function () {
  
  // masquer divgeneral
  document.querySelector(".divgeneral").style.display = "none";

  // reveler canvas quand j'appuie sur le boutton
  document.querySelector("#cassebrique").style.display = "block";
} 



const width = 110; // coordonnées largeur
const heigth = 30; // coordonnées de hauteur

let plateformX = 665; // coordonée x de la plateforme
let plateformY = 650; // coordonée y de la plateforme
let plateformWidth = 150; // largeur de la plateforme
let plateformHeigth = 20; // hauteur de la plateforme

let diametreBall = 13;
let Ballx = 700; // coordonnée x de la balle
let Bally = 650; // coordonnée y de la balle

let dx = 3; // mouvement de la balle sur l'axe des x
let dy = -3; // mouvement de la balle  sur l'axe des y 

class Brique {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, width, heigth);
    ctx.createLinearGradient=(25, 25, 100, 25);
    ctx.fillStyle="#6C0277";
    ctx.fill();
    ctx.closePath();
  }
}

let briques = [
  [new Brique(110,50), new Brique(250,50), new Brique(390,50), new Brique(530,50), new Brique(670,50), new Brique(810,50), new Brique(950,50), new Brique(1090,50)], // 1ere ligne
  [new Brique(150,100), new Brique(290,100), new Brique(430,100), new Brique(570,100), new Brique(710,100), new Brique(850,100), new Brique(990,100)], // 2ème ligne
  [new Brique(110,150), new Brique(250,150), new Brique(390,150), new Brique(530,150), new Brique(670,150), new Brique(810,150), new Brique(950,150), new Brique(1090,150)], // 3ème ligne 
  [new Brique(150,200), new Brique(290,200), new Brique(430,200), new Brique(570,200), new Brique(710,200), new Brique(850,200), new Brique(990,200)], // 4ème ligne

] 


// Faire que la raquette ne sorte pas du CANVAS


// quand j'appuie sur touche espace, projectile
// tableau de projectile, chaque projectile est un objet avec x, y

class Projectile {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillStyle="black";
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  moveUp() {
    this.y -= 5;
  }
}


function draw() {

  // effacer tout le canvas

  ctx.clearRect(0,0,1400,700)

  // tout redessiner: les briques + la plateforme + les balles toutes les 16ms


  for(let i = 0; i< briques[0].length; i++) {
    briques[0][i].draw();
  }

  for(let i = 0; i< briques[1].length; i++) {
    briques[1][i].draw();
    /*ctx.beginPath();
    ctx.rect(180 + i*150, 100, width, heigth);
    ctx.fillStyle = "#8B008B";
    ctx.fill();
    ctx.closePath(); */
  }

  for(let i = 0; i< briques[2].length; i++) {
    briques[2][i].draw();
    /*ctx.beginPath();
    ctx.rect(110 + i*150, 150, width, heigth);
    ctx.fillStyle = "#A10684";
    ctx.fill();
    ctx.closePath(); */
  }

  for(let i = 0; i< briques[3].length; i++) {
    briques[3][i].draw();
    /*ctx.beginPath();
    ctx.rect(180 + i*150, 200, width, heigth);
    ctx.fillStyle = "#BD33A4";
    ctx.fill();
    ctx.closePath();*/
  }

  // Dessin de la plateforme 
  ctx.beginPath();
  ctx.rect(plateformX, plateformY, plateformWidth, plateformHeigth);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();

  // Dessiner la balle

  /*ctx.beginPath();
  ctx.arc(Ballx, Bally, diametreBall, 0, Math.PI*2);
  ctx.fillStyle = "#4120b2";
  ctx.fill();
  ctx.closePath();
  //Ballx += dx;
  //Bally += dy; */

  // Tracer les projectiles

  projectiles.forEach(function(el){
    el.draw();
    el.moveUp();
  })
  
// Faire rebondir la balle pour ne pas qu'elle sorte du CANVAS

 /* // Si la valeur x de la position de la balle est inférieure à zéro, on change la direction.
 if (Ballx + dx < 0) {
  dx = -dx;
}

// Si la position en x de la balle est supérieure à la largeur du canvas, on inverse encore la vitesse de la balle.
if(Ballx + dx > canvas.width) {
  dx = -dx;
}

// Si la valeur y de la position de la balle < 0, on change la direction.
if(Bally + dy < 0) {
  dy = -dy;
}

// Si la position de y est > à la hauteur du canvas, on inverse la direction.
if(Bally + dy > canvas.height) {
    dy = -dy;
} */
}

setInterval(draw, 16);

// Par défaut --> faux puisque les touches ne sont pas enfoncées
//Lorsque l'événement keydown est déclenché par une touche de clavier enfoncée, la fonction keyDownTouch() est exécutée.

document.addEventListener("keydown", keyDownTouch, false);
document.addEventListener("keyup", keyUpTouch, false);

// Lorsque j'appuie sur les touches droites et gauches du clavier, la plateforme se déplace à une vitesse de 30

function keyDownTouch(e) {
  if(e.key === "Right" || e.key === "ArrowRight") {
      plateformX += 40;
}
  else if(e.key === "Left" || e.key === "ArrowLeft") {
      plateformX -= 40;
  }
  if(e.key === " ") { 
    console.log("coucou");
    const p1 =  new Projectile(plateformX + plateformWidth/2, plateformY - 20, 20, 20) // {x: 250, y: 300, width: 50, height:50}
    p1.draw()
    console.log(p1);
    projectiles.push(p1);
  }

}

// Lorsque je relâche les touches droites et gauches il ne doit rien se passer

function keyUpTouch(e) {
  if(e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
  }
}


