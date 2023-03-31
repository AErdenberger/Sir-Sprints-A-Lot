MovingObject = function(position, velocity, size) {
    //define the movement properties of the player
    //this also allows for projectiles and enemies 

    this.pos = position;
    this.vel = velocity;
    this.size = size;

    this.move = function(pos, vel){
        return pos += vel;
    };
    
}