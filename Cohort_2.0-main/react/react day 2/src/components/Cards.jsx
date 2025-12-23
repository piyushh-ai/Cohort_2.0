import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
const Cards = () => {
  let cards = [
    {
      name: "independency",
      desc: "Explore the creative of independency designers from around the globe.",
      btn: "learn more",
    },
    {
      name: "uniquity",
      desc: "Discover the charm of unique pieces the stand out effortlessly",
      btn: "learn more",
    },
    {
      name: "quality",
      desc: "Explore the creative of independency designers from around the globe.",
      btn: "learn more",
    },
    {
      name: "susrainability",
      desc: "Explore the creative of independency designers from around the globe.",
      btn: "learn more",
    },
  ];
  return (
    <>
      <div className="flex  w-full h-[20%] p-10 justify-between align-center gap-5">
        {cards.map((elem, idx) => {
          return (
            <div
              className="text-white py-8 px-10 w-100  bg-[#1E1E1E] rounded-2xl"
              key={idx}
            >
              <h1 className="text-4xl uppercase">{elem.name}</h1>
              <p className="capitalize mt-8 text-[18px] opacity-80">
                {elem.desc}
              </p>
              <div className="flex justify-start items-center mt-8 gap-3">
                <div className="text-white flex justify-center items-center border text-3xl h-10 w-10 bg-[#4b4d493a] font-extralight rounded-[50%]">
                  <RiArrowRightUpLine />{" "}
                </div>
                {elem.btn}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;
