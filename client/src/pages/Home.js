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

                <div className="flex-cols w-1/3 bg-gray-100 rounded-lg px-5 py-5">
                    <div className="flex justify-center text-3xl py-2 px-3 text-center border-4 rounded-lg bg-blue-400 border-blue-500">
                        Welcome to TableTop Simulator
                    </div>
                    <div className='flex justify-center py-2'>
                        <img src={homepageimg} width="400" height="auto" className="px-5 py-5 border bg-blue-200 rounded-lg" />
                    </div>
                    <div className="text-lg text-center px-2 py-2 border-2 bg-blue-400 border-blue-500 rounded-lg">
                        Created By:
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