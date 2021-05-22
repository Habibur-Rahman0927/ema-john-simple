import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total +prd.price, 0);
    console.log(cart)
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity;
    }
    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping =  12.99;
    }
    const formatNumber = num => {
        const number = num.toFixed(2)
        return Number(number);
    }
    const tax =totalPrice/10;
    const Total = totalPrice + shipping + tax;
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formatNumber(totalPrice)}</p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT : {formatNumber(tax)}</small></p>
            <p>Total : {formatNumber(Total)}</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;