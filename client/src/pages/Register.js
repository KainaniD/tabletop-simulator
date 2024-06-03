import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../axiosConfig'

export function Register() {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/register", { username, email, password })
      .then(result => {
        //console.log(result)

        if (result.data.success === true) {
          //alert(result.data.message)
          axios.get("http://localhost:4000/login", { params: { username, password } })
          .then(result => {
              if (result.data.success === true) {
                  //alert(result.data.message)
                  window.location.replace("http://localhost:3000/profile");
              } else if (result.data.success === false) {
                  //alert(result.data.message)
              }
          })
          .catch(err => console.log(err))
        } else if (result.data.success === false) {
          alert(result.data.message)
        }
      })
      .catch(err => console.log(err))
  }

  return (
      <div className="flex justify-center pt-20">
        <div className="flex flex-col w-1/4">
          <h1 className="text-center"> Sign Up </h1>
          <form onSubmit={handleSubmit} className="flex items-center gap-5">
          <div>
          <div className="flex space-x-2">
            <label htmlFor="username" className="input-label w-20">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="input-box"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
            <label htmlFor="username" className="input-label w-20">Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="input-box"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
            <label htmlFor="username" className="input-label w-20">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="input-box"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-1/4 items-center">
        <p className="mb-5">Already have an account?</p>
        <Link to="/Login" className="submit-button">Login</Link>
      </div>
    </div>
  );
}

{/* 
<div className="flex justify-center pt-20">
<div className="flex flex-col w-1/4 justify-center">
    <h1 className="text-center"> Login </h1>
    <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <div>
            <div className="flex space-x-2">
                <label htmlFor="username" className="input-label">Username</label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    autoComplete="off"
                    name="username"
                    className="input-box"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex space-x-2">
                <label htmlFor="password" className="input-label">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    className="input-box"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        <button type="submit" className="py-5 px-10 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
            Login
        </button>
    </form>
</div>
<div className="flex flex-col w-1/4 justify-center items-center">
    <p className="mb-5">Don't have an account?</p>
    <Link to="/Register" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">Sign-up</Link>
</div>
</div> 
*/}