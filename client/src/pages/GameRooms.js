import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import { Link } from "react-router-dom";
import { FakeRoom } from './FakeRoom';

export const GameRooms = () => {

    const [backendData, setBackendData] = useState({})
    const condition = "query"

    useEffect(() => {
        axios.get("http://localhost:4000/rooms", { params: { condition } })
            .then((result) => {
                let rooms = {}
                for (let i = 0; i < result.data.length; i++) {
                    rooms[result.data[i].name] = result.data[i];
                }
                setBackendData(rooms);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div>
                <h1 className='text-center px-0 py-4'> GameRooms </h1>
                <div className="flex justify-center items-center space-x-3 py-3">
                    <div>Search:</div>
                    <input
                        type="roomid"
                        placeholder="Enter Room ID"
                        name="roomid"
                        className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                    >
                        Submit
                    </button>
                    <div className='flex '>
                        or
                    </div>
                    <div>
                        <Link to="/Rooms/NewRoom" className='py-2 px-4 my-1 rounded-lg bg-blue-400  motion-safe:hover:bg-blue-500'>Create a New Room!</Link>
                    </div>
                </div>
                <div>
                    <div className='overflow-y-auto h-60 border-4 bg-gray-100 border-gray-300 rounded-lg px-2'>
                        {(typeof Object.keys(backendData) == 'undefined') ? (
                            <p>Loading...</p>
                        ) : (
                            Object.keys(backendData).map((room, id) => (
                                <Link key={id} to={`/Rooms/${room}`} className='py-5 px-10 my-1 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500'>Room Name: {room}<br />People In Room: {backendData.room}</Link>
                            ))
                        )}
                        <FakeRoom />
                        <FakeRoom />
                        <FakeRoom />
                    </div>
                </div>


                <h1 className='text-center px-0 py-4'> Invited Rooms </h1>
                <div>
                    <div className='overflow-y-auto h-60 border-4 bg-gray-100 border-gray-300 rounded-lg px-2'>
                        <FakeRoom />
                        <FakeRoom />
                        <FakeRoom />
                    </div>
                </div>
            </div>
        </>
    );
}