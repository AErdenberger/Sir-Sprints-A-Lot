import levelsData from "/Assets/Levels/levels.json";
import Level from "/src/scripts/levels.js";
import Layer from "/src/scripts/background.js";
import Player from "/src/scripts/knight";
import InputHandler from "/src/scripts/input.js";
import Platform from "/src/scripts/platform.js";

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


const allLayers = [layer3, layer4, layer1, layer2];

const input = new InputHandler();
const testPlayer = new Player(canvas.width, canvas.height);

const layer1 = new Layer(backgroundLayer1, 1, testPlayer.speed);
const layer2 = new Layer(backgroundLayer2, 1, testPlayer.speed);
const layer3 = new Layer(backgroundLayer3, 0.5, testPlayer.speed);
const layer4 = new Layer(backgroundLayer4, 0.5, testPlayer.speed);

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

export default class Game {
    constructor(player, levels, ctx, layers){
        this.player = player;
        this.levels = levels;
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
        this.setNextLevel();
        this.curLevel = this.nextLevel;
    };

    draw(ctx) {
        // Calculate the x-position of the player relative to the canvas center
        const playerXPosRelativeToCenter = this.player.x - CANVAS_WIDTH/2;
        
        // Check if the player has moved past the center of the canvas
        if (playerXPosRelativeToCenter > 0) {
          // Move the player to the center of the canvas
          this.player.x = CANVAS_WIDTH/2;
          
          // Move the platforms and background layers to simulate scrolling
          const scrollDistance = playerXPosRelativeToCenter;
          for (const platform of this.curLevel.platforms) {
            platform.x -= scrollDistance;
          }
          for (const layer of this.layers) {
            layer.move(scrollDistance);
          }
          
          // Check if the current level has been completely scrolled off the screen
          if (this.curLevel.platforms[0].x + this.curLevel.platforms[0].width < 0) {
            // If so, change to the next level and reset its position
            this.nextLevel = this.setNextLevel;
            this.changeCurLevel();
          }
        }
        
        // Render the player and the current level
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.player.draw(this.ctx);
        this.curLevel.draw(this.ctx);
        
        // Render the background layers
        for (const layer of this.layers) {
          layer.draw();
        }
    };


    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        // this.nextLevel = this.setNextLevel();
        
        // Calculate the x-position of the player relative to the canvas center
        const playerXPosRelativeToCenter = this.player.x - CANVAS_WIDTH/2;
        
        // Check if the player has moved past the center of the canvas
        if (playerXPosRelativeToCenter > 0) {
          // Move the player to the center of the canvas
          this.player.x = CANVAS_WIDTH/2;
          
          // Move the platforms and background layers to simulate scrolling
          const scrollDistance = playerXPosRelativeToCenter;
          for (const platform of this.curLevel.platforms) {
            platform.x -= scrollDistance;
          }
          for (const layer of this.layers) {
            layer.move(scrollDistance);
          }
          
          // Check if the current level has been completely scrolled off the screen
          if (this.curLevel.platforms[0].x + this.curLevel.platforms[0].width < 0) {
            // If so, change to the next level and reset its position
            this.changeCurLevel();
          }
        }
        
        // Clear the canvas
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Render the background layers
        for (const layer of this.layers) {
          layer.draw(this.ctx);
        }
        
        // Render the current level
        this.curLevel.draw(this.ctx);
        
        // Render the player
        this.player.draw(this.ctx);
        
        // Update the player and current level
        this.player.update(input, deltaTime, spriteSheet);
        this.curLevel.update(input);
        
        requestAnimationFrame(this.animate.bind(this));
    }
}