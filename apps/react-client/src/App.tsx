import { useEffect, useRef, useState } from "react";



function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  }) 
  const canvasref = useRef<HTMLCanvasElement>(null);

  
  // rendering will happen according to the size of the window.. I guess...
  useEffect(() => {
    const canvas = canvasref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      return
    }

    let mousedown = false;
    let startX = 0;
    let startY = 0;

    const shapes:{type:string, x: number, y:number, width: number, height: number}[] = []

    canvas?.addEventListener("mousedown", (e) => {
      mousedown = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });

    canvas?.addEventListener("mousemove", (e) => {
      if (!mousedown) {
        return;
      }
       let width = e.offsetX - startX;
       let height = e.offsetY - startY;
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       //Mapping all the rectangles here.
      shapes.map((shape) => {
        
        return (
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height) 
         
       );
      }
      );
      
         
      
      ctx.strokeRect(startX, startY, width, height);
      
    })

    canvas?.addEventListener("mouseup", (e) => {
      mousedown = false;
       let width = e.offsetX - startX;
       let height = e.offsetY - startY;
      shapes.push({ type: "rect", x: startX, y: startY, width, height });
    })
  

  }, [dimensions])

  
  // Upon loading of the page then giving the size of the canvas accroding to the window's dimensions, added a event listener to make it responsive.
  useEffect(() => {
    function resize() {
        setDimensions(()=>({width: window.innerWidth, height: window.innerHeight}))
    }
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [])


  return (
    <canvas ref={canvasref} width={dimensions.width} height={dimensions.height} ></canvas>
  );
}

export default App
