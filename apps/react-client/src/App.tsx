import { useEffect, useRef, useState } from "react";



function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  }) 
  const canvasref = useRef<HTMLCanvasElement>(null);

  
  // rendering will happen according to the size of the window.. I guess...
  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    console.log(dimensions.height, dimensions.width);
  }, [dimensions])

  
  // Upon loading of the page then giving the size of the canvas accroding to the window's dimensions, added a event listener to make it responsive.
  useEffect(() => {
    function resize() {
        setDimensions(()=>({width: window.innerWidth, height: window.innerHeight}))
    }
    resize();
    window.addEventListener("resize", resize);

    return () => window.addEventListener("resize", resize);
  }, [])


  return (
    <canvas ref={canvasref} width={dimensions.width} height={dimensions.height} style={{ backgroundColor: 'grey'}}></canvas>
  );
}

export default App
