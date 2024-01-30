import React from 'react';
import './Home.css';
import Sidebar from './dashboard/Sidebar';


const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
      <Sidebar />
      <div className='content'>
        <div style={{margin:'40px'}}>
        <h1 style={{color: 'white'}}>Welcome back, {user.lastName} 👏</h1>
        </div>
      </div>
    </div>
  )
}

export default Home;
