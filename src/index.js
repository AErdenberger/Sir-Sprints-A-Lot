console.log("Webpack is working!")

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', event => {
                // console.log(event.key);
                if ((event.key === 's' ||
                    event.key === 'w' ||
                    event.key === 'a' ||
                    event.key === 'd') 
                    && !(this.keys.includes(event.key))){
                        this.keys.push(event.key)
                    }
                    console.log(event.key, this.keys);
                });
                window.addEventListener('keyup', event => {
                // console.log(event.key);
                if (event.key === 's' ||
                event.key === 'w' ||
                event.key === 'a' ||
                event.key === 'd') {
                    this.keys.splice(this.keys.indexOf(event.key), 1);
                }
                console.log(event.key, this.keys);
            });
        }
    }

    const idleImage = new Image();
    idleImage.src = 'Assets/Knight/Colour1/Outline/120x80_PNGSheets/_Idle.png';
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

    const SpriteSheet = [idleImage, crouchImage, crouchWalkImage, runImage, jumpImage];
   
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 120;
            this.height = 80;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = idleImage;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vel = 0;
            this.grav = 1;
        }
        
        draw(context){
            context.fillStyle = 'white'
            context.fillRect(this.x, this.y, this.width, this.height)
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

        update(input){
            if (input.keys.includes('d')){
                this.speed = 5;
            } else if (input.keys.includes('a')){
                this.speed = -5;
            } else if (input.keys.includes('w') && this.onGround()){
                console.log("jumping")
                this.vel -= 10;
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
            return (this.y >= this.gameHeight - this.height);
        };
    }

    const input = new InputHandler();
    const testPlayer = new Player(canvas.width, canvas.height);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        testPlayer.draw(ctx);
        testPlayer.update(input);
        requestAnimationFrame(animate);
    }
    animate();
});