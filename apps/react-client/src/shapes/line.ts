import Shape from "./shape";

class Line extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Line");
    }
    
    draw(context: CanvasRenderingContext2D): void {
        const endx = (this.x) + this.width;
        const endy = (this.y) + this.height;

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(endx, endy);
        context.stroke();
    }

    isSelected(x: number, y: number): boolean {
       
        const minX = Math.min(this.x, this.x + this.width);
        const maxX = Math.max(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        const maxY = Math.max(this.y, this.y + this.height);

        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
}

export default Line