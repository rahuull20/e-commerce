import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const Login=()=>{
const [email,setEmail]=React.useState('');
const [password,setPassword]=React.useState('');
const navigate= useNavigate();
useEffect(()=>{//to ensure by writting in url /login it not redirect after logged in
    const auth= localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
})

const handleLogin=async()=>{
    console.warn("email,password",email,password);
    //integrate with backend
    let result = await fetch("http://localhost:5000/login", {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    result= await result.json();
    console.warn(result);
    if(result.auth){//if auth token is there then user is logged in(cause of jwt)
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));//stores auth in token file in localstorage
        navigate('/');
    }
    else{
        alert("please enter connect details");
    }
}

    return(
        <div className='login'>
            <h1>Login</h1>
            <input className='inputbox' type="text" placeholder='Enter Email'
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input className='inputbox' type="password" placeholder='Enter password'
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handleLogin} className="appbutton" type="button">Login</button>
            </div>
    )
}
export default Login;