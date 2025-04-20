import Shape from "./shape";

class Rectangle extends Shape {
    

    constructor(x: number, y: number, width: number, height: number, type: "Rectangle" | "Circle" | "Line") {
        super(x,y,width, height,type)
    }

    draw(context: CanvasRenderingContext2D): void {
        
    }
}

export default Rectangle;