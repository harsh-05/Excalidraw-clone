import { shapeType } from "@repo/schemazod"

export type SelectTools = shapeType | "Select" | "Eraser";




export enum ResizeHandleEnum {
    Top_Left = "tl",
    Top_right = "tr",
    Bottom_left = "bl",
    Bottom_right = "br"
}


export type Handle = {
    type: ResizeHandleEnum,
    x: number, 
    y: number,
    width: number,
    height: number
}

export interface props  {
    fillColor: string;
    strokeColor: string;

}

export const DEFAULT_PROPS: props =  { 
    fillColor: "transparent",
    strokeColor: "#1e1e1e"
}