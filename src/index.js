console.log("Webpack is working!")

console.log("Webpack is working!")

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.heigth = 200;
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'Assets/Background/BGBack.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'Assets/Background/BGFront.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'Assets/Background/CloudsBack.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'Assets/Background/CloudsFront.png';

let x = 0;
let y = 0;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer2, x, 0);
    if (x < -512){
        x = 512;
    } else {
        x-= gameSpeed;
    };
    requestAnimationFrame(animate);
};
animate();