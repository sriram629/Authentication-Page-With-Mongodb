import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#000'}}>
                    {user ? (
                        <div style={{backgroundColor:'#fff',borderRadius:'10px', padding:'30px'}}>
                            <h2>User Profile</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>First Name:</strong> {user.firstName}</p>
                            <p><strong>Last Name:</strong> {user.lastName}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNo}</p>
                            <button className="btn btn-primary">Change Profile</button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
        </div>
    );
};

export default Profile;
