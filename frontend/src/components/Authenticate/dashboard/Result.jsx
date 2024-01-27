import React from 'react';
import Sidebar from './Sidebar';

const Result = () => {
  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
      <Sidebar />
      <div className='content'>
        <h1>Result Page</h1>
      </div>
    </div>
  )
}

export default Result
