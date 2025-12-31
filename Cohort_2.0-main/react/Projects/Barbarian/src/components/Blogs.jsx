import React from "react";

const Blogs = () => {
  return (
    <div className="h-[70vh] w-full bg-[#F2EBE8]">
      <div className="h-[85%] pt-5 w-full flex ">
        <div
          style={{
            background: `url(https://framerusercontent.com/images/luwGcMGAulrxLdeegJ9PVTnP7kM.jpg?scale-down-to=1024&width=4128&height=6192`,
            backgroundPosition: "center",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            fontFamily: "Helvetica",
          }}
          className="h-full w-full transition-all duration-300 ease-in-out "
        >
          <div
            className=" group h-full w-full relative cursor-pointer
             flex justify-center items-center
             
             bg-transparent 
             hover:bg-linear-to-t
             hover:from-black/80 hover:from-20%
             hover:to-white/0 hover:to-100% "
          >
            <div className="absolute bottom-15 text-white">
              <p className="text-lg pb-2 font-sans font-medium">31 Oct 2025</p>
              <h1 className="text-4xl">The Magnanimous Project</h1>

              <button className=" cursor-pointer group-hover:bg-white group-hover:text-black mt-6  border px-2 py-1 font-sans font-medium text-md">
                Read full post
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            background: `url(https://framerusercontent.com/images/54SDTSZv1FPM9U0FM3gOqtNfJw.jpg?scale-down-to=4096&width=4000&height=6000)`,
            backgroundPosition: "center",
            fontFamily: "Helvetica",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-full w-full "
        >
          <div
            className="group h-full w-full relative cursor-pointer
             flex justify-center items-center
             transition-all duration-3000 ease-in-out
             bg-transparent
             hover:bg-linear-to-t
             hover:from-black/80 hover:from-20%
             hover:to-white/0 hover:to-100%"
          >
            <div className="absolute bottom-15 text-white">
              <p className="text-lg pb-2 font-sans font-medium">24 Sep 2024</p>
              <h1 className="text-4xl">Jeff & The Barberian Man</h1>
              <button className="cursor-pointer group-hover:bg-white group-hover:text-black mt-6 border px-2 py-1 font-sans font-medium text-md">
                Read full post
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            background: `url(https://framerusercontent.com/images/ZbeXMUoZm8H73R7a6YhrDMiaKWA.webp?width=1024&height=683`,
            backgroundPosition: "center",
            fontFamily: "Helvetica",

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-full w-full "
        >
          <div
            className="group h-full w-full relative cursor-pointer
             flex justify-center items-center
             transition-all duration-3000 ease-in-out
             bg-transparent
             hover:bg-linear-to-t
             hover:from-black/80 hover:from-20%
             hover:to-white/0 hover:to-100%"
          >
            <div className="absolute bottom-15 text-white px-20">
              <p className="text-lg pb-2 font-sans font-medium">14 Aug 2024</p>
              <h1 className="text-3xl">
                Jorge Viota & Barberian Men's Grooming
              </h1>
              <button className="cursor-pointer group-hover:bg-white group-hover:text-black mt-6 border px-2 py-1 font-sans font-medium text-md">
                Read full post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[15%] border bg-[#F2EBE8] text-black w-full flex items-center justify-center">
        <button className="button mb-3.5 cursor-pointer group-hover:bg-white group-hover:text-black mt-6 border px-2 py-1 font-sans font-medium text-md">
          Read full post
        </button>
      </div>
    </div>
  );
};

export default Blogs;
