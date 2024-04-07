import React from 'react';
import { useAxios } from "../useAxios"; 
// import "./UserList.css"

function UserList() {
    const { response, error, loading } = useAxios('http://localhost:5000/users', 'get');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    
    if (!Array.isArray(response.data) || response.data.length === 0) {
        return <div>No users found</div>;
    }

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table table"> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response.data.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>
                                <button className="btn btn-primary">Edit</button> 
                                <button className="btn btn-danger">Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;