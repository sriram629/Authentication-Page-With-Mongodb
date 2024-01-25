// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Reactivate from './Reactivate';
import Activate from './Activate';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Vactivate from './Vactivate';

function App() {
  return (
    <div style={{ marginTop: '-3.5rem' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/reactivate' element={<Reactivate/>}/>
          <Route path='/vactivate' element={<Vactivate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
