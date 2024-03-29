export default class Platform {
    constructor(x, y, height, width){
        this.x = x;
        this.y = y;
        this.height = height * (2.1875);
        this.width = width * (1.667);
        this.x2 = this.width;
        this.y2 = this.height;
    };

    draw(ctx) {
        ctx.fillStyle = "#333";
        ctx.fillRect(this.x, this.y, this.height, this.width);
    }
}