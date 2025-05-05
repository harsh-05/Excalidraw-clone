import { shapeType } from "@repo/schemazod";
import Shape from "../shapes/shape";
import Rectangle from "../shapes/rectangle";
import Circle from "../shapes/circle";
import Line from "../shapes/line";
import Quad from "../shapes/quad";



type ShapeConstructor = new (
    x: number, y: number, width: number, height: number
) => Shape;

const shapeConstructors: Record<shapeType, ShapeConstructor> = {
    Rectangle: Rectangle,
    Circle: Circle,
    Line: Line,
    Quad: Quad
}


type Tool = shapeType | "Select";

export class DrawController {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;



    private shapes: Shape[] = [];
    private previewShape: Shape | null = null;
    private isdrawing: boolean = false;
    private startCoordinates: { startX: number, startY: number } | null = null;

    // variables for selection and moving
    private selectedShape: Shape | null = null;
    private isDragging: boolean = false;
    private offsetCoords: { offsetX: number, offsetY: number } | null = null;
    

    private selectedTool: Tool | null = null;


    // Creating the Bound mouse events functions, do read about "this" and "bind" online or on google docs...

    // we have to understand the concept of bind and this in js oops, and How "this" looses the context when passsed as a callback function.
    // Additionally, we have to make sure that when we call the addEventlistener and removeEventlistener, would require the exact reference of 
    // callback function

    // So these functions are only for the reference for the eventlistener's callback fucntiosn.

    private boundHandleMouseMove: (event: MouseEvent) => void;
    private boundHandleMouseUp: (event: MouseEvent) => void;
    private boundHandleMouseDown: (event: MouseEvent) => void;




    constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Canvas Context is set!!!!");
        }

        this.ctx = context;

        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseUp = this.handleMouseUp.bind(this);
        this.boundHandleMouseDown = this.handleMouseDown.bind(this);

        this.attachEventlistener();
    }


    private attachEventlistener(): void {
        this.canvas.addEventListener("mousedown", this.boundHandleMouseDown);
        this.canvas.addEventListener("mousemove", this.boundHandleMouseMove);
        window.addEventListener('mouseup', this.boundHandleMouseUp);
    }

    private removeEventlistener(): void {
        this.canvas.removeEventListener("mousedown", this.boundHandleMouseDown);
        this.canvas.removeEventListener("mousemove", this.boundHandleMouseMove);
        window.removeEventListener("mouseup", this.boundHandleMouseUp);
    }


    private getPosition(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect(); // Refer Google Docs for better understanding...
        const x = e.clientX - rect.x;
        const y = e.clientY - rect.y;
        return { x, y };
    }



    private handleMouseDown(event: MouseEvent): void {
        if (this.selectedTool === null) return;

        const { x, y } = this.getPosition(event);
        

        if (this.selectedTool === "Select") {

            for (let i = this.shapes.length - 1; i >= 0; i--) {
                if (this.shapes[i].isSelected(x, y)) {
                    this.selectedShape = this.shapes[i];
                    this.isDragging = true;

                    const offsetX = x - this.shapes[i].x;
                    const offsetY = y - this.shapes[i].y;

                    this.offsetCoords = { offsetX, offsetY };
                    break;
                }
            }

            // Calling draw() to draw the selection around the shape...
            this.draw();

        } else if (this.selectedTool !== null) {

            // Setting these only if we are drawing the shape
            this.startCoordinates = { startX: x, startY: y }
            this.isdrawing = true;
            this.previewShape = null;
        }
    }


    private handleMouseMove(event: MouseEvent): void {
        const currentPos = this.getPosition(event);
        
        if (this.isDragging && this.selectedShape && this.offsetCoords) {
            this.selectedShape.x = currentPos.x - this.offsetCoords.offsetX;
            this.selectedShape.y = currentPos.y - this.offsetCoords.offsetY;
            this.draw();
        } else if (this.isdrawing && this.selectedTool !== "Select" && this.selectedTool !== null && this.startCoordinates) {

            // If we are creating the shape then this
            const width = currentPos.x - this.startCoordinates.startX;
            const height = currentPos.y - this.startCoordinates.startY;
            const constructor = shapeConstructors[this.selectedTool];
            if (constructor) {
                const shape = new constructor(this.startCoordinates.startX, this.startCoordinates.startY, width, height);

                this.previewShape = shape;

                this.draw();
            }
        }
    }


    private handleMouseUp(event: MouseEvent): void {
        if (this.isDragging) {
            this.isDragging = false;
            this.offsetCoords = null;
            this.draw();

        }
        else if (this.isdrawing && this.startCoordinates && this.selectedTool !== "Select" && this.selectedTool !== null) {
           
            const currentPos = this.getPosition(event);
            const width = currentPos.x - this.startCoordinates.startX;
            const height = currentPos.y - this.startCoordinates.startY;

            const constructor = shapeConstructors[this.selectedTool];

            if (constructor) {

                if (width !== 0 && height !== 0) {
                    const shape = new constructor(this.startCoordinates.startX, this.startCoordinates.startY, width, height);

                    this.shapes.push(shape);

                }
            }

            this.isdrawing = false;
            this.previewShape = null;
            this.startCoordinates = null;

            this.draw();
        } else {
            this.isdrawing = false;
            this.isDragging = false;
        }

        
    }


    private draw(): void {
        if (!this.canvas || !this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.map((shape) => (
            shape.draw(this.ctx)
        ));

        if (this.previewShape) {
            this.previewShape.draw(this.ctx);
        }
    }



    public destroy() {
        this.removeEventlistener();
    }


    public setDimension(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.draw();
    }

    public setSelectedTool(tool: shapeType | "Select" | null) {
        this.selectedTool = tool;
    }



}