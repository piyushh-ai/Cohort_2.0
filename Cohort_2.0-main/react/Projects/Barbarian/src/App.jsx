import React from "react";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Stock from "./components/Stock.jsx";
import Founder from "./components/Founder.jsx";
import Blogs from "./components/Blogs.jsx";
import Form from "./components/Form.jsx";
import ScrollImg from "./components/ScrollImg.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stock/>
      <Founder/>
      <Blogs/>
      <Form/>
      <ScrollImg/>
      <Footer/>
    </div>
  );
};

export default App;
