import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import io from "socket.io-client";

let socket = io.connect('http://localhost:4000'); 
var clientID;

socket.on('connect', () => {
    clientID = socket.id;
});

function logout() {
    axios.post("http://localhost:4000/session")
    .then((result) => {
        alert("you have logged out!")
        window.location.replace("http://localhost:3000/login")
    })
    .catch(err => console.log(err))
}

export const Profile = () => {

    const [sessionID, setSessionID] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        axios.get("http://localhost:4000/session")
        .then((result) => {
            setUsername(result.data.username)
            setSessionID(result.data._id)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>{username}'s Profile </h1>
            <p>Socket Session ID: {clientID}</p>
            <p>Express Session ID: {sessionID}</p>
            <button onClick={logout} className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">
            Logout
            </button>
        </div>
    );
}