'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createReview(gameId: number, rating:number, body: string){
    const supabase = await createClient();
    const {data : {user}} = await supabase.auth.getUser();

    if(!user)
        redirect('auth/sign-in')

    const {error} = await supabase.from('reviews').insert({
        user_id: user.id,
        game_id: gameId,
        rating: rating,
        review_text: body
    })

    if(error) console.log(error.message)

}