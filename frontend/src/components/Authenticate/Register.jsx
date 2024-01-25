import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }
    setRegisterButtonDisabled(true);

    axios
      .post('http://localhost:5002/register', {
        firstName,
        lastName,
        email,
        phoneNo,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === 'Already registered') {
          alert('E-mail already registered! Please Login to proceed.');
          navigate('/login');
        } else {
          navigate('/activate');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setRegisterButtonDisabled(false);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: 'linear-gradient(to right, #3498db, #6c5b7b, #b33939)', overflowY: 'auto'}}>
        <div className="bg-white p-3 rounded" style={{ width: '30%', marginTop: '200px', marginBottom: '30px' }}>
          <h2 style={{ color: 'black' }}>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputFirstName" className="form-label">
                <strong>First Name</strong>
              </label>
              <input
                autoFocus
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                id="exampleInputFirstName"
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputLastName" className="form-label">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="form-control"
                id="exampleInputLastName"
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPhoneNo" className="form-label">
                <strong>Phone Number</strong>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="form-control"
                id="exampleInputPhoneNo"
                onChange={(event) => setPhoneNo(event.target.value)}
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
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputConfirmPassword" className="form-label">
                <strong>Confirm Password</strong>
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="form-control"
                  id="exampleInputConfirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
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
            <button type="submit" className="btn btn-primary" disabled={registerButtonDisabled}>
              Register
            </button>
          </form>
          <p className="container my-2">Already have an account ?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
