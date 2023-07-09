import levelsData from "/Assets/Levels/levels.json";
import Level from "/src/scripts/levels.js";
import InputHandler from "/src/scripts/input.js";
import Platform from "/src/scripts/platform.js";
import { distance } from "./util";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const idleImage = new Image();
idleImage.src = './Assets/Colour1/Outline/120x80_PNGSheets/_Idle.png';
// const crouchImage = new Image();
// crouchImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchFull.png';
// const crouchWalkImage = new Image();
// crouchWalkImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchWalk.png';
const runImage = new Image();
runImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Run.png';
const jumpImage = new Image();
jumpImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Jump.png';
// const turnAroundImage = new Image();
// turnAroundImage = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_TurnAround.png';

const spriteSheet = [idleImage, runImage, jumpImage];

const backgroundLayer1 = new Image();
backgroundLayer1.src = './Assets/Background/BGBack.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './Assets/Background/BGFront.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './Assets/Background/CloudsBack.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './Assets/Background/CloudsFront.png';

const input = new InputHandler();

let levels = [];
for (const data in levelsData) {
    const lev = levelsData[data];
    const platforms = [];
    lev.platforms.forEach(plat => {
        platforms.push(new Platform(plat.x, plat.y, plat.width, plat.height))       
    });
    levels.push(new Level(lev.name, platforms, lev.image)); 
};

export default class Game {
    constructor(player, levels, ctx, layers, input){
        this.player = player;
        this.levels = levels;
        this.input = input
        this.curLevel = levels[0];
        this.nextLevel = levels[1];
        this.ctx = ctx;
        this.layers = layers;
        this.lastTime = 0;
        this.randomLevels = levels.slice(1);
    };

    setNextLevel(){
        let levelSelector = Math.floor(Math.random() * 8);
        return this.randomLevels[levelSelector];
    };

    changeCurLevel(){
        this.curLevel = this.nextLevel;
        this.player.x = this.curLevel.startPoint[0];
        this.player.y = this.player.gameHeight - this.player.height - 64
        this.nextLevel = this.setNextLevel();
        return this.curLevel;
    };

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        const playerPos = [this.player.x, this.player.y];
        console.log(playerPos);
        if (distance(playerPos, this.curLevel.endPoint) <= 0) {
            this.changeCurLevel();
        }
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const layer of this.layers) {
          layer.draw(this.ctx);
        }
        this.curLevel.draw(this.ctx);
        this.curLevel.drawNext(this.ctx, this.nextLevel.background)
        this.player.draw(this.ctx);
        this.player.update(input, deltaTime, spriteSheet);
        requestAnimationFrame(this.animate.bind(this));
    }
}