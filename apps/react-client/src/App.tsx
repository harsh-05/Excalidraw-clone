import { useCallback, useEffect, useRef, useState } from "react";
import Shape from "./shapes/shape";
import Rectangle from "./shapes/rectangle";
import Circle from "./shapes/circle";
import Line from "./shapes/line";


function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const canvasref = useRef<HTMLCanvasElement>(null);

  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState<{
    startx: number;
    starty: number;
  } | null>(null);

  // will hold the one shape, which is currently is drawing.
  const [previewShape, setPreviewShape] = useState<Shape | null>(null);

  // rendering will happen according to the size of the window.. I guess...

  // Function to draw & redraw the canvas, based on the technique "clear and draw". This is inefficient in large size canvas.
  const drawCanvas = useCallback(() => {
    const canvas = canvasref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Drawing all the existing shapes.
    shapes?.map((shape) => {
      shape.draw(ctx);
    });

    if (previewShape) {
      previewShape.draw(ctx);
    }
  }, [shapes, previewShape]);

  function getPosition(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect(); // Refer Google Docs for better understanding...
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    return { x, y };
  }

  //Functions to handle the mousedown, mousemove, mouseup
  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsDrawing(true);
    //Giving start coordinates currently to clientx and clientY, find why offsetX and offsetY is not working here.
    // It is better to get the position this, find the reason and note it down in the google docs.
    const { x, y } = getPosition(e);
    setStartCoords({ startx: x, starty: y });
    setPreviewShape(null);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasref.current || isDrawing === false) return;
    if (!startCoords) return;

    const currentPos = getPosition(e);
    const width = currentPos.x - startCoords?.startx;
    const height = currentPos.y - startCoords?.starty;

    //Trying to move the Line shape using only x,y, width, height;

    const line = new Line(startCoords.startx, startCoords.starty, width, height);

    setPreviewShape(line);

    
    // Trying to draw the circle

    // const circle = new Circle(
    //   startCoords.startx,
    //   startCoords.starty,
    //   width,
    //   height
    // );

    // setPreviewShape(circle);

    // const rect = new Rectangle(
    //   startCoords?.startx,
    //   startCoords?.starty,
    //   width,
    //   height
    // );

    // setPreviewShape(rect);
  }

  function handleMouseup(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasref.current || isDrawing === false) return;
    if (!startCoords) return;

    const currentPos = getPosition(e);
    const width = currentPos.x - startCoords?.startx;
    const height = currentPos.y - startCoords?.starty;
    
    //Drawing Line

     const line = new Line(
       startCoords.startx,
       startCoords.starty,
       width,
       height
     );
    
    setShapes((prevshapes) => [...prevshapes, line]);


    //drawing circle...
    // const circle = new Circle(
    //   startCoords.startx,
    //   startCoords.starty,
    //   width,
    //   height
    // );

    //  setShapes((prevshapes) => [...prevshapes, circle]);

    // const rect = new Rectangle(
    //   startCoords?.startx,
    //   startCoords?.starty,
    //   width,
    //   height
    // );

    // setShapes((prevshapes) => [...prevshapes, rect]);

    setIsDrawing(false);
    setPreviewShape(null);
    setStartCoords(null);
  }

  // Drawing and redrawing canvas on every shape change or previewShape change.
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

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
    <canvas
      ref={canvasref}
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseup}
      onMouseMove={handleMouseMove}
    ></canvas>
  );
}

export default App;
