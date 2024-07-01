import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const navigate = useNavigate();
    
    const [inputdata,setInputdata]=useState({
        "firstname":"",
        "lastname":"",
        "email":""
        
    })
    
    //onchange function
    const setuser=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data student
    const { id } = useParams("");
    console.log(id);

    const getuserdata = async () => {
        const res = await fetch(`http://localhost:5000/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])

    //update student Data
    const updatestud= async(e)=>{
        e.preventDefault();

        const {firstname,lastname, email} =inputdata;
        const res2 = await fetch(`http://localhost:5000/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname,lastname, email
            })
        });
        const data2= await res2.json();
        setInputdata(data2);
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

    return (
        <div className='container mt-5'>
            <h4>Edit User Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
            <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name" 
                    onChange={setuser} name="firstname" value={inputdata.firstname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Student Registration Number"
                    onChange={setuser} name="lastname" value={inputdata.lastname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" 
                    onChange={setuser} name="email" value={inputdata.email}/>
                </div>
               
                <br></br>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updatestud}>update</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/alluser">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}
