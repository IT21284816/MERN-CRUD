import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function View() {

    const [getuser, SetGetuser] = useState([]);

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
            SetGetuser(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])

    return (
        <div className='container mt-5'>
             <h4>All Student Information</h4>
            <div className='underline'></div>
            <ul className="list-group w-50 mt-4">
                <li className="list-group-item active" aria-current="true">User Information</li>
                <li className="list-group-item">First Name:- {getuser.firstname}</li>
                <li className="list-group-item">last Name:-  {getuser.lastname}</li>
                <li className="list-group-item">Email:-  {getuser.email}</li>                
            </ul>
            <Link className='btn btn-primary mt-5' to="/alluser">Back</Link>
        </div>
    )
}
