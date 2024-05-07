import { Link } from "react-router-dom";

export const GameRooms = () => {
    return (
        <>
        <h1> GameRooms </h1>
        <Link to="/Rooms/1">Room 1</Link>
        <br />
        <Link to="/Rooms/2">Room 2</Link>
        <br />
        <Link to="/Rooms/newRoom">New Room</Link>
        </>
    );
}