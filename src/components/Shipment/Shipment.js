import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null)
  const onSubmit = data => {
    setShippingData(data)
  };

  const handlePaymentSuccess = paymentId => {
    const saveCart = getDatabaseCart();
    const orderDeltails = { ...loggedInUser, products: saveCart, shipment: shippingData,paymentId, orderTime: new Date() }
    fetch('https://enigmatic-meadow-25159.herokuapp.com/addOrder', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDeltails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert("your order placed success")
        }
      })
  }
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none': 'block'}} className="col-md-6">
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">This field is required</span>}
          <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your E-mail" />
          {errors.email && <span className="error">Email is required</span>}
          <input {...register("address", { required: true })} placeholder="Your address" />
          {errors.email && <span className="error">Email is required</span>}
          <input {...register("number", { required: true })} placeholder="Your phone number" />
          {errors.email && <span className="error">Email is required</span>}
          <input type="submit" />
        </form>
      </div>
      <div className="col-md-4" style={{display: shippingData ? 'block': 'none'}}>
        <h1>Please Pay for me</h1>
        <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;