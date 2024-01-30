import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:5002/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.msg === "Success") {
                    console.log("Login Success");
                    localStorage.setItem("user", JSON.stringify(result.data.user))
                    alert('Login successful!');
                    navigate('/home');
                }
                else if (result.data === "Account Not Activated") {
                    alert('Account Not Activated');
                }
                else {
                    alert('Incorrect password! Please try again.')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(to right, #3498db, #6c5b7b, #b33939)" }}>
                <div className="bg-white p-3 rounded" style={{ width: '30%' }}>
                    <h2 style={{ color: 'black' }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                autoFocus
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>
                        <div className='text-end'>
                        <Link to='/forgot-password'className='text-decoration-none'>Forgot Password ?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form><br />
                    <div className='text-start'>
                    <p>Activate your account here ? <Link to='/reactivate' className='text-decoration-none'>Reactivate</Link></p>
                    <p>Don't have an account ? <Link to='/register' className='text-decoration-none'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
