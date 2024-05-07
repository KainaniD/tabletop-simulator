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
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <br />
          <li><Link to="/Rooms">Rooms</Link></li>
          <br />
          <li><Link to="/testPage">testPage</Link></li>
        </ul>
      </nav>
      <MyRoutes />
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App