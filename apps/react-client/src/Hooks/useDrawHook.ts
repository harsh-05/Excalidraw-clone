import { useCallback, useEffect, useRef, useState } from "react";
import Shape from "../shapes/shape";
import Line from "../shapes/line";
import Circle from "../shapes/circle";
import Rectangle from "../shapes/rectangle";
import { shapeType } from "@repo/schemazod";
import Quad from "../shapes/quad";


// Needed to create a helper function which will use to return the instance for

type ShapeConstructor = new (
    x: number, y: number, width: number, height: number
)=>Shape;

const shapeConstructors: Record<shapeType, ShapeConstructor> = {
    Rectangle: Rectangle,
    Circle: Circle,
    Line: Line,
    Quad: Quad
}



const useDrawHook = (dimensions: { width: number, height: number }) => {

    const canvasref = useRef<HTMLCanvasElement>(null);

    const [shapes, setShapes] = useState<Shape[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startCoords, setStartCoords] = useState<{
        startx: number;
        starty: number;
    } | null>(null);

    const [selectedtool, setSelectedTool] = useState<shapeType| null>(null);

    // will hold the one shape, which is currently is drawing.
    const [previewShape, setPreviewShape] = useState<Shape | null>(null);


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
    }, [shapes, previewShape, dimensions]);

    function getPosition(e: React.MouseEvent<HTMLCanvasElement>) {
        const rect = e.currentTarget.getBoundingClientRect(); // Refer Google Docs for better understanding...
        const x = e.clientX - rect.x;
        const y = e.clientY - rect.y;
        return { x, y };
    }

    

    //Functions to handle the mousedown, mousemove, mouseup
    function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        if (selectedtool === null) return;
        setIsDrawing(true);
        //Giving start coordinates currently to clientx and clientY, find why offsetX and offsetY is not working here.
        // It is better to get the position this, find the reason and note it down in the google docs.
        const { x, y } = getPosition(e);
        setStartCoords({ startx: x, starty: y });
        setPreviewShape(null);
    }

    function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!canvasref.current || isDrawing === false || selectedtool === null) return;
        if (!startCoords) return;

        const currentPos = getPosition(e);
        const width = currentPos.x - startCoords?.startx;
        const height = currentPos.y - startCoords?.starty;

        //Trying to move the Line shape using only x,y, width, height;

        const constructor = shapeConstructors[selectedtool];

        if (constructor) {
            const shape = new constructor(startCoords.startx, startCoords.starty, width, height);
            setPreviewShape(shape);
        }

        // if (selectedtool === "Line") {

        //     const line = new Line(startCoords.startx, startCoords.starty, width, height);
        //     setPreviewShape(line);

        // } else if (selectedtool === 'Circle') {

        //     const circle = new Circle(
        //         startCoords.startx,
        //         startCoords.starty,
        //         width,
        //         height
        //     );
        //     setPreviewShape(circle);

        // } else if (selectedtool === 'Rectangle') {

        //     const rect = new Rectangle(
        //         startCoords?.startx,
        //         startCoords?.starty,
        //         width,
        //         height
        //     );
        //     setPreviewShape(rect);
        // } else if (selectedtool === 'Quad') {
        //     const quad = new Quad(startCoords.startx, startCoords.starty, width, height);
        //     setPreviewShape(quad);
        // }
    }

    function handleMouseup(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!canvasref.current || isDrawing === false || selectedtool == null) return;
        if (!startCoords) return;

        const currentPos = getPosition(e);
        const width = currentPos.x - startCoords?.startx;
        const height = currentPos.y - startCoords?.starty;


        const constructor = shapeConstructors[selectedtool];

        if (constructor) {
            const shape = new constructor(startCoords.startx, startCoords.starty, width, height);
            setShapes((prev) => [...prev, shape]);
        }

        // if (selectedtool === 'Line') {
        //     //Drawing Line

        //     const line = new Line(
        //         startCoords.startx,
        //         startCoords.starty,
        //         width,
        //         height
        //     );

        //     setShapes((prevshapes) => [...prevshapes, line]);
        // } else if (selectedtool === 'Circle') {
        //     // drawing circle...
        //     const circle = new Circle(
        //         startCoords.startx,
        //         startCoords.starty,
        //         width,
        //         height
        //     );
        //     setShapes((prevshapes) => [...prevshapes, circle]);
        // } else if (selectedtool === 'Rectangle') {
        //     const rect = new Rectangle(
        //         startCoords?.startx,
        //         startCoords?.starty,
        //         width,
        //         height
        //     );
        //     setShapes((prevshapes) => [...prevshapes, rect]);
        // } else if (selectedtool === 'Quad') {
        //     const quad = new Quad(startCoords.startx, startCoords.starty, width, height);
        //     setShapes((prevshapes) => [...prevshapes, quad]);
        // }


        setIsDrawing(false);
        setPreviewShape(null);
        setStartCoords(null);
    }

     // Drawing and redrawing canvas on every shape change or previewShape change.
      useEffect(() => {
        drawCanvas();
      }, [drawCanvas]);

      
    return { selectedtool, handleMouseDown, handleMouseMove, handleMouseup, setSelectedTool, canvasref }
    
}

export default useDrawHook;