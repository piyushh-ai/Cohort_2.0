import React from "react";

const Form = () => {
  return (
    <div className="flex  justify-between h-[115vh] w-full text-black bg-[#F2EBE8] ">
      <div
        style={{ fontFamily: `Helvetica` }}
        className="form h-full border w-[70%] px-10 py-8"
      >
        <div className="text w-[35%] ">
          <h1 className="text-4xl mb-2">Are you a barber or salon owner?</h1>
          <p className="mb-3">
            Our products need to be tried to full understand why everyone is
            raving.
          </p>
          <p>
            Get in touch for info on how to impress your customers with a truly
            impressive product.
          </p>
        </div>
        <div className="form py-15  flex flex-col w-full  items-start text-black gap-5">
          <div className="w-full">
            <h1 className="text-2xl">Full name:</h1>
            <input className="w-full border outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" type="text" placeholder="Jane Smith" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl">Email:</h1>
            <input className="w-full border outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" type="text" placeholder="Jane@farmer.com" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl">Phone:</h1>
            <input className="w-full border outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" type="text" placeholder="08521495970" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl">Business name:</h1>
            <input className="w-full border outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" type="text" placeholder="Business name here" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl">Country:</h1>
            <input className="w-full border outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" type="text" placeholder="Enter country name" />
          </div>
          <div className="w-full">
            <h1 className="text-2xl">Message</h1>
            <textarea className="w-full border h-50 outline-none px-2 py-2 mt-1.5 borber-1 placeholder:font-sans placeholder:font-bold placeholder:text-md" name="" placeholder="Type message here" id=""></textarea>
          </div>
          <button className="button px-2 py-0.5 border font-sans"> Submit</button>
        </div>
      </div>
      <div className="images border h-full w-[30%]">
        <div className="border h-[33.3%] w-full">
          <img
            className="h-full w-full object-bottom object-cover"
            src="https://framerusercontent.com/images/5x4tkSXsNHjuBWt5YTCdNRPjcw.png?scale-down-to=1024&width=1452&height=1216"
            alt=""
          />
        </div>
        <div className="border h-[33.3%] w-full">
          <img
            className="h-full w-full object-bottom object-cover"
            src="https://framerusercontent.com/images/ZKvrfwtz48vSpBn30PqtvnVyLI.png?scale-down-to=1024&width=1452&height=1212"
            alt=""
          />
        </div>
        <div className="border h-[33.3%] w-full">
          <img
            className="h-full w-full object-bottom object-cover"
            src="https://framerusercontent.com/images/FaD2guxxjKcZ6eEhPoaJ03qg9ts.png?scale-down-to=1024&width=1452&height=1216"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
