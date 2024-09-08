import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/cred/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 106) {
          document.cookie = `token=${data.cred}; path=/; max-age=${
            15 * 60
          }; secure`;
          navigate("/");
        } else {
          setError(data.message);
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { given_name, family_name, email } = decoded;

      const userData = {
        firstName: given_name,
        lastName: family_name,
        email: email,
      };

      const response = await fetch("/api/cred/register-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.status === 104) {
        document.cookie = `token=${data.cred}; path=/; max-age=${
          15 * 60
        }; secure`;
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {};

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <p className="title">Log in</p>
        <form className="login" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">
            <span className="state">Login</span>
          </button>
          <p>
            Don't have an account? <Link to="/Signup">Signup</Link>
          </p>
          <div className="center-google-login">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
