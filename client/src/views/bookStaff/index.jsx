import axios from "axios";
import React, { useEffect, useState } from "react";

const BookStaff=()=>{
    const [task,setTask]=useState('')
    const [day,setDay]=useState('')
    const [from,setFrom]=useState(null)
    const [till,setTill]=useState(null)
    const [staff,setStaff]=useState([])
    const [availableStaff,setAvailableStaff]=useState([])

    const handleBooking=async(e)=>{
        e.preventDefault()
        console.log(from)
        try {
            const response=await axios.post('/booking',{task,from,till,day})
            const data=response.data
            setAvailableStaff(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAccounts=async()=>{
        try {
            const response=await axios.get('/getStaff')
            const data=response.data
            setStaff(data)
            console.log(staff)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAccounts()
    },[])

    return(
        <div>
            <form onSubmit={handleBooking}>
                <h1>Book Staff for work</h1>
                <input type="text" placeholder="Enter the task" onChange={(e)=>{setTask(e.target.value)}}/>
                <h1>Duration</h1>
                <label>Day:</label>
                <input type="date" onChange={(e)=>{setDay(e.target.value)}}/>
                <label>From:</label>
                <input type="time" onChange={(e)=>{setFrom(e.target.value)}}/>
                <label>Till:</label>
                <input type="time" onChange={(e)=>{setTill(e.target.value)}}/>
                <button type="Submit">Book</button>
            </form>

            <div>
                <h1>Available Staff</h1>
                {availableStaff && availableStaff.map((item,index)=>{
                    return(
                        <div key={index}>
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BookStaff