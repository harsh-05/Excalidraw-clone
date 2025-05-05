import Shape from "./shape";

class Quad extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
            super(x,y,width,height, "Quad")
    }
    
    draw(context: CanvasRenderingContext2D): void {
        // (width /2, starty)-----> but the issue here is (width /2 is the length, we have to add the starting point too)

        // so the first point will become here is 1. (startx + width /2, starty)

        // (startx + width = endx, height /2) ------> similarly this will become 2.(startx + height, starty + height /2)
        // (width /2, y + height = endy ) ------> 3. (startx + width /2, y + height)
        // (startx, height /2) ---------> 4. (startx, starty + height /2)

        const point1 = { x: (this.x + this.width / 2), y: this.y };
        const point2 = { x: (this.x + this.width), y: (this.y + this.height / 2) };
        const point3 = { x: (this.x + this.width / 2), y: this.y + this.height };
        const point4 = { x: (this.x), y: this.y + this.height /2 };

        context.beginPath();
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.lineTo(point3.x, point3.y);
        context.lineTo(point4.x, point4.y);
        context.closePath();
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
 
export default Quad;