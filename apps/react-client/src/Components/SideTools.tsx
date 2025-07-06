
export default function SideTools() {
    return (
      <aside className="fixed left-3 top-1/2 -translate-y-1/2 h-4/5 w-[13.5%] p-3 rounded-md bg-white shadow-md">
        <div className="mb-3">
          <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
            Stroke
          </h3>
          <div className="">
            <button className="bg-[#1e1e1e] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#e03131] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#2f9e44] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#1971c2] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#f08c00] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
            Background
          </h3>
          <div className="">
            <button
              className="bg-[repeating-conic-gradient(#fff_0deg_90deg,#ccc_0deg_180deg)]
    bg-[size:1rem_1rem] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"
            ></button>
            <button className="bg-[#ffc9c9] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#b2f2bb] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#a5d8ff] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
            <button className="bg-[#ffec99] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 transform transition-transform duration-100 ease-out hover:scale-110"></button>
          </div>
        </div>

        {/* add a state to change the bg color while button is selected and hover should not change that color */}
        <div className="mb-3">
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

        <div className="mb-3">
          <h3 className="text-[0.724rem] mb-2 font-normal font-sans tracking-wide">
            Stroke Width
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