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
        <div className="flex justify-center items-center pt-20">
            <div className="flex flex-col w-1/4">
                <div className="flex">
                    <div className="flex flex-col px-5 py-5 w-1/2">
                    </div>
                    <h1 className="flex flex-col px-0 py-5 w-1/4 text-center">
                        Login
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="flex text-center">
                    <div className="flex flex-col w-1/4"></div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex items-center">
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
                        <div className="flex items-center pl-1">
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
                </form>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-1/4"></div>
                    <div>
                        <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">

            </div>

            <div className="flex flex-col w-1/4 justify-center items-center">
                <p className="mb-5">Don't have an account?</p>
                <Link to="/Register" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">Sign-up</Link>
            </div>
        </div>
    );
}