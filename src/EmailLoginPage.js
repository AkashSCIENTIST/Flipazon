import React, { useState } from "react";
import "./EmailLoginPage.css";
import { useNavigate } from "react-router-dom";

const EmailLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      console.log({ email, password });
    }
  };

  const redirectSignUp = (e) => {
    navigate("/signup");
  };

  return (
    <div className='email-login-page'>
      <div className='email-card'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h2>Sign-In</h2>
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
          <button type='submit'>Sign In</button>

          <h6 onClick={redirectSignUp}>Click here to create new account</h6>
        </form>
      </div>
    </div>
  );
};

export default EmailLoginPage;
