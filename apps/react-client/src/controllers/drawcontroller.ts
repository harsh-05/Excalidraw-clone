import { shapeType } from "@repo/schemazod";


export class DrawController{

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;



    private shapes: shapeType[] = [];
    private previewShape: shapeType | null = null;
    private isdrawing: boolean = false;
    private startCoordinates: { starx: number, starty: number } | null = null;
    
    
    private selectedTool: shapeType | null = null;


    // Creating the Bound mouse events functions, do read about "this" and "bind" online or on google docs...

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
        this.canvas.removeEventListener("mouseup", this.boundHandleMouseUp);
    }
    

    
    private handleMouseDown(event: MouseEvent): void {

    }

    
    private handleMouseMove(event: MouseEvent): void {

    }


    private handleMouseUp(event: MouseEvent): void {

    }


   
}