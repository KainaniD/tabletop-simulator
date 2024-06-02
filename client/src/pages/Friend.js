export const Friend = () => {
    return (
        <div className="py-2">
            <div className="py-2 px-2 bg-blue-400 rounded-lg">
                <div className="flex">
                    <div className="flex flex-col w-1/3 py-2 px-2 justify-center text-lg">
                        <div className="flex px-2 py-2 bg-blue-200 rounded-lg">
                            Master
                        </div>
                    </div>
                    <div className="flex flex-col w-1/4">

                    </div>
                    <div className="flex flex-col py-2 px-2 justify-center">
                        <div className="flex gap-5">
                            <button className="flex-col text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                Invite To Room
                            </button>
                            <button className="flex-col text-center bg-red-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-red-400">
                                Remove Friend
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}