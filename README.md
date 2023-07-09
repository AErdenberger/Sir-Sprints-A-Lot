# Sir-Sprints-A-Lot
Javascript project for App Academy

Description:

Sir Sprints-A-Lot is a platforming game where you play as a knight escaping from his last adventure. 
Users will be able to control the knight character (Sir Sprints-A-Lot), controls are running and jumping, with stretch goals of sliding,
climbing, and attacking. The game will utilize the Javascript canvas, Impact JS game engine, as well as resources from itchio.

Functionality:

Users will be able to:
1) Control the knight character with WASD
2) Keep track of their high scores, which is based on how far they've gotten in the level
3) Start, Pause, and Restart the game


Wireframe:
![Screenshot 2023-03-30 141106](https://user-images.githubusercontent.com/123604279/228983858-314ed6b0-3b97-4ac3-8987-905ac1508df7.png)

link to live: https://aerdenberger.github.io/Sir-Sprints-A-Lot/

2 Features in this is player controlling by the user as well as an endlessly scrolling background.


Game Loop Functionality
```js
animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        // Calculate the x-position of the player relative to the canvas center
        const playerXPosRelativeToCenter = this.player.x - CANVAS_WIDTH/2;
        // Check if the player has moved past the center of the canvas
        if (playerXPosRelativeToCenter > 0) {
            // Move the platforms and background layers to simulate scrolling
            const scrollDistance = playerXPosRelativeToCenter;
            for (const platform of this.curLevel.platforms) {
                platform.x -= scrollDistance;
            }
            for (const layer of this.layers) {
                layer.update(this.input);
            }
            // Check if the current level has been completely scrolled off the screen
            if (this.curLevel.platforms[0].x + this.curLevel.platforms[0].width < 0) {
                // If so, change to the next level and reset its position
                this.changeCurLevel();
            }
        }
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (const layer of this.layers) {
          layer.draw(this.ctx);
        }
        this.curLevel.draw(this.ctx);
        this.curLevel.drawNext(this.ctx, this.nextLevel.background)
        this.player.draw(this.ctx);
        this.player.update(input, deltaTime, spriteSheet);
        this.curLevel.update(input);
        requestAnimationFrame(this.animate.bind(this));
    }
```

Paralax Scrolling
```js
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
```

Knight Assets by "aamatniekss" - https://aamatniekss.itch.io/fantasy-knight-free-pixelart-animated-character
Background Assets by "aamatniekss" - https://aamatniekss.itch.io/free-pixelart-tileset-cute-forest
