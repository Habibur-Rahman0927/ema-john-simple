import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true);
        processOrder();

    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);
        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })

        setCart(cartProducts);
        console.log(cartProducts)
    }, []);
    const thankyou = <img src={happyImage} alt="" />
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem kdey={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {
                    orderPlaced && thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className='main-btn' onClick={handlePlaceOrder}>place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;