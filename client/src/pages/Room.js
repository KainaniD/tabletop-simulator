import { useParams, redirect } from "react-router-dom"
import axios from '../axiosConfig'

export const Room = () => {
    const { id } = useParams()
    const condition = "delete"

    const handleSubmit = (e) => {
        e.preventDefault()        
        axios.get("http://localhost:4000/rooms", { params: {id, condition} })
        .then(result => {
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
        <div>
        <h1>{id}</h1>
        <form onSubmit={handleSubmit}>
            <button type="submit" className="py-5 px-10 my-1 rounded-lg bg-purple-300 transition duration-300 ease-in-out motion-safe:hover:bg-purple-400">
            Delete this Room
            </button>
        </form>
        </div>
    );
}