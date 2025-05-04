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



export class DrawController{

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;



    private shapes: Shape[] = [];
    private previewShape: Shape | null = null;
    private isdrawing: boolean = false;
    private startCoordinates: { startX: number, startY: number } | null = null;
    
    
    private selectedTool: shapeType | null = null;


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

    public destroy() {
        this.removeEventlistener();
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
        this.isdrawing = true;
        const { x, y } = this.getPosition(event);

        this.startCoordinates = { startX: x, startY: y }
        this.previewShape = null;
    }

    
    private handleMouseMove(event: MouseEvent): void {
        
        if (!this.isdrawing || !this.startCoordinates || this.selectedTool === null) return;

        const currentPos = this.getPosition(event);
        const width = currentPos.x - this.startCoordinates.startX;
        const height = currentPos.y - this.startCoordinates.startY;

        const constructor = shapeConstructors[this.selectedTool];
        if (constructor) {
            const shape = new constructor(this.startCoordinates.startX, this.startCoordinates.startY, width, height);

            this.previewShape = shape;
            
            this.draw();
        }
    }


    private handleMouseUp(event: MouseEvent): void {
        if (!this.isdrawing || !this.startCoordinates || this.selectedTool === null) {
            this.isdrawing = false;
            return;
        }

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
    }


    private draw():void {
        if (!this.canvas || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.map((shape) => (
            shape.draw(this.ctx)
        ));

        if (this.previewShape) {
            this.previewShape.draw(this.ctx);
        }
    }


    public setDimension(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.draw();
    }


   
}