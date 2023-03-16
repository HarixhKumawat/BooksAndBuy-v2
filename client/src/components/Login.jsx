import react from "react";
import {useState,useEffect} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formdata,setFormdata]=useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();

    const LoginF = async (e) =>{
        e.preventDefault();
        console.log(formdata)
        let response = await axios.post('http://localhost:7000/user/verify',formdata).catch((error)=>{
            console.log(error)
            alert("Invalid login")
        })

        if(response.data !== undefined && response.statusText === "OK"){
            console.log(response.data)
            sessionStorage.setItem("token",response.data.token);
            sessionStorage.setItem("pid",response.data.pid);
            navigate('/');
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
                alert('Already logged in!!');
                navigate('/Dashboard')
        }
    },[sessionStorage.getItem('token')]);


    return (
        <>
            <div className={"mt-40 p-10 h-max border rounded-md border-2 border-b-4 text-gray-200 border-orange-500"}>
                <form>
                    <label className="block">
                        <span className="block text-sm font-bold pb-2 ">Email</span>
                        <input
                            type="email"
                            className="pl-1 font-medium text-gray-800"
                            value={formdata.email}
                            onChange={(event)=>{
                                setFormdata({
                                    ...formdata,email:event.target.value
                                })
                            }}
                        />
                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                            Please provide a valid email address.
                        </p>
                    </label>
                    <label className="block">
                        <span className="block text-sm font-bold pb-2">Password</span>
                        <input
                            type="password"
                            className="pl-1 font-medium text-gray-800"
                            value={formdata.password}
                            onChange={(event)=>{
                                setFormdata({
                                    ...formdata,password:event.target.value
                                })
                            }}
                        />
                    </label>
                    <button className={"mt-8 p-2 text-sm hover:text-orange-300 font-bold rounded-md bg-orange-600 hover:bg-orange-900"} onClick={LoginF}>LOGIN</button>
                </form>
            </div>
        </>
    )
}
export default Login;