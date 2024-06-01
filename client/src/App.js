import React from 'react'
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'


function App() {

  return (
    <div>
      <h1 className="relative py-5 px-5">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="title-head">
            <h1 className="title-text flex items-center">
            <img src={logo} width="70" height="auto" />
              TableTop Simulator
              <img src={logo} width="70" height="auto" />
            </h1>
          </div>
        </div>
        <div className="flex justify-end items-center relative">
          <div className="items-center">
            Username: ineedtopoo
          </div>
        </div>
      </h1>


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