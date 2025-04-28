import Shape from "./shape";

class Quad extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
            super(x,y,width,height, "Quad")
    }
    
    draw(context: CanvasRenderingContext2D): void {
        // (width /2, starty)-----> but the issue here is di
        // (startx + width = endx, height /2)
        // (width /2, y + height = endy )
        // (startx, height /2)

        const point1 = { x: (this.width / 2), y: this.y };
        const point2 = { x: (this.x + this.width), y: (this.height / 2) };
        const point3 = { x: (this.width / 2), y: this.y + this.height };
        const point4 = { x: (this.x), y: this.height /2 };

        context.beginPath();
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.lineTo(point3.x, point3.y);
        context.lineTo(point4.x, point4.y);
        context.closePath();
        context.stroke();

    }
}
 
export default Quad;