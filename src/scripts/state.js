export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
}

class State {
    constructor(state){
        this.state = state;
    }
}

class StandingLeft extends State {
    constructor(player){
        super('STANDING_LEFT'); 
        this.player = player
    }

    //do everything that needs to be done when it enters this particular state
    enter(){

    }

    //listen for a predefined set of inputs, and change state based on the input
    handleInput(){

    }
}a

class StandingRight extends State {
    constructor(player){
        super('STANDING_RIGHT'); 
        this.player = player
    }

    //do everything that needs to be done when it enters this particular state
    enter(){
        
    }

    //listen for a predefined set of inputs, and change state based on the input
    handleInput(){

    }
}