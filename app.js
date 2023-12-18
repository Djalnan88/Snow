import {Snow} from './snow.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.snow = [];
        this.totalSnow = 1250;
        this.wind = 0;
        for (var i = 0; i < this.totalSnow; i++) {
            this.snow[i] = new Snow((Math.random()-0.5)*this.stageWidth*3, (Math.random()-1)*50, 3);
        }
        this.pile = [];
        for (var i = 0; i <= this.stageWidth; i++) {
            this.pile[i] = 0;
        }
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    snowman() {
        this.ctx.fillStyle = "#EEEEEE";
        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/4, this.stageHeight/36*34, this.stageHeight/10, 0, 2*Math.PI);
        this.ctx.arc(this.stageWidth/4, this.stageHeight/36*29, this.stageHeight/13, 0, 2*Math.PI);
        this.ctx.arc(this.stageWidth/4, this.stageHeight/36*25, this.stageHeight/16, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.fillStyle = "#FF8800";
        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/4, this.stageHeight/36*25, this.stageHeight/48, Math.PI/2, Math.PI/2*3);
        this.ctx.moveTo(this.stageWidth/4, this.stageHeight/36*25+this.stageHeight/48);
        this.ctx.lineTo(this.stageWidth/4+this.stageWidth/24, this.stageHeight/36*25);
        this.ctx.lineTo(this.stageWidth/4, this.stageHeight/36*25-this.stageHeight/48)
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.fillStyle = "#000";
        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/4-this.stageHeight/36, this.stageHeight/36*25-this.stageHeight/36, this.stageHeight/144, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.arc(this.stageWidth/4+this.stageHeight/36, this.stageHeight/36*25-this.stageHeight/36, this.stageHeight/144, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

    }

    tree() {
        this.ctx.fillStyle = "#5C3A21";
        this.ctx.beginPath();
        this.ctx.fillRect(this.stageWidth/9*4, this.stageHeight/6*5, this.stageWidth/9, this.stageHeight/6);
        this.ctx.closePath();

        this.ctx.fillStyle = "#008D00";
        this.ctx.beginPath();
        this.ctx.moveTo(this.stageWidth/2, this.stageHeight/6);
        this.ctx.lineTo(this.stageWidth/2-this.stageWidth/8, this.stageHeight/6+this.stageHeight/3);
        this.ctx.lineTo(this.stageWidth/2+this.stageWidth/8 , this.stageHeight/6+this.stageHeight/3);
        this.ctx.fill();
        this.ctx.moveTo(this.stageWidth/2, this.stageHeight/6*2);
        this.ctx.lineTo(this.stageWidth/2-this.stageWidth/8, this.stageHeight/6*2+this.stageHeight/3);
        this.ctx.lineTo(this.stageWidth/2+this.stageWidth/8, this.stageHeight/6*2+this.stageHeight/3);
        this.ctx.fill();
        this.ctx.moveTo(this.stageWidth/2, this.stageHeight/6*3);
        this.ctx.lineTo(this.stageWidth/2-this.stageWidth/8, this.stageHeight/6*3+this.stageHeight/3);
        this.ctx.lineTo(this.stageWidth/2+this.stageWidth/8, this.stageHeight/6*3+this.stageHeight/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width*2, this.canvas.height*2);
        this.wind = Math.random()*0.5;

        this.tree();
        this.snowman();

        for (var i = 0; i < this.totalSnow; i++) {
            var k = this.snow[i].draw(this.ctx, this.stageWidth, this.stageHeight, this.wind);
            if(k > 0 && k <= this.stageWidth) {
                this.pile[k] += 2;
                this.pile[k+1] += 1.5;
                this.pile[k-1] += 1.5;
                this.pile[k+2] += 1;
                this.pile[k-2] += 1;
                this.pile[k+3] += 0.5;
                this.pile[k-3] += 0.5;
            }
        }

        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.stageHeight);
        for (var i = 1; i <= this.stageWidth; i+=parseInt(this.stageWidth/100)) {
            this.ctx.quadraticCurveTo(i, this.stageHeight-this.pile[i], i+1, this.stageHeight-this.pile[i+1]);
        }
        this.ctx.quadraticCurveTo(this.stageWidth, this.stageHeight-this.pile[this.stageHeight], this.stageWidth/100*101, this.stageHeight);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

window.onload = () => {
    new App();
};
