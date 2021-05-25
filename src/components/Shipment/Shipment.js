import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
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
  );
};

export default Shipment;