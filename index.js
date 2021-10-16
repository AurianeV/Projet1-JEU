
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
const height = 30; // coordonnées de hauteur

let plateformX = 665; // coordonée x de la plateforme
let plateformY = 660; // coordonée y de la plateforme
let plateformWidth = 150; // largeur de la plateforme
let plateformHeigth = 23; // hauteur de la plateforme

let diametreBall = 13;
let Ballx = 700; // coordonnée x de la balle
let Bally = 650; // coordonnée y de la balle


class Component {
  constructor(){
    this.on = true;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
 
  crashWith(comp) {
    // this / comp
    return (
      this.bottom() > comp.top() &&
      this.top() < comp.bottom() &&
      this.right() > comp.left() &&
      this.left() < comp.right()
    );
  }
}



class Brique extends Component{
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.createLinearGradient=(25, 25, 100, 25);
    ctx.fillStyle="#6C0277";
    ctx.fill();
    ctx.closePath();
  }
}

// projectiles[0].crashWith(briques[0][0])

let briques = [
  [new Brique(140,50), new Brique(287,50), new Brique(430,50), new Brique(570,50), new Brique(710,50), new Brique(850,50), new Brique(990,50), new Brique(1130,50)], // 1ere ligne
  [new Brique(205,100), new Brique(353,100), new Brique(495,100), new Brique(635,100), new Brique(775,100), new Brique(915,100), new Brique(1055,100)], // 2ème ligne
  [new Brique(140,150), new Brique(287,150), new Brique(430,150), new Brique(570,150), new Brique(710,150), new Brique(850,150), new Brique(990,150), new Brique(1130,150)], // 3ème ligne 
  [new Brique(205,200), new Brique(353,200), new Brique(495,200), new Brique(635,200), new Brique(775,200), new Brique(915,200), new Brique(1055,200)], // 4ème ligne

] 

// quand j'appuie sur touche espace, un projectile apparaît
// tableau de projectile, chaque projectile est un objet avec x, y

class Projectile extends Component{
  constructor(x, y, width, height) {
    super();
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

  for (let k = 0; k < briques.length; k++) {
    for(let i = 0; i< briques[k].length; i++) {
      if (briques[k][i].on === true) {
        briques[k][i].draw();
      }
      
    }
    
  }

  

  

  // Dessin de la plateforme 
  ctx.beginPath();
  ctx.rect(plateformX, plateformY, plateformWidth, plateformHeigth);
  ctx.fillStyle = "rgb(21, 96, 189)";
  ctx.fill();
  ctx.closePath();

  // Tracer les projectiles

  projectiles.forEach(function(el){
    el.draw();
    el.moveUp();
  })
  
  // collisions
  // Pour chaque projectile, regarder si il est en collision avec une des briques
  // si oui, on efface le projectile et la brique du tableau projectile et brique
  // boucle, crashwidth


  // pour chq projectile
  for (let i=0;i<projectiles.length;i++){
    // pour chaque ligne
    for (let k = 0; k < briques.length; k++) {
      // pour chaque brique de chaque ligne
      for(let j=0; j<briques[k].length;j++) {
        if (projectiles[i].crashWith(briques[k][j])) {
          briques[k][j].on = false;
        }
      }
    }
    
  }

  // qd toutes les briques ont la propriete on --> false

  let sum = 0
  for (let k = 0; k < briques.length; k++) {
    // pour chq ligne
    for(let j=0; j<briques[k].length;j++) {
      // compte le nombre de brique dans la propriété on est false
      // si j'ai 30 briques  dont la propriété est à false c'est gagné
      if(briques[k][j].on === false){
        sum ++;
      }
    }
  }
  // si sum = 30, alors j'ai gagné
  if(sum===30){
    return alert("YOU ARE THE BEST");
  }
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
    const p1 =  new Projectile(plateformX + plateformWidth/2, plateformY - 20, 20, 20) // {x: 250, y: 300, width: 50, height:50}
    p1.draw();
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


