import react from "react";
import {useState,useEffect} from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

const Home = () => {
     return (
         <>
             <Router>
                 <div className={"flex pt-[4.5vw] h-screen w-screen bg-gray-800 flex-wrap justify-center"}>
                     <Routes>
                         <Route path={"/"} element={<Browse/>} />
                         <Route path={"/login"} element={<Login/>} />
                     </Routes>
                 </div>
                 <Navbar/>
             </Router>
         </>
     )
}
export default Home;