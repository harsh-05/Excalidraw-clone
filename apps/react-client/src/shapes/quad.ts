import Shape from "./shape";

class Quad extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
            super(x,y,width,height, "Quad")
    }
    
    draw(context: CanvasRenderingContext2D): void {
        // (width /2, starty)
        // (startx + width = endx, height /2)
        // (width /2, y + height = endy )
        // (startx, height /2)

        
    }
 }