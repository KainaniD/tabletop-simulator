import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export function Register() {    

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/users", { name, email, password })
        .then(result => {console.log(result)
          if (result.data === "Failed") {
            alert("Sorry the username " + name + " is taken :(")
          } else {
            alert("Hello, " + name + " You have been added as a new user!")
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
                <label htmlFor="name" className="input-label"><strong>Username</strong></label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  name="name"
                  className="input-box"
                  onChange={(e) => setName(e.target.value)}
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