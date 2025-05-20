import { useEffect, useRef, useState } from "react";
// import Shape from "./shapes/shape";
// import Rectangle from "./shapes/rectangle";
// import Circle from "./shapes/circle";
// import Line from "./shapes/line";
//import useDrawHook from "./Hooks/useDrawHook";
import { DrawController } from "./controllers/drawcontroller";
import { shapeType } from "@repo/schemazod";
import { SelectTools } from "./types/types";
import Tools from "./Components/Tools";


function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [selectedtool, setSelectedTool] = useState< SelectTools | null>(null);

  const canvasref = useRef<HTMLCanvasElement| null>(null);
  const drawController = useRef<DrawController| null>(null);

  //const { handleMouseDown, handleMouseMove, handleMouseup, selectedtool, setSelectedTool, canvasref } = useDrawHook(dimensions);

  // Upon loading of the page then giving the size of the canvas accroding to the window's dimensions, added a event listener to make it responsive.
  useEffect(() => {
    if (!canvasref.current) return;

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions(() => ({ width, height, }));
      drawController.current?.setDimension(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasref.current) {
      drawController.current = new DrawController(canvasref.current);
      drawController.current.setDimension(dimensions.width, dimensions.height);
    }

    return () => {
      drawController.current?.destroy();
      drawController.current = null;
    };
  }, []);

  // function handletoolSelect(tool: shapeType | "Select" | null) {
  //   setSelectedTool(tool);
  //   drawController.current?.setSelectedTool(tool);
  // }

  return (
    <>
      {/* <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-2 flex justify-center gap-5 bg-red-300">
        <button
          className={`${selectedtool === "Select" ? "bg-gray-500" : ""}`}
          onClick={() => {
            handletoolSelect("Select");
          }}
        >
          Select
        </button>
        <button
          className={`${selectedtool === "Circle" ? "bg-gray-500" : ""}`}
          onClick={() => {
            handletoolSelect("Circle");
          }}
        >
          Circle
        </button>
        <button
          className={`${selectedtool === "Rectangle" ? "bg-gray-500" : ""}`}
          onClick={() => {
            handletoolSelect("Rectangle");
          }}
        >
          Rectangle
        </button>
        <button
          className={`${selectedtool === "Line" ? "bg-gray-500" : ""}`}
          onClick={() => {
            handletoolSelect("Line");
          }}
        >
          Line
        </button>
        <button
          className={`${selectedtool === "Quad" ? "bg-gray-500" : ""}`}
          onClick={() => {
            handletoolSelect("Quad");
          }}
        >
          Quad
        </button>
      </div> */}
     <Tools selectedtool={selectedtool} setSelectedTool={setSelectedTool} drawController={drawController}></Tools>
      <canvas
        ref={canvasref}
        width={dimensions.width}
        height={dimensions.height}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseup}
        // onMouseMove={handleMouseMove}
      ></canvas>
    </>
  );
}

export default App;
