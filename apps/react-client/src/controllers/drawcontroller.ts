import { shapeType } from "@repo/schemazod";
import Shape from "../shapes/shape";
import Rectangle from "../shapes/rectangle";
import Circle from "../shapes/circle";
import Line from "../shapes/line";
import Quad from "../shapes/quad";
import { DEFAULT_PROPS, props, ResizeHandleEnum, SelectTools } from "../types/types";



type ShapeConstructor = new (
    x: number, y: number, width: number, height: number, prop:props
) => Shape;

const shapeConstructors: Record<shapeType, ShapeConstructor> = {
    Rectangle: Rectangle,
    Circle: Circle,
    Line: Line,
    Quad: Quad
}


//type Tool = shapeType | "Select";

export class DrawController {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;


    //Selection Visualization buffer 
    private readonly buffer = 8;
    //Resizing properties......
    private isResizing: boolean = false;
    private resizeHandleType: ResizeHandleEnum | null = null;
    private resizeShapeCoordinates: { x1: number, x2: number, y1: number, y2: number } | null = null;

    // Property of Erasing the shapes....


    private isErasing: boolean = false;

    // Properties for drawing a new shapes......
    private shapes: Shape[] = [];
    private previewShape: Shape | null = null;
    private isdrawing: boolean = false;
    private startCoordinates: { startX: number, startY: number } | null = null;

    // variables for selection and moving
    private selectedShape: Shape | null = null;
    private isDragging: boolean = false;
    private offsetCoords: { offsetX: number, offsetY: number } | null = null;
    

    private selectedTool: SelectTools | null = null;


    // extra tools for styling the shapes

    private prop = DEFAULT_PROPS;
    
    private callbackProp?: (prop: props) => void

    public setCallbackProp(callback: (prop: props) => void) {
        this.callbackProp = callback;
    }

    public setProps(prop: props) { 
        if (this.selectedShape !== null) {
            this.selectedShape.prop = { ...this.selectedShape.prop, ...prop };
            this.draw();

        }  
            this.prop = { ...this.prop, ...prop };
        

        if(this.callbackProp !== undefined) this.callbackProp(prop);
        

    }


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


        // handling the eraser functionality here while clicked.
        if (this.selectedTool === "Eraser") {
            this.isErasing = true;
           
            for (let i = this.shapes.length - 1; i >= 0; i--) {
              
                if (this.shapes[i].hitDetectionEraser(x, y, this.ctx)) {
                   
                    this.shapes.splice(i, 1);
                    this.draw();
                    break;
                }
            }

            return;

        }

        if (this.selectedTool === "Select" && this.selectedShape !== null) {
            const handle = this.selectedShape.detectResizeHandle(x, y, this.buffer);
            if (handle !== null) {
                this.isResizing = true;
                this.resizeHandleType = handle;

                const x1 = Math.min(this.selectedShape.x, this.selectedShape.x + this.selectedShape.width);
                const x2 = Math.max(this.selectedShape.x, this.selectedShape.x + this.selectedShape.width);
                const y1 = Math.min(this.selectedShape.y, this.selectedShape.y + this.selectedShape.height);
                const y2 = Math.max(this.selectedShape.y, this.selectedShape.y + this.selectedShape.height);

                this.resizeShapeCoordinates = { x1, y1, x2, y2 };
                
                return;
            }
        }
        
        this.selectedShape = null;
        this.isDragging = false;
        this.offsetCoords = null;
        this.resizeHandleType = null;
        this.isResizing = false;
        this.isErasing = false;
       

