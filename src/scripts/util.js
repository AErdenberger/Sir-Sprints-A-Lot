//holds math equations that can't be done by Math

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;

export function distance(pos1, pos2){
    const x1 = pos1[0];
    const y1 = pos1[1];
    const x2 = pos2[0];
    const y2 = pos2[1];

    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
};

export function flipHorizontally(img, x, y){
    ctx.translate(x + img.width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    ctx.setTransform(1,0,0,1,0,0);
}