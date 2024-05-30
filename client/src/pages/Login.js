import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export function Login() {    
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get("http://localhost:4000/users", {params: { name, password }})
        .then(result => {
            console.log(result)
            if(result.data === "Success"){
                alert("You are logged in!")
            }else{
                alert("You are not registered to this service")
            }
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            <div>
                <h1>Login Here</h1>
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
                        Login
                    </button>
                    </form>
                    <p className="mb-5">Don't have an account?</p>
                    <Link to="/Register" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">Register</Link>
            </div>
        </div>
    )
}