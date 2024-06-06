import React from "react";
import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from '../game/PhaserGame';
import { useParams, redirect } from "react-router-dom"
import axios from '../axiosConfig'
import io from "socket.io-client";
import { SERVER_URL, CLIENT_URL } from "../urls";

const socket = io(SERVER_URL + "/rooms")


export const Room = () => {
    const phaserRef = useRef();
    const [username, setUsername] = useState()
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setAllUsers] = useState([]);
    const [images, setImages] = useState([]);
    const { name } = useParams()
    const condition = "delete"
    useEffect(async () => {
        const amog = await axios.get(SERVER_URL + "/currentuser")
            .then(async (result) => {
                setUsername(result.data.username)
                //console.log("oo")
                const temp = result.data.username;
                //console.log(result.data.username)
                socket.on('connect', () => {
                    let clientID = socket.id;
                    console.log(clientID)
                });

                //console.log("heyyyyy")
                //console.log(result.data.username)
                socket.emit("joinRoom", {data: name, username: result.data.username});
                setAllUsers((users) => [...users, result.data.username])
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, message];
                    console.log("we did it")
                    console.log("Updated messages:", updatedMessages);
                    return updatedMessages;
                });
                const getImageUrl = async (n) =>{
                    let file;
                    const test = axios.get("/profile",{params: {user: n}}).then((result) => {
                        file = result.data.imageUrl
                        //console.log(result.data.imageUrl)
                    })
                    console.log("amogus1")
                    console.log(file)
                    console.log("amogus2")
                    return file
                }
                let temp2 =[];
                for (let i = 0; i < users.length; i++) {
                    temp2.push({name: users[i], imgL: await getImageUrl(users[i])})
                }
                //console.log("working?")
                //console.log(users)
                //console.log(temp2)

                //setImages(temp2);

                
                //getAllUsers();

                //const arrayDataItems = courses.map((course) => <li>{course}</li>);
                

            })
            .catch(err => console.log(err))


        //const tempM = username + " joined the room!"
        //
        //console.log(temp+"yay")
        //console.log("YAYYAA")
        //socket.emit("sendMessage", { username, text: tempM })

        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                console.log("we did it")
                console.log("Updated messages:", updatedMessages);
                return updatedMessages;
            });
        });
        


        return () => {
            socket.emit("leaveRoom", username)
        }

    }, []);



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(SERVER_URL + "/deleteroom", { params: { name, condition } })
            .then(result => {
                if (result.data.success === true) {
                    //Successfully deleted room
                    //alert(result.data.message)
                    window.location.replace(CLIENT_URL + "/rooms");
                } else if (result.data.success === false) {
                    //Failed to delete room
                    //alert(result.data.message)
                }
            })
            .catch(err => console.log(err))
    }

    const sendMessage = () => {
        if (message.trim() !== "") {
            const messageWithUser = { username, text: message }
            socket.emit("sendMessage", name, messageWithUser);
            setMessage("");
        }
        console.log("sendMessage function called")
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();  // Prevent the default form submission
            sendMessage();
        }
    };


    //getAllUsers();
    //const listItems = users.map(person => <li>{person}</li>);
    console.log(images)
    const listItems = images.map(person =>
        
        <li>
          <img
            src={person.name}
            alt={person.imgL}
          />
          <p>
            <b>{person}:</b>
            {'One of the dudes'}
            'Being cool'
          </p>
        </li>
      );
    //console.log(listItems)
    const listItems2 = users.map(person => <li>{person}</li>);


    return (
        <div id="app">
            <h1 className="text-center p-2">{name}</h1>
            <form onSubmit={handleSubmit} className="text-center">
                <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-blue-400 motion-safe:hover:bg-blue-500">
                    Delete this Room
                </button>
            </form>
            <div className="flex justify-center items-center gap-5 px-2 py-5">
                <PhaserGame ref={phaserRef} socket={socket} />
                <div className="flex-col w-1/3 justify-items-center">
                    <div className="text-center bg-blue-400 rounded-lg border-4 border-blue-500 mb-2">
                        ChatBox
                    </div>
                    <div className="overflow-y-auto h-200 rounded-lg border-4 text-left px-2 py-2 mb-2">
                        <div>
                            {messages.map((msg, index) => (
                                <div key={index}>
                                    <strong>{msg.username}: </strong>{msg.text}
                                </div>
                            ))}
                        </div>
                        {/* <p>Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more
                        </p> */}
                        {/* <p> hello</p> */}
                    </div>
                    <form className="flex">
                        <input
                            type="text"
                            placeholder="Enter Message"
                            name="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
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
        <div>
        <ul>{listItems2}</ul>

        </div>
        </div>

    );
}