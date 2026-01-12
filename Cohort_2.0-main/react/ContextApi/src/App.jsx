import React from "react";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = (props) => {
  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  
  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default App;
