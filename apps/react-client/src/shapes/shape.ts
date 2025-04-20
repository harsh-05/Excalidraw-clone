abstract class Shape {
   x: number;
   y: number;
   width: number;
   height: number;
   type: "Rectangle" | "Circle" | "Line";


   constructor(x: number, y: number, width: number, height: number, type: "Rectangle" | "Circle" | "Line") {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.type = type;
   }

   abstract draw (context: CanvasRenderingContext2D): void 



}

export default Shape;