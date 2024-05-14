import io from "socket.io-client";

let socket = io.connect('http://localhost:4000'); 
var clientID;

socket.on('connect', () => {
    clientID = socket.id;
});

export const Profile = () => {
    return (
        <div>
            <h1> Your Profile </h1>
            <p>Guest User: {clientID}</p>
        </div>
    );
}