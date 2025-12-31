import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("notes");

    if (savedTasks) {
      setAllTask(JSON.parse(savedTasks));
    }
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    const allNewTask = [...allTask];
    allNewTask.push({ title, desc });
    setAllTask(allNewTask);
    localStorage.setItem("notes", JSON.stringify(allNewTask));

    setTitle("");
    setDesc("");
  }

  const dltTast = (idx) => {
    const allNewTask = [...allTask];
    allNewTask.splice(idx, 1);
    setAllTask(allNewTask);
    localStorage.setItem("notes", JSON.stringify(allNewTask));
  };

  return (
    <div className="h-full p-5 w-full text-white bg-black">
      <div className="lg:flex justify-between ">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="lg:w-1/2 w-full flex-col flex gap-10 lg:px-20 py-10"
        >
          <h1 className="text-5xl font-bold">Add Notes</h1>

          <input
            className="border rounded text-xl outline-none px-5 py-3 "
            type="text"
            placeholder="Enter Notes Heading"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            className="border h-50 rounded text-xl outline-none px-5 py-3 "
            name=""
            placeholder="Write Details"
            id=""
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>

          <button className="rounded bg-white text-black px-2 py-3 font-bold text-2xl active:scale-95">
            Add Note
          </button>
        </form>

        <div className="lg:w-1/2 w-full flex-col lg:border-l flex gap-10 lg:px-20 lg:py-10 lg:h-[96vh]  overflow-auto ">
          <h1 className="text-5xl font-bold">Recent Notes</h1>

          <div className="flex flex-wrap gap-10 px-5 w-full items-center overflow-auto lg:justify-start justify-center ">
            {allTask.map(function (elem, idx) {
              return (
                <div
                  key={idx}
                
                  className="relative bg-white w-80 h-100 flex items-center justify-center bg-cover bg-center bg-[url(https://img.freepik.com/free-photo/notebook-blue-wood-table_1249-647.jpg?semt=ais_hybrid&w=740&q=80)] text-black rounded-xl"
                >
                  <div
                    className="absolute top-3 right-3 cursor-pointer 
                              bg-white/60 backdrop-blur-md 
                                p-2 rounded-full 
                                opacity-70 hover:opacity-100 
                               hover:bg-white 
                                transition-all active:scale-95"
                    onClick={() => {
                      dltTast(idx);
                    }}
                  >
                    <X size={30} color="#000000" strokeWidth={2} />
                  </div>
                  <div className=" pl-7 pt-15 h-[80%] w-[70%]">
                    <h2 className="text-[22px] font-extrabold leading-tight ">
                      {elem.title}
                    </h2>
                    <p className="pt-4 text-lg leading-tight">{elem.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
