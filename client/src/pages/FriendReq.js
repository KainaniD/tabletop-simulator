export const FriendReq = () => {
    return (
        <div className="flex py-2 px-2 bg-blue-400 rounded-lg">
            <div className="w-1/3 px-2 py-2 bg-blue-200 rounded-lg align-middle text-xl">
                Gimp
            </div>
            <div className="w-1/3" />
            <div className="flex flex-row gap-5 w-1/3 justify-center">
                <button className="text-center bg-green-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-green-400">
                    Accept
                </button>
                <button className="text-center bg-red-300 rounded-lg w-1/2 px-2 py-2 motion-safe:hover:bg-red-400">
                    Deny
                </button>
            </div>
        </div>
    );
}