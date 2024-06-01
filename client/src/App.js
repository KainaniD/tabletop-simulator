import React, { useEffect, useState } from 'react'
import { MyRoutes } from './MyRoutes';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'
import axios from './axiosConfig'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:4000/session")
    .then((result) => {
        if (result.data) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
    })
    .catch(err => console.log(err))
  }, [])


  function routes(){
    if (isLoggedIn === true){
      return <div className="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
      <Link to="/" className="nav-button">Home</Link>
      <Link to="/rooms" className="nav-button">Rooms</Link>
      <Link to="/profile" className="nav-button">Profile</Link>
      <Link to="/register" className="nav-button">Register</Link>
      <Link to="/login" className="nav-button">Login</Link>
      </div>
    } else {
      return <div className="flex justify-evenly bg-gray-100 py-5 mb-5 border border-gray-300">
      <Link to="/register" className="nav-button">Register</Link>
      <Link to="/login" className="nav-button">Login</Link>
      </div>
    }
  }

  
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


      {routes()}
      <div className="main">
        <MyRoutes />
      </div>
    </div>
  )
}

export default App