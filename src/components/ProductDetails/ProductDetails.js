import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {produckey} = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://enigmatic-meadow-25159.herokuapp.com/products/'+produckey)
        .then(res => res.json())
        .then(data => setProduct(data));

    }, [produckey])
    return (
        <div>
            <h1>Your Product ProductDetails</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;