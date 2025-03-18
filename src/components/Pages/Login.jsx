import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../utils/AuthContext";
import "./Login.css";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const loginForm = useRef(null);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;
    const userInfo = { email, password };
    await loginUser(userInfo);
  };

  return (
    <div className="container">
      <div className="logo-design">
        <h1>Habit Tracker</h1>
        <p>
          Track your daily habit to lead a healthy life with our website. You
          will be rewarded for your activity. So, why not login?
        </p>
      </div>
      <div className="login-register-container">
        <h2>Login Here</h2>
        <form ref={loginForm} onSubmit={handleSubmit}>
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
              name="password"
              placeholder="Enter password..."
            />
          </div>

          <div>
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
