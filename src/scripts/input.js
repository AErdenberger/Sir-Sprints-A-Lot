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
            });
            window.addEventListener('keyup', event => {
            // console.log(event.key);
            if (event.key === 's' ||
            event.key === 'w' ||
            event.key === 'a' ||
            event.key === 'd') {
                this.keys.splice(this.keys.indexOf(event.key), 1);
            }
        });
    }
}