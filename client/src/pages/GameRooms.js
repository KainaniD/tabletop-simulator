import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export const GameRooms = () => {

    // const [backendData, setBackendData] = useState({})

    // useEffect(() => {
    //   fetch("http://localhost:4000/api")
    //     .then((res) => res.json())
    //     .then((data) => setBackendData(data))
    // }, [])
    
    return (
        <>
        <h1> GameRooms </h1>
        {/* <div className='flex flex-col'>
        { (typeof Object.keys(backendData) == 'undefined') ? (
            <p>Loading...</p>
        ): (
            Object.keys(backendData).map((room, id) => (
                <Link key={id} to={`/Rooms/${room}`} className='py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400'>Room Name: {room}<br />People In Room: {backendData.room}</Link>
            ) )
        )}
        <Link to="/Rooms/NewRoom" className='py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400}'>Create a New Room!</Link>
        </div> */}
        </>
    );
}