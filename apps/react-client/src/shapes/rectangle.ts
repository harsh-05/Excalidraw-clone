import Shape from "./shape";

class Rectangle extends Shape {
    


    // We'll use class to hold the properties such as fillstyle, strokestyle, linewidth, etc.......
    constructor(x: number, y: number, width: number, height: number) {
        super(x,y,width, height, "Rectangle")
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    isSelected(x: number, y: number): boolean {
        
        const minX = Math.min(this.x, this.x + this.width);
        const maxX = Math.max(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        const maxY = Math.max(this.y, this.y + this.height);

        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
}

export default Rectangle;