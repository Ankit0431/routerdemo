import React from 'react';
import { useAxios } from "../useAxios"; 
// import "./UserList.css"

function ProductList() {
    const { response, error, loading } = useAxios('http://localhost:5000/products', 'get');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    
    if (!Array.isArray(response.data) || response.data.length === 0) {
        return <div>No Products found</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <table className="product-table table"> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {response.data.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
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

export default ProductList;