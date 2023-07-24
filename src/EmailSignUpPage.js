import React, { useState } from "react";
import "./EmailSignUpPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailSignUpPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      phone !== "" &&
      address !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const body = { name, phone, address : [address], email, password };
      console.log(body);
      await axios
        .post("http://localhost:8001/user/new", body)
        .then((res) => {
          console.log(res);
          toast("Account Created", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/signin");
        })
        .catch((err) => {
          toast("Error. Try Again. Email might be used by another user", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log(err);
        });
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
          <h6 onClick={redirectSignIn} className='clickable'>
            Click here to log into existing account
          </h6>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailSignUpPage;
