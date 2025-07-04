import { useEffect, useRef, useState } from "react";
import { DrawController } from "./controllers/drawcontroller";
import { SelectTools } from "./types/types";
import Tools from "./Components/Tools";
import SideTools from "./Components/SideTools";


function App() {
  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  const [selectedtool, setSelectedTool] = useState< SelectTools | null>(null);

  const canvasref = useRef<HTMLCanvasElement| null>(null);
  const drawController = useRef<DrawController| null>(null);

  useEffect(() => {
    if (!canvasref.current) return;

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

     // setDimensions(() => ({ width, height, }));
      drawController.current?.setDimension(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasref.current) {
      drawController.current = new DrawController(canvasref.current);
      drawController.current.setDimension(
        window.innerWidth,
        window.innerHeight
      );
    }

    return () => {
      drawController.current?.destroy();
      drawController.current = null;
    };
  }, []);
  
  return (
    <>
      <SideTools></SideTools>
     <Tools selectedtool={selectedtool} setSelectedTool={setSelectedTool} drawController={drawController}></Tools>
      <canvas
        ref={canvasref}
      ></canvas>
    </>
  );
}

export default App;
