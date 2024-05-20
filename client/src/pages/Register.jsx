import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { MyRoutes } from '../MyRoutes';

export function Register() {    

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/register", { name, email, password })
        .then(result => {console.log(result)
        navigate("/login")
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
          <div>
            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name"><strong>Username</strong></label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="off"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" style={{ width: '100%' }}>
                Sign Up
              </button>
            </form>
            <p>Already have an account?</p>
            <a href="/Login">Login</a>
          </div>
        </div>
      );
}