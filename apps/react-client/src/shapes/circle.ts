import { Handle, ResizeHandleEnum } from "../types/types";
import Shape from "./shape";

class Circle extends Shape {


    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Circle");

    }

    protected buildpath(): void {
        const p = new Path2D();

        const radiusX = Math.abs(this.width / 2);
        const radiusY = Math.abs(this.height / 2);
        const centreX = (2 * this.x + this.width) / 2;
        const centreY = (2 * this.y + this.height) / 2;

        p.ellipse(centreX, centreY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        
        this.path2d = p;

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

    isSelected(x: number, y: number): boolean {

        const minX = Math.min(this.x, this.x + this.width);
        const maxX = Math.max(this.x, this.x + this.width);
        const minY = Math.min(this.y, this.y + this.height);
        const maxY = Math.max(this.y, this.y + this.height);

        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }

    getResizeHandles(selectionBuffer: number): Handle[] {
        const x = Math.min(this.x, this.x + this.width) - selectionBuffer - this.resizeHandleSize / 2;
        const y = Math.min(this.y, this.y + this.height) - selectionBuffer - this.resizeHandleSize / 2;
        const width = Math.abs(this.width) + 2 * selectionBuffer;
        const height = Math.abs(this.height) + 2 * selectionBuffer;
        return [
            { type: ResizeHandleEnum.Top_Left, x: x, y: y, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Top_right, x: x + width, y: y, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Bottom_left, x: x, y: y + height, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Bottom_right, x: x + width, y: y + height, width: this.resizeHandleSize, height: this.resizeHandleSize }
        ]
    }



    resizeShape(mouseX: number, mouseY: number, handleType: ResizeHandleEnum, buffer: number, initialCoords: { x1: number, y1: number, x2: number, y2: number }): void {
        const { x1, y1, x2, y2 } = initialCoords;


        let rawX = mouseX, rawY = mouseY;
        switch (handleType) {
            case ResizeHandleEnum.Top_Left:
                rawX = mouseX + buffer;
                rawY = mouseY + buffer;
                break;
            case ResizeHandleEnum.Top_right:
                rawX = mouseX - buffer;
                rawY = mouseY + buffer;
                break;
            case ResizeHandleEnum.Bottom_left:
                rawX = mouseX + buffer;
                rawY = mouseY - buffer;
                break;
            case ResizeHandleEnum.Bottom_right:
                rawX = mouseX - buffer;
                rawY = mouseY - buffer;
                break;
        }


        let newX1 = x1, newY1 = y1, newX2 = x2, newY2 = y2;
        switch (handleType) {
            case ResizeHandleEnum.Top_Left:
                newX1 = rawX;
                newY1 = rawY;
                break;
            case ResizeHandleEnum.Top_right:
                newX2 = rawX;
                newY1 = rawY;
                break;
            case ResizeHandleEnum.Bottom_left:
                newX1 = rawX;
                newY2 = rawY;
                break;
            case ResizeHandleEnum.Bottom_right:
                newX2 = rawX;
                newY2 = rawY;
                break;
        }


        this.x = newX1;
        this.y = newY1;
        this.width = newX2 - newX1;
        this.height = newY2 - newY1;

        this.buildpath();

    }
}

export default Circle;