import creep from '../assets/CREEP.jpg'
import dogkai from '../assets/DOGKAI.jpg'
import thor from '../assets/THOR.jpg'
import hotdude from '../assets/PATRICKHOT.jpg'
import siddmouth from '../assets/SIDDBIG.jpg'
import keelan from '../assets/KEELANSELFIE.png'
import game from '../assets/finishgame.png'
import navbar from '../assets/navbar.png'
import gameroom from '../assets/gamerooms.png'
import room from '../assets/room.png'
import pfp from '../assets/pfpimage.png'
import friendreqs from '../assets/friendReqs.png'
import friendaccept from '../assets/friendSend.png'
import solitaire from '../assets/solitaire.jpg'

export const Home = () => {
    return (
        <>
            <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
                <div className="flex-cols justify-center w-1/3 bg-gray-100 rounded-lg py-5">
                    <div className='flex justify-center'>
                        <div className="text-center w-1/2 h-1/8 *:text-center border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                            Game Suggestions:
                        </div>
                    </div>
                    <div className='px-5 pt-4'>
                        <div className='h-100 rounded-lg border-4 overflow-y-auto p-2'>
                            <div className='font-bold text-xl'>
                                Aim Trainer (2 OR MORE Players)
                            </div>
                            <p>
                                Have one player drag a playing card around the screen and have the other players try to right click on it to flip it over!
                            </p>
                            <div className='font-bold text-xl'>
                                GTA6 (1 OR MORE Players)
                            </div>
                            <p>
                                Great if you have a nice imagination and are schizophrenic!
                            </p>
                            <p>
                                Pretend each card is one of the characters and drag them around like NPC's!
                            </p>
                            <div className='font-bold text-xl'>
                                Clash Royale (2 Players)
                            </div>
                            <p>
                                Pretend each one is two lanes and label each one of the cards as real Clash Royale characters!
                            </p>
                            <p>
                                Helps if you make the noises of each character to make it more realistic and keep track of damage in the chat!
                            </p>
                            <div className='font-bold text-xl'>
                                Solitaire (1 Player)
                            </div>
                            <p>
                                Great for playing with yourself when you're lonely
                            </p>
                            <p>
                                1. rag cards into 7 ascending columns and keep the rest as the draw deck
                            </p>
                            <p>
                                2. Just like drag cards or smth so they're ascending in order and alternating
                            </p>
                            <img src={solitaire} className='px-5' />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 items-center bg-gray-100 rounded-lg">
                    <div className='py-2'>
                        <div className="flex flex-col justify-center items-center">
                            <div className="pt-2">
                                <div className="text-4xl py-3 px-5 text-center border-4 rounded-lg bg-blue-400 border-blue-500">
                                    Welcome to TableTop Simulator
                                </div>
                            </div>
                            <div className='py-4'>
                                <img src={game} alt='Board' width='400' height='auto' />
                            </div>

                            <div className='flex-col justify-center border-4 w-5/6 rounded-lg bg-gray-300 border-gray-400'>
                                <div className='pt-2 '>
                                    <div className="text-lg text-center">
                                        Created By:
                                    </div>
                                </div>
                                <div className='flex justify-evenly gap-2 pt-3'>
                                    <img src={creep} alt="bill" width="100" height="auto" />
                                    <img src={dogkai} alt="dog" width="100" height="auto" />
                                    <img src={thor} alt="kai" width="100" height="auto" />
                                </div>
                                <div className='flex justify-evenly gap-2 p-2 py-5'>
                                    <img src={hotdude} alt="patrick" width="100" height="auto" />
                                    <img src={keelan} alt="keelan" width="100" height="auto" />
                                    <img src={siddmouth} alt="sidd" width="100" height="auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-cols justify-center w-1/3 bg-gray-100 rounded-lg py-5">
                    <div className='flex justify-center'>
                        <div className="text-center w-1/2 h-1/8 *:text-center border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                            Game Information:
                        </div>
                    </div>
                    <div className='px-5 pt-4'>
                        <div className='h-100 rounded-lg border-4 overflow-y-auto p-2'>
                            <div className='text-xl font-bold'>
                                Rooms
                            </div>
                            <div className='indent-8'>
                                <p>
                                    - Click on Rooms in the Navigation bar to see a list of all current Rooms
                                </p>
                                <img src={navbar} className='px-5 mb-3' />
                                <p>
                                    - Click on Create New Room or search for the room you want to join!
                                </p>
                                <img src={gameroom} className='px-5 mb-3' />
                                <p>
                                    - Once joined, players are loaded counterclockwise from bottom left
                                </p>
                                <p>
                                    - Interact in the chat! It'll display a message when new player joins
                                </p>
                                <p className='pb-3'>
                                    - Rectangular player-hands will appear as players join the room
                                </p>
                                <img src={room} className='px-5 mb-3' />
                            </div>
                            <div className='text-xl font-bold'>
                                Controls
                            </div>
                            <div className='indent-8'>
                                <p>
                                    We went with a more lax design for enforcing rules since it allows for more kinds of games! Hold each other accountable through the in-game chat or just scream at each other in a discord call!
                                </p>
                                <p>
                                    Each person has a playerhand that is a rectangluar box in one of the corners. When a player drags a card into any player's hand it's face down. Right-click a card in your playerhand to flip it over and it won't reveal for other players. If someone else clicks a card in your hand, it will flip it over for everyone though, and cards can be grabbed from other player's hands!
                                </p>
                                <p className='mb-3'>
                                    Cards all come pre-shuffled and face down.
                                </p>
                            </div>
                            <div className='text-xl font-bold'>
                                Profle and Friends
                            </div>
                            <div className='indent-8'>
                                <p>
                                    - Click on the profile page to change your pfp!
                                </p>
                                <img src={pfp} className='px-5' />
                                <p>
                                    - Add your friends and they'll show up under your profile!
                                </p>
                                <img src={friendreqs} className='px-5' />
                                <p>
                                    - Accept incoming friends
                                </p>
                                <img src={friendaccept} className='px-5' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}