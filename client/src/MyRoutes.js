import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Room } from './pages/Room'
import { GameRooms } from './pages/GameRooms'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { NewRoom } from './pages/NewRoom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import axios from './axiosConfig'

export const MyRoutes = () => {

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
          return (
          <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms">
                    <Route index element={<GameRooms />} />
                    <Route path=":name" element={<Room />} />
                    <Route path="newroom" element={<NewRoom />} />   
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </>
          )
        } else {
          return (
          <>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </>
          )
        }
    }

    return (
        routes()
    );
}