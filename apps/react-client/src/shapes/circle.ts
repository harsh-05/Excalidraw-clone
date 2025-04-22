import Shape from "./shape";

class Circle extends Shape {


    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Circle");
        
    }

    draw(context: CanvasRenderingContext2D): void {
        const radiusX = Math.abs(this.width / 2);
        const radiusY = Math.abs(this.height / 2);
        const centreX = (2 * this.x + this.width) / 2;
        const centreY = (2 * this.y + this.height) / 2;

        context.beginPath();
        context.ellipse(centreX, centreY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        context.stroke()
    }
}

export default Circle;