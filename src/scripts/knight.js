//inherits from MovingObject 
//will have a run and jump methods

class Knight extends MovingObject{
    constructor(position, velocity, size){
        super((position, velocity, size))
    };

    run = function() {};

    jump = function() {};

    crouch = function() {};

    //checks to see if player is running when hitting the crouch button
    slide = function() {};

    //state checker to change animations
    isRunning = function() {};

    //state checker to change animations
    isFalling = function () {};
}