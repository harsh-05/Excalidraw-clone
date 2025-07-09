import { Handle, props, ResizeHandleEnum } from "../types/types";
import Shape from "./shape";

class Rectangle extends Shape {



    // We'll use class to hold the properties such as fillstyle, strokestyle, linewidth, etc.......
    constructor(x: number, y: number, width: number, height: number, prop: props) {
        super(x, y, width, height, "Rectangle", prop);
    }

    public buildpath(): void {
        const p = new Path2D();
        p.rect(this.x, this.y, this.width, this.height);
        this.path2d = p;
    }

    draw(context: CanvasRenderingContext2D): void {
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.save();

        context.fillStyle = this.prop.fillColor;
        context.strokeStyle = this.prop.strokeColor;
         
        if (this.prop.fillColor !== "transparent") {
            context.fill(this.path2d);
        }

        context.stroke(this.path2d);
        context.restore();
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

export default Rectangle;