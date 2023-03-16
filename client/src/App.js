import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Browse from "./components/Browse";

function App() {
  return (
    <Router>
      <div className={"flex h-screen w-screen bg-gray-800 flex-wrap justify-center"}>
          <Routes>
            <Route path={"/"} element={<Home/>} />
            <Route path={"/login"} element={<Login/>} />
              <Route path={"/browse"} element={<Browse/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
