import homepageimg from '../assets/Homepage.jpg'

export const Home = () => {
    return (
        <>
            <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
                <div className="flex justify-center w-1/3 bg-gray-100 rounded-lg py-5">
                    <div className="flex items-center justify-center w-1/2 h-1/8 *:text-center border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                        Game Suggestions:
                    </div>
                </div>

                <div className="flex flex-col w-1/3 items-center bg-gray-100 rounded-lg">
                    <div className='py-5'>
                        <div className="flex flex-col justify-center items-center">
                            <div className="py-2">
                                <div className="text-4xl py-5 px-5 text-center border border-4 rounded-lg bg-blue-400 border-blue-500">
                                    Welcome to TableTop Simulator
                                </div>
                            </div>
                            <div className='py-2 '>
                                <div className="text-lg text-center px-2 py-2 border border-2 bg-blue-400 border-blue-500 rounded-lg">
                                    Created By:
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-1/3 bg-gray-100 rounded-lg py-5">
                    <div className="flex items-center justify-center w-1/2 h-1/8 *:text-center border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                        Controls

                    </div>
                </div>
            </div>
        </>
    );
}