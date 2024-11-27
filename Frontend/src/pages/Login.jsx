import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";

axios.defaults.baseURL = process.env.MONGO_URI;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inbuiltUsers = {
    Admin: { email: "admin@gmail.com", password: "admin123" },
    Doctor: { email: "doctor@gmail.com", password: "doctor123" },
    Patient: { email: "patient@gmail.com", password: "patient123" },
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password, role } = formDetails;

      if (!email || !password) {
        return toast.error("Email and password are required");
      } else if (!role) {
        return toast.error("Please select a role");
      } else if (role !== "Admin" && role !== "Doctor" && role !== "Patient") {
        return toast.error("Please select a valid role");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }

      // Check for inbuilt user
      if (
        inbuiltUsers[role] &&
        email === inbuiltUsers[role].email &&
        password === inbuiltUsers[role].password
      ) {
        toast.success(`Logged in as ${role}`);
        return navigate(role === "Admin" ? "/dashboard/home" : "/");
      }

      // API call for database users
      const { data } = await toast.promise(
        axios.post("/user/login", { email, password, role }),
        {
          pending: "Logging in...",
          success: "Login successful",
          error: "Unable to login",
        }
      );
      localStorage.setItem("token", data.token);
      const userId = jwt_decode(data.token).userId;
      dispatch(setUserInfo(userId));
      getUser(userId, role);
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    }
  };

  const getUser = async (id, role) => {
    try {
      const userData = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(userData));
      navigate(role === "Admin" ? "/dashboard/home" : "/");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center">
        <div className="register-container flex-center">
          <h2 className="form-heading">Sign In</h2>
          <form onSubmit={formSubmit} className="register-form">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formDetails.email}
              onChange={inputChange}
            />
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={inputChange}
            />
            <select
              name="role"
              className="form-input"
              value={formDetails.role}
              onChange={inputChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
            <button type="submit" className="btn form-btn">
              Sign In
            </button>
          </form>
          <NavLink className="login-link" to={"/forgotpassword"}>
            Forgot Password
          </NavLink>
          <p>
            Not a user?{" "}
            <NavLink className="login-link" to={"/register"}>
              Register
            </NavLink>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
