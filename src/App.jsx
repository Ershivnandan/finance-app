import { useLocation } from "react-router-dom";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Landing from "./components/landing/Landing";
import Navbar from "./components/navbar/Navbar";


function App() {
  const location = useLocation();
  let isLogin = false;

  if (location.pathname == "/login" || location.pathname == "/signup") {
    isLogin = true;
  } else {
    isLogin = false;
  }

  return (
    <>
    
      {isLogin ? "" : <Navbar />}
      <AllRoutes />
      
    </>
  );
}

export default App;
