'use server'
import type { RawgGame } from '@/lib/rawg'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createReview(game: RawgGame, rating:number, body: string){
    const supabase = await createClient();
    const {data : {user}} = await supabase.auth.getUser();

    if(!user)
        redirect('auth/sign-in')

    const {error: gameError} = await supabase.from('games').upsert({
        rawg_id: game.id,
        title: game.name,
        release_date: game.released,
        genres: game.genres
    });

    if (gameError) {
        console.error('Error upserting game:', gameError.message);
        return;
    }

    const {error: reviewError} = await supabase.from('reviews').insert({
        user_id: user.id,
        game_id: game.id,
        rating: rating,
        review_text: body
    })

    if(reviewError) console.log(reviewError.message)

}