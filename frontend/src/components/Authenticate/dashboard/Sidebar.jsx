import React, { useState } from 'react';
import { FaChalkboard, FaBars} from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { PiExamFill } from 'react-icons/pi';
import { LiaLandmarkSolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaChalkboard />,
    },
    {
      path: '/profile',
      name: 'Profile',
      icon: <CgProfile />,
    },
    {
      path: '/exam',
      name: 'Exam',
      icon: <PiExamFill />,
    },
    {
      path: '/result',
      name: 'Result',
      icon: <LiaLandmarkSolid />,
    },
  ];

  return (
    <div style={{ display: 'flex', backgroundColor: 'black' }}>
      <div style={{ width: isOpen ? '250px' : '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="sidebar">
        <div>
          <div className="top-section">
            <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
              Menu
            </h1>
            <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          
          <div>
            {menuItems.map((item, index) => (
              <NavLink to={item.path} key={index} className="link" activeClassName="active">
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        
        <div>
        <NavLink to={'/login'} className="link" activeClassName="active">
                <div className="icon"><IoIosLogOut /></div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  logout
                </div>
              </NavLink>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
