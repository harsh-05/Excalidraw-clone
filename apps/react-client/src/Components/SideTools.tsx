
export default function SideTools() {
    return (
      <aside className="fixed left-3 top-1/2 -translate-y-1/2 h-4/5 w-[13.5%] p-3 rounded-md bg-white shadow-md">
        <div>
          <div className="text-[0.7rem] mb-2 text-">Stroke</div>
          <div className="">
            <button className="bg-[#1e1e1e] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1 hover:w-[1.5rem] hover:h-[1.5rem]"></button>
            <button className="bg-[#e03131] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1"></button>
            <button className="bg-[#2f9e44] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1"></button>
            <button className="bg-[#1971c2] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1"></button>
            <button className="bg-[#f08c00] w-[1.4rem] h-[1.4rem] rounded-[0.24rem] mr-1"></button>
          </div>
        </div>
      </aside>
    );
}