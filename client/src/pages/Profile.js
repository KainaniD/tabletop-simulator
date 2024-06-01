import io from "socket.io-client";
import pfp from '../assets/pfp.png'

let socket = io.connect('http://localhost:4000');
var clientID;

socket.on('connect', () => {
    clientID = socket.id;
});

export const Profile = () => {
    return (
        <div className="flex pb-5 min-h-[calc(100vh-198px)] gap-5">
            <div className="flex flex-col w-1/3 bg-gray-100 p-5 rounded-lg shadow-md items-center">
                <h1 className="px-5 py-5">Your Profile</h1>
                <div className="py-5 px-5">
                    <img src={pfp} width="300" height="auto" className="border border-gray-300 rounded-lg border-4" />
                </div>
                <button type="submit"
                    className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                >
                    Change/Add Profile Picture
                </button>
                <p className="py-5 px-5 ">Guest User: {clientID}</p>

            </div>

            <div className="flex flex-col w-2/3 bg-gray-100 p-5 rounded-lg shadow-md">
                <h1 className="text-center py-10">Friends</h1>
                <div className="flex justify-center items-center space-x-3 py-2">
                    <div>Search:</div>
                    <input
                        type="username"
                        placeholder="Enter Username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 py-2 px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg bg-blue-400 transition duration-300 ease-in-out motion-safe:hover:bg-blue-500"
                    >
                        Submit
                    </button>
                </div>
                <div className="mt-5">
                    <div className="overflow-y-auto max-h-96 border px-2 py-2 border-gray-300 rounded-lg">
                        <p>

                            Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more
                        </p>
                        <p>
                            Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more
                        </p>
                        <p>
                            Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
