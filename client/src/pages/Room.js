import React from "react";
import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from '../game/PhaserGame';
import { useParams, redirect } from "react-router-dom"
import axios from '../axiosConfig'
import io from "socket.io-client";

export const Room = () => {
    const phaserRef = useRef();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { name } = useParams()
    const condition = "delete"

    let socket = io.connect('http://localhost:4000');
    var clientID;

    socket.on('connect', () => {
        clientID = socket.id;
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get("http://localhost:4000/rooms", { params: { name, condition } })
            .then(result => {
                console.log(result)
                if (result.data.success === true) {
                    //Successfully deleted room
                    alert(result.data.message)
                    window.location.replace("http://localhost:3000/rooms");
                } else if (result.data.success === false) {
                    //Failed to delete room
                    alert(result.data.message)
                }
            })
            .catch(err => console.log(err))
    }

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("sendMessage", name, message);
            setMessage("");
        }
        console.log("sendMessage function called")
    };
    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                console.log("Updated messages:", updatedMessages);
                return updatedMessages;
            });
        });
    
        return () => {
            socket.off("receiveMessage");
            console.log("receive message off");
        };
    }, []);

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
                        <div>
                            {messages.map((msg, index) => (
                                <div key={index}>{msg}</div>
                            ))}
                        </div>
                        {/* <p>Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more
                        </p> */}
                        <p> hello</p>
                    </div>
                    <form className="flex">
                        <input
                            type="text"
                            placeholder="Enter Message"
                            name="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-50"
                        />
                        <button
                            type="button"
                            className="py-2 px-2 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                            onClick={sendMessage}
                        >
                            
                            Send
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}