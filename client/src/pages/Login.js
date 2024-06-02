import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from '../axiosConfig'

export function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get("http://localhost:4000/users", { params: { username, password } })
            .then(result => {
                if (result.data.success === true) {
                    alert(result.data.message)
                    window.location.replace("http://localhost:3000/profile");
                } else if (result.data.success === false) {
                    alert(result.data.message)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center pt-20">
            <div className="w-1/4 items-center">
                <h1 className="text-center"> Login </h1>
                <form onSubmit={handleSubmit} className="items-center">
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
    );
}