import { shapeType } from "@repo/schemazod";
import { Handle, props, ResizeHandleEnum } from "../types/types";
abstract class Shape {
   x: number;
   y: number;
   width: number;
   height: number;
   type: shapeType;
   prop: props



   protected path2d!: Path2D;

   constructor(x: number, y: number, width: number, height: number, type: shapeType, prop: props) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.type = type;
      this.prop = prop;
      this.buildpath();
   }

   protected abstract buildpath(): void

   hitDetectionEraser(x: number, y: number, ctx: CanvasRenderingContext2D): boolean {
      if (ctx.isPointInPath(this.path2d, x, y) || ctx.isPointInStroke(this.path2d, x, y)) return true;
      else return false;
   }

   abstract draw(context: CanvasRenderingContext2D): void;

   abstract isSelected(x: number, y: number): boolean;



   protected resizeHandleSize = 8;

   abstract getResizeHandles(selectionBuffer: number): Handle[];

   abstract resizeShape(mouseX: number, mouseY: number, handleType: ResizeHandleEnum, buffer: number, initialCoords: {x1: number, y1: number, x2: number, y2: number}): void;

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