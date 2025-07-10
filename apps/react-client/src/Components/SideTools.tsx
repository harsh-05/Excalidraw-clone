import { useState } from "react";
import { DEFAULT_PROPS, props } from "../types/types";
import { DrawController } from "../controllers/drawcontroller";

export default function SideTools({ drawController }: { drawController: React.RefObject<DrawController | null>}) {
  const [inputVal, setInputVal] = useState(100);
  const [prop, setProp] = useState<props>(DEFAULT_PROPS);

  return (
    <aside className="fixed left-3 top-1/2 -translate-y-1/2 h-[36rem] overflow-y-auto scroll w-[12.5rem] p-3 rounded-md bg-white shadow-md flex flex-col gap-4">
      
      {/* Stroke Color Buttons */}

      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Stroke
        </h3>
        <div className="">
          <button
            onClick={() => {
              const newProp = { ...prop, strokeColor: "#1e1e1e" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#1e1e1e] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, strokeColor: "#e03131" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#e03131] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, strokeColor: "#2f9e44" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#2f9e44] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, strokeColor: "#1971c2" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#1971c2] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, strokeColor: "#f08c00" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#f08c00] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
        </div>
      </div>
        
      {/* Background Color Buttons */}
      
      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Background
        </h3>
        <div className="">
          <button
            onClick={() => {
              const newProp = { ...prop, fillColor: "transparent" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[repeating-conic-gradient(#fff_0deg_90deg,#ccc_0deg_180deg)]
    bg-[size:1rem_1rem] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, fillColor: "#ffc9c9" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#ffc9c9] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, fillColor: "#b2f2bb" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#b2f2bb] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, fillColor: "#a5d8ff" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#a5d8ff] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
          <button
            onClick={() => {
              const newProp = { ...prop, fillColor: "#ffec99" };
              setProp(newProp);
              drawController.current?.setProps(newProp);
            }}
            className="bg-[#ffec99] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
          ></button>
        </div>
      </div>

      {/* add a state to change the bg color while button is selected and hover should not change that color */}
      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Fill
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <HachureIcon className="w-[1rem] h-[1rem]" />
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <CrossHatch className="w-[1rem] h-[1rem]" />
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <Solid className="w-[1rem] h-[1rem]" />
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Stroke Width
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <Stroke />
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <Stroke strokeWidth="2.5" />
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <Stroke strokeWidth="3.75" />
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Stroke Style
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <Stroke />
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g stroke-width="2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12h2"></path>
                <path d="M17 12h2"></path>
                <path d="M11 12h2"></path>
              </g>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g stroke-width="2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 12v.01"></path>
                <path d="M8 12v.01"></path>
                <path d="M12 12v.01"></path>
                <path d="M16 12v.01"></path>
                <path d="M20 12v.01"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Sloppiness
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 20 20"
              className=""
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M2.5 12.038c1.655-.885 5.9-3.292 8.568-4.354 2.668-1.063.101 2.821 1.32 3.104 1.218.283 5.112-1.814 5.112-1.814"
                stroke-width="1.25"
              ></path>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 20 20"
              className=""
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M2.5 12.563c1.655-.886 5.9-3.293 8.568-4.355 2.668-1.062.101 2.822 1.32 3.105 1.218.283 5.112-1.814 5.112-1.814m-13.469 2.23c2.963-1.586 6.13-5.62 7.468-4.998 1.338.623-1.153 4.11-.132 5.595 1.02 1.487 6.133-1.43 6.133-1.43"
                stroke-width="1.25"
              ></path>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 20 20"
              className=""
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M2.5 11.936c1.737-.879 8.627-5.346 10.42-5.268 1.795.078-.418 5.138.345 5.736.763.598 3.53-1.789 4.235-2.147M2.929 9.788c1.164-.519 5.47-3.28 6.987-3.114 1.519.165 1 3.827 2.121 4.109 1.122.281 3.839-2.016 4.606-2.42"
                stroke-width="1.25"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
          Edges
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 20 20"
              className=""
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <svg stroke-width="1.5">
                <path d="M3.33334 9.99998V6.66665C3.33334 6.04326 3.33403 4.9332 3.33539 3.33646C4.95233 3.33436 6.06276 3.33331 6.66668 3.33331H10"></path>
                <path d="M13.3333 3.33331V3.34331"></path>
                <path d="M16.6667 3.33331V3.34331"></path>
                <path d="M16.6667 6.66669V6.67669"></path>
                <path d="M16.6667 10V10.01"></path>
                <path d="M3.33334 13.3333V13.3433"></path>
                <path d="M16.6667 13.3333V13.3433"></path>
                <path d="M3.33334 16.6667V16.6767"></path>
                <path d="M6.66666 16.6667V16.6767"></path>
                <path d="M10 16.6667V16.6767"></path>
                <path d="M13.3333 16.6667V16.6767"></path>
                <path d="M16.6667 16.6667V16.6767"></path>
              </svg>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g
                stroke-width="1.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 12v-4a4 4 0 0 1 4 -4h4"></path>
                <line x1="16" y1="4" x2="16" y2="4.01"></line>
                <line x1="20" y1="4" x2="20" y2="4.01"></line>
                <line x1="20" y1="8" x2="20" y2="8.01"></line>
                <line x1="20" y1="12" x2="20" y2="12.01"></line>
                <line x1="4" y1="16" x2="4" y2="16.01"></line>
                <line x1="20" y1="16" x2="20" y2="16.01"></line>
                <line x1="4" y1="20" x2="4" y2="20.01"></line>
                <line x1="8" y1="20" x2="8" y2="20.01"></line>
                <line x1="12" y1="20" x2="12" y2="20.01"></line>
                <line x1="16" y1="20" x2="16" y2="20.01"></line>
                <line x1="20" y1="20" x2="20" y2="20.01"></line>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem]  font-normal font-sans tracking-wide">
          Opacity
        </h3>
        <div className="relative">
          <input
            onChange={(e) => setInputVal(+e.target.value)}
            type="range"
            min={"0"}
            max={"100"}
            step={"10"}
            value={inputVal}
            className=" slider "
            style={
              { "--slider-progress": `${inputVal}%` } as React.CSSProperties
            }
          />
          <div className="text-[0.724rem] font-normal font-sans absolute top-6 right-0">
            {inputVal}
          </div>
          <div className="text-[0.724rem]  font-normal font-sans absolute top-6 left-1">
            0
          </div>
        </div>
      </div>

      <div className="">
        <h3 className="text-[0.724rem] mb-2 mt-2 font-normal font-sans tracking-wide">
          Layers
        </h3>
        <div className=" flex space-x-2.5">
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "rotate(180deg)" }}
            >
              <g stroke-width="1.5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 10l0 10"></path>
                <path d="M12 10l4 4"></path>
                <path d="M12 10l-4 4"></path>
                <path d="M4 4l16 0"></path>
              </g>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "rotate(180deg)" }}
            >
              <g stroke-width="1.5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M16 9l-4 -4"></path>
                <path d="M8 9l4 -4"></path>
              </g>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g stroke-width="1.5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M16 9l-4 -4"></path>
                <path d="M8 9l4 -4"></path>
              </g>
            </svg>
          </button>
          <button className="bg-[#f6f6f9] hover:bg-[#f1f0ff] active:bg-[#e0dfff] rounded-md w-8 h-8 flex justify-center items-center">
            <svg
              width={"1rem"}
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
              className=""
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g stroke-width="1.5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 10l0 10"></path>
                <path d="M12 10l4 4"></path>
                <path d="M12 10l-4 4"></path>
                <path d="M4 4l16 0"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

function HachureIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      className={`${className}`}
    >
      <path
        d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
        stroke="currentColor"
      />
      <mask
        id="FillHachureIconReact"
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={16}
        height={16}
        style={{ maskType: "alpha" }}
      >
        <path
          d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
          fill="white"
          stroke="currentColor"
          strokeWidth={1.25}
        />
      </mask>
      <g mask="url(#FillHachureIconReact)">
        <path
          d="M2.258 15.156 15.156 2.258M7.324 20.222 20.222 7.325m-20.444 5.35L12.675-.222m-8.157 18.34L17.416 5.22"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function CrossHatch({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 20 20"
      className={`${className}`}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g clip-path="url(#a)">
        <path
          d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
          stroke="currentColor"
          stroke-width="1.25"
        ></path>
        <mask
          id="FillCrossHatchIcon"
          maskUnits="userSpaceOnUse"
          x="-1"
          y="-1"
          width="22"
          height="22"
          style={{ maskType: "alpha" }}
        >
          <path
            d="M2.426 15.044 15.044 2.426M7.383 20 20 7.383M0 12.617 12.617 0m-7.98 17.941L17.256 5.324m-2.211 12.25L2.426 4.956M20 12.617 7.383 0m5.234 20L0 7.383m17.941 7.98L5.324 2.745"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </mask>
        <g mask="url(#FillCrossHatchIcon)">
          <path
            d="M14.121 2H5.88A3.879 3.879 0 0 0 2 5.879v8.242A3.879 3.879 0 0 0 5.879 18h8.242A3.879 3.879 0 0 0 18 14.121V5.88A3.879 3.879 0 0 0 14.121 2Z"
            fill="currentColor"
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Solid({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 20 20"
      className={`${className}`}
      fill="currentColor"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g clip-path="url(#a)">
        <path
          d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z"
          stroke="currentColor"
          stroke-width="1.25"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Stroke({ strokeWidth = "1.25" }: { strokeWidth?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 20 20"
      className=""
      width={"1rem"}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M4.167 10h11.666"
        stroke="currentColor"
        stroke-width={`${strokeWidth}`}
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}
