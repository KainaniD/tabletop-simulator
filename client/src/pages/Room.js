import { useParams } from "react-router-dom"
import axios from 'axios'

export const Room = () => {
    const { id } = useParams()
    const condition = "delete"

    const handleSubmit = (e) => {
        e.preventDefault()        
        axios.get("http://localhost:4000/rooms", { params: {id, condition} })
        .then(result => {
            console.log(result)
            if(result.data === "successfully deleted"){
                alert("You deleted this room!")
            }else{
                alert("Oops! Something wrong happened :(")
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