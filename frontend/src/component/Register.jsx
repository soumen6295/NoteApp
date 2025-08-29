import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phoneNo:"",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const res = await axios.post("http://localhost:8002/user/register", formData);
            if (res.data.success) {
                alert(res.data.message);
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6">
                <h1 className="text-center mb-4">Create your account</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group mb-3">
                        <label>Full Name</label>
                        <input name='userName' className="form-control" type="text" onChange={handleChange} required value={formData.userName} disabled={isLoading} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input name='email' className="form-control" type="email" onChange={handleChange} required value={formData.email} disabled={isLoading} />
                    </div>

                     <div className="form-group mb-3">
                        <label>Phone No</label>
                        <input name='phoneNo' className="form-control" type="phoneNo" onChange={handleChange} required value={formData.phoneNo} disabled={isLoading} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Password</label>
                        <div className="input-group">
                            <input name='password' className="form-control" type={showPassword ? "text" : "password"} onChange={handleChange} required value={formData.password} disabled={isLoading} />
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoIosEyeOff /> : <IoIosEye />} </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info w-100" disabled={isLoading}>  {isLoading ? "Creating Account..." : "Create Account"} </button>
                </form>


                <div className="text-center mt-3">
                    <p>Already have an account? </p>
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

