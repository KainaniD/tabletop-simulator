import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import { Link } from "react-router-dom";

export const GameRooms = () => {

    const [backendData, setBackendData] = useState({})
    const condition = "query"

    useEffect(() => {
        axios.get("http://localhost:4000/rooms", { params: { condition} })
        .then((result) => {
            let rooms = {}
            for (let i = 0; i < result.data.length; i++){
                rooms[result.data[i].name] = result.data[i];
            }
            setBackendData(rooms);
        })
        .catch(err => console.log(err))
    }, [])
    
    return (
        <>
        <h1> GameRooms </h1>
        <div className='flex flex-col'>
        { (typeof Object.keys(backendData) == 'undefined') ? (
            <p>Loading...</p>
        ): (
            Object.keys(backendData).map((room, id) => (
                <Link key={id} to={`/Rooms/${room}`} className='py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400'>Room Name: {room}<br />People In Room: {backendData.room}</Link>
            ) )
        )}
        <Link to="/Rooms/NewRoom" className='py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400'>Create a New Room!</Link>
        </div>
        </>
    );
}