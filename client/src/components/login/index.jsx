import React, { useEffect, useState } from "react";
import { RegisterContainer, RegisterWrapper } from "../../styles/register";
import axios from 'axios';
import { Navigate } from "react-router-dom";

const Login=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [redirect,setRedirect]=useState('')
    const [role,setRole]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await axios.post('/login',{email,password})
            const data=response.data
            setRedirect(true)
            setRole(data)
            console.log(data.role)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log(email)
    },[email])

    if(redirect){
        if(role==='User'){
            return <Navigate to='/home'/>
        }else if(role==='Staff'){
            return <Navigate to='/staffdashboard'/>
        }
    }


    return(
        <RegisterContainer>
            <RegisterWrapper>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password"  placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button type="Submit">Login</button>
                </form>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Login