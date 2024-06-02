import React, { useEffect, useState } from 'react'
import axios from '../axiosConfig'
import io from "socket.io-client";
import pfp from '../assets/pfp.png'
import { all } from 'axios';

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
    const [allUsers, setAllUsers] = useState({})

    function sendFriendRequest(user) {
        console.log(user)
        console.log("SEND FRIEND REQUEST TRIGGER")
    }

    function removeFriend(user) {
        console.log(user)
        console.log("REMOVE FRIEND TRIGGER")
    }

    function acceptFriendRequest(user) {
        console.log(user)
        console.log("ACCEPT FRIEND REQUEST TRIGGER")
    }

    function denyFriendRequest(user) {
        console.log(user)
        console.log("DENY FRIEND REQUEST TRIGGER")
    }

    useEffect(() => {
        axios.get("http://localhost:4000/currentuser")
            .then((result) => {
                setUsername(result.data.username)
                setSessionID(result.data._id)
            })
            .catch(err => console.log(err))


        axios.get("http://localhost:4000/allusers")
            .then((result) => {
                let users = {}
                for (let i = 0; i < result.data.length; i++) {
                    users[result.data[i].username] = result.data[i];
                }
                setAllUsers(users)
            })
    }, [])

    return (
        <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
            <div className="flex flex-col w-1/3 bg-gray-100 p-5 rounded-lg shadow-md items-center">
                <h1 className="px-2 py-0">{username}'s Profile </h1>
                <p>Socket Session ID: {clientID}</p>
                <p>Express Session ID: {sessionID}</p>
                <div className="py-5 px-5">
                    <img src={pfp} alt="" width="200" height="auto" className="x border-gray-300 rounded-lg border-4" />
                </div>
                <button type="submit"
                    className="py-2 px-4 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500"
                >
                    Change/Add Profile Picture
                </button>
                <div className='py-2' />
                <button onClick={logout} className="py-2 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                    Logout
                </button>
                <h1 className="text-center pb-0 pl-0 pt-3">Friends</h1>
                <div className="">
                    <div className="mt-3">
                        <div className="overflow-y-auto h-48 px-2 py-2 rounded-lg border-4 border-gray-300">
                            {(typeof Object.keys(allUsers) == 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                Object.keys(allUsers).map((user, id) => (
                                    <div key={id} className="flex py-2 px-2 bg-blue-400 rounded-lg gap-5 mb-3">
                                        <div className="w-1/2 px-2 py-4 bg-blue-200 rounded-lg align-middle text-xl">
                                            {user}
                                        </div>
                                        <div className="flex flex-row gap-5 justify-center">
                                            <button className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                                Invite To Room
                                            </button>
                                            <button onClick={() => {
                                                removeFriend(allUsers[user])
                                            }} className="text-center bg-red-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-red-400">
                                                Remove Friend
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-2/3 bg-gray-100 p-5 rounded-lg shadow-md">
                <h1 className="text-center pb-0">Find Friends</h1>
                <div className="flex justify-center items-center space-x-3 pt-3">
                    <div>Search:</div>
                    <input
                        type="username"
                        placeholder="Enter Username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                    >
                        Submit
                    </button>
                </div>
                <div className="mt-5">
                    <div className="overflow-y-auto h-60 border-4 px-2 py-2 border-gray-300 rounded-lg">
                        {(typeof Object.keys(allUsers) == 'undefined') ? (
                            <p>Loading...</p>
                        ) : (
                            Object.keys(allUsers).map((user, id) => (
                                <div key={id} className="flex py-2 px-2 bg-blue-400 rounded-lg mb-3">
                                    <div className="w-1/3 px-2 py-2 bg-blue-200 rounded-lg align-middle text-xl">
                                        {user}
                                    </div>
                                    <div className="w-1/3" />
                                    <div className="flex flex-row gap-5 w-1/3 justify-center">
                                        <button className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                            Send Room Invite
                                        </button>
                                        <button onClick={() => {
                                            sendFriendRequest(allUsers[user])
                                        }
                                        } className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                            Send Friend Request
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>



                <h1 className="text-center pb-0 pt-5 ">Friends Requests </h1>
                <div className="mt-5">
                    <div className="overflow-y-auto h-60 border-4 px-2 py-2 border-gray-300 rounded-lg">
                        <div>
                            {(typeof Object.keys(allUsers) == 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                Object.keys(allUsers).map((user, id) => (
                                    <div key={id} className="flex py-2 px-2 bg-blue-400 rounded-lg mb-3">
                                        <div className="w-1/3 px-2 py-2 bg-blue-200 rounded-lg align-middle text-xl">
                                            {user}
                                        </div>
                                        <div className="w-1/3" />
                                        <div className="flex flex-row gap-5 w-1/3 justify-center">
                                            <button onClick={() => {
                                                acceptFriendRequest(allUsers[user])
                                            }} className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                                Accept
                                            </button>
                                            <button onClick={() => {
                                                denyFriendRequest(allUsers[user])
                                            }} className="text-center bg-red-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-red-400">
                                                Deny
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
