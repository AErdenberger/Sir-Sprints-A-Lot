import levelsData from "../Assets/Levels/levels.json";
import Level from "../src/scripts/levels.js";
import Layer from "../src/scripts/background.js";
import Player from "./scripts/knight";
import InputHandler from "./scripts/input.js";
import Platform from "./scripts/platform.js"

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const idleImage = new Image();
idleImage.src = 'Assets/Colour1/Outline/120x80_PNGSheets/_Idle.png';
const crouchImage = new Image();
crouchImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchFull.png';
const crouchWalkImage = new Image();
crouchWalkImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchWalk.png';
const runImage = new Image();
runImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Run.png';
const jumpImage = new Image();
jumpImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Jump.png';
// const turnAroundImage = new Image();
// turnAroundImage = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_TurnAround.png';

const spriteSheet = [idleImage, crouchImage, crouchWalkImage, runImage, jumpImage];

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'Assets/Background/BGBack.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'Assets/Background/BGFront.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'Assets/Background/CloudsBack.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'Assets/Background/CloudsFront.png';

const layer1 = new Layer(backgroundLayer1, 1, testPlayer.speed);
const layer2 = new Layer(backgroundLayer2, 1, testPlayer.speed);
const layer3 = new Layer(backgroundLayer3, 0.5, testPlayer.speed);
const layer4 = new Layer(backgroundLayer4, 0.5, testPlayer.speed);

const allLayers = [layer3, layer4, layer1, layer2];

const input = new InputHandler();
const testPlayer = new Player(canvas.width, canvas.height);

let levels = [];
for (const data in levelsData) {
    console.log(data);
    const lev = levelsData[data];
    const platforms = [];
    lev.platforms.forEach(plat => {
        platforms.push(new Platform(plat.x, plat.y, plat.width, plat.height))       
    });
    levels.push(new Level(lev.name, platforms, lev.image)); 
};




class Game {
    constructor(player, levels){
        this.player = player;
        this.levels = levels;
        this.curLevel = levels[0];
    };

    setNextLevel(){
        let levelSelector = Math.floor(Math.random() * 8);
        this.nextLevel = levels.slice(1)[levelSelector];
    };

    // changeCurLevel(){
    //     if (this.curLevel.x === cu)
    // }
}