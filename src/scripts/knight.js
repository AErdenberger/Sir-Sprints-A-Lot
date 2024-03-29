    const canvas = document.getElementById('canvas1');
    canvas.width = 800;
    canvas.height = 700;

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
   
    export default class Player {
        constructor(gameWidth, gameHeight, sprites){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 120;
            this.height = 80;
            this.x = 32;
            this.x2 = this.width;
            this.y = this.gameHeight - this.height - 64;
            this.y2 = this.gameHeight;
            this.image = idleImage;
            this.maxFrame = 10;
            this.frameX = 0;
            this.frameY = 0;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.sprites = sprites;
            this.speed = 0;
            this.vel = 0;
            this.grav = 1;
            this.canJump = true;
            this.collideUp = false;
            this.collideRight = false;
            this.collideLeft = false;
        }
        
        draw(context){
            // context.fillStyle = 'white'
            // context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, 
                            (this.frameX * this.width), 
                            (this.frameY * this.height), 
                            this.width, 
                            this.height, 
                            this.x, 
                            this.y, 
                            this.width, 
                            this.height);
        }

        update(input, deltaTime, sprites){
            //sprite animation
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame){
                    this.frameX = 0;
                } else {
                    this.frameX++
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            //controls
            if (input.keys.includes('d') && !this.collideRight){
                this.speed = 5;
                this.image = sprites[1];
            } else if (input.keys.includes('a') && !this.collideLeft){
                this.speed = -5;
                this.image = sprites[1];
            } else if (input.keys.includes('w') && this.canJump()){
                // console.log("jumping")
                this.vel -= 15;
                this.image = sprites[2];
            } else {
                this.speed = 0;
                this.image = sprites[0];
            }
            
            //horizontal movement
            this.x += this.speed;
            if (this.x < 0){
                this.x = 0;
            } else if (this.x > (this.gameWidth - this.width)) {
                this.x = this.gameWidth - this.width;
            }

            //vertical movement
            this.y += this.vel;
            if (!this.onGround()){
                this.vel += this.grav;
            } else {
                this.vel = 0;
            }
            if (this.y > (this.gameHeight - this.height)){
                this.y = this.gameHeight - this.height;
            }
        }

        onGround(){
            return (this.y >= this.gameHeight - this.height - 64);
        };
    }
