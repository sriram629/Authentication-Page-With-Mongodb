import React from 'react';
import './Home.css';
import Sidebar from './dashboard/Sidebar';

const Home = () => {
  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
      <Sidebar />
      <div className='content'>
        <div style={{margin:'20px'}}>
        <h1 style={{color: 'white'}}>Welcome back</h1>
        </div>
      </div>
    </div>
  )
}

export default Home;
