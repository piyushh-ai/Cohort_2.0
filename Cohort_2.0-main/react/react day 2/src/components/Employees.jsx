import React from "react";

const Employees = () => {
  return (
    <div className="flex items-center w-full gap-2.5 justify-between  text-white">
      <div className="flex items-center justify-start pl-20 w-full   ">
        <div>
          <h1 className="text-2xl uppercase">designers</h1>
          <h1 className="text-6xl">150+</h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-full   ">
        <div>
          <h1 className="text-2xl uppercase">clients</h1>
          <h1 className="text-6xl">500+</h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-full   ">
        <div>
          <h1 className="text-2xl uppercase">masterpieces</h1>
          <h1 className="text-6xl">20k+</h1>
        </div>
      </div>
      <div className="flex items-center justify-end pr-20 w-full   ">
        <div>
          <h1 className="text-2xl uppercase">events</h1>
          <h1 className="text-6xl">50+</h1>
        </div>
      </div>
    </div>
  );
};

export default Employees;
