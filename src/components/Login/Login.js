import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramwork, signInWithEmailAndPassword } from './LoginManager';






function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramwork();

  


  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {

      const isPasswordValue = event.target.value.length > 6;
      const passwordHasNumber = /\d/.test(event.target.value)
      isFieldValid = isPasswordValue && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }
  const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
        })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault()
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }



  return (
    <div style={{textAlign:"center"}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }

      <br />
      <button onClick={fbSignIn}>Sing In Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter your name " />}
        <br />
        <input type="text" onBlur={handleChange} name="email" placeholder="Your Email Adders" required /><br />
        <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required />
        <br /> <input type="submit" value={newUser ? 'Sign up' : 'Sing In'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>

      {
        user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'Logged In'} successfully.</p>
      }
    </div>
  );
}

export default Login;
