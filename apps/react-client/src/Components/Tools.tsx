import { DrawController } from "../controllers/drawcontroller";
import { SelectTools } from "../types/types";


type ToolsProps = {
    selectedtool: SelectTools | null,
    setSelectedTool: React.Dispatch<React.SetStateAction<SelectTools | null>>,
    drawController: React.RefObject<DrawController | null>
  };

export default function Tools({
  selectedtool,
  setSelectedTool,
  drawController
}: ToolsProps) {
    return (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-2 flex justify-center gap-5 bg-red-300">
            <button
                className={`${selectedtool === "Select" ? "bg-gray-500" : ""}`}
                onClick={() => {
                    handletoolSelect("Select", setSelectedTool, drawController);
                }}
            >
                Select
            </button>
            <button
                className={`${selectedtool === "Circle" ? "bg-gray-500" : ""}`}
                onClick={() => {
                    handletoolSelect("Circle", setSelectedTool, drawController);
                }}
            >
                Circle
            </button>
            <button
                className={`${selectedtool === "Rectangle" ? "bg-gray-500" : ""}`}
                onClick={() => {
                    handletoolSelect("Rectangle", setSelectedTool, drawController);
                }}
            >
                Rectangle
            </button>
            <button
                className={`${selectedtool === "Line" ? "bg-gray-500" : ""}`}
                onClick={() => {
                    handletoolSelect("Line", setSelectedTool, drawController);
                }}
            >
                Line
            </button>
            <button
                className={`${selectedtool === "Quad" ? "bg-gray-500" : ""}`}
                onClick={() => {
                    handletoolSelect("Quad", setSelectedTool, drawController);
                }}
            >
                Quad
            </button>
        </div>);
}

function handletoolSelect(
  tool: SelectTools,
  setSelectedTool: React.Dispatch<React.SetStateAction<SelectTools | null>>,
  drawController: React.RefObject<DrawController | null>
) {
  setSelectedTool(tool);
  drawController.current?.setSelectedTool(tool);
}