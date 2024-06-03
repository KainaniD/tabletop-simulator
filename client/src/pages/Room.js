import React from "react";
import { useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from '../game/PhaserGame';
import { useParams, redirect } from "react-router-dom"
import axios from '../axiosConfig'

export const Room = () => {
    const phaserRef = useRef();

    const { name } = useParams()
    const condition = "delete"

    const handleSubmit = (e) => {
        e.preventDefault()        
        axios.get("http://localhost:4000/deleteroom", { params: {name, condition} })
        .then(result => {
            if(result.data.success === true){
                //Successfully deleted room
                //alert(result.data.message)
                window.location.replace("http://localhost:3000/rooms");
            }else if (result.data.success === false){
                //Failed to delete room
                //alert(result.data.message)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="app">
            <h1 className="text-center p-2">{name}</h1>
            <form onSubmit={handleSubmit} className="text-center">
                <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                    Delete this Room
                </button>
            </form>
            <div className="flex justify-center items-center gap-5 px-2 py-5">
                <PhaserGame ref={phaserRef} />
                <div className="flex-col w-1/3 justify-items-center">
                    <div className="text-center bg-blue-400 rounded-lg border-4 border-blue-500 mb-2">
                        ChatBox
                    </div>
                    <div className="overflow-y-auto h-200 rounded-lg border-4 text-left px-2 py-2 mb-2">
                        <p> hello</p>
                    </div>
                    <form className="flex">
                        <input
                            type="username"
                            placeholder="Enter Message"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-50"
                        />
                        <button
                            type="submit"
                            className="py-2 px-2 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}