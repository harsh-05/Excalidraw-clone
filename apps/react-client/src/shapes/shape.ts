import { shapeType } from "@repo/schemazod";
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

}

export default Shape;