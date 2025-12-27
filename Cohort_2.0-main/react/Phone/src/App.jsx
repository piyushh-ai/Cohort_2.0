import React, { useState } from "react";

const App = () => {
  const [nameInput, setNameInput] = useState("");
  const [numInput, setNumInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [allNum, setAllNum] = useState([]);

  function submitHandler(e) {
    e.preventDefault();

    const newAllNum = [...allNum];
    newAllNum.push({ nameInput, numInput, emailInput });

    

    setAllNum(newAllNum);
    setNameInput("");
    setNumInput("");
    setEmailInput("");
  }
  

  return (
    <div className="min-h-screen bg-[#0f0f12] px-10 py-14 text-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-[320px_1fr] gap-10">
        <form
          onSubmit={submitHandler}
          className="bg-[#16161d] p-7 rounded-2xl
                     shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                     flex flex-col gap-5 sticky top-10 h-fit"
        >
          <h2 className="text-2xl font-semibold tracking-wide">Add Contact</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
                       bg-[#0f0f12] border border-[#26262e]
                       placeholder-gray-500
                       focus:outline-none focus:border-gray-400 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
                       bg-[#0f0f12] border border-[#26262e]
                       placeholder-gray-500
                       focus:outline-none focus:border-gray-400 transition"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={numInput}
            onChange={(e) => setNumInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
                       bg-[#0f0f12] border border-[#26262e]
                       placeholder-gray-500
                       focus:outline-none focus:border-gray-400 transition"
          />

          <button
            type="submit"
            className="mt-2 py-3 rounded-lg
                       bg-linear-to-r from-gray-700 to-gray-600
                       hover:from-gray-600 hover:to-gray-500
                       transition font-medium tracking-wide"
          >
            Save Contact
          </button>
        </form>
        <div
          className="bg-[#16161d] rounded-2xl
             shadow-[0_20px_60px_rgba(0,0,0,0.6)]
             p-8 flex flex-col "
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-wide text-gray-100">
              Saved Contacts
            </h2>
            <span className="text-sm text-gray-400">{allNum.length} total</span>
          </div>
          <div
            className="flex-1 overflow-y-auto space-y-4 pr-2
               scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {allNum.length === 0 && (
              <div className="text-gray-500 text-sm italic">
                No contacts yet. Start by adding one on the left.
              </div>
            )}

            {allNum.map((contact, index) => (
              <div
                key={index}
                className="relative m-2 p-5 rounded-xl
                   bg-linear-to-br from-[#0f0f12] to-[#14141c]
                   border border-[#26262e]
                   hover:border-gray-500
                   transition-all duration-300
                   shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
              >
                <span className="absolute left-0 top-0 h-full w-0.75 bg-gray-600 rounded-l-xl" />

                <div className="pl-4 flex flex-col gap-1">
                  <h3 className="text-base font-semibold tracking-wide text-gray-100">
                    {contact.nameInput}
                  </h3>

                  <p className="text-sm text-gray-400 break-all">
                    ✉️ {contact.emailInput}
                  </p>

                  <p className="text-sm text-gray-300">📞 {contact.numInput}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
