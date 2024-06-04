import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import io from "socket.io-client";
import { Link } from "react-router-dom";


let socket = io('http://localhost:4000');
// var clientID;

// socket.on('connect', () => {
//     clientID = socket.id;
//     console.log('connected to server with client id:', clientID)
// });

export const GameRooms = () => {
    const [sessionID, setSessionID] = useState()
    const [username, setUsername] = useState()
    const [backendData, setBackendData] = useState({})
    const [initialized, setInitialized] = useState(false)

    function searchRooms(searchQuery) {
        axios.get("http://localhost:4000/queryrooms", { params: { searchQuery } })
            .then((result) => {
                let rooms = {}
                for (let i = 0; i < result.data.length; i++) {
                    rooms[result.data[i].name] = result.data[i];
                }
                setBackendData(rooms);
            })
            .catch(err => console.log(err))
    }

    function getAllRooms() {
        axios.get("http://localhost:4000/allrooms" )
            .then((result) => {
                let rooms = {}
                for (let i = 0; i < result.data.length; i++) {
                    rooms[result.data[i].name] = result.data[i];
                }
                setBackendData(rooms);
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let form = document.getElementById("roomSearch")
        form.reset()
        getAllRooms()

    }

    useEffect(() => {
        if (!initialized) {
            setInitialized(true)
            getAllRooms()
        }
    })

    return (

        <>
            <div>
                <h1 className='text-center px-0 py-4'> GameRooms </h1>
                <form onSubmit={handleSubmit} id="roomSearch" className="flex justify-center items-center space-x-3 py-3">
                    <div>Search:</div>
                    <input
                        type="roomid"
                        autoComplete="off"
                        placeholder="Enter Room Name"
                        name="roomid"
                        className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
                        onChange={(e) => {
                            searchRooms(e.target.value)
                        }}
                    />
                    <button type="submit" className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500">
                        reset filters
                    </button>
                    <div>
                        or
                    </div>
                    <div>
                        <Link to="/Rooms/NewRoom" className='py-2 px-4 my-1 rounded-lg bg-blue-400  motion-safe:hover:bg-blue-500'>Create a New Room!</Link>
                    </div>
                </form>
                <div>
                    <div className='overflow-y-auto h-100 border-4 bg-gray-100 border-gray-300 rounded-lg px-2 py-2'>
                        {(typeof Object.keys(backendData) == 'undefined') ? (
                            <p>Loading...</p>
                        ) : (
                            Object.keys(backendData).map((room, id) => (
                                <div key={id}>
                                    <div className="flex py-2 px-2 bg-blue-400 rounded-lg mb-3">
                                        <div className="w-1/3 px-2 py-2 bg-blue-200 rounded-lg align-middle text-xl">
                                            {room}
                                        </div>

                                        <div className="w-1/2" />
                                        <Link to={`/Rooms/${room}`} className='text-center bg-green-300 rounded-lg w-1/6 px-2 py-2 motion-safe:hover:bg-green-400'>
                                            Join
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}