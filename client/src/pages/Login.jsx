import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { MyRoutes } from '../MyRoutes';

export function Login() {    
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/login", { name, password })
        .then(result => {
            console.log(result)
            if(result.data === "Success"){
                navigate("/Home")
            }else{
                navigate("/Register")
                alert("You are not registered to this service")

            }
       
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
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
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%' }}>
                        Login
                    </button>
                    </form>
                    <p>Don't have an account?</p>
                    <a href="/Register">Register</a>
            </div>
        </div>
    )
}