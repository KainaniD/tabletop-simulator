import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../axiosConfig'

export function Register() {    

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/users", { username, email, password })
        .then(result => {console.log(result)
          
          if (result.data.success === true) {
            alert(result.data.message)
            window.location.replace("http://localhost:3000/login");
          } else if (result.data.success === false){
            alert(result.data.message)
          }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
          <div>
            <h1>Sign Up Here</h1> 
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="input-label"><strong>Username</strong></label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  name="username"
                  className="input-box"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="input-label"><strong>Email</strong></label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="input-box"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="input-label"><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="input-box"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">
                Sign Up
              </button>
            </form>
            <p className="mb-5">Already have an account?</p>
            <Link to="/Login" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">Login</Link>
          </div>
        </div>
      );
}