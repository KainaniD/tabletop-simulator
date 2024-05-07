import { useParams } from "react-router-dom"

export const Room = () => {
    const { id } = useParams()
    return (
        <h1> Room {id}</h1>
    );
}