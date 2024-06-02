import homepageimg from '../assets/Homepage.jpg'

export const Home = () => {
    return (
        <>
            <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
                <div className="flex flex-col w-1/3 items-center bg-gray-100 rounded-lg">
                    <div className='py-5'>
                        <div className="border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                            Game Suggestions:
                        </div>
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
                            <img src={homepageimg} width="400" height="auto" className="px-5 py-5 border bg-blue-200 rounded-lg" />
                            <div className='py-2 '>
                                <div className="text-lg text-center px-2 py-2 border border-2 bg-blue-400 border-blue-500 rounded-lg">
                                    Created By:
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 items-center bg-gray-100 rounded-lg">
                    <div className='py-5'>
                        <div className="border border-xl border-blue-500 bg-blue-400 rounded-lg py-2 px-2 text-2xl">
                            Rules and Game Information/controls??? idk??:
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}