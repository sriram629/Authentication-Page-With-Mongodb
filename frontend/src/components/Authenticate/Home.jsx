import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <h1>Login Success Page</h1>
      <button onClick={toggleSideMenu} className="btn btn-light my-5">
        Open Side Menu
      </button>

      {isSideMenuOpen && (
        <div
          style={{
            backgroundColor: "#333",
            position: "fixed",
            top: 0,
            left: 0,
            width: "200px",
            height: "100%",
            padding: "20px",
            color: "white",
          }}
        >
          <button onClick={closeSideMenu} className="btn btn-light">
            Close
          </button>
          <ul>
            <li>
              <Link to="/login" onClick={closeSideMenu} className="btn btn-light my-5">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
