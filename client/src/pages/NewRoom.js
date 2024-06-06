import React, { useEffect, useState } from "react";
import axios from '../axiosConfig'
import io from "socket.io-client";
import { SERVER_URL, CLIENT_URL } from "../urls";

export function NewRoom() {
    const [name, setName] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(SERVER_URL + "/createroom", { name })
            .then(result => {
                if (result.data.success === true) {
                    //room created case
                    //alert(result.data.message)
                    window.location.replace(CLIENT_URL + "/rooms/" + name);

                } else if (result.data.success === false) {
                    //room failed case
                    //alert(result.data.message)
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1 className="flex justify-center px-5 py-5">
                <div className="text-center rounded-lg border-4 w-1/6 border-blue-400 bg-blue-300">
                    Create a New Room Here!
                </div>
            </h1>
            <form onSubmit={handleSubmit} className="flex-col">
                <div className="flex justify-center items-center gap-5 mb-4">
                    <label htmlFor="name" className="input-label mt-0"><strong>Room Name</strong></label>
                    <input
                        type="name"
                        placeholder="Enter Room Name"
                        name="name"
                        className="input-box mb-0 w-1/8"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                        Create New Room
                    </button>
                </div>
            </form>

        </div>
    )
}