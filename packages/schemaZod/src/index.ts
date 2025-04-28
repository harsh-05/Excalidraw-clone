import { z } from "zod";


export const shapeTypeEnum = z.enum(["Rectangle", "Circle", "Line", "Quad"]);

export type shapeType = z.infer<typeof shapeTypeEnum>;