import { PiCircle, PiDiamond, PiEraser, PiRectangle } from "react-icons/pi";
import { DrawController } from "../controllers/drawcontroller";
import { SelectTools } from "../types/types";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { LuMousePointer } from "react-icons/lu";


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
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-2 flex justify-center gap-5 shadow-lg rounded-lg bg-white ">
        <button
          className={`${selectedtool === "Select" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Select", setSelectedTool, drawController);
          }}
        >
          <LuMousePointer />
        </button>
        <button
          className={`${selectedtool === "Circle" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Circle", setSelectedTool, drawController);
          }}
        >
          <PiCircle />
        </button>
        <button
          className={`${selectedtool === "Rectangle" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Rectangle", setSelectedTool, drawController);
          }}
        >
          <PiRectangle />
        </button>
        <button
          className={`${selectedtool === "Line" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Line", setSelectedTool, drawController);
          }}
        >
          <TfiLayoutLineSolid />
        </button>
        <button
          className={`${selectedtool === "Quad" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Quad", setSelectedTool, drawController);
          }}
        >
          <PiDiamond />
        </button>
        <button
          className={`${selectedtool === "Eraser" ? "bg-purple-300" : ""} text-xl hover:bg-purple-100 rounded-md p-2`}
          onClick={() => {
            handletoolSelect("Eraser", setSelectedTool, drawController);
          }}
        >
          <PiEraser />
        </button>
      </div>
    );
}

function handletoolSelect(
  tool: SelectTools,
  setSelectedTool: React.Dispatch<React.SetStateAction<SelectTools | null>>,
  drawController: React.RefObject<DrawController | null>
) {
  setSelectedTool(tool);
  drawController.current?.setSelectedTool(tool);
}