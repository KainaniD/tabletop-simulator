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
        console.log(result)

        if (result.data.success === true) {
          alert(result.data.message)
          axios.get("http://localhost:4000/login", { params: { username, password } })
          .then(result => {
              if (result.data.success === true) {
                  alert(result.data.message)
                  window.location.replace("http://localhost:3000/profile");
              } else if (result.data.success === false) {
                  alert(result.data.message)
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
    <div className="flex justify-center items-center pt-20">
        <div>
          <div className="px-5 py-5">
          <h1 className="px-0 py-5 text-center">
            Sign-Up
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="w-1/2">
            <div className="items-center">
              <label htmlFor="username" className="input-label px-5"><strong>Username</strong></label>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="input-box"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="items-center">
              <label htmlFor="email" className="input-label px-5"><strong>Email</strong></label>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="input-box"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="items-center">
              <label htmlFor="password" className="input-label px-5"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="input-box"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="justify-center items-center">
          <div>
            <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
              Sign Up
            </button>
          </div>
        </div>
        </form>
      </div>
      <div className="flex flex-col w-1/4 justify-center items-center">
        <p className="mb-5">Already have an account?</p>
        <Link to="/Login" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">Login</Link>
      </div>
    </div>
  );
}