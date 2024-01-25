import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Activate = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5002/activate', { enteredCode })
      .then((result) => {
          alert("Account Activated Successfully")
          navigate('/login'); 
      })
      .catch((err) => {
        alert('Activation failed. Please enter the correct activation code.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{backgroundImage: "linear-gradient(to right, #3498db, #6c5b7b, #b33939)"}}>
      <div className="bg-white p-3 rounded" style={{ width: '30%', marginTop: '60px' }}>
        <h2 style={{color: 'black'}}>Activate Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="activationCode" className="form-label">
                <strong>Activation Code</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Activation Code"
                className="form-control"
                id="activationCode"
                onChange={(event) => setEnteredCode(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Activate</button>
          </form>  
      </div>
    </div>
  );
};

export default Activate;
