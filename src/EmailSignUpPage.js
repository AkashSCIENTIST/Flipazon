import React, { useState } from "react";
import "./EmailSignUpPage.css";
import { useNavigate } from "react-router-dom";

const EmailSignUpPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      phone !== "" &&
      address !== "" &&
      email !== "" &&
      password !== ""
    ) {
      console.log({ name, phone, address, email, password });
    }
  };

  const redirectSignIn = (e) => {
    navigate("/signin");
  };

  return (
    <div className='email-login-page'>
      <div className='email-card'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h2>Sign-Up</h2>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Sign Up</button>
          <h6 onClick={redirectSignIn}>Click here to log into existing account</h6>
        </form>
      </div>
    </div>
  );
};

export default EmailSignUpPage;
