import Shape from "./shape";

class Rectangle extends Shape {
    


    // We'll use class to hold the properties such as fillstyle, strokestyle, linewidth, etc.......
    constructor(x: number, y: number, width: number, height: number) {
        super(x,y,width, height, "Rectangle")
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export default Rectangle;