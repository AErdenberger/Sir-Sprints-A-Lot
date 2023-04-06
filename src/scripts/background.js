import InputHandler from "./input.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
// let gameSpeed = 5; Player.speed;


const backgroundLayer1 = new Image();
backgroundLayer1.src = '/Assets/Background/BGBack.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/Assets/Background/BGFront.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/Assets/Background/CloudsBack.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/Assets/Background/CloudsFront.png';


export default class Layer {
    constructor(image, speedModifier, gameSpeed){
        this.x = 0;
        this.y = 0;
        this.width = 1024;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    //move layers horizontally by changing their this.x and this.x2 and update them
    //when the layers move offscreen
    update(input){
        this.x -= this.speed;
        this.x2 -= this.speed;

        if (this.x > 0){
            this.x2 = this.x - this.width;
        }
        if (this.x2 > 0){
            this.x = this.x2 - this.width;
        }

        if (input.keys.includes('d')){
            this.speed = 5;
        } else if (input.keys.includes('a')){
            this.speed = -5;
        } else {
            this.speed = 0;
        }
        
        //horizontal movement
        if (this.x < -(this.width)){
            this.x = this.width;
        } else if (this.x > (this.width)){
            this.x = -(this.width);
        }
    }
    //take in information about the layer object and draw it on the canvas
    //every time update is called, draw will be called to draw the layer
    //at the new position
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }   
}

const layer1 = new Layer(backgroundLayer1, 1);
const layer2 = new Layer(backgroundLayer2, 1);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.5);

const allLayers = [layer3, layer4, layer1, layer2];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    allLayers.forEach(object => {
        object.update(input);
        object.draw();
    });
    requestAnimationFrame(animate);
};