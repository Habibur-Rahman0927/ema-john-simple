import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {produckey} = useParams();
    const product =  fakeData.find(pd => pd.key === produckey);
    return (
        <div>
            <h1>Your Product ProductDetails</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;