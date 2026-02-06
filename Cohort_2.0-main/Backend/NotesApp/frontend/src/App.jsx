import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetcheAllNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((hihi) => {
      setNotes(hihi.data.notes);
    });
  };

  useEffect(() => {
    fetcheAllNotes();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res);
        fetcheAllNotes();
      });
    title.value = "";
    description.value = "";
  };

  const deleteHandler = (id) => {
    axios.delete("http://localhost:3000/api/notes/" + id).then((res) => {
      console.log(res);
      fetcheAllNotes();
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center px-4 py-10">
      {/* Form */}
      <form
        onSubmit={(e) => {
          handlesubmit(e);
        }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 text-center tracking-wide">
          Create a Note
        </h2>

        <input
          type="text"
          placeholder="Note title..."
          name="title"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          type="text"
          placeholder="Note description..."
          name="description"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
        >
          Create Note ✍️
        </button>
      </form>

      {/* Notes List */}
      <div className="w-full max-w-md mt-10 space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all flex items-start justify-between gap-4"
          >
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold text-slate-100 wrap-break-word">
                {note.title}
              </h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed wrap-break-word">
                {note.description}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                deleteHandler(note._id);
              }}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium
               bg-red-500/10 text-red-400 border border-red-500/20
               hover:bg-red-500 hover:text-white
               transition-all duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
