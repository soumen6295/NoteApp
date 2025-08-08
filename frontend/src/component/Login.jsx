import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8002/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                const { accessToken, refreshToken } = res.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                navigate('/task');
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6">

                <h1 className="text-center mb-4">Login Page</h1>


                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email"  name="email" type="email" className="form-control" placeholder="Enter your email" value={input.email} onChange={handleChange} disabled={isLoading} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password"  name="password"  type="password"  className="form-control"  placeholder="Enter your password" value={input.password} onChange={handleChange} disabled={isLoading} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
