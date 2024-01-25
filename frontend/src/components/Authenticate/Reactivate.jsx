import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Reactivate = () => {

  const [email, setEmail] = useState('');
  const [ActivationCode, setActivationCode] = useState('');
  const navigate=useNavigate();
  const handleSendVerificationCode = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5002/reactivate/send-code', { email })
      .then((response) => {
        console.log(response);
        navigate('/vactivate')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: 'linear-gradient(to right, #3498db, #6c5b7b, #b33939)', overflowY: 'auto' }}>
      <div className="bg-white p-3 rounded" style={{ width: '30%', marginTop: '100px', marginBottom: '30px' }}>
        <h2 style={{ color: 'black' }}>Reactivate Account</h2>
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
          <br/>
          <div className='text-start'>
              <p>Already Activated ? <Link to='/login'className='text-decoration-none'>Login</Link></p>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Reactivate
