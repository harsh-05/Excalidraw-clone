import { z } from "zod";


export const shapeTypeEnum = z.enum(["Rectangle", "Circle", "Line"]);

export type shapeType = z.infer<typeof shapeTypeEnum>;