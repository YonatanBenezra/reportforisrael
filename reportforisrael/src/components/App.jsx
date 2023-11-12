import { Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import Navbar from "./navbar/Navbar";
import Home from "./Home/Home";
import HowTo from "./howTo/HowTo";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<Home></Home>} exact />
        <Route path="/howto" element={<HowTo></HowTo>} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
