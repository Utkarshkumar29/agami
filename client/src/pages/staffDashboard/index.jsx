import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StaffDashboard=()=>{
    const [bookings,setBookings]=useState([])
    const [accounts,setAccounts]=useState([])
    const [name,setName]=useState('')

    const userBooking=async()=>{
        try {
            const response=await axios.get('/userBookings')
            const data=response.data
            setBookings(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAccounts=async()=>{
        try {
            const response=await axios.get('/getStaff')
            const data=response.data
            setAccounts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete=async(item)=>{
        try {
            const response=await axios.delete(`/delete/${item._id}`)
            const data=response.data
            console.log(data)
            const newresponse=await axios.get('/getStaff')
            setAccounts(newresponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate=async(item)=>{
        try {
            const response=await axios.put(`/update/${item._id}`)
            if(response.status===201){

            }
        } catch (error) {
            console.log(error)
        }   
    }

    useEffect(()=>{
        userBooking()
        getAccounts()
    },[])

    return(
        <div>
            <div>
                {bookings && bookings.map((item,index)=>{
                    return(
                        <div key={index}>
                            <p>{item.bookedBy}</p>
                            <p>{item.task}</p>
                            <p>{item.from}</p>
                            <p>{item.till}</p>
                        </div>
                    )
                })}
            </div>

            <div>
                <h1>Create New Staff</h1>
                <Link to='/staff'>Add Staff</Link>
            </div>

            <div>
                <h1>Accounts</h1>
                {accounts && accounts.map((item,index)=>{
                    return(
                        <div key={index}>
                            <p>{item.name}</p>
                            <p>{item._id}</p>
                            <button onClick={()=>handleDelete(item)}>Delete</button>
                            <Link to={`/staffLogin/${item._id}`}><button onClick={()=>handleUpdate(item)}>Update</button></Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StaffDashboard