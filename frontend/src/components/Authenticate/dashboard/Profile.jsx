import React from 'react'
import Sidebar from './Sidebar'
const Profile = () => {
  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
      <Sidebar />
      <div className='content'>
        <h1>Profile Page</h1>
      </div>
    </div>
  )
}

export default Profile
