import React, { useState } from "react";
import axios from 'axios'

export function NewRoom() {    
    const [name, setName] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/rooms", { name })
        .then(result => {
            if(result.status === 200){
                alert("You created a new room!")
            }else{
                alert("Oops! Something wrong happened :(")
            }
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h1>Create a New Room Here!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="input-label"><strong>Room Name</strong></label>
                        <input
                        type="name"
                        placeholder="Enter Room Name"
                        name="name"
                        className="input-box"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">
                   Create New Room
                </button>
                </form>
        </div>
    )
}