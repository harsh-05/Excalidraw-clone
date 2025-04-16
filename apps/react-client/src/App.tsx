import { useEffect, useRef } from "react";


function App() {
  
  const canvasref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    
  }, [])


  return (
    <canvas ref={canvasref} width={window.innerWidth} height={window.innerHeight}>
      
    </canvas>
  );
}

export default App
