

export default class Level {
    constructor(name, platforms, bgimage){
        this.name = name;
        this.platforms = platforms;
        this.background = new Image();
        this.background.src = bgimage;
    };


}