export class Snow {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = Math.random()*2.5+0.5;
        this.vx = Math.random()-2.5;
        this.pile = []
    }

    draw(ctx, stageWidth, stageHeight, wind) {
        this.x += this.vx + wind;
        this.y += this.vy;
        
        if(this.y >= stageHeight + this.radius) {
            this.y = -this.radius;
            this.vy = Math.random()*2.5+0.5;
            return parseInt(this.x);
        }

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        
        this.vx = Math.cos(this.y/35) + (Math.random()-2.5)/50
        return -1;
    }
}