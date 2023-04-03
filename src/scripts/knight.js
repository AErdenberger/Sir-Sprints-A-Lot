const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const idleImage = newImage();
idleImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Idle.png';
const crouchImage = newImage();
crouchImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchFull.png';
const crouchWalkImage = newImage();
crouchWalkImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchWalk.png'
const runImage = newImage();
runImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Run.png';
const jumpImage = newImage();
jumpImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Jump.png'
const turnAroundImage = newImage();
turnAroundImage = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_TurnAround.png'

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage,0,0);
    requestAnimationFrame(animate);
};

animate();