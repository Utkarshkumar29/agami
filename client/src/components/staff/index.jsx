import React, { useEffect, useState } from "react";
import { RegisterContainer, RegisterWrapper } from "../../styles/register";
import axios from 'axios';
import { Navigate, useParams } from "react-router-dom";

const Staff=()=>{
    const [name,setName]=useState('')
    const [day,setDay]=useState('')
    const [from,setFrom]=useState('')
    const [till,setTill]=useState('')
    const [redirect,setRedirect]=useState(false)
    const {id}=useParams()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            if(id){
                const response=await axios.put(`/update/${id}`,{name,day,from,till})
                const data=response.data
                console.log(data)
                setRedirect(true)
            }else{
                const response=await axios.post('/addStaff',{name,day,from,till})
                const data=response.data
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchStaff=async()=>{
        try {
            const response=await axios.get(`/getStaff/${id}`)
            const data=response.data
            console.log(data)
            setName(data.name)
            setDay(data.day)
            setFrom(data.startTime)
            setTill(data.endTime)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(id){
            console.log(id,'fghjk')
            fetchStaff()
        }
    },[])

    if(redirect){
        return <Navigate to='/staffDashboard'/>
    }


    return(
        <RegisterContainer>
            <RegisterWrapper>
                <form onSubmit={handleSubmit}>
                <h1>Register Staff</h1>
                <input value={name} type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
                <input value={day} type="date" placeholder="Enter your day" onChange={(e)=>setDay(e.target.value)}/>
                <input value={from} type="time" placeholder="Enter your Start Time" onChange={(e)=>setFrom(e.target.value)}/>
                <input value={till} type="time" placeholder="Enter your End Time" onChange={(e)=>setTill(e.target.value)}/>
                <button type="Submit">Register</button>
                </form>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Staff