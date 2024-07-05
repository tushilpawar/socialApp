import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") setMobileNumber(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("habit submit");
    
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        mobileNumber,
        password,
      });
      console.log("response",response);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("mobileNumber", mobileNumber);
      navigate("/dashboard");
    } catch (error) {
      setError("Account Is Not Found");
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [location, navigate]);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="container mx-auto flex-grow flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center w-full">
          <div className="w-full md:w-1/2 lg:w-3/4 p-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="w-full md:w-2/3 lg:w-2/5 xl:w-1/4 p-4">
              <div className="flex items-center justify-center my-4">
                <p className="text-center font-bold mx-3">Welcome Back to Social App</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </form>

              <p className="mt-4 text-sm text-center">
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Don't have an account? Sign up
                </Link>
              </p>

          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between py-4 px-4 bg-primary text-white">
        <div className="mb-3 md:mb-0">
          Copyright © 2024. All rights reserved.
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>

  );
};

export default Login;
