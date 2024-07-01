import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Alluser() {

    const [getstud, SetGetstud] = useState([]);

    // Fetch all student data
    const getstuddata = async () => {
        try {
            const res = await fetch("http://localhost:5000/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await res.json();
            SetGetstud(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    // Delete student data
    const deleteUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Failed to delete');
            }

            getstuddata(); // Refresh the data after deletion
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>All Users</h4>
                <div className="ms-auto w-50">
                    {/* Search input removed */}
                </div>
            </div>

            <div className='underline'></div>

            <br />

            <table className="table table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action </th>
                    </tr>
                </thead>
                <tbody>
                    {getstud.map((result, index) => (
                        <tr key={result._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{result.firstname}</td>
                            <td>{result.lastname}</td>
                            <td>{result.email}</td>
                            <td>
                                <Link className='btn btn-success ms-2' to={`/view/${result._id}`}>View</Link>
                                <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                <button className='btn btn-danger ms-2'
                                    data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deleteUser(result._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
