import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
        <h1> Page Not Found! </h1>
        <p><Link to="/">Home</Link></p>
        </>
    );
}