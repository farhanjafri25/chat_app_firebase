import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "./img/addAvatar.png";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Farhan Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Login</button>
          {err && <span>Error Signing In </span>}
        </form>
        <p>
          Don't have an account? Register? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
