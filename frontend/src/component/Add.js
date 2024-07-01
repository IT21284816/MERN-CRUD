import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Addstud() {
    const navigate = useNavigate();
    const [inputdata,setInputdata]=useState({
        "firstname":"",
        "lastname":"",
        "email":"",
        
    })
    
    //onchange function
    const setuser=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });   
    }
    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email } = inputdata;

        const res = await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname,lastname, email
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
                });
            setTimeout(() => {
                navigate('/alluser');
              }, 3000);

        }
    }
    return (
        <div className='container mt-5'>
            <h4>User Registration</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" 
                    onChange={setuser} name="firstname" value={inputdata.firstname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Last Name"
                    onChange={setuser} name="lastname" value={inputdata.lastname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" 
                    onChange={setuser} name="email" value={inputdata.email}/>
                </div>
                
                <br></br>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={addinpdata}>Add User</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/alluser">Back to Home</NavLink>
                </div>
              
            </form>
            <br></br><br></br><br></br>
        </div>
    )
}
