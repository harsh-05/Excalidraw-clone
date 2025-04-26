import { useCallback, useEffect, useRef, useState } from "react";
import Shape from "./shapes/shape";
import Rectangle from "./shapes/rectangle";
import Circle from "./shapes/circle";
import Line from "./shapes/line";
import useDrawHook from "./Hooks/useDrawHook";

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { handleMouseDown, handleMouseMove, handleMouseup, selectedtool, setSelectedTool, canvasref } = useDrawHook(dimensions);

  // Upon loading of the page then giving the size of the canvas accroding to the window's dimensions, added a event listener to make it responsive.
  useEffect(() => {
    if (!canvasref.current) return;

    function resize() {
      setDimensions(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    }

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [dimensions]);

  return (
    <>
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-2 flex justify-center gap-5 bg-red-300">
        <button
          className={`${selectedtool === "Circle" ? "bg-gray-500" : ""}`}
          onClick={() => {
            setSelectedTool("Circle");
          }}
        >
          Circle
        </button>
        <button
          className={`${selectedtool === "Rectangle" ? "bg-gray-500" : ""}`}
          onClick={() => {
            setSelectedTool("Rectangle");
          }}
        >
          Rectangle
        </button>
        <button
          className={`${selectedtool === "Line" ? "bg-gray-500" : ""}`}
          onClick={() => {
            setSelectedTool("Line");
          }}
        >
          Line
        </button>
      </div>
      <canvas
        ref={canvasref}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseup}
        onMouseMove={handleMouseMove}
      ></canvas>
    </>
  );
}

export default App;
