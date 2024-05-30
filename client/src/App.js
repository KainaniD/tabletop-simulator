import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';


function App() {

  return (
    <div>
      <div className="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/Rooms" className="nav-button">Rooms</Link>
        <Link to="/Profile" className="nav-button">Profile</Link>
        <Link to="/Register" className="nav-button">Register</Link>
        <Link to="/Login" className="nav-button">Login</Link>
      </div>
      <div className="main">
      <MyRoutes />
      </div>
    </div>
  )
}

export default App