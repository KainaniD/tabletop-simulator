import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';
const socket = io.connect("http://localhost:4000");


function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      <div class="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
        <Link to="/" class="nav-button">Home</Link>
        <Link to="/Rooms" class="nav-button">Rooms</Link>
        <Link to="/TestPage" class="nav-button">Test Page</Link>
        <Link to="/Profile" class="nav-button">Profile</Link>
      </div>
      <div class="main">
      <MyRoutes />
      </div>
    </div>
  )
}

export default App