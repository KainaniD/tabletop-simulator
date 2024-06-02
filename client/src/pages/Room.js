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
        axios.get("http://localhost:4000/rooms", { params: {name, condition} })
        .then(result => {
            console.log(result)
            if(result.data.success === true){
                //Successfully deleted room
                alert(result.data.message)
                window.location.replace("http://localhost:3000/rooms");
            }else if (result.data.success === false){
                //Failed to delete room
                alert(result.data.message)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="app">
            <h1 className="text-center">{name}</h1>
            <PhaserGame ref={phaserRef} />
            
            <form onSubmit={handleSubmit}>
                <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">
                Delete this Room
                </button>
            </form>
            
        </div>
    );
}