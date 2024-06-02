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
      <h1 className="relative px-5 pb-0 items-center">
        <div className="flex justify-center items-center">
          <div className="title-head">
            <h1 className="title-text flex items-center">
            <img src={logo} width="70" height="auto" />
              TableTop Simulator
              <img src={logo} width="70" height="auto" />
            </h1>
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