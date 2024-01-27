import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Reactivate from './Reactivate';
import Activate from './Activate';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Vactivate from './Vactivate';
import Result from './dashboard/Result';
import Exam from './dashboard/Exam';
import Profile from './dashboard/Profile';

function App() {
  return (
    <div>
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
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/exam' element={<Exam/>} />
          <Route path='/result' element={<Result/>}/>
          <Route path='/dashboard' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
