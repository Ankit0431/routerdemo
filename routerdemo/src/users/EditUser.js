// EditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUser({ userId, onClose }) {
    const [user, setUser] = useState({ name: null, age: null }); // Initialize with null values

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${userId}`, user);
            // Fetch the updated user data after successful submission
            const response = await axios.get(`http://localhost:5000/users/${userId}`);
            setUser(response.data);
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={user.name || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" name="age" value={user.age || ''} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;
