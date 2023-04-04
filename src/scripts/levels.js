const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;

export default class Level {
    constructor(name, platforms, bgimage){
        this.name = name;
        this.platforms = platforms;
        this.background = new Image();
        this.background.src = bgimage;
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
    };

    draw(ctx){
        ctx.drawImage(this.background, this.x, this.y, this.width, this.height)
    };

    drawNext(ctx, image){
        ctx.drawImage(image, this.width, this.y, this.width, this.height)
    }

}