import { Link } from "react-router-dom";

export const FakeRoom = () => {
    return (
        <div className="py-2">
            <div className="py-2 px-2 bg-blue-400 rounded-lg">
                <div className="flex">
                    <div className="flex flex-col w-1/3 py-2 px-2 justify-center text-lg">
                        <div className="flex px-2 py-2 bg-blue-200 rounded-lg">
                            Room ID
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3">

                    </div>
                    <div className="flex flex-col w-1/3 py-2 px-2 justify-center">
                        <div className="flex gap-5">
                            <div className="flex-col w-1/2 px-2 py-2">
                            </div>
                            <Link to='./Room'className="flex-col text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                                Join
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}