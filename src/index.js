import levelsData from "/Assets/Levels/levels.json";
import Level from "/src/scripts/levels.js";
import Layer from "/src/scripts/background.js";
import Player from "/src/scripts/knight.js";
import InputHandler from "/src/scripts/input.js";
import Platform from "/src/scripts/platform.js";
import Game from "/src/scripts/game.js";
import { distance, flipHorizontally } from "./scripts/util.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;

    const idleImage = new Image();
    idleImage.src = './Assets/Colour1/Outline/120x80_PNGSheets/_Idle.png';
    const crouchImage = new Image();
    crouchImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchFull.png';
    const crouchWalkImage = new Image();
    crouchWalkImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_CrouchWalk.png';
    const runImage = new Image();
    runImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Run.png';
    const jumpImage = new Image();
    jumpImage.src = './Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Jump.png';
    // const turnAroundImage = new Image();
    // turnAroundImage = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_TurnAround.png';

    const spriteSheet = [idleImage, crouchImage, crouchWalkImage, runImage, jumpImage];

    const backgroundLayer1 = new Image();
    backgroundLayer1.src = './Assets/Background/BGBack.png';
    const backgroundLayer2 = new Image();
    backgroundLayer2.src = './Assets/Background/BGFront.png';
    const backgroundLayer3 = new Image();
    backgroundLayer3.src = './Assets/Background/CloudsBack.png';
    const backgroundLayer4 = new Image();
    backgroundLayer4.src = './Assets/Background/CloudsFront.png';

    
    
    const input = new InputHandler();
    const testPlayer = new Player(canvas.width, canvas.height);
    let levels = [];
    for (const data in levelsData) {
        const lev = levelsData[data];
        const platforms = [];
        lev.platforms.forEach(plat => {
            platforms.push(new Platform(plat.x, plat.y, plat.width, plat.height))       
        });
        levels.push(new Level(lev.name, platforms, lev.image));
        
    };

    const layer1 = new Layer(backgroundLayer1, 1, testPlayer.speed);
    const layer2 = new Layer(backgroundLayer2, 1, testPlayer.speed);
    const layer3 = new Layer(backgroundLayer3, 0.5, testPlayer.speed);
    const layer4 = new Layer(backgroundLayer4, 0.5, testPlayer.speed);

    const allLayers = [layer3, layer4, layer1, layer2];
    let lastTime = 0;

    const game = new Game(testPlayer, levels, ctx, allLayers, input);

    game.animate(0);

    // function animate(timeStamp){
    //     const deltaTime = timeStamp - lastTime
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     allLayers.forEach(object => {
    //         object.update(input);
    //         object.draw();
    //     });
    //     levels[0].draw(ctx);
    //     levels[0].update(input);
    //     testPlayer.draw(ctx);
    //     testPlayer.update(input, deltaTime, spriteSheet);
    //     requestAnimationFrame(animate);
    // };
    // animate(0);
});