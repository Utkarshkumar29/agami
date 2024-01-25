import React, { useEffect, useState } from "react";
import { RegisterContainer, RegisterWrapper } from "../../styles/register";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";

const Register=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [redirect,setRedirect]=useState(false)
    const role='User'

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await axios.post('/register',{name,email,password,role})
            const data=response.data
            setRedirect(true)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log(email)
    },[email])

    if(redirect){
        return <Navigate to='/home'/>
    }


    return(
        <RegisterContainer>
            <RegisterWrapper>
                <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"  placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="Submit">Register</button>
                <p>Already a user? <Link to='/login'>Click here</Link></p>
                </form>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Register