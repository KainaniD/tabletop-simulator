import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';


function App() {

  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

  return (
    <div>
      <div className="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/Rooms" className="nav-button">Rooms</Link>
        <Link to="/TestPage" className="nav-button">Test Page</Link>
        <Link to="/Profile" className="nav-button">Profile</Link>
      </div>
      <div className="main">
      <MyRoutes />
      </div>
    </div>
  )
}

export default App