        if (this.selectedTool === "Select") {
            
            let foundShape:boolean = false;
            for (let i = this.shapes.length - 1; i >= 0; i--) {
                if (this.shapes[i].isSelected(x, y)) {
                    foundShape = true;
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

            //setting the selected shape props to the SideTools.
            if (foundShape && this.callbackProp) {
                if (this.selectedShape)
                    this.callbackProp(this.selectedShape.prop);
            }

        } else if (this.selectedTool !== null) {

            // Setting these only if we are drawing the shape
            this.startCoordinates = { startX: x, startY: y }
            this.isdrawing = true;
            this.previewShape = null;
        } 
    }


    private handleMouseMove(event: MouseEvent): void {
        const currentPos = this.getPosition(event);
        // There is a bug in moving the shapes
        // When I create the shape and moved of this position, then if I try to erase it on the moved position it will not erase that shape, however 
        // when I try to erase the shape in previous location, then that shape will be erased. 
        // I need to rebuild the path again, with new coords.... will fix it later.
        if (this.isDragging && this.selectedShape && this.offsetCoords) {
            this.selectedShape.x = currentPos.x - this.offsetCoords.offsetX;
            this.selectedShape.y = currentPos.y - this.offsetCoords.offsetY;
            this.selectedShape.buildpath();
            this.draw();
        } else if (this.isdrawing && this.selectedTool !== "Select" && this.selectedTool !== "Eraser" && this.selectedTool !== null && this.startCoordinates) {

            // If we are creating the shape then this
            const width = currentPos.x - this.startCoordinates.startX;
            const height = currentPos.y - this.startCoordinates.startY;
            const constructor = shapeConstructors[this.selectedTool];
            if (constructor) {
                const shape = new constructor(this.startCoordinates.startX, this.startCoordinates.startY, width, height, this.prop);

                this.previewShape = shape;

                this.draw();
            }
        } else if (this.isResizing && this.resizeHandleType !== null && this.selectedShape && this.resizeShapeCoordinates) {
            this.selectedShape.resizeShape(currentPos.x, currentPos.y, this.resizeHandleType, this.buffer, this.resizeShapeCoordinates);
            this.draw();
        } else if (this.selectedTool === "Eraser" && this.isErasing) {
            for (let i = this.shapes.length - 1; i >= 0; i--) {
               
                if (this.shapes[i].hitDetectionEraser(currentPos.x, currentPos.y, this.ctx)) {
                   
                    this.shapes.splice(i, 1);
                    this.draw();
                    return;
                }
            }
        }
    }


    private handleMouseUp(event: MouseEvent): void {
        if (this.isDragging) {
            this.isDragging = false;
            this.offsetCoords = null;
            this.draw();

        }
        else if (this.isdrawing && this.startCoordinates && this.selectedTool !== "Select" && this.selectedTool !== "Eraser" && this.selectedTool !== null) {
           
            const currentPos = this.getPosition(event);
            const width = currentPos.x - this.startCoordinates.startX;
            const height = currentPos.y - this.startCoordinates.startY;

            const constructor = shapeConstructors[this.selectedTool];

            if (constructor) {

                if (width !== 0 && height !== 0) {
                    const shape = new constructor(this.startCoordinates.startX, this.startCoordinates.startY, width, height, this.prop);

                    this.shapes.push(shape);

                }
            }

            this.isdrawing = false;
            this.previewShape = null;
            this.startCoordinates = null;

            this.draw();
        } else if (this.isResizing && this.resizeHandleType) {
            this.isResizing = false;
            this.resizeHandleType = null;
        } else if (this.isErasing) {
            this.isErasing = false;
         }
        else {
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

        // --- Draw Selection Highlight ---
        if (this.selectedShape) {
            this.ctx.save(); // Save current context state, before applying the upcoming styles.
           
            this.ctx.strokeStyle = "blue";
            
           // const buffer = 8; // Padding around the selection visualization.
            const x = Math.min(this.selectedShape.x, this.selectedShape.x + this.selectedShape.width);
            const y = Math.min(this.selectedShape.y, this.selectedShape.y + this.selectedShape.height);
            const w = Math.abs(this.selectedShape.width);
            const h = Math.abs(this.selectedShape.height);

            this.ctx.strokeRect(x - this.buffer, y - this.buffer, w + this.buffer * 2, h + this.buffer * 2);
            

            //Drawing Resize Handles of the selected Shapes.....
            const handles = this.selectedShape.getResizeHandles(this.buffer);
            for (let handle of handles) {
                this.ctx.save();
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(handle.x, handle.y, handle.width, handle.height);
                this.ctx.strokeRect(handle.x, handle.y, handle.width, handle.height);
                this.ctx.restore();
            }

            this.ctx.restore();  // popping out the above set style from the context stack.
        }
    }



    public destroy() {
        this.removeEventlistener();
    }


    public setDimension(width: number, height: number) {
        
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

       

        this.draw();
       
    }

    public setSelectedTool(tool: SelectTools | null) {
        this.isDragging = false;
        this.selectedShape = null;
        this.offsetCoords = null;
        this.selectedTool = tool;
        this.draw();
        
        if (this.callbackProp)
            this.callbackProp(this.prop);
    }



}