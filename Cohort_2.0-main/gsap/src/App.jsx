import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  useGSAP(() => {
    gsap.set(".imgDiv", { scale: 0.2 });
    gsap.set(".content", { gap: "60rem" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2",
        start: "top top",
        end: "top -100%",
        scrub: true,
        markers: true,
        pin: true,
      },
    });

    tl.to(".imgDiv", {
      scale: 1,
    }).to(
      ".content",
      {
        gap: "1.85rem",
      },
      "<",
    );
  });

  return (
    <>
      <div className="page1"></div>
      <div className="page2">
        <div className="content">
          <h1>PIYUSH</h1>
          <h1>SIROLIA</h1>
        </div>
        <div className="imgDiv">
          <img
            src="https://images.unsplash.com/photo-1783716549682-5f945bb5f47e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="page3"></div>
    </>
  );
}

export default App;
