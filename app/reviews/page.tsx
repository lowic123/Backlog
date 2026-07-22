'use client'
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button' 
import { createReview } from '@/actions/reviews'
import type { RawgGame } from '@/lib/rawg'


export default function ReviewPage(){
    const [searchQuery, setSearchQuery] = useState('');
    const [game, setGame] = useState<RawgGame>();
    const [games, setGames] = useState<RawgGame[]>([]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!game){
            alert('Select a game!')
            return;
        }
        await createReview(game!, rating, review);
    }

    const search = useCallback(async (q: string) => {
        if (!q.trim()) {
          setGames([]);
          return;
        }
        try {
          const res = await fetch(`/api/games/search?q=${encodeURIComponent(q)}`);
          if (!res.ok) throw new Error("Search failed");
          const data = await res.json();
          setGames(data);
        } catch {
        } finally {
        }
      }, []);

    useEffect(() => {
        const timeout = setTimeout(() => search(searchQuery), 400);
        return () => clearTimeout(timeout);
    }, [searchQuery, search]);

    return (
        <div>
            <h1 className="mt-8 text-center text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
                Reviews
            </h1>
            <form onSubmit={handleSubmit} className ='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl'>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border rounded p-2'
                />
                <select name='games' 
                        id='games' 
                        defaultValue ='' 
                        onChange={(e) => {
                            const selectedGame = games.find(g => g.id.toString() === e.target.value);
                            if(selectedGame)
                                setGame(selectedGame)
                        }}  
                        className='border rounded p-6 font-bold'>
                        <option value='' selected disabled hidden>Select a Game</option>
                        {games.map((game) => {
                            () => setGame(game);
                            return (
                            <option key={game.id}value={game.id}>{game.name}</option>
                        )})}
                    </select>
                <label className='flex flex-col gap-6 font-bold' htmlFor="review-text"> 
                    Write your review: 
                    <textarea id='review-text' rows={5} className='p-4 font-normal border rounded' onChange={(e) => setReview(e.target.value)}></textarea>
                </label>
                <label className='flex flex-col'>
                    <div>
                        <p className='font-bold'>Rating:</p>
                        <input type='number' min={1} max={5} className='w-1/16 mx-left' onChange={(e) => setRating(Number(e.target.value))}></input>/5
                    </div>
                </label>
                <Button type='submit'>Submit Review</Button> 
            </form>
        </div>  
    )
}