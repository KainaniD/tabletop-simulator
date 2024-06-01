import React from 'react'
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'


function App() {

  return (
    <div>
      <div className="flex justify-center">
        <div className="title-head">
          <div className="flex justify-center">
            <h1 className="title-text">
              TableTop Simulator
              <p className="float-right">
                <img src={logo} width="70" height="auto" />
              </p>
            </h1>
          </div>
        </div>
      </div>


      <div className="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/Rooms" className="nav-button">Rooms</Link>
        <Link to="/Profile" className="nav-button">Profile</Link>
        <Link to="/Register" className="nav-button">Register</Link>
        <Link to="/Login" className="nav-button">Login</Link>
        <Link to="/Friends" className="nav-button">Friends</Link>
      </div>
      <div className="main">
        <MyRoutes />
      </div>
    </div>
  )
}

export default App