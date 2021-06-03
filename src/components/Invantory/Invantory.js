import React from 'react';
// import fakeData from '../../fakeData';

const Invantory = () => {
    const handleAddProduct = () => {
        const product = {}
        fetch('https://enigmatic-meadow-25159.herokuapp.com/addProduct', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form>
                <p><span>Name</span><input type="text" /></p>
                <p><span>Price</span><input type="text" /></p>
                <p><span>Quantity</span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Invantory;