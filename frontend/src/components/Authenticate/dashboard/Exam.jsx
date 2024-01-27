import React from 'react';
import Sidebar from './Sidebar';
const Exam = () => {
  return (
      <div style={{display: 'flex', flexDirection:'row'}}>
        <Sidebar />
        <div className='content'>
          <h1>Exam Page</h1>
        </div>
      </div>
    )
}

export default Exam
