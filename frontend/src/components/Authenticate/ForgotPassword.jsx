import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendVerificationCode = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5002/forgot-password/send-code', { email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResetPassword = (event) => {
    event.preventDefault(); 
    axios
      .post('http://localhost:5002/forgot-password/reset-password', { email, verificationCode, newPassword })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: 'linear-gradient(to right, #3498db, #6c5b7b, #b33939)', overflowY: 'auto' }}>
      <div className="bg-white p-3 rounded" style={{ width: '30%', marginTop: '100px', marginBottom: '30px' }}>
        <h2 style={{ color: 'black' }}>Forgot Password</h2>
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Email Id</strong>
            </label>
            <input type="email" placeholder="Enter Email" className="form-control" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSendVerificationCode}>
            Send Verification Code
          </button>

          <div className="mb-3 text-start">
            <label htmlFor="exampleInputVerificationCode" className="form-label">
              <strong>Verification Code</strong>
            </label>
            <input type="text" placeholder="Enter Verification Code" className="form-control" onChange={(event) => setVerificationCode(event.target.value)} />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputNewPassword" className="form-label">
              <strong>New Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                className="form-control"
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputConfirmPassword" className="form-label">
              <strong>Confirm Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="form-control"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleResetPassword}>
            Reset Password
          </button>

         
          <p className="container my-2">
            Remember your password?{' '}
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
