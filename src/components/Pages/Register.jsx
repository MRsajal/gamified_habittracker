import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
import "./Login.css";
import PointSave from "../../utils/MainPoint";

const Register = () => {
  const registerForm = useRef(null);
  const { user, registerUser } = useAuth(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const saveUserPoints = async (userId) => {
    try {
      console.log("Saving points for User ID:", userId);
      await PointSave(userId, 10);
      console.log("User points initialized.");
    } catch (error) {
      console.error("Error saving user points:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }
    const userInfo = { name, email, password1, password2 };
    registerUser(userInfo);
    navigate("/");
  };
  return (
    <div className="container">
      <div className="login-register-container">
        <h2>Register Here</h2>
        <form ref={registerForm} onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label>Name:</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <input
              type="password"
              name="password1"
              placeholder="Enter password..."
            />
          </div>

          <div className="form-field-wrapper">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password..."
            />
          </div>

          <div>
            <input type="submit" value="Register" className="btn" />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="logo-design">
        <h1>Habit Tracker</h1>
        <p>
          Track your daily habit to lead a healthy life with our website. You
          will be rewarded for your activity. So, why not register?
        </p>
      </div>
    </div>
  );
};

export default Register;
