import { shapeType } from "@repo/schemazod";
import { Handle, ResizeHandleEnum } from "../types/types";
abstract class Shape {
   x: number;
   y: number;
   width: number;
   height: number;
   type: shapeType


   private _resizeStart?: {
      x1: number, y1: number,
      x2: number, y2: number
   };

   beginResize() {
      // compute true top-left (x1,y1) and bottom-right (x2,y2)
      const x1 = Math.min(this.x, this.x + this.width);
      const y1 = Math.min(this.y, this.y + this.height);
      const x2 = Math.max(this.x, this.x + this.width);
      const y2 = Math.max(this.y, this.y + this.height);

      this._resizeStart = { x1, y1, x2, y2 };
    }
   
   protected getResizeStart() {
      if (!this._resizeStart) {
         throw new Error("beginResize() must be called before resizeShape()");
      }
      return this._resizeStart;
    }

   constructor(x: number, y: number, width: number, height: number, type: shapeType) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.type = type;
   }

   abstract draw(context: CanvasRenderingContext2D): void;

   abstract isSelected(x: number, y: number): boolean;



   protected resizeHandleSize = 8;

   abstract getResizeHandles(selectionBuffer: number): Handle[];

   abstract resizeShape(mouseX: number, mouseY: number, handleType: ResizeHandleEnum, buffer: number): void;

   detectResizeHandle(x: number, y: number, selectionBuffer: number): ResizeHandleEnum | null {
      const handles = this.getResizeHandles(selectionBuffer);

      for (let handle of handles) {
         const minX = Math.min(handle.x, handle.x + handle.width);
         const maxX = Math.max(handle.x, handle.x + handle.width);
         const minY = Math.min(handle.y, handle.y + handle.height);
         const maxY = Math.max(handle.y, handle.y + handle.height);

         if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return handle.type;
         }
       
      }
      return null;
   }
  
}

export default Shape;