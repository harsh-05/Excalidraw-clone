import Shape from "./shape";

class Line extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Line");
    }
    
    draw(context: CanvasRenderingContext2D): void {
        const endx = 2 * this.x - this.width;
        const endy = 2 * this.y - this.height;

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(endx, endy);
        context.stroke();
    }
}

export default Line