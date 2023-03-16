import react from "react";
import {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import logoo from './logoo.png'
const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const checker = async () => {
        if( sessionStorage.getItem("token") ){
            console.log("ues isr i ehziouhds")
            await setLogin(true)
            await setUsername( await sessionStorage.getItem("username"));
        } else {
            await setLogin(false)
        }
        console.log(login);
    }



    useEffect(()=>{
        window.addEventListener('storage', () => {
            checker();
        })
        checker();
        //window.location.reload(false);
    }, []);

    const navigate = useNavigate();

    const nevG = (e) => {
        navigate('/login')
    }
    return (
        <div style={{ zIndex:'1'}} className={"top-0 left-0 h-[4.5vw] bg-[#374f6b] p-1 text-white fixed w-full"}>
            <div className={"flex pl-8 font-bold text-[2.2vw]"}>
                <img src={logoo} className={"h-[5vw] m-0"}/>
                {login ? (<button onClick={(e) => alert(`you are logged in as ${username}`)} className={"pl-[75%]"} >{username}</button>) : (
                    <button value={"login"} className={"pl-[75%]"} onClick={(e) => nevG(e)}>Login</button>)}
            </div>
        </div>
    )
}
export default Navbar;