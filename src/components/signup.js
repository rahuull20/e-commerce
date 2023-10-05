import React from 'react';
import { useState,useEffect } from 'react';
//use state to get the value from the page
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    //3 states to get data
    const [name, setName] = useState(""); //1st empty state empty 2nd event
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    //after signup signup page access ni ho
    useEffect(()=>{
        const auth= localStorage.getItem('user'); 
        if(auth){
            navigate('/');//after signup cant come to sign up page again
        }
    })

    const collectData = async () => {//get all enter values
        console.warn(name, email, password);
        //integrate with backend
        let result = await fetch("http://localhost:5000/signup", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result))//stores data in localstorage to retriev it afterwards
        localStorage.setItem("token", JSON.stringify(result.auth))
        if (result) {
            navigate("/");//to open homepage after signup
        }

    }


    return (
        <div className='register'>
            <h1>Sign Up</h1>
            <input className='inputbox' type="text"
                value={name/*for empty state*/} onChange={(e) => setName(e.target.value/*value set in state*/)} placeholder='Enter Name' />

            <input className='inputbox' type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <input className='inputbox' type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button onClick={collectData} className='appbutton' type='button'>Sign Up</button>
        </div>
    )
}
export default Signup;