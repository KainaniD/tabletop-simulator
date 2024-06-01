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
            <Route path="/rooms">
                <Route index element={<GameRooms />} />
                <Route path=":id" element={<Room />} />
                <Route path="newroom" element={<NewRoom />} />   
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}