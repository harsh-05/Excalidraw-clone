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
        if (x < this.x && y < this.y) return false;
        if (x > this.x + this.width || y > this.y + this.height) return false;
        return true
    }
}

export default Rectangle;