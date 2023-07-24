import React, { useState } from "react";
import "./EmailLoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const body = { email, password };
      console.log(body);
      await axios
        .post("http://localhost:8001/user/login", body)
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (Object.keys(data).length === 0) {
            toast("No such User found", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast("Sign In successful", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.log(`userId : ${data.userId}`);
            var now = new Date();
            now.setTime(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
            var expires = now.toUTCString();
            document.cookie = `flipazon_username=${data.userId}; expires=${expires}; path=/`;
            document.cookie = `flipazon_user_isadmin=${data.isAdmin}; expires=${expires}; path=/`;
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
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
          <ToastContainer />
          <h6 onClick={redirectSignUp}>Click here to create new account</h6>
        </form>
      </div>
    </div>
  );
};

export default EmailLoginPage;
