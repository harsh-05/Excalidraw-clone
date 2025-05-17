import { Handle, ResizeHandleEnum } from "../types/types";
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

    getResizeHandles(selectionBuffer: number): Handle[] {
        const x = Math.min(this.x, this.x + this.width) - selectionBuffer - this.resizeHandleSize/2;
        const y = Math.min(this.y, this.y + this.height) - selectionBuffer - this.resizeHandleSize/2;
        const width = Math.abs(this.width) + 2 * selectionBuffer;
        const height = Math.abs(this.height) + 2 * selectionBuffer;
        return [
            { type: ResizeHandleEnum.Top_Left, x: x, y: y, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Top_right, x: x + width, y: y, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Bottom_left, x: x, y: y + height, width: this.resizeHandleSize, height: this.resizeHandleSize },
            { type: ResizeHandleEnum.Bottom_right, x: x + width, y: y + height, width: this.resizeHandleSize, height: this.resizeHandleSize}
            ]
    }
}

export default Rectangle;