import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from '../axiosConfig'
import { SERVER_URL, CLIENT_URL } from "../urls";

export function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(SERVER_URL + "/login", { params: { username, password } })
            .then(result => {
                if (result.data.success === true) {
                    //alert(result.data.message)
                    window.location.replace(CLIENT_URL + "/profile");
                } else if (result.data.success === false) {
                    //alert(result.data.message)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center pt-20">
            <div className="flex flex-col w-1/4">
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
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
            </div>
            <div className="flex flex-col w-1/4 items-center">
                <p className="mb-5">Don't have an account?</p>
                <Link to="/Register" className="submit-button">Sign-up</Link>
            </div>
        </div>
    );
}