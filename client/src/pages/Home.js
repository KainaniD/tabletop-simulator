import creep from '../assets/CREEP.jpg'
import dogkai from '../assets/DOGKAI.jpg'
import thor from '../assets/THOR.jpg'
import hotdude from '../assets/PATRICKHOT.jpg'
import siddmouth from '../assets/SIDDBIG.jpg'
import keelan from '../assets/KEELANSELFIE.png'
import game from '../assets/finishgame.png'

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
                            Controls:
                        </div>
                    </div>
                    <div className='px-5 pt-4'>
                        <div className='h-100 rounded-lg border-4 overflow-y-auto p-2'>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}