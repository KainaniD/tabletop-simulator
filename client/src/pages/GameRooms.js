import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import { Link } from "react-router-dom";

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
                                <div>                                
                                    <div className="py-2">
                                        <div className="py-2 px-2 bg-blue-400 rounded-lg">
                                            <div className="flex">
                                                <div className="flex-col w-1/3 py-2 px-2 justify-center text-lg">
                                                    <div className="px-2 py-2 bg-blue-200 rounded-lg">
                                                        {room}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-1/3">

                                                </div>
                                                <div className="flex flex-col w-1/3 py-2 px-2 justify-center">
                                                    <div className="flex gap-5">
                                                        <div className="flex-col w-1/2 px-2 py-2">
                                                        </div>
                                                        <Link key={id} to={`/Rooms/${room}`} className='text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400'>
                                                            Join
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>


                <h1 className='text-center px-0 py-4'> Invited Rooms </h1>
                <div>
                    <div className='overflow-y-auto h-60 border-4 bg-gray-100 border-gray-300 rounded-lg px-2'>
                    </div>
                </div>
            </div>
        </>
    );
}