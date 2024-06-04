import React, { useEffect, useState, useRef } from 'react'
import axios from '../axiosConfig'
import io from "socket.io-client";
import pfp from '../assets/pfp.png'
import { all } from 'axios';

let socket = (io.connect('http://localhost:4000'));
var clientID;

socket.on('connect', () => {
    clientID = socket.id;
});

function logout() {
    axios.post("http://localhost:4000/session")
        .then((result) => {
            //alert("you have logged out!")
            window.location.replace("http://localhost:3000/login")
        })
        .catch(err => console.log(err))
}

export const Profile = () => {

    
    
    const fileInput = useRef(null);

    const [sessionID, setSessionID] = useState()
    const [username, setUsername] = useState()
    const [allUsers, setAllUsers] = useState({})
    const [currentRequests, setCurrentRequests] = useState({})
    const [allFriends, setAllFriends] = useState({})
    const [photo, setPhoto] = useState();


    function sendFriendRequest(targetuser) {
        axios.get("http://localhost:4000/sendfriendrequest", { params: { targetuser } })
        .then(result => {
            if (result.data.success === true) {
                //alert(result.data.message)
            } else if (result.data.success === false) {
                //alert(result.data.message)
            }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    function removeFriend(targetuser) {
        axios.get("http://localhost:4000/removefriend", { params: { targetuser } })
        .then(result => {
            //console.log(result)
            if (result.data.success === true) {
                //alert(result.data.message)
            } else if (result.data.success === false) {
                //alert(result.data.message)
            }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    function acceptFriendRequest(targetuser) {
        axios.get("http://localhost:4000/acceptfriendrequest", { params: { targetuser } })
        .then(result => {
            if (result.data.success === true) {
                //alert(result.data.message)
            } else if (result.data.success === false) {
                //alert(result.data.message)
            }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    function denyFriendRequest(targetuser) {
        axios.get("http://localhost:4000/removefriend", { params: { targetuser } })
        .then(result => {
            if (result.data.success === true) {
                //alert(result.data.message)
            } else if (result.data.success === false) {
                //alert(result.data.message)
            }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    function searchUsers(searchQuery) {
        axios.get("http://localhost:4000/queryallusers", { params: { searchQuery } })
        .then((result) => {
            console.log(result)
            let users = {}
            for (let i = 0; i < result.data.length; i++) {
                users[result.data[i].username] = result.data[i];
            }
            setAllUsers(users);
        })
        .catch(err => console.log(err))
    }

    function getAllUsers() {
        axios.get("http://localhost:4000/allusers")
            .then((result) => {
                let users = {}
                for (let i = 0; i < result.data.length; i++) {
                    users[result.data[i].username] = result.data[i];
                }
                setAllUsers(users)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let form = document.getElementById("userSearch")
        form.reset()
        getAllUsers()

    }

    useEffect( () => {
        
            axios.get("http://localhost:4000/currentuser")
            .then(async (result) => {
                setUsername(result.data.username)
                setSessionID(result.data._id)
                console.log("result.data.username")
                const test = await axios.get("/profile",{params: {user: result.data.username}}).then((result) => {
                    const file = result.data.imageUrl
                    setPhoto(file)
                    console.log(result)
                })
                console.log(test)
                
                
            })
            .catch(err => console.log(err))




        getAllUsers()

        axios.get("http://localhost:4000/currentRequests")
            .then((result) => {
                let users = {}
                for (let i = 0; i < result.data.length; i++) {
                    users[result.data[i].username] = result.data[i];
                }
                setCurrentRequests(users)
            })
            .catch(err => console.log(err))

        axios.get("http://localhost:4000/allfriends")
            .then((result) => {
                let users = {}
                for (let i = 0; i < result.data.length; i++) {
                    users[result.data[i].username] = result.data[i];
                }
                setAllFriends(users)
            })
            .catch(err => console.log(err))
    }, [])

    const uploadPfp = event => {
        //console.log("amogus")
        fileInput.current.click();
    }
    
    const handleChange = async event => {
        console.log("hello");
        const fileUploaded = event.target.files[0];


    const formData = new FormData();
    formData.append("image", fileUploaded)
    formData.append("username", username)
    formData.append("caption", "amogus")
    setPhoto(URL.createObjectURL(fileUploaded));
    await axios.post("/profile", formData, { headers: {'Content-Type': 'multipart/form-data'}})
        //console.log(URL.createObjectURL(fileUploaded));
        
        
    };

    return (
        <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
            <div className="flex flex-col w-1/3 bg-gray-100 p-5 rounded-lg shadow-md items-center">
                <h1 className="px-2 py-0">{username}'s Profile </h1>
                {/* <p>Socket Session ID: {clientID}</p>
                <p>Express Session ID: {sessionID}</p> */}
                <div className="py-5 px-5">
                    <img src={photo} alt="" className="border-gray-300 rounded-lg h-52 w-52 object-cover border-4" />
                </div>
                <button type="file" id = "get_file"
                    className="py-2 px-4 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500"
                    onClick={uploadPfp}
                >
                       
                    Change/Add Profile Picture
                </button>
                <input 
                type="file"
                accept="image/*"
                ref={fileInput} 
                onChange={handleChange} 
                style={{display:'none'}}/>
                <div className='py-2' />
                <button onClick={logout} className="py-2 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                    Logout
                </button>
                <h1 className="text-center pb-0 pl-0 pt-3">Friends</h1>
                <div className="">
                    <div className="mt-3">
                        <div className="overflow-y-auto h-48 px-2 py-2 min-w-96 rounded-lg border-4 border-gray-300">
                            {(typeof Object.keys(allFriends) == 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                Object.keys(allFriends).map((user, id) => (
                                    <div key={id} className="flex py-2 px-2 bg-blue-400 rounded-lg gap-5 mb-3">
                                        <div className="w-1/2 px-2 py-4 bg-blue-200 rounded-lg align-middle text-xl">
                                            {user}
                                        </div>
                                            <button onClick={() => {
                                                removeFriend(allFriends[user])
                                            }} className="text-center bg-red-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-red-400">
                                                Remove Friend
                                            </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-2/3 bg-gray-100 p-5 rounded-lg shadow-md">
                <h1 className="text-center pb-0">Find Friends</h1>
                <form onSubmit={handleSubmit} id="userSearch" className="flex justify-center items-center space-x-3 pt-3">

                    <div>Search:</div>
                    <input
                        type="username"
                        placeholder="Enter Username"
                        name="username"
                        autoComplete="off"
                        className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
                        onChange={(e) => {
                            searchUsers(e.target.value)
                        }}
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                    >
                        Reset Filter
                    </button>
                </form>
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
                                    <div className="w-1/2" />
                                        <button onClick={() => {
                                            sendFriendRequest(allUsers[user])
                                        }} className="text-center bg-green-300 rounded-lg w-1/6 px-2 py-2 motion-safe:hover:bg-green-400">
                                            Send Friend Request
                                        </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>



                <h1 className="text-center pb-0 pt-5 ">Friend Requests</h1>
                <div className="mt-5">
                    <div className="overflow-y-auto h-60 border-4 px-2 py-2 border-gray-300 rounded-lg">
                        <div>
                            {(typeof Object.keys(currentRequests) == 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                Object.keys(currentRequests).map((user, id) => (
                                    <div key={id} className="flex py-2 px-2 bg-blue-400 rounded-lg mb-3">
                                        <div className="w-1/3 px-2 py-2 bg-blue-200 rounded-lg align-middle text-xl">
                                            {user}
                                        </div>
                                        <div className="w-1/3" />
                                        <div className="flex flex-row gap-5 w-1/3 justify-center">
                                            <button onClick={() => {
                                                acceptFriendRequest(currentRequests[user])
                                            }} className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                                Accept
                                            </button>
                                            <button onClick={() => {
                                                denyFriendRequest(currentRequests[user])
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
