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
        this.speed = 5;
    };

    draw(ctx){
        ctx.drawImage(this.background, this.x, this.y, this.width, this.height)

        this.platforms.forEach((platform) => {
            platform.draw(ctx);
          });
    };

    drawNext(ctx, image){
        ctx.drawImage(image, this.width, this.y, this.width, this.height)
    };

    update(input){
        let x2 = this.x + this.width;
        if (this.x <= -(this.width)){
            this.x = this.width + this.x - this.speed;
        }
        if (x2 <= -(this.width)){
            x2 = this.width + this.x - this.speed;
        }
        if (input.keys.includes('d')){
            this.speed = 5;
        } else if (input.keys.includes('a')){
            this.speed = -5;
        } else {
            this.speed = 0;
        }
        
        //horizontal movement
        this.x += this.speed;
        if (this.x < 0){
            this.x = 0;
        } else if (this.x > (this.gameWidth - this.width)){
            this.x = this.gameWidth - this.width;
        }

        this.x = Math.floor(this.x - this.speed);
        x2 = Math.floor(x2 - this.speed);
    };
}