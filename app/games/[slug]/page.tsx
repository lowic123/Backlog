import {getGame} from "@/lib/rawg"
import GameHeader from "@/components/game-header"

type Props = {
    params: Promise<{slug : string}>;
}

export default async function GamePage({params} : Props) {
    const {slug} = await params;    
    const game = await getGame(slug);

    return (
        <div>
            <GameHeader game={game}/>
            <div 
                className='prose prose-invert max-w-none w-5/6 justify-self-center mt-5 p-10 bg-primary rounded-2xl text-secondary'
                dangerouslySetInnerHTML={{__html: game.description}}
            />
        </div>
    )
}