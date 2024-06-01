import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from '../axiosConfig'

export function Login() {    
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get("http://localhost:4000/users", {params: { username, password }})
        .then(result => {
            if(result.data.success === true){
                alert(result.data.message)
                window.location.replace("http://localhost:3000/");
            }else if(result.data.success === false){
                alert(result.data.message)
            }
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="flex justify-center items-center">
            <div>
                <h1>Login Here</h1>
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