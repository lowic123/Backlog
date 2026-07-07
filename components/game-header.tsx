import Image from "next/image";
import type {RawgGame} from "@/lib/rawg"

export default function GameHeader({game} : {game : RawgGame}){
    return(
        <div className='relative w-11/12 mt-4 mx-auto content-center h-64 md:h-96'>
            <Image
            src={game.background_image || ""}
            alt={game.name}
            fill
            className='object-cover rounded-2xl'
            />
            
            <div className='absolute bottom-0 text-secondary  p-6 drop-shadow-md'>
                <h1 className='text-3xl'>{game.name}</h1>
            </div>
        </div>
    )
}