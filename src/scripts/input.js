export default class InputHandler {
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