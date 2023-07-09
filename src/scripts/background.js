const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");


const backgroundLayer1 = new Image();
backgroundLayer1.src = './Assets/Background/BGBack.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './Assets/Background/BGFront.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './Assets/Background/CloudsBack.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './Assets/Background/CloudsFront.png';


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

    //take in information about the layer object and draw it on the canvas
    //every time update is called, draw will be called to draw the layer
    //at the new position
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }   
}