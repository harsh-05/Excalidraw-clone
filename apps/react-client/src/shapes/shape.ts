import { shapeType } from "@repo/schemazod";
import { Handle } from "../types/types";
abstract class Shape {
   x: number;
   y: number;
   width: number;
   height: number;
   type: shapeType


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

   detectResizeHandle(x: number, y: number, selectionBuffer: number) {
      const handles = this.getResizeHandles(selectionBuffer);

      for (let handle of handles) {
         const minX = Math.min(handle.x, handle.x + handle.width);
         const maxX = Math.max(handle.x, handle.x + handle.width);
         const minY = Math.max(handle.y, handle.y + handle.height);
         const maxY = Math.max(handle.y, handle.y + handle.height);

         return x >= minX && x <= maxX && y >= minY && y <= maxY;
      }
      return null;
   }
  
}

export default Shape;