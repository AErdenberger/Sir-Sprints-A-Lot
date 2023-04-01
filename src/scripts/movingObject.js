class MovingObject{ 
    //define the movement properties of the player
    //this also allows for projectiles and enemies 
    constructor(position, velocity, size){
        this.pos = position;
        this.vel = velocity;
        this.size = size;
    };

    move = function(pos, vel){
        return pos += vel;
    };

}