import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Room } from './pages/Room'
import { GameRooms } from './pages/GameRooms'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { NewRoom } from './pages/NewRoom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

export const MyRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Rooms">
                <Route index element={<GameRooms />} />
                <Route path=":id" element={<Room />} />
                <Route path="NewRoom" element={<NewRoom />} />   
            </Route>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}