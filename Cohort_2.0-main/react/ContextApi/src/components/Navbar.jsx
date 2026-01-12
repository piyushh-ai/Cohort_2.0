import { useContext } from "react";
import { themeContext } from "../Context/ThemeContext";


const Navbar = () => {

  const [theme, setTheme ] = useContext(themeContext)

  return <div>
      {theme}
        <button onClick={()=>{
          if (theme === "light"){
            setTheme("Dark")
          }else{
            setTheme("light")
          }
        }}>change theme</button>
  </div>;
};

export default Navbar;
